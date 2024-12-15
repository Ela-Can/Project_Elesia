import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

import AddCategory from "./AddCategory.jsx";
import UpdateCategory from "./UpdateCategory.jsx";

import { fetchCategories } from "../../../services/api.js";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [activeSection, setActiveSection] = useState("category/list");

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  // Add a category

  function addCategory(newCategory) {
    setCategories((prevCategory) => [...prevCategory, newCategory]);
  }

  // Update a category

  function updateCategory(updatedCategory) {
    const { id, label, ref } = updatedCategory;

    setCategories((prevCategories) => {
      const updatedList = [...prevCategories];
      for (let i = 0; i < updatedList.length; i++) {
        if (updatedList[i].id === id) {
          updatedList[i].label = label;
          updatedList[i].ref = ref;
        }
      }
      return updatedList;
    });
  }

  // Delete a category

  async function onClickDeleteCategory(categoryId) {
    try {
      const response = await fetch(`/api/v1/category/delete/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );

      setSuccessMessage("Catégorie supprimée avec succès !");
      setShowConfirmation(false);
    } catch (error) {
      setErrorMessage(
        "Une erreur s'est produite lors de la suppression. Veuillez réessayer."
      );
    }
  }

  function resetMessages() {
    setSuccessMessage("");
    setErrorMessage("");
  }

  function onCloseOrCancel() {
    setIsEditing(false);
    setShowConfirmation(false);
    setCategoryId(null);
  }

  function onClickOpenConfirmation(categoryId) {
    setCategoryId(categoryId);
    setShowConfirmation(true);
  }

  return (
    <>
      <section className="dashboard_controls">
        <button
          onClick={() => {
            setActiveSection("category/list"), resetMessages();
          }}
        >
          Liste des categories
        </button>
        <button
          onClick={() => {
            setActiveSection("category/addCategory"), resetMessages();
          }}
        >
          Ajouter une categorie
        </button>
      </section>

      <section className="dashboard_content">
        {showConfirmation && (
          <div className="popup_confirmation">
            <p>Êtes-vous sûr de vouloir supprimer cette categorie?</p>
            <button onClick={() => onClickDeleteCategory(categoryId)}>
              Confirmer
            </button>
            <button onClick={onCloseOrCancel}>Annuler</button>
          </div>
        )}

        {activeSection === "category/list" && (
          <>
            <h3>Liste des categories</h3>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}

            {categories && categories.length > 0 ? (
              <ul>
                {categories.map((category) => (
                  <li key={category.id}>
                    {isEditing === true && categoryId === category.id ? (
                      <article className="update_form">
                        <UpdateCategory
                          category={category}
                          categoryId={category.id}
                          updateCategory={updateCategory}
                          setSuccessMessage={setSuccessMessage}
                          setErrorMessage={setErrorMessage}
                          onCloseOrCancel={onCloseOrCancel}
                        />
                        <button
                          onClick={() => {
                            onCloseOrCancel(category.id), resetMessages();
                          }}
                        >
                          Annuler
                        </button>
                      </article>
                    ) : (
                      <>
                        {category.label} - {category.ref}
                        <div>
                          <button
                            onClick={() => {
                              setIsEditing(true);
                              setCategoryId(category.id);
                              resetMessages();
                            }}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            onClick={() => {
                              onClickOpenConfirmation(category.id),
                                resetMessages();
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p> Aucune catégorie trouvée</p>
            )}
          </>
        )}
      </section>

      <section>
        {activeSection === "category/addCategory" && (
          <AddCategory
            addCategory={addCategory}
            existingCategories={categories}
          />
        )}
      </section>
    </>
  );
}

export default CategoryList;
