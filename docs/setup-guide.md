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

Use the same four values shown in Identity Setup Code.

## 5. Create `.env.local`

```bash
cp .env.example .env.local
```

Fill in the values in `.env.local`.

```text
AUTHTOOLKIT_IDENTITY_BASE_URL=https://identity.authtoolkit.com
AUTHTOOLKIT_IDENTITY_PROJECT_ID=<selected-real-project-id>
AUTHTOOLKIT_IDENTITY_API_KEY=<paste-api-key-here>
NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_BASE_URL=https://identity.authtoolkit.com
```

Server secrets stay in `.env.local`. Do not commit `.env.local`, and do not put the API key in browser code.

The app session cookie belongs to your app. AuthToolkit Identity verifies the person; your app creates the session after callback exchange.

If your API key was created before callback exchange support, rotate it in Identity before using real login.

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

The starter redirects through `/auth/identity/start` to hosted AuthToolkit Identity with `project_id`, `return_to`, and a random `state` stored in an HTTP-only cookie.

If your Identity env values or allowed callback origin are not set yet, the hosted flow may not complete. Fix the setup and try again.

## 10. Confirm callback behavior

The callback route is:

```text
/auth/identity/callback
```

Identity returns to the callback with:

```text
code=<generated-callback-code>
state=<original-customer-state>
```

The starter verifies the state cookie, then posts the code to:

```text
https://identity.authtoolkit.com/api/identity/callback/exchange
```

The request uses:

```text
Authorization: Bearer <api-key>
```

If exchange succeeds, the starter creates a minimal signed HTTP-only session. If exchange fails, it redirects safely to `/login`.

Do not mark a user logged in just because the callback URL was reached. Exchange the code first.

For your production app, replace that starter session with your own account, cart, orders, dashboard, permissions, and session-cookie model.

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

- Add the API key to your host secret settings.
- Add the other Setup Code values to your host environment settings.
- Add your production origin to AuthToolkit Identity allowed return origins.
- Test `/`, `/login`, `/auth/identity/start`, `/auth/identity/callback`, `/app`, and `/logout`.
