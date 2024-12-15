import { useState } from "react";

function UpdateSkinConcern({
  skinConcern,
  skinConcernId,
  updateSkinConcern,
  setErrorMessage,
  setSuccessMessage,
  onCloseOrCancel,
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

      const data = await response.json();

      setSuccessMessage("SkinConcern mis à jour avec succès !");
      setUpdatedSkinConcern("");
      onCloseOrCancel();
    } catch (error) {
      setErrorMessage("Une erreur s'est produite lors de la mise à jour.");
    }
  }

  return (
    <>
      <form onSubmit={onSubmitUpdateSkinConcern}>
        <div>
          <label htmlFor="updateSkinConcern">Nouvelle préoccupation : </label>
          <input
            type="text"
            name="updateSkinConcern"
            id="updateSkinConcern"
            value={updatedSkinConcern}
            onChange={(e) => setUpdatedSkinConcern(e.target.value)}
            aria-required="true"
            required
          />
        </div>

        <button type="submit">Mettre à jour</button>
      </form>
    </>
  );
}

export default UpdateSkinConcern;
