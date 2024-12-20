import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePseudo } from "../../../store/slices/user.js";

function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [userInfo, setUserInfo] = useState(null);
  const [pseudo, setPseudo] = useState(user.pseudo);
  const [email, setEmail] = useState(user.email);
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

    const response = await fetch(`/api/v1/user/update_information/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pseudo, email }),
    });
    if (response.ok) {
      const data = await response.json();

      dispatch(updatePseudo(data.pseudo));
      setIsEditing(false);
    }
  }

  if (!userInfo) {
    return <p role="status">Chargement...</p>;
  }

  return (
    <main>
      <h4>Vos informations personnelles</h4>
      {isEditing ? (
        <form onSubmit={onSubmitUpdate}>
          <div>
            <label htmlFor="pseudo">Pseudo :</label>
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              readOnly
              aria-readonly="true"
            />
          </div>
          <button type="submit">Enregistrer les modifications</button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            aria-label="Annuler et revenir aux informations affichées"
          >
            Annuler
          </button>
        </form>
      ) : (
        <div>
          <p>Pseudo : {user.pseudo}</p>
          <p>Email : {user.email} </p>
          <button
            onClick={() => setIsEditing(true)}
            aria-label="Passer en mode édition pour modifier vos informations"
          >
            Modifier vos informations
          </button>
        </div>
      )}
    </main>
  );
}

export default Settings;
