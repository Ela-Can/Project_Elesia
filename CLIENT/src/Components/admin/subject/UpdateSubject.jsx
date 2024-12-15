import { useState } from "react";

function UpdateSubject({
  subject,
  subjectId,
  updateSubject,
  setErrorMessage,
  setSuccessMessage,
  onCloseOrCancel,
}) {
  const [updatedSubject, setUpdatedSubject] = useState(subject.label);

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

      const data = await response.json();

      setSuccessMessage("Sujet mis à jour avec succès !");
      setUpdatedSubject("");
      onCloseOrCancel();
    } catch (error) {
      setErrorMessage("Une erreur s'est produite lors de la mise à jour.");
    }
  }
  return (
    <form onSubmit={onSubmitUpdateSubject}>
      <div>
        <label htmlFor="updateSubject">Mettre à jour le sujet :</label>
        <input
          type="text"
          id="updateSubject"
          value={updatedSubject}
          onChange={(e) => setUpdatedSubject(e.target.value)}
          aria-required="true"
          required
        />
      </div>

      <button type="submit">Mettre à jour</button>
    </form>
  );
}

export default UpdateSubject;
