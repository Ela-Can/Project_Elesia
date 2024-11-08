import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategories,
  deleteCategory,
} from "../../../StoreRedux/slices/category.js";
import AddCategory from "./AddCategory.jsx";
import UpdateCategory from "./UpdateCategory.jsx";

function CategoryList() {
  const [isEditing, setIsEditing] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const categoryList = useSelector((state) => state.category.categoryList);
  const dispatch = useDispatch();

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
        dispatch(deleteCategory(id));
      } else {
        //console.error("Erreur lors de la suppression :", err);
      }
    } catch (error) {
      //console.error("Erreur de connexion à l'API", error);
    }
  }

  function onClickCancelBtn() {
    setIsEditing(false);
    setCategoryId(null);
  }

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/v1/category/list");
      const data = await response.json();
      console.log("Catégories récupérées :", data);
      dispatch(setCategories(data));
    }
    fetchCategories();
  }, []);

  return (
    <>
      <h3>Liste des categories</h3>
      {categoryList.length > 0 ? (
        <ul>
          {categoryList.map((category) => (
            <li key={category.id}>
              {isEditing === true && categoryId === category.id ? (
                <>
                  <UpdateCategory
                    category={category}
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

      <AddCategory />
    </>
  );
}

export default CategoryList;
