# Claude Code guidance

Core task:

Customize this starter into the user's app without breaking Identity login.

This project is a simple AuthToolkit Identity starter. It should stay easy for beginners to understand.

## Keep the auth flow working

Preserve this flow:

```text
Landing page -> Login page -> AuthToolkit Identity start -> hosted Identity -> callback -> starter session -> protected app shell -> logout
```

Important files:

- `app/auth/identity/start/route.ts`
- `app/auth/identity/callback/route.ts`
- `src/lib/session.ts`
- `app/app/page.tsx`

## Do not leak secrets

Never move these into browser code or `NEXT_PUBLIC_*`:

- `AUTHTOOLKIT_IDENTITY_API_KEY`
- `AUTHTOOLKIT_IDENTITY_ACCESS_EVALUATION_SECRET`
- `AUTHTOOLKIT_IDENTITY_SESSION_SECRET`

Do not print raw secrets in terminal output, logs, docs, or comments.

## Callback safety

Do not remove the callback safety states:

- verified
- pending
- missing
- failed

Keep user-facing callback errors simple and safe.

## Protect new pages

When adding a new protected page, check the starter session first:

```ts
const session = await getStarterSession();
if (!session) redirect("/login");
```

## Keep docs current

If you change setup steps, env variables, or the auth flow, update:

- `README.md`
- `docs/integration-checklist.md`
- relevant docs in `docs/`
