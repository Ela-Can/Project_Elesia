import { useState, useEffect } from "react";
import useCheckAuth from "../../Hook/useCheckAuth.jsx";
import { Link, useNavigate } from "react-router-dom";
import useCloseMenu from "../../Hook/useCloseMenu";

import { fetchSkinConcerns, fetchSkinTypes } from "../../services/api.js";
import Loading from "../Loading.jsx";

function Diagnostic() {
  useCloseMenu();
  const [user, isLoading] = useCheckAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const [skinTypes, setSkinTypes] = useState([]);
  const [skinConcerns, setSkinConcerns] = useState([]);

  const [selectedSkinType, setSelectedSkinType] = useState(null);
  const [selectedSkinConcern, setSelectedSkinConcern] = useState(null);
  const [isSkinSensitive, setIsSkinSensitive] = useState("");
  const [isExposedToPollution, setIsExposedToPollution] = useState("");
  const [isExposedToSun, setIsExposedToSun] = useState("");
  const [isPregnantOrBreastfeeding, setIsPregnantOrBreastfeeding] =
    useState("");

  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchSkinTypes().then((data) => {
      setSkinTypes(data);
    });
  }, []);

  useEffect(() => {
    fetchSkinConcerns().then((data) => {
      setSkinConcerns(data);
    });
  }, []);

  async function onSubmitBtnHandler(e) {
    e.preventDefault();

    setIsSubmitted(false);

    if (
      !selectedSkinType ||
      !selectedSkinConcern ||
      isSkinSensitive === "" ||
      isExposedToPollution === "" ||
      isExposedToSun === "" ||
      isPregnantOrBreastfeeding === ""
    ) {
      setErrorMessage("Veuillez remplir tous les champs avant de soumettre.");
      return;
    }

    const diagnosticData = {
      id_user: user.id,
      id_skinType: parseInt(selectedSkinType),
      id_skinConcern: parseInt(selectedSkinConcern),
      isSkinSensitive,
      isExposedToPollution,
      isExposedToSun,
      isPregnantOrBreastfeeding,
    };

    try {
      const response = await fetch("/api/v1/diagnostic/create/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diagnosticData),
      });

      const result = await response.json();

      setRecommendedProduct(result.product || null);
      setErrorMessage(
        result.product
          ? ""
          : "Aucun produit adapté n'a été trouvé pour ce diagnostic."
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      setErrorMessage(error.message);
      setRecommendedProduct(null);
      setIsSubmitted(true);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  //function seeMoreBtnHandler(productId) {
  //  navigate(`/product/${productId}`);
  //}

  return (
    <main>
      <h2>Diagnostic de peau</h2>
      <section>
        {successMessage && (
          <p className="success-message" role="status">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="error-message" role="status">
            {errorMessage}
          </p>
        )}
        {user.isLogged ? (
          <form onSubmit={onSubmitBtnHandler}>
            <div>
              <p>Comment décririez-vous votre type de peau ?</p>
              {skinTypes.length > 0 ? (
                skinTypes
                  .filter((skinType) => skinType.label !== "Tous types de peau")
                  .map((skinType) => (
                    <div key={skinType.id}>
                      <input
                        type="radio"
                        name="skinType"
                        id={skinType.label}
                        value={skinType.id}
                        onChange={(e) => {
                          setSelectedSkinType(e.target.value);
                          setErrorMessage("");
                        }}
                      />
                      <label for="skinType">{skinType.label}</label>
                    </div>
                  ))
              ) : (
                <p>Une erreur est survenue</p>
              )}
            </div>
            <div>
              <p>
                Quelle est votre principale préoccupation concernant votre peau
                ?
              </p>
              {skinConcerns.length > 0 ? (
                skinConcerns.map((skinConcern) => (
                  <div key={skinConcern.id}>
                    <input
                      type="radio"
                      name="skinConcern"
                      id={skinConcern.label}
                      value={skinConcern.id}
                      onChange={(e) => {
                        setSelectedSkinConcern(e.target.value);
                        setErrorMessage("");
                      }}
                    />
                    <label for="skinConcern">{skinConcern.label}</label>
                  </div>
                ))
              ) : (
                <p>Une erreur est survenue</p>
              )}
            </div>
            <div>
              <p>
                Votre peau est-elle sensible (rougeurs, tiraillements,
                picotements fréquents) ?
              </p>
              <input
                type="radio"
                name="isSkinSensitive"
                id="isSkinSensitiveYes"
                value="true"
                checked={isSkinSensitive === true}
                onChange={() => {
                  setIsSkinSensitive(true);
                  setErrorMessage("");
                }}
              />
              <label htmlFor="isSkinSensitiveYes">Oui</label>
              <input
                type="radio"
                name="isSkinSensitive"
                id="isSkinSensitiveNo"
                value="false"
                checked={isSkinSensitive === false}
                onChange={() => {
                  setIsSkinSensitive(false);
                  setErrorMessage("");
                }}
              />
              <label htmlFor="isSkinSensitiveNo">Non</label>
            </div>
            <div>
              <p>À quelle fréquence êtes-vous exposé(e) à la pollution ?</p>
              <input
                type="radio"
                name="isExposedToPollution"
                id="isExposedToPollutionYes"
                value="true"
                checked={isExposedToPollution === true}
                onChange={() => {
                  setIsExposedToPollution(true);
                  setErrorMessage("");
                }}
              />
              <label htmlFor="isExposedToPollutionYes">Fréquemment</label>
              <input
                type="radio"
                name="isExposedToPollution"
                id="isExposedToPollutionNo"
                value="false"
                checked={isExposedToPollution === false}
                onChange={() => {
                  setIsExposedToPollution(false);
                  setErrorMessage("");
                }}
              />
              <label htmlFor="isExposedToPollutionNo">Occasionnellement</label>
            </div>
            <div>
              <p>À quelle fréquence vous exposez-vous au soleil ?</p>
              <input
                type="radio"
                name="isExposedToSun"
                id="isExposedToSunYes"
                value="true"
                checked={isExposedToSun === true}
                onChange={() => {
                  setIsExposedToSun(true);
                  setErrorMessage("");
                }}
              />
              <label htmlFor="isExposedToSunYes">Fréquemment</label>
              <input
                type="radio"
                name="isExposedToSun"
                id="isExposedToSunNo"
                value="false"
                checked={isExposedToSun === false}
                onChange={() => {
                  setIsExposedToSun(false);
                  setErrorMessage("");
                }}
              />
              <label htmlFor="isExposedToSunNo">
                Occasionnellement, voire jamais
              </label>
            </div>
            <div>
              <p>
                Êtes-vous actuellement enceinte ou en période d’allaitement ?
              </p>
              <input
                type="radio"
                name="isPregnantOrBreastfeeding"
                id="isPregnantOrBreastfeedingYes"
                value="true"
                checked={isPregnantOrBreastfeeding === true}
                onChange={() => {
                  setIsPregnantOrBreastfeeding(true);
                  setErrorMessage("");
                }}
              />
              <label htmlFor="isPregnantOrBreastfeedingYes">Oui</label>
              <input
                type="radio"
                name="isPregnantOrBreastfeeding"
                id="isPregnantOrBreastfeedingNo"
                value="false"
                checked={isPregnantOrBreastfeeding === false}
                onChange={() => {
                  setIsPregnantOrBreastfeeding(false);
                  setErrorMessage("");
                }}
              />
              <label htmlFor="isPregnantOrBreastfeedingNo">Non</label>
            </div>
            <button type="submit">Envoyer</button>
          </form>
        ) : (
          <div>
            <p>Vous devez être connecté pour accéder à cette page.</p>
            <Link to="/authentification/login">Se connecter</Link>
          </div>
        )}
      </section>
      <section aria-live="polite">
        {isSubmitted && (
          <>
            {recommendedProduct ? (
              <div>
                <h2>Produit Recommandé :</h2>
                <img
                  src={recommendedProduct.image}
                  alt={recommendedProduct.alt}
                />
                <h3>{recommendedProduct.name}</h3>
                <p>{recommendedProduct.description}</p>
                <button
                  onClick={() => navigate(`/product/${recommendedProduct.id}`)}
                  aria-label={`Voir plus de détails sur le produit ${recommendedProduct.name}`}
                >
                  Voir plus
                </button>
              </div>
            ) : (
              <p>Aucun produit ne correspond à vos attentes</p>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Diagnostic;
