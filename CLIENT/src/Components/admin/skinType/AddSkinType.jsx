import { useState } from "react";

function AddSkinType({ addSkinType }) {
  const [newSkinType, setNewSkinType] = useState("");

  async function onSubmitAddSkinType(e) {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/skintype/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: newSkinType }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Nouveau type de peau ajouté :", data);

        setNewSkinType("");
        addSkinType({
          id: data.id,
          label: newSkinType,
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
      <h4>Ajouter un type de peau</h4>
      <form onSubmit={onSubmitAddSkinType}>
        <label htmlFor="label">Nouveau type : </label>
        <input
          type="text"
          name="label"
          id="label"
          value={newSkinType}
          onChange={(e) => setNewSkinType(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
    </>
  );
}

export default AddSkinType;
