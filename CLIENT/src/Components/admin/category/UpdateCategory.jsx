// A INTÉGRER DANS CATEGORYLIST

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategories,
  updateCategory,
} from "../../../StoreRedux/slices/category.js";

function UpdateCategory() {
  const [label, setLabel] = useState("");
  const [ref, setRef] = useState("");

  const categoryList = useSelector((state) => state.category.categoryList);
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

    console.log("Label:", label);
    console.log("Reference:", ref);

    try {
      const response = await fetch(`/api/v1/category/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label, ref }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Catégorie modifiée :", data);

        dispatch(updateCategory(data));
        console.log("Liste des catégories après modif :", categoryList);

        fetchCategories();

        setLabel("");
        setRef("");
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
        <button type="submit">Modifier</button>
      </form>
    </>
  );
}

export default UpdateCategory;
