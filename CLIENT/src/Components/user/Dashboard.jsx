import { useState } from "react";
import { useSelector } from "react-redux";
import Settings from "./partials/Settings.jsx";
import CommentsHistory from "./partials/CommentsHistory.jsx";
import DiagnosticsHistory from "./partials/DiagnosticsHistory.jsx";

function Dashboard() {
  const user = useSelector((state) => state.user);
  const [activeSection, setActiveSection] = useState(null);

  return (
    <>
      <aside>
        <button onClick={() => setActiveSection("settings")}>
          Vos informations personnelles
        </button>
        <button onClick={() => setActiveSection("comments")}>
          Vos commentaires
        </button>
        <button onClick={() => setActiveSection("diagnostics")}>
          Vos diagnostics de peau
        </button>
      </aside>

      <main>
        <h2>Hello {user.pseudo}</h2>
        <h3>Bienvenue sur votre espace personnel</h3>

        <div>
          {activeSection === "settings" && <Settings />}
          {activeSection === "comments" && <CommentsHistory />}
          {activeSection === "diagnostics" && <DiagnosticsHistory />}
        </div>
      </main>
    </>
  );
}

export default Dashboard;
