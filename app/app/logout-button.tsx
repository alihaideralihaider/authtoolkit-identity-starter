export default function LogoutButton() {
  return (
    <form action="/logout" method="post" className="actions">
      <button type="submit">Logout</button>
    </form>
  );
}
