# Security notes

## Server-only env variables

These must stay server-only:

- `AUTHTOOLKIT_IDENTITY_BASE_URL`
- `AUTHTOOLKIT_IDENTITY_PROJECT_ID`
- `AUTHTOOLKIT_IDENTITY_CLIENT_ID`
- `AUTHTOOLKIT_IDENTITY_API_KEY`
- `AUTHTOOLKIT_IDENTITY_ACCESS_EVALUATION_SECRET`
- `AUTHTOOLKIT_IDENTITY_SESSION_SECRET`

Never put these in `NEXT_PUBLIC_*`.

## Public env variables

These may be exposed to browser code:

- `NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_BASE_URL`
- `NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_PROJECT_ID`
- `NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_CLIENT_ID`
- `NEXT_PUBLIC_AUTHTOOLKIT_IDENTITY_PUBLISHABLE_KEY`

Public values identify your Identity project. They are not a replacement for server-side checks.

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

## Session secret

`AUTHTOOLKIT_IDENTITY_SESSION_SECRET` signs the starter session cookie.

Use a long random value. Rotate it if it leaks.

If you rotate it, existing starter sessions become invalid, which is usually safe.

## Logging

Do not log:

- API keys
- access evaluation secrets
- session secrets
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
