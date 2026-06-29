# AuthToolkit Identity Starter QA Report

Date: 2026-06-27

## Result

Starter QA passed for the local starter shell. The app runs locally, core routes load safely, docs are beginner-friendly, and no raw Identity server secrets were exposed during QA.

## Local target

- Local app: `http://localhost:3072`
- Command used: `PORT=3072 npm run dev`
- Deployment: not run

## Routes checked

| Route | Result | Evidence |
| --- | --- | --- |
| `/` | Passed | HTTP 200. Landing page shows "Add AuthToolkit Identity to your app" and links to login. |
| `/login` | Passed | HTTP 200. Page shows "Continue with AuthToolkit Identity". |
| `/auth/identity/start` | Passed | HTTP 307 to AuthToolkit Identity hosted flow with local callback URL. No raw secrets exposed. |
| `/auth/identity/callback` | Passed | Redirects safely to `/login?identity_error=invalid_state` when state/code are missing. |
| `/app` | Passed | Without a starter session, redirects to `/login`. |
| `/logout` | Passed | Redirects home safely. |

## Docs checked

- `README.md`
- `.env.example`
- `docs/setup-guide.md`
- `docs/integration-checklist.md`
- `docs/ai-customization-prompt.md`
- `AGENTS.md`
- `CLAUDE.md`
- `llms.txt`
- `docs/how-auth-flow-works.md`
- `docs/security-notes.md`
- `docs/customization-recipes.md`

The docs explain how to create an Identity project, copy environment values, add callback URLs to allowed origins, run locally, protect a new page, customize the landing page, and avoid putting server secrets into `NEXT_PUBLIC_*` variables.

## Security checks

- Server-only env names are not exposed through browser pages.
- `.env.local` is ignored.
- Session cookie is HTTP-only.
- Starter session is signed server-side after callback exchange succeeds.
- Callback route does not dump raw upstream Identity responses.
- Protected `/app` checks the starter session before rendering.
- No raw secrets were printed in QA output or committed.

## Issues found

- A beginner needed a more detailed setup guide than the original README provided.
- README had too much detail for a quick-start front door.
- Old proof-only callback states were replaced with the callback exchange contract.

## Fixes made

- Reworked `README.md` into a concise quick-start front door.
- Added `docs/setup-guide.md` with a beginner walkthrough from clone to deployment.
- Refreshed this QA report.

## Remaining pending items

- Real hosted Identity sign-in requires real Identity project credentials in `.env.local`.
- Callback URL must be added to the Identity allowed origins before a real local handoff.
- Production deployment was not tested in this QA pass.

## Readiness decision

The starter is ready for beginner local setup and real Identity credential testing. It is not production-validated until a developer configures real env values, runs the hosted handoff, and deploys to a server-capable host.
