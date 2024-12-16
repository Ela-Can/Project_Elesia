import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

import AddSkinConcern from "./AddSkinConcern.jsx";
import UpdateSkinConcern from "./UpdateSkinConcern.jsx";

import { fetchSkinConcerns } from "../../../services/api.js";

function SkinConcernList() {
  const [skinConcerns, setSkinConcerns] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [skinConcernId, setSkinConcernId] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [activeSection, setActiveSection] = useState("skinConcern/list");

  // Fetch SkinConcerns

  useEffect(() => {
    fetchSkinConcerns().then((data) => {
      setSkinConcerns(data);
    });
  }, []);

  // Add a skinConcern

  function addSkinConcern(newSkinConcern) {
    setSkinConcerns((prevSkinConcern) => [...prevSkinConcern, newSkinConcern]);
  }

  // Update a skinConcern

  function updateSkinConcern(updatedSkinConcern) {
    const { id, label } = updatedSkinConcern;

    setSkinConcerns((prevSkinConcerns) => {
      const updatedList = [...prevSkinConcerns];
      for (let i = 0; i < updatedList.length; i++) {
        if (updatedList[i].id === id) {
          updatedList[i].label = label;
          break;
        }
      }
      return updatedList;
    });
  }

  // Delete a skinConcern

  async function onClickDeleteSkinConcern(skinConcernId) {
    try {
      const response = await fetch(
        `/api/v1/skinconcern/delete/${skinConcernId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      setSkinConcerns((prevSkinConcerns) =>
        prevSkinConcerns.filter(
          (skinConcern) => skinConcern.id !== skinConcernId
        )
      );

      setSuccessMessage("SkinConcern supprimé avec succès");
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
    setSkinConcernId(null);
  }

  function onClickOpenConfirmation(skinConcernId) {
    setSkinConcernId(skinConcernId);
    setShowConfirmation(true);
  }

  return (
    <>
      <section className="dashboard_controls">
        <button
          onClick={() => {
            setActiveSection("skinConcern/list"), resetMessages();
          }}
        >
          Liste des préoccupations
        </button>
        <button
          onClick={() => {
            setActiveSection("skinConcern/addSkinConcern"), resetMessages();
          }}
        >
          Ajouter une préoccupation
        </button>
      </section>

      <section className="dashboard_content">
        {showConfirmation && (
          <div className="popup_confirmation">
            <p>Êtes-vous sûr de vouloir supprimer cette préoccupation?</p>
            <button onClick={() => onClickDeleteSkinConcern(skinConcernId)}>
              Confirmer
            </button>
            <button onClick={onCloseOrCancel}>Annuler</button>
          </div>
        )}

        {activeSection === "skinConcern/list" && (
          <>
            <h3>Liste des préoccupations</h3>

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

            {skinConcerns && skinConcerns.length > 0 ? (
              <ul role="list">
                {skinConcerns.map((skinConcern) => (
                  <li key={skinConcern.id} role="listitem">
                    {isEditing === true && skinConcernId === skinConcern.id ? (
                      <article className="update_form">
                        <UpdateSkinConcern
                          skinConcern={skinConcern}
                          skinConcernId={skinConcern.id}
                          updateSkinConcern={updateSkinConcern}
                          setSuccessMessage={setSuccessMessage}
                          setErrorMessage={setErrorMessage}
                          onCloseOrCancel={onCloseOrCancel}
                        />
                        <button
                          onClick={() => {
                            onCloseOrCancel(skinConcern.id), resetMessages();
                          }}
                        >
                          Annuler
                        </button>
                      </article>
                    ) : (
                      <>
                        {skinConcern.label}
                        <div>
                          <button
                            onClick={() => {
                              setIsEditing(true);
                              setSkinConcernId(skinConcern.id);
                              resetMessages();
                            }}
                            aria-label={`Modifier la préoccupation : ${skinConcern.label}`}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            onClick={() => {
                              onClickOpenConfirmation(skinConcern.id),
                                resetMessages();
                            }}
                            aria-label={`Supprimer la préoccupation : ${skinConcern.label}`}
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
              <p> Aucune préoccupation trouvée</p>
            )}
          </>
        )}
      </section>

      <section>
        {activeSection === "skinConcern/addSkinConcern" && (
          <AddSkinConcern
            addSkinConcern={addSkinConcern}
            existingSkinConcerns={skinConcerns}
          />
        )}
      </section>
    </>
  );
}

export default SkinConcernList;
