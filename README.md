# AuthToolkit Identity Starter

A small Next.js App Router starter for adding AuthToolkit Identity to your app.

It gives you the basic product flow most apps need:

```text
Landing page -> login -> AuthToolkit Identity -> callback -> protected app shell -> logout
```

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
3. Set a long random `AUTHTOOLKIT_IDENTITY_SESSION_SECRET`.
4. Add this local origin to your Identity allowed return origins:

```text
http://localhost:3000
```

Your local callback route is:

```text
http://localhost:3000/auth/identity/callback
```

For the full beginner walkthrough, use [docs/setup-guide.md](docs/setup-guide.md).

## Environment variables

Server-only values stay on the server and must never go in `NEXT_PUBLIC_*`:

- `AUTHTOOLKIT_IDENTITY_BASE_URL`
- `AUTHTOOLKIT_IDENTITY_PROJECT_ID`
- `AUTHTOOLKIT_IDENTITY_CLIENT_ID`
- `AUTHTOOLKIT_IDENTITY_API_KEY`
- `AUTHTOOLKIT_IDENTITY_ACCESS_EVALUATION_SECRET`
- `AUTHTOOLKIT_IDENTITY_SESSION_SECRET`

Browser-safe values may use `NEXT_PUBLIC_*`:

- `NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_BASE_URL`
- `NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_PROJECT_ID`
- `NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_CLIENT_ID`
- `NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_PUBLISHABLE_KEY`

Use `.env.example` as the template. Do not commit `.env.local`.

## Test the protected shell

Before signing in, opening `/app` should send you to `/login`.

After a verified Identity callback, the starter creates a minimal signed HTTP-only demo session and `/app` opens.

That session is intentionally small. Replace it with your app account model when you build a real product.

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
