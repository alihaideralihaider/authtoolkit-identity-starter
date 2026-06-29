# Security notes

## Environment variables

The starter uses the same four values shown in Identity Setup Code:

```text
AUTHTOOLKIT_IDENTITY_BASE_URL=https://identity.authtoolkit.com
AUTHTOOLKIT_IDENTITY_PROJECT_ID=<selected-real-project-id>
AUTHTOOLKIT_IDENTITY_API_KEY=<paste-api-key-here>
NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_BASE_URL=https://identity.authtoolkit.com
```

`AUTHTOOLKIT_IDENTITY_API_KEY` is server-only. Keep it in `.env.local` during local development. Never put it in browser code, logs, or `NEXT_PUBLIC_*`.

AuthToolkit Identity verifies the person. Your app creates the session. The app session cookie belongs to your app.

Only `NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_BASE_URL` is browser-safe in the starter.

## Callback allowlist

Add your app origin to the allowed return origins in AuthToolkit Identity.

Local example:

```text
http://localhost:3000
```

Production example:

```text
https://your-app.example
```

Do not allow wildcard origins unless you fully understand the risk.

Allowed return origins protect users from unsafe redirects. If a return URL is not allowed, AuthToolkit Identity blocks it and shows a safe error.

## Callback exchange

The callback URL being reached is not enough to log a user in.

The starter must:

1. Generate a random state in `/auth/identity/start`.
2. Store that state in an HTTP-only cookie.
3. Verify the returned state in `/auth/identity/callback`.
4. Exchange the returned code with AuthToolkit Identity using the server-only API key.
5. Create the starter session only after exchange succeeds.

## Starter session

The starter signs its session cookie server-side after callback exchange succeeds.

If you rotate the API key, existing starter sessions become invalid because the starter uses the server-only API key to sign the starter cookie.

## Logging

Do not log:

- API keys
- raw provider responses if they may contain sensitive data
- auth headers
- cookies

## Credential rotation

Rotate Identity credentials if:

- a secret was committed
- a secret was pasted into an AI chat
- a teammate leaves and had access
- your deployment logs exposed a secret
- you suspect compromise

After rotation, update your deployment environment variables and restart/redeploy the app.

If your API key was created before callback exchange support, rotate it before using real login.
