import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Dev-only middleware that mirrors the Vercel `api/chat.ts` serverless handler,
// so `npm run dev` can talk to /api/chat without needing `vercel dev`.
function chatDevApi(env: Record<string, string>): Plugin {
  return {
    name: 'chat-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }
        try {
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}

          // Inject server-only env (Vite doesn't expose non-VITE_ vars to import.meta.env)
          process.env.GROQ_API_KEY ||= env.GROQ_API_KEY

          const { handleChat } = await server.ssrLoadModule('/api/chat.ts')
          const result = await handleChat(body)
          res.setHeader('Content-Type', 'application/json')
          if (result.ok) {
            res.statusCode = 200
            res.end(JSON.stringify({ reply: result.reply }))
          } else {
            res.statusCode = result.status
            res.end(JSON.stringify({ error: result.error }))
          }
        } catch (err) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: (err as Error).message }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), chatDevApi(env)],
  }
})
