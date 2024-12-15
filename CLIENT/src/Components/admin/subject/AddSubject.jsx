import { useState } from "react";

function AddSubject({ addSubject, existingSubjects }) {
  const [newSubject, setNewSubject] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmitAddSubject(e) {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`api/v1/subject/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: newSubject }),
      });

      for (const subject of existingSubjects) {
        if (subject.label === newSubject) {
          setErrorMessage("Le sujet existe déjà !");
          return;
        }
      }

      const data = await response.json();

      setNewSubject("");
      setSuccessMessage("Sujet créé avec succès !");

      addSubject({
        id: data.id,
        label: newSubject,
        subjectStatus: data.subjectStatus,
      });
    } catch (error) {
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  }

  return (
    <>
      <h3>Ajouter un sujet</h3>
      <form onSubmit={onSubmitAddSubject}>
        <div>
          <label htmlFor="newSubject">Nouveau sujet :</label>
          <input
            type="text"
            name="newSubject"
            id="newSubject"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
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

export default AddSubject;
