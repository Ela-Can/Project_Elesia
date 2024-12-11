import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setDiagnostic,
  deleteDiagnosticById,
} from "../../../store/slices/diagnostic.js";

import Accordion from "../../partials/Accordion.jsx";

function DiagnosticHistory() {
  const diagnosticList = useSelector(
    (state) => state.diagnostic.diagnosticList
  );
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [diagnosticId, setDiagnosticId] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!user.id) {
    return <p role="status">Chargement des données utilisateur...</p>;
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
        setSuccessMessage("SkinConcern supprimé avec succès");
        dispatch(deleteDiagnosticById(id));
        setShowConfirmation(false);
        setDiagnosticId(null);
      }
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

  function onClickOpenConfirmation(id) {
    setDiagnosticId(id);
    setShowConfirmation(true);
  }

  function onCloseConfirmation() {
    setShowConfirmation(false);
    setDiagnosticId(null);
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
      {showConfirmation && (
        <div className="popup_confirmation">
          <p>Êtes-vous sûr de vouloir supprimer ce diagnostic ?</p>
          <button onClick={() => onClickDeleteDiagnostic(diagnosticId)}>
            Confirmer
          </button>
          <button onClick={onCloseConfirmation}>Annuler</button>
        </div>
      )}

      {diagnosticList.length > 0 ? (
        <ul role="list">
          {diagnosticList.map((diagnostic) => (
            <Accordion
              title={`Diagnostic réalisé le ${diagnostic.createdDate}`}
              key={diagnostic.id}
              role="listitem"
              onClick={() => resetMessages()}
            >
              <div>
                <p>
                  Votre type de peau :{" "}
                  <strong>{diagnostic.skinTypeLabel}</strong>
                </p>
                <p>
                  Votre principale préoccupation :{" "}
                  <strong>{diagnostic.skinConcernLabel}</strong>
                </p>
                <p>
                  Votre peau est :{" "}
                  <strong>
                    {diagnostic.isSkinSensitive ? "Sensible" : "Non sensible"}
                  </strong>
                </p>
                <p>
                  Votre fréquence d'exposition à la pollution :{" "}
                  <strong>{diagnostic.isExposedToPollution}</strong>
                </p>
                <p>
                  Votre fréquence d'exposition au soleil :{" "}
                  <strong>{diagnostic.isExposedToSun}</strong>
                </p>
                <p>
                  Si vous êtes enceinte ou en période d’allaitement :{" "}
                  <strong>{diagnostic.isPregnantOrBreastfeeding}</strong>
                </p>
              </div>
              <div className="card_section">
                <h4>Le produit recommandé</h4>
                <div className="card">
                  <img
                    src={diagnostic.product_image}
                    alt={diagnostic.product_alt}
                  />
                  <h4>{diagnostic.product_name}</h4>
                  <Link
                    to={`/product/${diagnostic.product_id}`}
                    aria-label={`Voir plus sur le produit ${diagnostic.product_name}`}
                  >
                    Voir plus
                  </Link>
                </div>
              </div>
              <button
                onClick={() => onClickOpenConfirmation(diagnostic.id)}
                aria-label={`Supprimer le diagnostic du ${diagnostic.createdDate}`}
              >
                Supprimer le diagnostic
              </button>
            </Accordion>
          ))}
        </ul>
      ) : (
        <p role="status">Vous n'avez réalisé de diagnostic de peau</p>
      )}
    </>
  );
}

export default DiagnosticHistory;
