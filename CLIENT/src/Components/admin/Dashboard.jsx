import { useState } from "react";

import CategoryList from "./category/CategoryList";
import CommentList from "./comment/CommentList";
import ContactList from "./contact/ContactList";
import ProductList from "./product/ProductList";
import SkinConcernList from "./skinConcern/SkinConcernList";
import SkinTypeList from "./skinType/SkinTypeList";
import SubjectList from "./subject/SubjectList";
import { NavLink } from "react-router-dom";

import useCloseMenu from "../../Hook/useCloseMenu";
import useCheckAuth from "../../Hook/useCheckAuth.jsx";
import Loading from "../Loading.jsx";

function Dashboard() {
  useCloseMenu();
  const [user, isLoading] = useCheckAuth();
  const [activeSection, setActiveSection] = useState(null);
  const [isContentMenuOpen, setIsContentMenuOpen] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);
  const [unmoderatedCount, setUnmoderatedCount] = useState(0);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <aside
        role="navigation"
        aria-label="Menu de navigation du tableau de bord"
      >
        <h2>Tableau de bord</h2>
        <div>
          <button onClick={() => setIsContentMenuOpen(!isContentMenuOpen)}>
            Gestion du contenu {isContentMenuOpen ? "▲" : "▼"}
            {isContentMenuOpen && (
              <ul>
                <li>
                  <NavLink onClick={() => setActiveSection("products")}>
                    Gestion des produits
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={() => setActiveSection("categories")}>
                    Gestion des categories
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={() => setActiveSection("subjects")}>
                    Gestion des sujets
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={() => setActiveSection("skinTypes")}>
                    Gestion des types de peau
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={() => setActiveSection("skinConcerns")}>
                    Gestion des préocupations
                  </NavLink>
                </li>
              </ul>
            )}
          </button>

          <NavLink onClick={() => setActiveSection("comments")}>
            Modérations des commentaires {unmoderatedCount}
          </NavLink>

          <NavLink onClick={() => setActiveSection("contacts")}>
            Demandes de contact {unreadCount}
          </NavLink>
        </div>
      </aside>

      <main>
        <h2>Dashboard</h2>

        {activeSection === "products" && <ProductList />}
        {activeSection === "categories" && <CategoryList />}
        {activeSection === "subjects" && <SubjectList />}
        {activeSection === "comments" && (
          <CommentList setUnmoderatedCount={setUnmoderatedCount} />
        )}
        {activeSection === "contacts" && (
          <ContactList setUnreadCount={setUnreadCount} />
        )}
        {activeSection === "skinTypes" && <SkinTypeList />}
        {activeSection === "skinConcerns" && <SkinConcernList />}
      </main>
    </div>
  );
}

export default Dashboard;
