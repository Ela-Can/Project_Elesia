import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import Settings from "./partials/Settings.jsx";
import CommentsHistory from "./partials/CommentsHistory.jsx";
import DiagnosticsHistory from "./partials/DiagnosticsHistory.jsx";

function Dashboard() {
  const user = useSelector((state) => state.user);
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="container">
      <aside>
        <nav>
          <button onClick={() => setActiveSection("settings")}>
            Vos informations personnelles
          </button>
          <button onClick={() => setActiveSection("comments")}>
            Vos commentaires
          </button>
          <button onClick={() => setActiveSection("diagnostics")}>
            Vos diagnostics de peau
          </button>
        </nav>
      </aside>

      <main>
        <h2>Bonjour {user.pseudo}</h2>
        <h3>Bienvenue sur votre espace personnel</h3>

        <section>
          {activeSection === "settings" && <Settings />}
          {activeSection === "comments" && <CommentsHistory />}
          {activeSection === "diagnostics" && <DiagnosticsHistory />}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
