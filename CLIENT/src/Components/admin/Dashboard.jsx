import { useState } from "react";

import CategoryList from "./category/CategoryList";
import CommentList from "./comment/CommentList";
import ContactList from "./contact/ContactList";
import ProductList from "./product/ProductList";
import SkinConcernList from "./skinConcern/SkinConcernList";
import SkinTypeList from "./skinType/SkinTypeList";
import SubjectList from "./subject/SubjectList";
import { Link, NavLink } from "react-router-dom";

function Dashboard() {
  const [activeSection, setActiveSection] = useState(null);
  const [isContentMenuOpen, setIsContentMenuOpen] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);
  const [unmoderatedCount, setUnmoderatedCount] = useState(0);

  return (
    <div className="container">
      <aside>
        <h3>Tableau de bord</h3>

        <button onClick={() => setIsContentMenuOpen(!isContentMenuOpen)}>
          Gestion du contenu {isContentMenuOpen ? "▲" : "▼"}
        </button>

        {isContentMenuOpen && (
          <>
            <NavLink onClick={() => setActiveSection("products")}>
              Gestion des produits
            </NavLink>
            <NavLink onClick={() => setActiveSection("categories")}>
              Gestion des categories
            </NavLink>
            <NavLink onClick={() => setActiveSection("subjects")}>
              Gestion des sujets
            </NavLink>
            <NavLink onClick={() => setActiveSection("skinTypes")}>
              Gestion des types de peau
            </NavLink>
            <NavLink onClick={() => setActiveSection("skinConcerns")}>
              Gestion des préocupations
            </NavLink>
          </>
        )}

        <NavLink onClick={() => setActiveSection("comments")}>
          Modérations des commentaires {unmoderatedCount}
        </NavLink>

        <NavLink onClick={() => setActiveSection("contacts")}>
          Demandes de contact {unreadCount}
        </NavLink>
      </aside>

      <main>
        <h2>Dashboard</h2>
        <section>
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
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
