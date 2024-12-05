import { useState } from "react";

function AddCategory({ addCategory, existingCategories }) {
  const [newLabel, setNewLabel] = useState("");
  const [newRef, setNewRef] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmitAddCategory(e) {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/v1/category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: newLabel, ref: newRef }),
      });

      for (const category of existingCategories) {
        if (category.label === newLabel) {
          setErrorMessage("Le skinConcern existe déjà !");
          return;
        }
      }

      const data = await response.json();

      setNewLabel("");
      setNewRef("");
      setSuccessMessage("Catégorie créée avec succès !");
      addCategory({
        id: data.id,
        label: newLabel,
        ref: newRef,
      });
    } catch (error) {
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  }

  return (
    <>
      <h4>Ajouter une catégorie</h4>
      <form onSubmit={onSubmitAddCategory}>
        <div>
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
        </div>
        <div>
          <label htmlFor="label">Nouvelle categorie : </label>
          <input
            type="text"
            name="label"
            id="label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
      {errorMessage && (
        <p className="error-message" role="alert">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p className="success-message" role="status">
          {successMessage}
        </p>
      )}
    </>
  );
}

export default AddCategory;
