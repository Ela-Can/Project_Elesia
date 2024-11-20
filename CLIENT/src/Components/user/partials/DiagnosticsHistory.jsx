import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setDiagnostic,
  deleteDiagnosticById,
} from "../../../store/slices/diagnostic.js";

function DiagnosticHistory() {
  const diagnosticList = useSelector(
    (state) => state.diagnostic.diagnosticList
  );
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
      dispatch(setDiagnostic(data));
    }
    fetchDiagnosticsByUserId();
  }, [user.id]);

  return (
    <>
      <h4>Vos diagnostics de peau</h4>
      {diagnosticList.length > 0 ? (
        <ul>
          {diagnosticList.map((diagnostic) => (
            <li key={diagnostic.id}>
              <h4>{diagnostic.createdDate}</h4>
              <p>Comment décririez-vous votre type de peau ?</p>
              <p>Votre réponse : {diagnostic.skinTypeLabel}</p>
              <p>
                Quelle est votre principale préoccupation concernant votre peau
                ?
              </p>
              <p>Votre réponse : {diagnostic.skinConcernLabel}</p>
              <p>
                Votre peau est-elle sensible (rougeurs, tiraillements,
                picotements fréquents) ?
              </p>
              <p>Votre réponse : {diagnostic.isSkinSensitive}</p>
              <p>À quelle fréquence êtes-vous exposé(e) à la pollution ?</p>
              <p>Votre réponse : {diagnostic.isExposedToPollution}</p>
              <p>À quelle fréquence vous exposez-vous au soleil ?</p>
              <p>Votre réponse : {diagnostic.isExposedToSun}</p>
              <p>
                Êtes-vous actuellement enceinte ou en période d’allaitement ?
              </p>
              <p>Votre réponse : {diagnostic.isPregnantOrBreastfeeding}</p>
              <p>Le produit recommandé : </p>
              <p>{diagnostic.product_name}</p>
              <Link to={`/product/${diagnostic.product_id}`}>
                <button>Voir plus</button>
              </Link>
              <button onClick={() => onClickDeleteDiagnostic(diagnostic.id)}>
                Supprimer le diagnostic
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
