import { useEffect, useState, useContext } from "react";
import { SubjectContext } from "../../../StoreContext/subject/Context";

function AddSubject() {
  const { addSubject } = useContext(SubjectContext);
  const [newSubjectLabel, setNewSubjectLabel] = useState("");

  function onSubmitAddSubject(e) {
    e.preventDefault();

    useEffect(() => {
      async function fetchAddSubjects() {
        try {
          const response = await fetch(`api/v1/subject/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newSubjectLabel),
          });
          const data = await response.json();
          console.log(data);
          addSubject(data);

          setNewSubjectLabel("");
        } catch (error) {
          console.error("Erreur lors de la récupération des sujets :", error);
        }
      }
      fetchAddSubjects();
    }, []);
  }

  return (
    <>
      <h4>Ajouter un sujet</h4>
      <form onSubmit={onSubmitAddSubject}>
        <input
          type="text"
          name="newSubject"
          id="newSubject"
          value={newSubjectLabel}
          onChange={(e) => setNewSubjectLabel(e.target.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
    </>
  );
}

export default AddSubject;
