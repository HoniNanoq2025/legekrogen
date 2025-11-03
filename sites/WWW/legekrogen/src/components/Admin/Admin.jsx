import MenuAppBar from "../MenuAppBar/MenuAppBar";
import LogoutBtn from "../LogoutBtn/LogoutBtn";

export default function AdminPanel() {
  return (
    <div className="container">
      <MenuAppBar />
      <h2>Admin Panel</h2>
      <p>
        Kun brugere med rollen <strong>admin</strong> kan se dette.
      </p>
      <LogoutBtn />
    </div>
  );
}
