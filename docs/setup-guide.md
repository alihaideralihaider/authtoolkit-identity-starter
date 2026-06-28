# AuthToolkit Identity Starter setup guide

This guide walks you from a fresh clone to a local protected app shell.

The starter keeps the flow simple:

```text
Landing page → Login → AuthToolkit Identity → Email/OTP verification → Back to your callback → Your app creates session → Customer lands in /account
```

AuthToolkit Identity verifies the person. Your app creates the session.

## 1. Clone the repo

```bash
git clone https://github.com/alihaideralihaider/authtoolkit-identity-starter.git
cd authtoolkit-identity-starter
```

## 2. Install dependencies

```bash
npm install
```

This creates `node_modules` locally. Do not commit `node_modules`.

## 3. Create an AuthToolkit Identity project

Open AuthToolkit Identity and create a project for your app.

You need the project credentials from that Identity project before the hosted sign-in flow can complete.

## 4. Copy credentials

Copy the Identity values into your local environment file.

You will need server-only values for the starter backend and public values for browser-safe project display.

Never paste server secrets into browser code or `NEXT_PUBLIC_*` variables.

## 5. Create `.env.local`

```bash
cp .env.example .env.local
```

Fill in the values in `.env.local`.

Server-only values:

```text
AUTHTOOLKIT_IDENTITY_BASE_URL=https://identity.authtoolkit.com
AUTHTOOLKIT_IDENTITY_PROJECT_ID=...
AUTHTOOLKIT_IDENTITY_CLIENT_ID=...
AUTHTOOLKIT_IDENTITY_API_KEY=...
AUTHTOOLKIT_IDENTITY_ACCESS_EVALUATION_SECRET=...
AUTHTOOLKIT_IDENTITY_SESSION_SECRET=...
```

Public browser-safe values:

```text
NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_BASE_URL=https://identity.authtoolkit.com
NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_PROJECT_ID=...
NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_CLIENT_ID=...
NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_PUBLISHABLE_KEY=...
```

Use a long random value for `AUTHTOOLKIT_IDENTITY_SESSION_SECRET`. It signs the starter demo session cookie.

Server secrets stay in `.env.local`. Do not commit `.env.local`, and do not put the API key or access evaluation secret in browser code.

## 6. Add the callback URL to Identity allowed origins

For local development, add this allowed return origin in your AuthToolkit Identity project:

```text
http://localhost:3000
```

The starter callback route is:

```text
http://localhost:3000/auth/identity/callback
```

For production, add your deployed app origin too, for example:

```text
https://your-app.example
```

Allowed return origins protect users from unsafe redirects. If the return URL is not allowed, Identity blocks it and shows a safe error.

## 7. Run the app locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 8. Test the landing page

The landing page should show:

```text
Add AuthToolkit Identity to your app
```

Click the sign-in CTA or open `/login`.

## 9. Start Identity sign-in

On `/login`, click:

```text
Continue with AuthToolkit Identity
```

The starter redirects through `/auth/identity/start` to hosted AuthToolkit Identity.

If your Identity env values or allowed callback origin are not set yet, the hosted flow may not complete. Fix the setup and try again.

## 10. Confirm callback behavior

The callback route is:

```text
/auth/identity/callback
```

Safe callback states include:

- verified
- pending
- missing
- failed

If the callback is opened directly without an Identity result, it should show a safe missing state.

If Identity verifies the user, the starter creates a minimal signed HTTP-only demo session.

For your production app, replace that demo session with your own account, cart, orders, dashboard, permissions, and session-cookie model.

## 11. Open protected `/app`

Open:

```text
http://localhost:3000/app
```

Without a valid starter session, `/app` sends you back to `/login`.

With a valid starter session, it shows:

```text
Welcome to your protected app shell
```

## 12. Customize the landing page and app shell

Common first edits:

- `app/page.tsx` changes the landing page.
- `app/login/page.tsx` changes the login page copy.
- `app/app/page.tsx` changes the protected app shell.
- `app/globals.css` changes styling.

Keep the Identity start and callback flow intact unless you are intentionally changing auth architecture.

## 13. Deploy to a server-capable host

Use a host that supports Next.js server routes and HTTP-only cookies.

Good options:

- Vercel
- Netlify with Next support
- Cloudflare Workers/OpenNext
- Node server hosting

Do not use static export. This starter needs server behavior for callback and session cookies.

Before deploying:

- Add all server-only env values to your host secret settings.
- Add all public env values to your host environment settings.
- Add your production origin to AuthToolkit Identity allowed return origins.
- Test `/`, `/login`, `/auth/identity/start`, `/auth/identity/callback`, `/app`, and `/logout`.
