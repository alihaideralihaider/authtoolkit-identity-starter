# AuthToolkit Identity integration checklist

- [ ] Create an AuthToolkit Identity project.
- [ ] Copy project credentials into `.env.local`.
- [ ] Set `AUTHTOOLKIT_IDENTITY_SESSION_SECRET` to a long random value.
- [ ] Add local allowed origin: `http://localhost:3000`.
- [ ] Run `npm run dev`.
- [ ] Open `/login`.
- [ ] Click `Continue with AuthToolkit Identity`.
- [ ] Complete the hosted Identity flow.
- [ ] Return to `/auth/identity/callback`.
- [ ] Confirm `/app` opens with a valid starter session.
- [ ] Click logout and confirm the session clears.
- [ ] Add your production app origin before deploying.
