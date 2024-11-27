import { useEffect, useState } from "react";

import AddSkinConcern from "./AddSkinConcern.jsx";
import UpdateSkinConcern from "./UpdateSkinConcern.jsx";

function SkinConcernList() {
  const [skinConcerns, setSkinConcerns] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [skinConcernId, setSkinConcernId] = useState([]);

  const [activeSection, setActiveSection] = useState("skinConcern/list");

  useEffect(() => {
    async function fetchSkinConcerns() {
      const response = await fetch("/api/v1/skinconcern/list");
      const data = await response.json();
      console.log("SkinConcern récupérées :", data);
      setSkinConcerns(data);
    }
    fetchSkinConcerns();
  }, []);

  function addSkinConcern(newSkinConcern) {
    setSkinConcerns((prevSkinConcern) => [...prevSkinConcern, newSkinConcern]);
  }

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

  function onClickCancelBtn() {
    setIsEditing(false);
  }

  async function onClickDeleteSkinConcern(id) {
    try {
      const response = await fetch(`/api/v1/skinconcern/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        alert("SkinConcern supprimé avec succès.");
        setSkinConcerns((prevSkinConcerns) => {
          const idToDelete = id;

          const updatedList = [];

          for (let i = 0; i < prevSkinConcerns.length; i++) {
            if (prevSkinConcerns[i].id !== idToDelete) {
              updatedList[updatedList.length] = prevSkinConcerns[i];
            }
          }
          return updatedList;
        });
      } else {
        //console.error("Erreur lors de la suppression :", err);
      }
    } catch (error) {
      //console.error("Erreur de connexion à l'API", error);
    }
  }

  return (
    <main>
      <section>
        <button onClick={() => setActiveSection("skinConcern/list")}>
          Liste des produits
        </button>
        <button onClick={() => setActiveSection("skinConcern/addSkinConcern")}>
          Ajouter un produit
        </button>
      </section>
      <section>
        {activeSection === "skinConcern/list" && (
          <>
            <h3>Liste des préoccupations</h3>
            {skinConcerns.length > 0 ? (
              <ul>
                {skinConcerns.map((skinConcern) => (
                  <li key={skinConcern.id}>
                    {isEditing === true && skinConcernId === skinConcern.id ? (
                      <>
                        <UpdateSkinConcern
                          skinConcern={skinConcern}
                          skinConcernId={skinConcern.id}
                          updateSkinConcern={updateSkinConcern}
                          setIsEditing={setIsEditing}
                        />
                        <button
                          onClick={() => onClickCancelBtn(skinConcern.id)}
                        >
                          Annuler
                        </button>
                      </>
                    ) : (
                      <>
                        {skinConcern.label}
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setSkinConcernId(skinConcern.id);
                          }}
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() =>
                            onClickDeleteSkinConcern(skinConcern.id)
                          }
                        >
                          Supprimer
                        </button>
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
          <AddSkinConcern addSkinConcern={addSkinConcern} />
        )}
      </section>
    </main>
  );
}

export default SkinConcernList;
