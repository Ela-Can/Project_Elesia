import { useState } from "react";

function AddSkinConcern({ addSkinConcern }) {
  const [newSkinConcern, setNewSkinConcern] = useState("");

  async function onSubmitAddSkinConcern(e) {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/skinconcern/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: newSkinConcern }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Nouvelle préoccupation ajoutée :", data);
        setNewSkinConcern("");
        addSkinConcern({
          id: data.id,
          label: newSkinConcern,
        });
      } else {
        console.error(
          "Erreur lors de l'ajout de la préoccupation :",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête : ", error);
    }
  }

  return (
    <>
      <h4>Ajouter une préoccupation</h4>
      <form onSubmit={onSubmitAddSkinConcern}>
        <label htmlFor="label">Nouvelle préoccupation : </label>
        <input
          type="text"
          name="label"
          id="label"
          value={newSkinConcern}
          onChange={(e) => setNewSkinConcern(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
    </>
  );
}

export default AddSkinConcern;
