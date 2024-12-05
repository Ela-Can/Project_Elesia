import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import AddSkinType from "./AddSkinType.jsx";
import UpdateSkinType from "./UpdateSkinType.jsx";

import { fetchSkinTypes } from "../../../services/api.js";

function SkinTypeList() {
  const [skinTypes, setSkinTypes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [skinTypeId, setSkinTypeId] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [activeSection, setActiveSection] = useState("skinType/list");

  useEffect(() => {
    fetchSkinTypes().then((data) => {
      setSkinTypes(data);
    });
  }, []);

  // Add a skinType

  function addSkinType(newSkinType) {
    setSkinTypes((prevSkinType) => [...prevSkinType, newSkinType]);
  }

  // Update a skinType

  function updateSkinType(updatedSkinType) {
    const { id, label } = updatedSkinType;

    setSkinTypes((prevSkinTypes) => {
      const updatedList = [...prevSkinTypes];
      for (let i = 0; i < updatedList.length; i++) {
        if (updatedList[i].id === id) {
          updatedList[i].label = label;
          break;
        }
      }
      return updatedList;
    });
  }

  // Delete a skinType

  async function onClickDeleteSkinType(skinTypeId) {
    try {
      const response = await fetch(`/api/v1/skintype/delete/${skinTypeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      setSkinTypes((prevSkinTypes) =>
        prevSkinTypes.filter((skinType) => skinType.id !== skinTypeId)
      );

      setSuccessMessage("SkinType supprimé avec succès");
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
    setSkinTypeId(null);
  }

  function onClickOpenConfirmation(skinTypeId) {
    setSkinTypeId(skinTypeId);
    setShowConfirmation(true);
  }

  return (
    <>
      <section className="dashboard_controls">
        <button
          onClick={() => {
            setActiveSection("skinType/list"), resetMessages();
          }}
        >
          Liste des types de peau
        </button>
        <button
          onClick={() => {
            setActiveSection("skinType/addSkinType"), resetMessages();
          }}
        >
          Ajouter un type de peau
        </button>
      </section>
      <section className="dashboard_content">
        {showConfirmation && (
          <div className="popup_confirmation">
            <p>Êtes-vous sûr de vouloir supprimer ce type de peau ?</p>
            <button onClick={() => onClickDeleteSkinType(skinTypeId)}>
              Confirmer
            </button>
            <button onClick={onCloseOrCancel}>Annuler</button>
          </div>
        )}

        {activeSection === "skinType/list" && (
          <>
            <h3>Liste des types de peau</h3>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}

            {skinTypes && skinTypes.length > 0 ? (
              <ul role="list">
                {skinTypes.map((skinType) => (
                  <li key={skinType.id} role="listitem">
                    {isEditing === true && skinTypeId === skinType.id ? (
                      <article className="update_form">
                        <UpdateSkinType
                          skinType={skinType}
                          skinTypeId={skinType.id}
                          updateSkinType={updateSkinType}
                          setSuccessMessage={setSuccessMessage}
                          setErrorMessage={setErrorMessage}
                          onCloseOrCancel={onCloseOrCancel}
                        />
                        <button
                          onClick={() => {
                            onCloseOrCancel(skinType.id), resetMessages();
                          }}
                        >
                          Annuler
                        </button>
                      </article>
                    ) : (
                      <>
                        {skinType.label}
                        <div>
                          <button
                            onClick={() => {
                              setIsEditing(true);
                              setSkinTypeId(skinType.id);
                              resetMessages();
                            }}
                            aria-label={`Modifier le type de peau : ${skinType.label}`}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            onClick={() => {
                              onClickOpenConfirmation(skinType.id),
                                resetMessages();
                            }}
                            aria-label={`Supprimer le type de peau : ${skinType.label}`}
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
              <p role="status"> Aucun type de peau trouvé</p>
            )}
          </>
        )}
      </section>
      <section>
        {activeSection === "skinType/addSkinType" && (
          <AddSkinType
            addSkinType={addSkinType}
            existingSkinTypes={skinTypes}
          />
        )}
      </section>
    </>
  );
}

export default SkinTypeList;
