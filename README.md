# AuthToolkit Identity Starter

A small Next.js App Router starter for adding AuthToolkit Identity to your app.

It gives you the basic product flow most apps need:

```text
Landing page → Login → AuthToolkit Identity → Email/OTP verification → Back to your callback → Your app creates session → Customer lands in /account
```

AuthToolkit Identity verifies the person. Your app creates the session.

This starter is for developers and vibe coders who want a clear, cloneable example without a custom auth system, database, or enterprise dashboard.

## What you get

- A landing page at `/`
- A simple login page at `/login`
- A hosted Identity start route at `/auth/identity/start`
- A safe callback route at `/auth/identity/callback`
- A protected app shell at `/app`
- Logout at `/logout`
- Beginner-friendly docs and AI-agent guidance

## Quick start

```bash
git clone https://github.com/alihaideralihaider/authtoolkit-identity-starter.git
cd authtoolkit-identity-starter
npm install
cp .env.example .env.local
npm run dev
```

Open:

```text
http://localhost:3000
```

## Set up AuthToolkit Identity

You need an AuthToolkit Identity project before the hosted sign-in flow can complete.

At a high level:

1. Create an Identity project.
2. Copy the starter credentials into `.env.local`.
3. Add this local origin to your Identity allowed return origins:

```text
http://localhost:3000
```

Your local callback route is:

```text
http://localhost:3000/auth/identity/callback
```

For the full beginner walkthrough, use [docs/setup-guide.md](docs/setup-guide.md).

## Starter repo or SDK?

Use the starter repo for a new app you want to clone, run, and customize:

```bash
git clone https://github.com/alihaideralihaider/authtoolkit-identity-starter.git
```

Clone the starter repo to see the full working login and session pattern.

Use the SDK for an existing app:

```bash
npm install @authtoolkit/identity
```

Install `@authtoolkit/identity` for helpers, then create your own app session in your callback route after the callback exchange succeeds. The SDK gives existing apps AuthToolkit Identity helpers; it does not replace your whole app or create your app session for you.

### Does the SDK create my app session?

No. The SDK gives you helpers for the Identity flow, but your app still creates its own session cookie after Identity verifies the user and your backend exchanges the callback code. The starter repo shows one simple session pattern you can copy or customize.

## Environment variables

Use the same four values shown in Identity Setup Code:

```text
AUTHTOOLKIT_IDENTITY_BASE_URL=https://identity.authtoolkit.com
AUTHTOOLKIT_IDENTITY_PROJECT_ID=<selected-real-project-id>
AUTHTOOLKIT_IDENTITY_API_KEY=<paste-api-key-here>
NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_BASE_URL=https://identity.authtoolkit.com
```

`AUTHTOOLKIT_IDENTITY_API_KEY` stays server-only. Do not put it in browser code, logs, or `NEXT_PUBLIC_*`.

Use `.env.example` as the template. Do not commit `.env.local`.

Older API keys may need rotation if they were created before callback exchange support.

## Test the protected shell

Before signing in, opening `/app` should send you to `/login`.

After Identity redirects back with `code` and `state`, the starter verifies state, exchanges the code at `/api/identity/callback/exchange`, creates a signed HTTP-only starter session, and `/app` opens.

That session is intentionally small. Replace it with your app account model when you build a real product.

Do not mark a user logged in just because the callback URL was reached. Exchange the code first.

Your app owns account pages, cart, orders, dashboard, permissions, app data, and the session cookie.

SDK v0.1 does not replace full auth/session management.

## Customize the starter

Good first files to edit:

- `app/page.tsx` for the landing page
- `app/login/page.tsx` for sign-in copy
- `app/app/page.tsx` for the protected shell
- `app/globals.css` for styling

Keep `/auth/identity/start`, `/auth/identity/callback`, and `src/lib/session.ts` safe unless you know exactly what you are changing.

## Deeper docs

- [Beginner setup guide](docs/setup-guide.md)
- [Integration checklist](docs/integration-checklist.md)
- [AI customization prompt](docs/ai-customization-prompt.md)
- [How the auth flow works](docs/how-auth-flow-works.md)
- [Security notes](docs/security-notes.md)
- [Customization recipes](docs/customization-recipes.md)
- [Agent guidance](AGENTS.md)
- [Claude Code guidance](CLAUDE.md)
- [LLM project map](llms.txt)

## Deploy

Deploy to a server-capable host that supports Next.js server routes and HTTP-only cookies.

Good options include Vercel, Netlify with Next support, Cloudflare Workers/OpenNext, or a Node server host.

Do not use static export for this starter. The callback and session cookie need server behavior.
