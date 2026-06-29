# Agent guidance for AuthToolkit Identity Starter

This repo is a beginner-friendly starter for adding AuthToolkit Identity to an app.

## Preserve the Identity flow

Keep the core flow intact:

```text
/ -> /login -> /auth/identity/start -> hosted AuthToolkit Identity -> /auth/identity/callback -> /app -> /logout
```

Do not remove or bypass the AuthToolkit Identity start/callback routes unless the user explicitly asks for a different auth architecture.

## Security rules

- Do not expose server env values in browser code, logs, docs, screenshots, or generated examples.
- Do not move server secrets into `NEXT_PUBLIC_*` variables.
- Do not print `AUTHTOOLKIT_IDENTITY_API_KEY`.
- Do not create a session just because the callback URL was reached.
- Exchange the callback code with AuthToolkit Identity before creating a starter session.
- Keep callback errors generic and safe.
- Protect new app pages by checking the starter session with `getStarterSession()`.

## Customization rules

- Keep beginner-friendly comments when changing auth/session files.
- Update `README.md` and `docs/integration-checklist.md` when changing setup steps.
- Prefer small, clear files over clever abstractions.
- Keep the starter session clearly labeled as a demo/starter session until the user replaces it with a real account model.

## Safe areas to customize

- Landing page copy and layout in `app/page.tsx`.
- Login page copy in `app/login/page.tsx`.
- Protected shell UI in `app/app/page.tsx`.
- Styling in `app/globals.css`.
- Documentation in `README.md` and `docs/`.

## Be careful with

- `app/auth/identity/start/route.ts`
- `app/auth/identity/callback/route.ts`
- `src/lib/session.ts`
- `.env.example`

Changes here can break login or leak secrets if handled carelessly.
