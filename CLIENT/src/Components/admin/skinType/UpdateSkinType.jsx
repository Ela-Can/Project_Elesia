import { useState } from "react";

function UpdateSkinType({
  skinType,
  skinTypeId,
  updateSkinType,
  setIsEditing,
}) {
  const [updatedSkinType, setUpdatedSkinType] = useState(skinType.label);

  async function onSubmitUpdateSkinType(e) {
    e.preventDefault();

    updateSkinType({
      id: skinTypeId,
      label: updatedSkinType,
    });

    console.log("Label à mettre à jour :", label);

    try {
      const response = await fetch(`/api/v1/skintype/update/${skinTypeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: updatedSkinType }),
      });

      console.log("Réponse reçue après la mise à jour :", response);

      if (response.ok) {
        const updatedSkinType = await response.json();
        console.log("SkinType modifié avec succès :", updatedSkinType);

        console.log("SkinType modifié avec succès");

        setUpdatedSkinType("");

        setIsEditing(false);
      } else {
        const errorDetails = await response.text();
        console.error(
          "Erreur lors de la modif du skinType :",
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
      <h4>Modifier un type de peau</h4>
      <form onSubmit={onSubmitUpdateSkinType}>
        <label htmlFor="updateSkinType">Nouveau type : </label>
        <input
          type="text"
          name="updateSkinType"
          id="updateSkinType"
          value={updatedSkinType}
          onChange={(e) => setUpdatedSkinType(e.target.value)}
        />
        <button type="submit">Enregistrer</button>
      </form>
    </>
  );
}

export default UpdateSkinType;
