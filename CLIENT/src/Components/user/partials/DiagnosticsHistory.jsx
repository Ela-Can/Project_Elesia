import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDiagnostic,
  deleteDiagnosticById,
} from "../../../StoreRedux/slices/diagnostic.js";
//import useCheckAuth from "../../../Hook/useCheckAuth.jsx";

function DiagnosticHistory() {
  //const [user, isLoading] = useCheckAuth();

  const diagnosticList = useSelector(
    (state) => state.diagnostic.diagnosticList
  );
  const user = useSelector((state) => state.user);
  //console.log("User ID dans le composant :", user);
  //console.log("Liste des commentaires dans Redux :", diagnosticList);
  const dispatch = useDispatch();

  //console.log("Component re-rendered");

  if (!user.id) {
    return <p>Chargement des données utilisateur...</p>;
  }

  async function onClickDeleteDiagnostic(id) {
    try {
      const response = await fetch(
        `/api/v1/user/${user.id}/diagnostic/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        alert("Diagnostic supprimé avec succès.");
        dispatch(deleteDiagnosticById(id));
      } else {
        //console.error("Erreur lors de la suppression :", err);
      }
    } catch (error) {
      //console.error("Erreur de connexion à l'API", error);
    }
  }
  useEffect(() => {
    async function fetchDiagnosticsByUserId() {
      const response = await fetch(`api/v1/user/${user.id}/diagnostic/list`);
      const data = await response.json();
      //console.log("Diag récupérés :", data);
      dispatch(setDiagnostic(data));
      //console.log("DiagnosticList après dispatch :", diagnosticList);
    }
    fetchDiagnosticsByUserId();
  }, [user.id]);

  return (
    <>
      {diagnosticList.length > 0 ? (
        <ul>
          {diagnosticList.map((diagnostic) => (
            <li key={diagnostic.id}>
              <h4>{diagnostic.createdDate}</h4>
              <p>Type de peau : {diagnostic.id_skinType}</p>
              <p>Principale préoccupation : {diagnostic.id_skinConcern}</p>
              <p>Peau sensible : {diagnostic.isSkinSensitive}</p>
              <p>
                Fréquence d'exposition à la pollution :
                {diagnostic.isExposedToPollution}
              </p>
              <p>
                Fréquence d'exposition au soleil : {diagnostic.isExposedToSun}
              </p>
              <p>
                Enceinte ou allaitante : {diagnostic.isPregnantOrBreastfeeding}
              </p>
              <p>Produit : {diagnostic.product_name}</p>
              <img src={diagnostic.product_img} alt={diagnostic.product_alt} />
              <button onClick={() => onClickDeleteDiagnostic(diagnostic.id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Vous n'avez réalisé de diagnostic de peau</p>
      )}
    </>
  );
}

export default DiagnosticHistory;
