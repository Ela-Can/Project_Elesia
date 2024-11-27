import { useEffect, useState } from "react";
import AddSkinType from "./AddSkinType.jsx";
import UpdateSkinType from "./UpdateSkinType.jsx";

function SkinTypeList() {
  const [skinTypes, setSkinTypes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [skinTypeId, setSkinTypeId] = useState([]);

  const [activeSection, setActiveSection] = useState("skinType/list");

  useEffect(() => {
    async function fetchSkinTypes() {
      const response = await fetch("/api/v1/skintype/list");
      const data = await response.json();
      console.log("SkinType récupérées :", data);
      setSkinTypes(data);
    }
    fetchSkinTypes();
  }, []);

  function addSkinType(newSkinType) {
    setSkinTypes((prevSkinType) => [...prevSkinType, newSkinType]);
  }

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

  function onClickCancelBtn() {
    setIsEditing(false);
  }

  async function onClickDeleteSkinType(id) {
    try {
      const response = await fetch(`/api/v1/skintype/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        alert("SkinType supprimé avec succès.");
        setSkinTypes((prevSkinTypes) => {
          const idToDelete = id;

          const updatedList = [];

          for (let i = 0; i < prevSkinTypes.length; i++) {
            if (prevSkinTypes[i].id !== idToDelete) {
              updatedList[updatedList.length] = prevSkinTypes[i];
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
        <button onClick={() => setActiveSection("skinType/list")}>
          Liste des produits
        </button>
        <button onClick={() => setActiveSection("skinType/addSkinType")}>
          Ajouter un produit
        </button>
      </section>
      <section>
        {activeSection === "skinType/list" && (
          <>
            <h3>Liste des préoccupations</h3>
            {skinTypes.length > 0 ? (
              <ul>
                {skinTypes.map((skinType) => (
                  <li key={skinType.id}>
                    {isEditing === true && skinTypeId === skinType.id ? (
                      <>
                        <UpdateSkinType
                          skinType={skinType}
                          skinTypeId={skinType.id}
                          updateSkinType={updateSkinType}
                          setIsEditing={setIsEditing}
                        />
                        <button onClick={() => onClickCancelBtn(skinType.id)}>
                          Annuler
                        </button>
                      </>
                    ) : (
                      <>
                        {skinType.label}
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setSkinTypeId(skinType.id);
                          }}
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => onClickDeleteSkinType(skinType.id)}
                        >
                          Supprimer
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p> Aucun type de peau trouvé</p>
            )}
          </>
        )}
      </section>
      <section>
        {activeSection === "skinType/addSkinType" && (
          <AddSkinType addSkinType={addSkinType} />
        )}
      </section>
    </main>
  );
}

export default SkinTypeList;
