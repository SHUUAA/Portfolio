export type ChatRole = 'user' | 'assistant';

export type NavTarget =
  | 'about'
  | 'capabilities'
  | 'projects'
  | 'works'
  | 'contact'
  | 'resume';

export const NAV_TARGETS: NavTarget[] = [
  'about',
  'capabilities',
  'projects',
  'works',
  'contact',
  'resume',
];

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  // UI-only — derived from the bot's [GO:section] directive. Not sent back to the API.
  nav?: NavTarget;
}

export async function sendChatMessage(
  history: ChatMessage[],
  signal?: AbortSignal,
): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: history.map(({ role, content }) => ({ role, content })),
    }),
    signal,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Chat request failed (${res.status})`);
  }

  return data.reply ?? '';
}
