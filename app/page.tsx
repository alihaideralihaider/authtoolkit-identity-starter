import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="shell">
      <section className="card">
        <div className="eyebrow">AuthToolkit Identity starter</div>
        <h1>Add AuthToolkit Identity to your app</h1>
        <p>
          This starter shows the smallest useful flow: landing page, Identity sign-in,
          callback handling, a protected app shell, and logout.
        </p>
        <div className="actions">
          <Link className="button" href="/login">Sign in with AuthToolkit Identity</Link>
          <Link className="button secondary" href="/app">Open protected shell</Link>
        </div>
      </section>
      <section className="grid">
        <div className="card"><strong>Beginner friendly</strong><p>Clear routes, short helpers, and comments where you should customize.</p></div>
        <div className="card"><strong>Server capable</strong><p>Uses secure HTTP-only cookies for the starter session.</p></div>
        <div className="card"><strong>No passwords</strong><p>AuthToolkit Identity owns the hosted identity experience.</p></div>
      </section>
    </main>
  );
}
