import { useState } from "react";

function AddSubject({ addSubject }) {
  const [newSubject, setNewSubject] = useState("");

  async function onSubmitAddSubject(e) {
    e.preventDefault();
    console.log("Form submitted");

    try {
      console.log("Avant appel à fetch");
      const response = await fetch(`api/v1/subject/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: newSubject,
        }),
      });
      console.log(response);

      const data = await response.json();
      console.log(data);
      setNewSubject("");
      addSubject({
        id: data.id,
        label: newSubject,
        subjectStatus: data.subjectStatus,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des sujets :", error);
    }
  }

  return (
    <>
      <h4>Ajouter un sujet</h4>
      <form onSubmit={onSubmitAddSubject}>
        <input
          type="text"
          name="newSubject"
          id="newSubject"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
    </>
  );
}

export default AddSubject;
