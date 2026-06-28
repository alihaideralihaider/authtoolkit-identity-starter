# How the AuthToolkit Identity flow works

This starter keeps the login flow intentionally small.

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
