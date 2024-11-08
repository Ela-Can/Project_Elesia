import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCategories,
  updateCategory,
} from "../../../StoreRedux/slices/category.js";

function UpdateCategory({ category, setIsEditing }) {
  const [label, setLabel] = useState(category.label);
  const [ref, setRef] = useState(category.ref);

  const dispatch = useDispatch();

  async function fetchCategories() {
    const response = await fetch("/api/v1/category/list");
    const data = await response.json();
    console.log("Références récupérées :", data);
    dispatch(setCategories(data));
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function onSubmitUpdateCategory(e) {
    e.preventDefault();
    console.log("Id:", category.id);
    console.log("Label:", label);
    console.log("Reference:", ref);

    try {
      const response = await fetch(`/api/v1/category/update/${category.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label, ref }),
      });

      console.log("Réponse reçue après la mise à jour :", response);
      console.log("Envoi de la requête de mise à jour avec : ", {
        label: label,
        ref: ref,
        id: category.id,
      });

      if (response.ok) {
        const updatedCategory = await response.json();
        console.log("Catégorie modifiée avec succès :", updatedCategory);

        console.log("Catégorie modifiée avec succès");

        dispatch(
          updateCategory({
            id: category.id,
            categoryLabel: label,
            categoryRef: ref,
          })
        );

        fetchCategories();
        setIsEditing(false);
      } else {
        console.error(
          "Erreur lors de la modif de la catégorie :",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête : ", error);
    }
  }

  return (
    <>
      <h4>Modifier une catégorie</h4>
      <form onSubmit={onSubmitUpdateCategory}>
        <label htmlFor="reference">Choisir une référence : </label>
        <select
          name="reference"
          id="reference"
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          required
        >
          <option value="" disabled>
            Sélectionnez une référence
          </option>
          <option value="produits">Produits</option>
          <option value="articles">Articles</option>
        </select>
        <label htmlFor="label">Nouvelle categorie : </label>
        <input
          type="text"
          name="label"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <button type="submit">Enregistrer</button>
      </form>
    </>
  );
}

export default UpdateCategory;
