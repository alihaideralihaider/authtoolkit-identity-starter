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
          This page is protected by a starter-owned session cookie created only
          after the Identity callback exchange succeeds.
        </p>
        <pre>{JSON.stringify({
          provider: session.provider,
          status: session.status,
          connectedAt: session.connectedAt,
          identityUser: {
            id: session.identityUser.id,
            email: session.identityUser.email,
            phone: session.identityUser.phone,
            emailVerified: session.identityUser.emailVerified,
            phoneVerified: session.identityUser.phoneVerified
          }
        }, null, 2)}</pre>
        <LogoutButton />
      </section>
    </main>
  );
}
