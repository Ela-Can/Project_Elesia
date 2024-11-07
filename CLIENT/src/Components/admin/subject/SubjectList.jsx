import { useEffect, useContext } from "react";
import { SubjectContext } from "../../../StoreContext/subject/Context";
import AddSubject from "./AddSubject";

function SubjectList() {
  const { subject, setSubjectList } = useContext(SubjectContext);
  const subjectList = subject;

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await fetch(`api/v1/subject/list`);
        const data = await response.json();
        console.log(data);
        setSubjectList(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des sujets :", error);
      }
    }
    fetchSubjects();
  }, []);

  return (
    <>
      <h3>Liste des sujets</h3>
      {subjectList.length > 0 ? (
        <ul>
          {subjectList.map((subject) => (
            <>
              <li key={subject.id}>{subject.label}</li>
            </>
          ))}
        </ul>
      ) : (
        <p> Aucune catégorie trouvée</p>
      )}
    </>
  );
}

export default SubjectList;
