# AGENTS.md

## Stack

React 19 + TypeScript + Vite + TailwindCSS v4 + GSAP + Lenis (smooth scroll) + Three.js/R3F + React Router v7.

## Commands

```bash
npm install
npm run dev        # Vite dev server (includes API middleware)
npm run build      # tsc -b && vite build
npm run lint       # eslint . (flat config, ignores dist/)
```

No test framework is configured. No formatter is configured.

## Build quirk

`npm run build` runs `tsc -b` first, which uses TypeScript project references (`tsconfig.app.json` + `tsconfig.node.json`). If type-checking fails, the Vite build never runs. Always verify with `npx tsc -b` before assuming a Vite issue.

## API routes

`api/chat.ts` and `api/transcribe.ts` are Vercel serverless functions (CommonJS `handler(req, res)` export). They also run locally via dev middleware in `vite.config.ts` — no `vercel dev` needed. Both require `GROQ_API_KEY` env var (server-side only, not exposed to browser).

## TailwindCSS v4

This project uses TailwindCSS v4 with the Vite plugin (`@tailwindcss/vite`). There is no `tailwind.config.*` file. Theme tokens are defined in `src/index.css` using `@theme inline` with CSS custom properties. The `.dark` class on `<html>` toggles dark mode.

## Theme system

Light/dark mode uses CSS custom properties in `src/index.css` (not Tailwind dark: variants). The `.dark` class is toggled on `document.documentElement` by `src/hooks/useTheme.ts`. Preference is persisted in `localStorage` under `portfolio-theme`. Default is light.

## Routing

Two routes via React Router v7 in `src/App.tsx`:
- `/` — Hero + Sections (home)
- `/projects` — full project index

Hash scrolling is handled by `ScrollToHash` component using Lenis.

## 3D assets

`.glb` files are imported as Vite assets (`assetsInclude: ['**/*.glb']`). `meshline` types are declared in `src/global.d.ts` — if adding new meshline features, extend those declarations.

## Lint

ESLint flat config with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`. No type-aware lint rules are enabled. The README shows how to upgrade to `recommendedTypeChecked` if desired.
