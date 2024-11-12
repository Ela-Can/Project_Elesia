import { useEffect, useState } from "react";
import AddSubject from "./AddSubject";
import UpdateSubject from "./UpdateSubject";

function SubjectList() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await fetch(`api/v1/subject/list`);
        const data = await response.json();
        console.log(data);
        setSubjects(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des sujets :", error);
      }
    }
    fetchSubjects();
  }, []);

  function addSubject(newSubject) {
    setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
  }

  function updateSubject(updatedSubject) {
    const { id, label } = updatedSubject;

    setSubjects((prevSubjects) => {
      const updatedList = [...prevSubjects];
      for (let i = 0; i < updatedList.length; i++) {
        if (updatedList[i].id === id) {
          updatedList[i].label = label;
          break;
        }
      }
      return updatedList;
    });
  }

  async function onClickDeleteSubject(subjectId) {
    try {
      console.log("ID du sujet à supprimer :", subjectId);
      console.log("subjectStatus à envoyer :", 0);
      const response = await fetch(`/api/v1/subject/delete/${subjectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subjectStatus: 0 }),
      });

      console.log("Statut de la réponse : ", response.status);

      if (!response.ok) {
        console.error("Erreur de réponse du serveur : ", response.statusText);
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Réponse du serveur : ", data);

      setSubjects((prevSubjectList) => {
        const updatedList = [...prevSubjectList];

        for (let i = 0; i < updatedList.length; i++) {
          if (updatedList[i].id === subjectId) {
            updatedList[i].subjectStatus = 0;
            break;
          }
        }

        return updatedList;
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du sujet :", error);
    }
  }

  return (
    <>
      <h3>Liste des sujets</h3>
      {subjects.length > 0 ? (
        <ul>
          {subjects.map((subject) => (
            <>
              <li key={subject.id}>
                {subject.label} : {subject.subjectStatus}
              </li>
              <UpdateSubject
                subjectId={subject.id}
                updateSubject={updateSubject}
              />
              <button
                onClick={() => {
                  console.log("ID passé au bouton Supprimer :", subject.id);
                  onClickDeleteSubject(subject.id);
                }}
              >
                Supprimer
              </button>
            </>
          ))}
        </ul>
      ) : (
        <p> Aucune catégorie trouvée</p>
      )}
      <AddSubject addSubject={addSubject} />
    </>
  );
}

export default SubjectList;
