import { useState } from "react";

function AddSkinType({ addSkinType, existingSkinTypes }) {
  const [newSkinType, setNewSkinType] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmitAddSkinType(e) {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/v1/skintype/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: newSkinType }),
      });

      for (const skinType of existingSkinTypes) {
        if (skinType.label === newSkinType) {
          setErrorMessage("Le skinType existe déjà !");
          return;
        }
      }

      const data = await response.json();

      setNewSkinType("");
      setSuccessMessage("SkinType créé avec succès !");

      addSkinType({
        id: data.id,
        label: newSkinType,
      });
    } catch (error) {
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  }

  return (
    <>
      <h4>Ajouter un type de peau</h4>
      <form onSubmit={onSubmitAddSkinType}>
        <div>
          <label htmlFor="label">Nouveau type : </label>
          <input
            type="text"
            name="label"
            id="label"
            value={newSkinType}
            onChange={(e) => setNewSkinType(e.target.value)}
            aria-required="true"
            required
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

export default AddSkinType;
