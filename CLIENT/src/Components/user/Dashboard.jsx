import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useCheckAuth from "../../Hook/useCheckAuth.jsx";

import Settings from "./partials/Settings.jsx";
import CommentsHistory from "./partials/CommentsHistory.jsx";
import DiagnosticsHistory from "./partials/DiagnosticsHistory.jsx";

import useCloseMenu from "../../Hook/useCloseMenu";
import Loading from "../Loading.jsx";

function Dashboard() {
  useCloseMenu();
  const [isLoading] = useCheckAuth();
  const user = useSelector((state) => state.user);
  const [activeSection, setActiveSection] = useState(null);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <aside>
        <h2>Tableau de bord</h2>
        <div aria-label="Navigation du tableau de bord">
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
