# Contributing to KidsProtect

Thanks for helping! This project is a Bun + Express backend, React + Vite frontend, and Electron wrapper that controls system firewall/hosts rules on macOS and Windows.

## Ways to contribute
- Report bugs and platform quirks (PF/netsh/hosts behavior, privilege prompts).
- Improve UI/UX and accessibility.
- Add tests, diagnostics, and hardening around network rule application.
- Write docs (setup, troubleshooting, packaging).

## Prerequisites
- Bun ≥ 1.3 installed.
- Node.js ≥ 18 (required by Electron and packaging).
- macOS 12+ or Windows 10/11 if you’re working on platform-specific pieces.

## Setup

```bash
bun install
```

### Dev loops
- Everything: `bun dev` (runs backend, frontend, and desktop together).
- Backend only: `cd backend && bun run dev`
- Frontend only: `cd frontend && bun dev`
- Desktop shell: `cd desktop && bun run electron-dev`

### Lint/build
- Backend: `cd backend && bun run lint` | `bun run build`
- Frontend: `cd frontend && bun run lint` | `bun run build`
- Desktop: `cd desktop && bun run build`

## Pull requests
- Keep PRs focused and small; include screenshots/gifs for UI changes.
- Update docs when behavior or commands change.
- Prefer TypeScript, and keep APIs typed at the edges (controllers/services).
- Add tests or manual verification notes for firewall/hosts changes.

## Security
If you find a security issue (e.g., privilege escalation, remote control of the backend), please report it privately first. Avoid filing public issues with exploit details.

## Releases and installers
- CI should publish installers to GitHub Releases. For local packaging: `cd desktop && bun run dist` (builds frontend/backend first if needed via `bun run build-all`).
- Test macOS DMG and Windows NSIS artifacts on their respective platforms to confirm elevation prompts and rule application work as expected.

## License
By contributing, you agree that your contributions are licensed under the repository’s GPL-3.0 license (see `LICENSE`).
