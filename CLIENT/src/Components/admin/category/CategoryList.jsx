import { useEffect, useState } from "react";

import AddCategory from "./AddCategory.jsx";
import UpdateCategory from "./UpdateCategory.jsx";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/v1/category/list");
      const data = await response.json();
      console.log("Catégories récupérées :", data);
      setCategories(data);
    }
    fetchCategories();
  }, []);

  function addCategory(newCategory) {
    setCategories((prevCategory) => [...prevCategory, newCategory]);
  }

  function updateCategory(updatedCategory) {
    const { id, label, ref } = updatedCategory;

    setCategories((prevCategories) => {
      const updatedList = [...prevCategories];
      for (let i = 0; i < updatedList.length; i++) {
        if (updatedList[i].id === id) {
          updatedList[i].label = label;
          updatedList[i].ref = ref;
          break;
        }
      }
      return updatedList;
    });
  }

  function onClickCancelBtn() {
    setIsEditing(false);
    setCategoryId(null);
  }

  async function onClickDeleteCategory(id) {
    try {
      const response = await fetch(`/api/v1/category/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        alert("Category supprimé avec succès.");
        setCategories((prevCategories) => {
          const idToDelete = id;

          const updatedList = [];

          for (let i = 0; i < prevCategories.length; i++) {
            if (prevCategories[i].id !== idToDelete) {
              updatedList[updatedList.length] = prevCategories[i];
            }
          }
          return updatedList;
        });
      } else {
        //console.error("Erreur lors de la suppression :", err);
      }
    } catch (error) {
      //console.error("Erreur de connexion à l'API", error);
    }
  }

  return (
    <>
      <h3>Liste des categories</h3>
      {categories.length > 0 ? (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {isEditing === true && categoryId === category.id ? (
                <>
                  <UpdateCategory
                    category={category}
                    categoryId={category.id}
                    updateCategory={updateCategory}
                    setIsEditing={setIsEditing}
                  />
                  <button onClick={() => onClickCancelBtn(category.id)}>
                    Annuler
                  </button>
                </>
              ) : (
                <>
                  {category.label} : {category.ref}
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setCategoryId(category.id);
                    }}
                  >
                    Modifier
                  </button>
                  <button onClick={() => onClickDeleteCategory(category.id)}>
                    Supprimer
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p> Aucune catégorie trouvée</p>
      )}

      <AddCategory addCategory={addCategory} />
    </>
  );
}

export default CategoryList;
