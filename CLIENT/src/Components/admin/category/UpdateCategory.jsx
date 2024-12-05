import { useState } from "react";

function UpdateCategory({
  category,
  categoryId,
  updateCategory,
  setErrorMessage,
  setSuccessMessage,
  onCloseOrCancel,
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
      const data = await response.json();

      setSuccessMessage("Catégorie mise à jour avec succès !");

      setUpdatedLabel("");
      setUpdatedRef("");
      onCloseOrCancel();
    } catch (error) {
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  }

  return (
    <>
      <form onSubmit={onSubmitUpdateCategory}>
        <div>
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
        </div>
        <div>
          <label htmlFor="label">Nouvelle categorie : </label>
          <input
            type="text"
            name="label"
            id="label"
            value={updatedLabel}
            onChange={(e) => setUpdatedLabel(e.target.value)}
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </>
  );
}

export default UpdateCategory;
