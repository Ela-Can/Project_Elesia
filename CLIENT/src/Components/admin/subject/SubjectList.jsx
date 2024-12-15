import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

import AddSubject from "./AddSubject";
import UpdateSubject from "./UpdateSubject";

function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [subjectId, setSubjectId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [activeSection, setActiveSection] = useState("subject/list");

  // Fetch Subjects

  useEffect(() => {
    async function fetchSubjects() {
      const response = await fetch(`api/v1/subject/list/1`);
      const data = await response.json();
      setSubjects(data);
    }
    fetchSubjects();
  }, []);

  // Add a subject

  function addSubject(newSubject) {
    setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
  }

  // Update a subject

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

  // Delete a subject

  async function onClickDeleteSubject(subjectId) {
    try {
      const response = await fetch(`/api/v1/subject/delete/${subjectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subjectStatus: 0 }),
      });

      const data = await response.json();

      setSubjects((prevSubjectList) =>
        prevSubjectList.filter((subject) => subject.id !== subjectId)
      );

      setSuccessMessage("Sujet archivé avec succès !");
      setShowConfirmation(false);
    } catch (error) {
      setErrorMessage(
        "Une erreur s'est produite lors de l'archivage. Veuillez réessayer."
      );
    }
  }

  function resetMessages() {
    setSuccessMessage("");
    setErrorMessage("");
  }

  function onCloseOrCancel() {
    setIsEditing(false);
    setShowConfirmation(false);
    setSubjectId(null);
  }

  function onClickOpenConfirmation(subjectId) {
    setSubjectId(subjectId);
    setShowConfirmation(true);
  }

  return (
    <>
      <section className="dashboard_controls">
        <button
          onClick={(e) => {
            setActiveSection("subject/list"), resetMessages();
          }}
        >
          Liste des sujets
        </button>
        <button
          onClick={(e) => {
            setActiveSection("subject/addSubject"), resetMessages();
          }}
        >
          Ajouter un sujet
        </button>
      </section>

      <section className="dashboard_content">
        {showConfirmation && (
          <div className="popup_confirmation">
            <p>Êtes-vous sûr de vouloir archiver ce sujet ?</p>
            <button onClick={() => onClickDeleteSubject(subjectId)}>
              Confirmer
            </button>
            <button onClick={onCloseOrCancel}>Annuler</button>
          </div>
        )}

        {activeSection === "subject/list" && (
          <>
            <h3>Liste des sujets</h3>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}

            {subjects && subjects.length > 0 ? (
              <ul role="list">
                {subjects.map((subject) => (
                  <li key={subject.id} role="listitem">
                    {isEditing === true && subjectId === subject.id ? (
                      <article className="update_form">
                        <UpdateSubject
                          subject={subject}
                          subjectId={subject.id}
                          updateSubject={updateSubject}
                          setSuccessMessage={setSuccessMessage}
                          setErrorMessage={setErrorMessage}
                          onCloseOrCancel={onCloseOrCancel}
                        />

                        <button
                          onClick={(e) => {
                            onCloseOrCancel(subject.id), resetMessages();
                          }}
                          aria-label={`Annuler la modification du sujet ${subject.label}`}
                        >
                          Annuler
                        </button>
                      </article>
                    ) : (
                      <>
                        {subject.label}
                        <div>
                          <button
                            onClick={(e) => {
                              setIsEditing(true);
                              setSubjectId(subject.id);
                              resetMessages();
                            }}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            onClick={(e) => {
                              onClickOpenConfirmation(subject.id),
                                resetMessages();
                            }}
                            aria-label={`Archiver le sujet ${subject.label}`}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p role="status"> Aucun sujet trouvé</p>
            )}
          </>
        )}
      </section>

      <section>
        {activeSection === "subject/addSubject" && (
          <AddSubject addSubject={addSubject} existingSubjects={subjects} />
        )}
      </section>
    </>
  );
}

export default SubjectList;
