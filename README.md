# NADYA AI COMPANION

NADYA is a personal AI companion designed around Indonesian-first conversation, user-controlled memory, modular agent orchestration, and a transparent control center.

> This repository is the primary home of NADYA. AURA is a reference for reusable ideas, not a separate product identity.

## Principles

- **NADYA first:** preserve a distinct product identity and architecture.
- **Indonesian-first:** conversation and user-facing documentation should work naturally in Bahasa Indonesia.
- **Privacy and consent:** memory, sensors, tools, and external services must be permissioned and visible.
- **Secure by default:** tools remain disabled until configured and authorized.
- **Modular intelligence:** a central orchestrator delegates to bounded specialist agents.
- **Evidence-based progress:** no capability is marked complete without implementation and verification.

## Infrastructure policy

Use **GitHub/GitHub Pages** for source control, CI, and the static web frontend, and **Supabase only** for database services and Edge Functions. Do not add Vercel, Cloudflare, or other hosting/backend platforms.

## Backend AI

The Supabase Edge Function source is `supabase/functions/nadya-chat/index.ts`. GitHub Pages cannot execute backend functions. Configure the dedicated Supabase project URL and publishable key in `src/config.js`, deploy the function, and set `NADYA_PUBLISHABLE_KEY` and `OPENAI_API_KEY` as Supabase Edge Function secrets. Optional secrets: `OPENAI_MODEL`, `OPENAI_BASE_URL`, and `NADYA_ALLOWED_ORIGINS`. Follow [the provider setup guide](docs/PROVIDER_SETUP.md). Do not commit provider keys.

## Status

**Foundation stage — not production-ready.** The generative AI backend is not considered live until the Edge Function and secrets are deployed and tested in the selected NADYA Supabase project.

## Development

Run `npm test`, `npm run check`, and `npm run build`. See [Architecture](docs/ARCHITECTURE.md), [Roadmap](docs/ROADMAP.md), and [Security model](docs/SECURITY.md).
