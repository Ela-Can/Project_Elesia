import { useSelector } from "react-redux";
import Settings from "./Settings";

function Dashboard() {
  const user = useSelector((state) => state.user);
  return (
    <main>
      <h2>Hello {user.pseudo}</h2>
      <h3>Mon espace personnel</h3>
      <section>
        <p>Vos informations personnelles</p>
        <Settings />
      </section>
      <aside>
        <ul>
          <li>Mon compte</li>
          <li>Mes diagnostics de peau</li>
          <li>Mes commentaires</li>
          <li>Mes paramètres de compte</li>
        </ul>
      </aside>
    </main>
  );
}

export default Dashboard;
