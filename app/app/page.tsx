import { redirect } from "next/navigation";
import { getStarterSession } from "../../src/lib/session";
import LogoutButton from "./logout-button";

export default async function ProtectedAppPage() {
  const session = await getStarterSession();
  if (!session) redirect("/login");

  return (
    <main className="shell">
      <section className="card">
        <span className="badge">Identity connected</span>
        <h1>Welcome to your protected app shell</h1>
        <p>
          This page is protected by a minimal starter session cookie. Replace this
          demo session with your app account lookup when you integrate for real.
        </p>
        <pre>{JSON.stringify({ provider: session.provider, status: session.status, connectedAt: session.connectedAt }, null, 2)}</pre>
        <LogoutButton />
      </section>
    </main>
  );
}
