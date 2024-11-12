import { useState } from "react";

function UpdateSkinConcern({
  skinConcern,
  skinConcernId,
  updateSkinConcern,
  setIsEditing,
}) {
  const [updatedSkinConcern, setUpdatedSkinConcern] = useState(
    skinConcern.label
  );

  async function onSubmitUpdateSkinConcern(e) {
    e.preventDefault();

    updateSkinConcern({
      id: skinConcernId,
      label: updatedSkinConcern,
    });

    try {
      const response = await fetch(
        `/api/v1/skinconcern/update/${skinConcernId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ label: updatedSkinConcern }),
        }
      );

      console.log("Réponse reçue après la mise à jour :", response);

      if (response.ok) {
        const updatedSkinConcern = await response.json();
        console.log("Préoccupation modifiée avec succès :", updatedSkinConcern);

        console.log("Préoccupation modifiée avec succès");

        setUpdatedSkinConcern("");

        setIsEditing(false);
      } else {
        const errorDetails = await response.text();
        console.error(
          "Erreur lors de la modif de la catégorie :",
          response.status,
          response.statusText,
          errorDetails
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête : ", error);
    }
  }

  return (
    <>
      <h4>Modifier une préoccupation</h4>
      <form onSubmit={onSubmitUpdateSkinConcern}>
        <label htmlFor="label">Nouvelle préoccupation : </label>
        <input
          type="text"
          name="label"
          id="label"
          value={updatedSkinConcern}
          onChange={(e) => setUpdatedSkinConcern(e.target.value)}
        />
        <button type="submit">Enregistrer</button>
      </form>
    </>
  );
}

export default UpdateSkinConcern;
