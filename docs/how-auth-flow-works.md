# How the AuthToolkit Identity flow works

This starter keeps the login flow intentionally small.

Plain-English version:

```text
Landing page → Login → AuthToolkit Identity → Email/OTP verification → Back to your callback → Your app creates session → Customer lands in /account
```

AuthToolkit Identity verifies the person. Your app creates the session.

## 1. Landing page

Route:

```text
/
```

The landing page explains the starter and links to `/login`.

## 2. Login page

Route:

```text
/login
```

The login page shows one action:

```text
Continue with AuthToolkit Identity
```

That button links to `/auth/identity/start`.

## 3. Identity start route

Route:

```text
/auth/identity/start
```

This server route builds a safe callback URL:

```text
/auth/identity/callback
```

Then it redirects the user to hosted AuthToolkit Identity.

## 4. Hosted Identity flow

AuthToolkit Identity handles the hosted identity experience.

Your app should not handle passwords, OTPs, magic links, or provider secrets in this starter.

## 5. Callback route

Route:

```text
/auth/identity/callback
```

The callback route shows safe states:

- verified
- pending
- missing
- failed

If the result is verified, the starter creates a minimal HTTP-only starter session cookie.

## 6. Protected app shell

Route:

```text
/app
```

The protected shell checks the starter session with `getStarterSession()`.

If the session is missing or invalid, the user is redirected to `/login`.

## 7. Logout

Route:

```text
/logout
```

Logout clears the starter session cookie and redirects home.

## What to customize

Replace the demo starter session with your real account/session model when building a production app.

## FAQ: How does AuthToolkit Identity login work?

### When someone clicks Login on my website, what happens?

When a customer clicks Login, your app sends them to AuthToolkit Identity.

They verify with email OTP, phone OTP, or another login method you enabled.

After verification, AuthToolkit Identity sends them back to your app using your callback URL.

Your app then creates its own session and sends the customer to their account, dashboard, store, or protected page.

Example:

```text
Landing page → Login → AuthToolkit Identity → Email/OTP verification → Back to your callback → Your app creates session → Customer lands in /account
```

### Does AuthToolkit Identity create the session inside my app?

No.

AuthToolkit Identity verifies the person. Your app creates the session.

That is safer because your app owns its own cookies, account page, cart, orders, dashboard, and permissions.

Simple way to think about it:

```text
AuthToolkit Identity says: “This person is verified.”
Your app says: “Great, I will create a session and let them into my app.”
```

### What is a callback URL?

A callback URL is the page in your app where AuthToolkit Identity sends the user after verification.

Example:

```text
https://myapp.com/auth/identity/callback
```

For local testing, it might be:

```text
http://localhost:3000/auth/identity/callback
```

Your callback page receives the Identity result, checks it, creates your app session, and redirects the user to the right place.

Examples:

```text
/account
/dashboard
/checkout
/app
```

### Why do I need to add an allowed return origin?

AuthToolkit Identity only sends users back to websites you allow.

This protects your users from being sent to fake or unsafe websites.

Example allowed origins:

```text
https://myapp.com
http://localhost:3000
```

If your return URL is not allowed, Identity will block it and show a safe error.

### Is this like “Continue with Google”?

Yes, the flow is similar.

Your app sends the user to Identity. Identity verifies the user. Identity sends the user back. Your app creates the session.

The difference is that AuthToolkit Identity is your own authentication layer for your app, project, or platform.

### Can I embed the Identity login directly on my page?

Later, yes.

The safest first version is redirect login:

```text
Your app → AuthToolkit Identity → your app
```

An embedded login widget or iframe can come later, but redirect login is easier to secure and test first.

### What does my app need to build?

Your app needs four small pieces:

1. A Login button
2. A start route that sends users to AuthToolkit Identity
3. A callback route that receives the Identity result
4. A protected page that checks your app session

The starter repo already includes this pattern:

```text
https://github.com/alihaideralihaider/authtoolkit-identity-starter
```

Server secrets stay in `.env.local`. Do not put the API key or access evaluation secret in browser code.

### What is the difference between the starter repo and the SDK?

The starter repo is a full working example app.

Use it when you want a clean app you can clone, run, and customize.

The SDK is a package for existing apps.

Use it when you want to add AuthToolkit Identity helpers to your current app.

New app:

```bash
git clone https://github.com/alihaideralihaider/authtoolkit-identity-starter.git
```

Existing app:

```bash
npm install @authtoolkit/identity
```

### Where does the customer go after login?

That is your choice.

Most apps send the customer to:

```text
/account
/dashboard
/app
/checkout
```

For a store like Kepler, the flow can be:

```text
Kepler landing page → Login → AuthToolkit Identity → Email OTP → Back to Kepler → Kepler creates customer session → Customer lands in /account
```

### Does AuthToolkit Identity replace my whole app?

No.

AuthToolkit Identity handles login and verification.

Your app still owns:

- customer account pages
- cart
- orders
- dashboard
- permissions
- app data
- session cookie

Identity gives your app a trusted verification result. Your app decides what to do next.
