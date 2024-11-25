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

  return (
    <div className="container">
      <aside>
        <h3>Menu</h3>

        <button onClick={() => setIsContentMenuOpen(!isContentMenuOpen)}>
          Gestion du contenu {isContentMenuOpen ? "▲" : "▼"}
        </button>

        {isContentMenuOpen && (
          <>
            <button onClick={() => setActiveSection("products")}>
              Gestion des produits
            </button>
            <button onClick={() => setActiveSection("categories")}>
              Gestion des categories
            </button>
            <button onClick={() => setActiveSection("subjects")}>
              Gestion des sujets
            </button>
            <button onClick={() => setActiveSection("skinTypes")}>
              Gestion des types de peau
            </button>
            <button onClick={() => setActiveSection("skinConcerns")}>
              Gestion des préocupations
            </button>
          </>
        )}

        <button onClick={() => setActiveSection("comments")}>
          Modérations des commentaires
        </button>

        <NavLink onClick={() => setActiveSection("contacts")}>
          Demandes de contact {unreadCount}
        </NavLink>
      </aside>

      <main>
        <h2>Dashboard</h2>
        <div>
          {activeSection === "products" && <ProductList />}
          {activeSection === "categories" && <CategoryList />}
          {activeSection === "subjects" && <SubjectList />}
          {activeSection === "comments" && <CommentList />}
          {activeSection === "contacts" && (
            <ContactList setUnreadCount={setUnreadCount} />
          )}
          {activeSection === "skinTypes" && <SkinTypeList />}
          {activeSection === "skinConcerns" && <SkinConcernList />}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
