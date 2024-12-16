import { useState } from "react";
import { useSelector } from "react-redux";

import Settings from "./partials/Settings.jsx";
import CommentsHistory from "./partials/CommentsHistory.jsx";
import DiagnosticsHistory from "./partials/DiagnosticsHistory.jsx";

import useCloseMenu from "../../Hook/useCloseMenu";

function Dashboard() {
  useCloseMenu();
  const user = useSelector((state) => state.user);
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="container">
      <aside>
        <h2>Tableau de bord</h2>
        <div aria-label="Navigation du tableau de bord" role="navigation">
          <button onClick={() => setActiveSection("settings")}>
            Vos informations personnelles
          </button>
          <button onClick={() => setActiveSection("comments")}>
            Vos commentaires
          </button>
          <button onClick={() => setActiveSection("diagnostics")}>
            Vos diagnostics de peau
          </button>
        </div>
      </aside>

      <main>
        <h2>Bonjour {user.pseudo}</h2>
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
