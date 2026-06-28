import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="shell">
      <section className="card">
        <div className="eyebrow">Sign in</div>
        <h1>Continue with AuthToolkit Identity</h1>
        <p>
          This starter redirects to the hosted AuthToolkit Identity experience and returns
          to a safe callback route. Replace the copy with your own product language.
        </p>
        <div className="actions">
          <Link className="button" href="/auth/identity/start">Continue with AuthToolkit Identity</Link>
          <Link className="button secondary" href="/">Back home</Link>
        </div>
      </section>
    </main>
  );
}
