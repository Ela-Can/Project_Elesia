import { useState } from "react";

function UpdateSubject({ subjectId, updateSubject }) {
  const [updatedSubject, setUpdatedSubject] = useState("");

  async function onSubmitUpdateSubject(e) {
    e.preventDefault();
    updateSubject({
      id: subjectId,
      label: updatedSubject,
    });

    try {
      const response = await fetch(`api/v1/subject/update/${subjectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: updatedSubject,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setUpdatedSubject("");
    } catch (error) {
      console.error("Erreur lors de la récupération des sujets :", error);
    }
  }
  return (
    <form onSubmit={onSubmitUpdateSubject}>
      <label htmlFor="updateSubject">Mettre à jour le sujet :</label>
      <input
        type="text"
        id="updateSubject"
        value={updatedSubject}
        onChange={(e) => setUpdatedSubject(e.target.value)}
      />
      <button type="submit">Mettre à jour</button>
    </form>
  );
}

export default UpdateSubject;
