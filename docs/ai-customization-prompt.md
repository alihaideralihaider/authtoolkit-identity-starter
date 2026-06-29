# AI customization prompt

Copy this prompt into Codex, Claude, or your coding assistant:

```text
Use this AuthToolkit Identity starter and adapt it to my app.

My app is: [describe your app]
My protected area should be: [describe protected pages]
My brand style is: [colors, tone, examples]

Rules:
- Keep AuthToolkit Identity server secrets server-only.
- Do not put server secrets in NEXT_PUBLIC_*.
- Keep /auth/identity/start and /auth/identity/callback safe.
- Do not mark a user logged in just because the callback URL was reached.
- Exchange the callback code before creating my app session.
- Replace the starter session with my app account/session model.
- Keep logout working.
- Update README with any new env variables.

Start by explaining which files you will change, then implement the smallest working version.
```
