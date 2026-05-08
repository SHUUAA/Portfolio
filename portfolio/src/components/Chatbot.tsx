import { useEffect, useRef, useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { sendChatMessage, type ChatMessage } from '../lib/chat';

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

export const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

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

  useEffect(() => () => abortRef.current?.abort(), []);

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
      setMessages((m) => [
        ...m,
        { id: `${Date.now()}-a`, role: 'assistant', content: reply || '...' },
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
            <Bubble key={m.id} message={m} index={i} />
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
          <div className="flex items-end gap-0">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type a message…"
              rows={1}
              disabled={pending}
              className="flex-1 resize-none bg-bg text-fg placeholder:text-fg-subtle px-4 py-3 text-sm leading-snug outline-none disabled:opacity-50"
              style={{ maxHeight: 120 }}
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={!input.trim() || pending}
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

const Bubble: React.FC<{ message: ChatMessage; index: number }> = ({ message, index }) => {
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
    </div>
  );
};

export default Chatbot;
