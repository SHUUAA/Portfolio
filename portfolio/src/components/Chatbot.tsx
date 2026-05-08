import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, MessageSquare, Mic, Send, Square, X } from 'lucide-react';
import { sendChatMessage, type ChatMessage, type NavTarget } from '../lib/chat';

const canRecord =
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  !!navigator.mediaDevices?.getUserMedia &&
  typeof window.MediaRecorder !== 'undefined';

async function transcribeBlob(blob: Blob): Promise<string> {
  const res = await fetch('/api/transcribe', {
    method: 'POST',
    headers: { 'Content-Type': blob.type || 'audio/webm' },
    body: blob,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Transcribe failed (${res.status})`);
  return (data.text ?? '').trim();
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, '0')}`;
}

const greeting: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  content: "Hi — I'm SHUA, Joshua's assistant. Ask me about his work, stack, or how to get in touch.",
};

const SUGGESTIONS = [
  "What's Joshua's tech stack?",
  'Tell me about his projects',
  'What is he working on now?',
  'How can I contact him?',
];

const NAV_LABELS: Record<NavTarget, string> = {
  about: 'About',
  capabilities: 'Capabilities',
  projects: 'Featured Projects',
  works: 'All Works',
  contact: 'Contact',
  resume: 'Resume',
};

const NAV_REGEX = /\[GO:(about|capabilities|projects|works|contact|resume)\]/i;

function parseNav(raw: string): { content: string; nav?: NavTarget } {
  const match = raw.match(NAV_REGEX);
  const content = raw.replace(NAV_REGEX, '').trim();
  if (!match) return { content };
  return { content, nav: match[1].toLowerCase() as NavTarget };
}

export const Chatbot: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, pending, open]);

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 250);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => () => {
    abortRef.current?.abort();
    if (timerRef.current) window.clearInterval(timerRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    if (recorderRef.current && recorderRef.current.state !== 'inactive') {
      try { recorderRef.current.stop(); } catch { /* noop */ }
    }
  }, []);

  const cleanupRecorder = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    recorderRef.current = null;
    chunksRef.current = [];
  };

  const startRecording = async () => {
    if (recording || transcribing || pending) return;
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        const chunks = chunksRef.current;
        const type = recorder.mimeType || 'audio/webm';
        cleanupRecorder();
        setRecording(false);
        setRecordSeconds(0);
        if (chunks.length === 0) return;
        const blob = new Blob(chunks, { type });
        setTranscribing(true);
        try {
          const text = await transcribeBlob(blob);
          if (text) {
            setInput((prev) => (prev ? `${prev} ${text}` : text));
            window.setTimeout(() => inputRef.current?.focus(), 50);
          }
        } catch (err) {
          setError((err as Error).message || 'Transcription failed.');
        } finally {
          setTranscribing(false);
        }
      };

      recorder.start();
      setRecording(true);
      setRecordSeconds(0);
      timerRef.current = window.setInterval(() => {
        setRecordSeconds((s) => s + 1);
      }, 1000);
    } catch (err) {
      cleanupRecorder();
      setRecording(false);
      const msg =
        (err as Error).name === 'NotAllowedError'
          ? 'Microphone access was blocked. Allow it in your browser settings to use voice input.'
          : (err as Error).message || 'Could not access microphone.';
      setError(msg);
    }
  };

  const stopRecording = () => {
    const r = recorderRef.current;
    if (r && r.state !== 'inactive') {
      try { r.stop(); } catch { /* noop */ }
    } else {
      cleanupRecorder();
      setRecording(false);
      setRecordSeconds(0);
    }
  };

  const goTo = (target: NavTarget) => {
    setOpen(false);

    if (target === 'works') {
      navigate('/projects');
      return;
    }
    if (target === 'resume') {
      window.open('/Joshua_Rebadomia_Resume.pdf', '_blank', 'noopener,noreferrer');
      return;
    }

    const hash = `#${target}`;
    if (location.pathname === '/') {
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(hash, { offset: -56 });
      } else {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/${hash}`);
    }
  };

  const send = async (override?: string) => {
    const text = (override ?? input).trim();
    if (!text || pending) return;

    const userMsg: ChatMessage = {
      id: `${Date.now()}-u`,
      role: 'user',
      content: text,
    };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setPending(true);
    setError(null);

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const reply = await sendChatMessage(next, ctrl.signal);
      const { content, nav } = parseNav(reply);
      setMessages((m) => [
        ...m,
        { id: `${Date.now()}-a`, role: 'assistant', content: content || '...', nav },
      ]);
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setError((err as Error).message || 'Something went wrong.');
    } finally {
      setPending(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        className={`hover-trigger fixed z-[120] bottom-4 right-4 sm:bottom-6 sm:right-6 inline-flex items-center gap-2 h-12 px-4 border-2 border-border font-bold uppercase tracking-[0.2em] text-xs transition-colors duration-200 ${
          open ? 'bg-accent text-white' : 'bg-fg text-bg hover:bg-accent hover:text-white'
        }`}
      >
        {open ? <X className="w-4 h-4" strokeWidth={2.5} /> : <MessageSquare className="w-4 h-4" strokeWidth={2.5} />}
        <span className="hidden sm:inline">{open ? 'Close' : 'Chat'}</span>
      </button>

      <div
        role="dialog"
        aria-label="Chat assistant"
        aria-hidden={!open}
        data-lenis-prevent
        className={`fixed z-[110] bottom-20 right-4 sm:bottom-24 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[420px] h-[70vh] sm:h-[520px] max-h-[calc(100vh-7rem)] bg-bg border-2 border-border flex flex-col origin-bottom-right transition-all duration-200 ease-out ${
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-4 h-12 border-b-2 border-border shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative inline-flex h-2 w-2 bg-accent shrink-0" style={{ animation: 'blink 1.4s infinite' }} />
            <span className="font-heavy text-sm uppercase tracking-tighter truncate">SHUA</span>
            <span className="hidden sm:inline text-[9px] uppercase tracking-[0.25em] font-bold text-fg-subtle truncate">
              / Online
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle shrink-0">
            01 / Chat
          </span>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 no-scrollbar">
          {messages.map((m, i) => (
            <Bubble key={m.id} message={m} index={i} onNavigate={goTo} />
          ))}

          {messages.length === 1 && !pending && (
            <div className="pt-2 space-y-2">
              <span className="block text-[9px] uppercase tracking-[0.25em] font-bold text-fg-subtle">
                Suggested
              </span>
              <div className="flex flex-col gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="hover-trigger group flex items-center justify-between gap-3 w-full text-left border-2 border-fg bg-fg text-bg px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] hover:bg-accent hover:border-accent hover:text-white transition-colors duration-200"
                  >
                    <span className="truncate normal-case tracking-normal font-medium text-[13px]">
                      {s}
                    </span>
                    <span className="shrink-0">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {pending && (
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle">
              <span className="inline-flex h-1.5 w-1.5 bg-fg-subtle" style={{ animation: 'blink 1.2s infinite' }} />
              Thinking
            </div>
          )}
          {error && (
            <div className="border-2 border-accent bg-accent-soft px-3 py-2 text-[11px] font-bold text-fg">
              {error}
            </div>
          )}
        </div>

        <div className="border-t-2 border-border shrink-0">
          <div className="flex items-stretch gap-0">
            {canRecord && (
              <button
                type="button"
                onClick={recording ? stopRecording : startRecording}
                disabled={pending || transcribing}
                aria-label={recording ? 'Stop recording' : 'Record voice message'}
                aria-pressed={recording}
                className={`hover-trigger flex items-center justify-center w-12 border-r-2 border-border transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 ${
                  recording
                    ? 'bg-accent text-white'
                    : transcribing
                      ? 'bg-bg text-fg-subtle'
                      : 'bg-bg text-fg hover:bg-fg hover:text-bg'
                }`}
              >
                {transcribing ? (
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                ) : recording ? (
                  <Square className="w-4 h-4" strokeWidth={2.5} fill="currentColor" />
                ) : (
                  <Mic className="w-4 h-4" strokeWidth={2.5} />
                )}
              </button>
            )}

            {recording ? (
              <div className="flex-1 flex items-center gap-3 px-4 py-3 text-sm">
                <span className="relative inline-flex h-2 w-2 bg-accent shrink-0" style={{ animation: 'blink 1s infinite' }} />
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-fg-subtle">
                  Recording
                </span>
                <span className="font-mono-tight text-xs font-bold text-fg tabular-nums">
                  {formatTime(recordSeconds)}
                </span>
              </div>
            ) : (
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={transcribing ? 'Transcribing…' : 'Type a message…'}
                rows={1}
                disabled={pending || transcribing}
                className="flex-1 resize-none bg-bg text-fg placeholder:text-fg-subtle px-4 py-3 text-sm leading-snug outline-none disabled:opacity-50"
                style={{ maxHeight: 120 }}
              />
            )}

            <button
              type="button"
              onClick={() => void send()}
              disabled={!input.trim() || pending || recording || transcribing}
              aria-label="Send message"
              className="hover-trigger flex items-center justify-center w-12 h-12 border-l-2 border-border bg-fg text-bg hover:bg-accent hover:text-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-fg disabled:hover:text-bg shrink-0"
            >
              <Send className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Bubble: React.FC<{
  message: ChatMessage;
  index: number;
  onNavigate: (t: NavTarget) => void;
}> = ({ message, index, onNavigate }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
      <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-fg-subtle">
        {String(index + 1).padStart(2, '0')} / {isUser ? 'You' : 'SHUA'}
      </span>
      <div
        className={`max-w-[85%] px-3 py-2 text-sm leading-snug whitespace-pre-wrap break-words border-2 ${
          isUser
            ? 'bg-fg text-bg border-fg'
            : 'bg-bg text-fg border-border'
        }`}
      >
        {message.content}
      </div>
      {!isUser && message.nav && (
        <button
          type="button"
          onClick={() => onNavigate(message.nav!)}
          className="hover-trigger group inline-flex items-center gap-2 mt-1 px-3 py-1.5 border-2 border-fg bg-fg text-bg text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent hover:border-accent hover:text-white transition-colors duration-200"
        >
          <span>Take me to {NAV_LABELS[message.nav]}</span>
          <span>→</span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
