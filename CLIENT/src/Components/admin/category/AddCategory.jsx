import { useState } from "react";

function AddCategory({ addCategory }) {
  const [newLabel, setNewLabel] = useState("");
  const [newRef, setNewRef] = useState("");

  async function onSubmitAddCategory(e) {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: newLabel, ref: newRef }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Nouvelle catégorie ajoutée :", data);

        setNewLabel("");
        setNewRef("");

        addCategory({
          id: data.id,
          label: newLabel,
          ref: newRef,
        });
      } else {
        console.error(
          "Erreur lors de l'ajout de la catégorie :",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête : ", error);
    }
  }

  return (
    <>
      <h4>Ajouter une catégorie</h4>
      <form onSubmit={onSubmitAddCategory}>
        <label htmlFor="reference">Choisir une référence : </label>
        <select
          name="reference"
          id="reference"
          value={newRef}
          onChange={(e) => setNewRef(e.target.value)}
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
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
    </>
  );
}

export default AddCategory;
