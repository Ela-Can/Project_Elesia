import { useState } from "react";

function UpdateSkinType({
  skinType,
  skinTypeId,
  updateSkinType,
  setErrorMessage,
  setSuccessMessage,
  onCloseOrCancel,
}) {
  const [updatedSkinType, setUpdatedSkinType] = useState(skinType.label);

  async function onSubmitUpdateSkinType(e) {
    e.preventDefault();

    updateSkinType({
      id: skinTypeId,
      label: updatedSkinType,
    });

    try {
      const response = await fetch(`/api/v1/skintype/update/${skinTypeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: updatedSkinType }),
      });

      const data = await response.json();

      setSuccessMessage("SkinType mis à jour avec succès !");
      setUpdatedSkinType("");
      onCloseOrCancel();
    } catch (error) {
      setErrorMessage("Une erreur s'est produite lors de la mise à jour.");
    }
  }

  return (
    <>
      <form onSubmit={onSubmitUpdateSkinType}>
        <div>
          <label htmlFor="updateSkinType">Nouveau type : </label>
          <input
            type="text"
            name="updateSkinType"
            id="updateSkinType"
            value={updatedSkinType}
            onChange={(e) => setUpdatedSkinType(e.target.value)}
            aria-required="true"
            required
          />
        </div>

        <button type="submit">Mettre à jour</button>
      </form>
    </>
  );
}

export default UpdateSkinType;
