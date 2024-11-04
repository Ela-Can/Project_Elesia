import { useSelector } from "react-redux";
import Settings from "./partials/Settings.jsx";
import CommentsHistory from "./partials/CommentsHistory.jsx";
import DiagnosticsHistory from "./partials/DiagnosticsHistory.jsx";

function Dashboard() {
  const user = useSelector((state) => state.user);
  console.log("User dans Dashboard :", user);
  return (
    <main>
      <h2>Hello {user.pseudo}</h2>
      <h3>Mon espace personnel</h3>
      <section>
        <p>Vos informations personnelles</p>
        <Settings />
      </section>
      <section>
        <p>Historique des commentaires</p>
        <CommentsHistory />
      </section>
      <section>
        <p>Historique de mes diagnostics</p>
        <DiagnosticsHistory />
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
