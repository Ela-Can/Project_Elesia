import { useState } from "react";
import { NavLink } from "react-router-dom";

import CategoryList from "./category/CategoryList";
import CommentList from "./comment/CommentList";
import ContactList from "./contact/ContactList";
import ProductList from "./product/ProductList";
import SkinConcernList from "./skinConcern/SkinConcernList";
import SkinTypeList from "./skinType/SkinTypeList";
import SubjectList from "./subject/SubjectList";

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
          <button
            onClick={() => setIsContentMenuOpen(!isContentMenuOpen)}
            id="content_management_btn"
          >
            Gestion du contenu {isContentMenuOpen ? "▲" : "▼"}
            {isContentMenuOpen && (
              <ul>
                <li>
                  <NavLink
                    onClick={() => setActiveSection("products")}
                    tabIndex="0"
                  >
                    Gestion des produits
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => setActiveSection("categories")}
                    tabIndex="0"
                  >
                    Gestion des categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => setActiveSection("subjects")}
                    tabIndex="0"
                  >
                    Gestion des sujets
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => setActiveSection("skinTypes")}
                    tabIndex="0"
                  >
                    Gestion des types de peau
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => setActiveSection("skinConcerns")}
                    tabIndex="0"
                  >
                    Gestion des préocupations
                  </NavLink>
                </li>
              </ul>
            )}
          </button>

          <NavLink onClick={() => setActiveSection("comments")} tabIndex="0">
            Modérations des commentaires {unmoderatedCount}
          </NavLink>

          <NavLink onClick={() => setActiveSection("contacts")} tabIndex="0">
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
