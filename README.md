# AuthToolkit Identity Starter

A small public starter app for adding AuthToolkit Identity to a Next.js app.

Flow:

```text
Landing page -> Sign in with AuthToolkit Identity -> callback -> protected app shell -> logout
```

This project is intentionally simple for developers and vibe coders. It uses Next.js App Router and a server-capable runtime so the callback can create a minimal HTTP-only starter session.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```text
http://localhost:3000
```

## Required env variables

Server-only:

- `AUTHTOOLKIT_IDENTITY_BASE_URL`
- `AUTHTOOLKIT_IDENTITY_PROJECT_ID`
- `AUTHTOOLKIT_IDENTITY_CLIENT_ID`
- `AUTHTOOLKIT_IDENTITY_API_KEY`
- `AUTHTOOLKIT_IDENTITY_ACCESS_EVALUATION_SECRET`
- `AUTHTOOLKIT_IDENTITY_SESSION_SECRET`

Public/browser-safe:

- `NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_BASE_URL`
- `NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_PROJECT_ID`
- `NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_CLIENT_ID`
- `NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_PUBLISHABLE_KEY`

Never put server-only values in `NEXT_PUBLIC_*`.

## Add callback URL to Identity allowed origins

For local development, add this origin to your AuthToolkit Identity project's allowed return origins:

```text
http://localhost:3000
```

Your callback route is:

```text
http://localhost:3000/auth/identity/callback
```

For production, add your deployed app origin, for example:

```text
https://your-app.example
```

## Customize the landing page

Edit:

- `app/page.tsx`
- `app/login/page.tsx`
- `app/globals.css`

Keep the CTA pointing to `/auth/identity/start` unless you intentionally change the auth flow.

## Protect a page

Use the pattern in:

```text
app/app/page.tsx
```

It calls `getStarterSession()` and redirects to `/login` if there is no valid starter session.

## Deploy

Deploy to any host that supports Next.js server routes. Do not use static export for this starter.

Good options:

- Vercel
- Netlify with Next support
- Cloudflare Workers/OpenNext
- Node server hosting

Set all server-only env variables in your host's secret/env settings.

## Security reminders

- This starter session is a demo session. Replace it with your own account lookup.
- Keep `AUTHTOOLKIT_IDENTITY_SESSION_SECRET` long and random.
- Do not log raw Identity responses if they may contain sensitive data.
- Do not expose API keys, access evaluation secrets, or session secrets to the browser.
- Keep callback errors generic and customer-safe.
