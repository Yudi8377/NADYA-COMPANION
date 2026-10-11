# NADYA AI COMPANION

NADYA is a personal AI companion designed around Indonesian-first conversation, persistent user-controlled memory, a modular multi-agent runtime, and a transparent control center.

> This repository is the primary home of NADYA. AURA is treated as a reference for reusable ideas and capabilities, not as the product identity or a separate project to continue.

## Principles

- **NADYA first:** preserve a distinct product identity and architecture.
- **Indonesian-first:** conversation, voice, and user-facing documentation should work naturally in Bahasa Indonesia.
- **Privacy and consent:** memory, sensors, tools, and external services must be permissioned and visible.
- **Secure by default:** tools are disabled until explicitly configured and authorized.
- **Modular intelligence:** a central orchestrator delegates to bounded specialist agents.
- **Evidence-based progress:** no capability is marked complete without implementation and verification.

## Initial foundation

The first implementation milestone establishes architecture, a runnable client shell, a deterministic local conversation/runtime contract, permission boundaries, tests, and CI. Cloud models, camera, speech, desktop/mobile packaging, and external actions will be integrated behind explicit capability interfaces rather than hard-coded into the core.

## Status

**Foundation stage — not production-ready.** No cloud credentials are required for the initial local shell. AI-provider integrations and sensor/tool access must remain opt-in.

## Development

See [Architecture](docs/ARCHITECTURE.md), [Roadmap](docs/ROADMAP.md), and [Security model](docs/SECURITY.md).
