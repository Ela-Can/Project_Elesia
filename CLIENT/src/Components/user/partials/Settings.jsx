import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePseudo } from "../../../StoreRedux/slices/user.js";

function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("User ID dans le composant Settings :", user);
  //Récupérer l'email
  const [userInfo, setUserInfo] = useState(null);
  const [pseudo, setPseudo] = useState(user.pseudo);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchUserInfo() {
      const response = await fetch(`/api/v1/user/${user.id}`);
      const data = await response.json();
      setUserInfo(data);
    }
    fetchUserInfo();
  }, [user.id]);

  async function onSubmitUpdate(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/v1/user/update_information/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pseudo }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(updatePseudo(data.pseudo));
        setIsEditing(false);
      } else {
        console.error("Erreur lors de la mise à jour du pseudo");
      }
    } catch (error) {
      console.error("Erreur de connexion à l'API", error);
    }
  }

  if (!userInfo) {
    return <p>Chargement...</p>;
  }

  return (
    <main>
      <h3>Vos informations personnelles</h3>
      {isEditing ? (
        <form onSubmit={onSubmitUpdate}>
          <label htmlFor="pseudo">Pseudo :</label>
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
          <button type="submit">Enregistrer les modifications</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Annuler
          </button>
        </form>
      ) : (
        <div>
          <p>Pseudo : {user.pseudo}</p>
          <p>Email : {user.email} </p>
          <button onClick={() => setIsEditing(true)}>Modifier le pseudo</button>
        </div>
      )}
    </main>
  );
}

export default Settings;
