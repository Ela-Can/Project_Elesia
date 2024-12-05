import { useState } from "react";

function AddSkinConcern({ addSkinConcern, existingSkinConcerns }) {
  const [newSkinConcern, setNewSkinConcern] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmitAddSkinConcern(e) {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/v1/skinconcern/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: newSkinConcern }),
      });

      for (const skinConcern of existingSkinConcerns) {
        if (skinConcern.label === newSkinConcern) {
          setErrorMessage("Le skinConcern existe déjà !");
          return;
        }
      }

      const data = await response.json();

      setNewSkinConcern("");
      setSuccessMessage("SkinConcern créé avec succès !");

      addSkinConcern({
        id: data.id,
        label: newSkinConcern,
      });
    } catch (error) {
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  }

  return (
    <>
      <h4>Ajouter une préoccupation</h4>
      <form onSubmit={onSubmitAddSkinConcern}>
        <div>
          <label htmlFor="label">Nouvelle préoccupation : </label>
          <input
            type="text"
            name="label"
            id="label"
            value={newSkinConcern}
            onChange={(e) => setNewSkinConcern(e.target.value)}
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

export default AddSkinConcern;
