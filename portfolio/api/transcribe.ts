// Server-side proxy to Groq Whisper. Frontend POSTs raw audio bytes (e.g. audio/webm),
// we wrap it in multipart and forward to /openai/v1/audio/transcriptions.

const MODEL = 'whisper-large-v3-turbo';

export async function handleTranscribe(
  body: Buffer,
  contentType: string,
): Promise<{ ok: true; text: string } | { ok: false; status: number; error: string }> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 500, error: 'GROQ_API_KEY is not configured on the server.' };
  }
  if (!body || body.length === 0) {
    return { ok: false, status: 400, error: 'Empty audio body.' };
  }

  const ext = contentType.includes('webm')
    ? 'webm'
    : contentType.includes('mp4')
      ? 'mp4'
      : contentType.includes('mpeg') || contentType.includes('mp3')
        ? 'mp3'
        : contentType.includes('wav')
          ? 'wav'
          : contentType.includes('ogg')
            ? 'ogg'
            : 'webm';

  const audioBlob = new Blob([body], { type: contentType || 'audio/webm' });
  const form = new FormData();
  form.append('file', audioBlob, `audio.${ext}`);
  form.append('model', MODEL);
  form.append('response_format', 'json');

  const upstream = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });

  if (!upstream.ok) {
    const text = await upstream.text();
    return { ok: false, status: upstream.status, error: `Groq Whisper ${upstream.status}: ${text}` };
  }

  const data = (await upstream.json()) as { text?: string };
  return { ok: true, text: data.text ?? '' };
}

// Vercel: tell the runtime not to parse the body — we need raw bytes.
export const config = { api: { bodyParser: false } };

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  const body = Buffer.concat(chunks);
  const contentType = (req.headers['content-type'] as string) || 'application/octet-stream';

  const result = await handleTranscribe(body, contentType);
  if (result.ok) {
    res.status(200).json({ text: result.text });
  } else {
    res.status(result.status).json({ error: result.error });
  }
}
