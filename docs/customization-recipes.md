# Customization recipes

## Change the landing page

Edit:

```text
app/page.tsx
```

Change the headline, explanation, and cards. Keep the sign-in CTA pointed at `/login` or `/auth/identity/start`.

## Add a protected page

Create a new page, for example:

```text
app/dashboard/page.tsx
```

Use this pattern:

```tsx
import { redirect } from "next/navigation";
import { getStarterSession } from "../../src/lib/session";

export default async function DashboardPage() {
  const session = await getStarterSession();
  if (!session) redirect("/login");

  return <main>Your protected dashboard</main>;
}
```

Adjust the relative import path based on where your file lives.

## Rename the app shell

Edit:

```text
app/app/page.tsx
```

Change:

```text
Welcome to your protected app shell
```

to your product name.

## Add a sidebar

Create a component:

```text
app/app/sidebar.tsx
```

Then import it into:

```text
app/app/page.tsx
```

Keep the logout button visible somewhere in the protected shell.

## Add user/account display

The starter session only stores demo connection data.

For a real app, replace the demo session with your account lookup after callback verification.

Suggested display fields:

- account name
- email, if safe and verified
- project name
- plan name

Do not display raw tokens, API keys, or provider payloads.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it into Vercel.
3. Add all server-only env variables in Vercel project settings.
4. Add public env variables.
5. Add your Vercel app origin to AuthToolkit Identity allowed return origins.
6. Deploy.

## Deploy to Cloudflare

Use a server-capable Cloudflare setup, such as OpenNext/Workers.

Do not use static export for this starter because it needs callback/session behavior.

Add server-only values as Worker secrets or environment bindings.

## Deploy to another server-capable host

Any host is acceptable if it supports Next.js server routes and HTTP-only cookies.

Before launch:

- set server env variables securely
- set public env variables
- add production origin to Identity allowed return origins
- test login, callback, `/app`, and logout
