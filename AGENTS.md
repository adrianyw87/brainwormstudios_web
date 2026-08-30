# AGENTS.md

## Project Context

BrainWorm Studios marketing site. Static React (Vite) frontend on Cloudflare Pages, with Pages Functions + KV for contact messages.

Start with `README.md` for local setup, environment variables, and publish workflow.

## Key Files

- `src/`: frontend application source.
- `functions/`: Cloudflare Pages Functions (`/api/messages`).
- `vite.config.js`: Vite + React.
- `wrangler.toml`: Pages / KV binding.
- `.dev.vars`: local admin credentials (gitignored).

## Working Notes

- Frontend only: `npm run dev`
- Frontend + API locally: `npm run pages:dev`
- Prefer Wrangler / Cloudflare Pages over adding custom hosting scripts.
- Do not reintroduce Base44 SDK or hosted backend dependencies.
- Run the relevant checks from `package.json` before finishing code changes.
