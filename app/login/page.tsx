import Link from "next/link";

const loginMessages: Record<string, string> = {
  callback_code_used: "That Identity callback code was already used. Start sign-in again.",
  exchange_failed: "Identity could not verify the callback. Try signing in again.",
  expired_callback_code: "That Identity callback expired. Start sign-in again.",
  invalid_callback_code: "Identity could not verify the callback code. Try signing in again.",
  invalid_api_key: "Identity could not verify this app setup. Check your API Key.",
  invalid_state: "The login state did not match. Start sign-in again.",
  logged_out: "You are logged out.",
  missing_callback_code: "The Identity callback was missing its code. Start sign-in again.",
  missing_config: "Identity setup is missing. Add the four Setup Code values to .env.local.",
  project_mismatch: "The API Key does not match this Identity project.",
  redirect_uri_not_allowed: "Add this app origin to Identity allowed return origins."
};

export default async function LoginPage(props: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const loggedOut = searchParams?.logged_out ? "logged_out" : undefined;
  const identityError = firstValue(searchParams?.identity_error);
  const message = loginMessages[loggedOut ?? identityError ?? ""];

  return (
    <main className="shell">
      <section className="card">
        <div className="eyebrow">Sign in</div>
        <h1>Continue with AuthToolkit Identity</h1>
        <p>
          This starter redirects to the hosted AuthToolkit Identity experience and returns
          to a callback route that exchanges the code before creating a starter session.
        </p>
        {message ? <p className="notice">{message}</p> : null}
        <div className="actions">
          <Link className="button" href="/auth/identity/start">Continue with AuthToolkit Identity</Link>
          <Link className="button secondary" href="/">Back home</Link>
        </div>
      </section>
    </main>
  );
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
