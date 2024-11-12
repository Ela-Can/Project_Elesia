import { useState } from "react";

function UpdateCategory({
  category,
  categoryId,
  updateCategory,
  setIsEditing,
}) {
  const [updatedLabel, setUpdatedLabel] = useState(category.label);
  const [updatedRef, setUpdatedRef] = useState(category.ref);

  async function onSubmitUpdateCategory(e) {
    e.preventDefault();

    updateCategory({
      id: categoryId,
      label: updatedLabel,
      ref: updatedRef,
    });

    try {
      const response = await fetch(`/api/v1/category/update/${categoryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: updatedLabel, ref: updatedRef }),
      });

      console.log("Réponse reçue après la mise à jour :", response);

      if (response.ok) {
        const updatedCategory = await response.json();
        console.log("Catégorie modifiée avec succès :", updatedCategory);

        console.log("Catégorie modifiée avec succès");

        setUpdatedLabel("");
        setUpdatedRef("");

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
          value={updatedRef}
          onChange={(e) => setUpdatedRef(e.target.value)}
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
          value={updatedLabel}
          onChange={(e) => setUpdatedLabel(e.target.value)}
        />
        <button type="submit">Enregistrer</button>
      </form>
    </>
  );
}

export default UpdateCategory;
