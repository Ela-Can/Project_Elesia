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

  // Fetch SkinTypes

  useEffect(() => {
    fetchSkinTypes().then((data) => {
      setSkinTypes(data);
    });
  }, []);

  // Fetch SkinConcerns

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
      id_skinType: parseInt(selectedSkinType, 10),
      id_skinConcern: parseInt(selectedSkinConcern, 10),
      isSkinSensitive: isSkinSensitive ? 1 : 0,
      isExposedToPollution: isExposedToPollution ? 1 : 0,
      isExposedToSun: isExposedToSun ? 1 : 0,
      isPregnantOrBreastfeeding: isPregnantOrBreastfeeding ? 1 : 0,
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

      if (response.status === 404) {
        setErrorMessage(result.message);
        setRecommendedProduct(null);
      } else {
        setRecommendedProduct(result.product || null);
        setErrorMessage(result.message ? "" : "Aucun produit adapté trouvé.");
      }

      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(error.message);
      setRecommendedProduct(null);
      setIsSubmitted(true);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      <h2>Diagnostic de peau</h2>
      <section>
        {user.isLogged ? (
          <form onSubmit={onSubmitBtnHandler}>
            <div className="diagnostic_question">
              <p>Comment décririez-vous votre type de peau ?</p>
              {skinTypes.length > 0 ? (
                skinTypes
                  .filter((skinType) => skinType.label !== "Tous types de peau")
                  .map((skinType) => (
                    <div key={skinType.id}>
                      <input
                        type="radio"
                        name="skinType"
                        id="skinType"
                        value={skinType.id}
                        onChange={(e) => {
                          setSelectedSkinType(e.target.value);
                          setErrorMessage("");
                        }}
                      />
                      <label htmlFor="skinType">{skinType.label}</label>
                    </div>
                  ))
              ) : (
                <p>Une erreur est survenue</p>
              )}
            </div>
            <div className="diagnostic_question">
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
                      id="skinConcern"
                      value={skinConcern.id}
                      onChange={(e) => {
                        setSelectedSkinConcern(e.target.value);
                        setErrorMessage("");
                      }}
                    />
                    <label htmlFor="skinConcern">{skinConcern.label}</label>
                  </div>
                ))
              ) : (
                <p>Une erreur est survenue</p>
              )}
            </div>
            <div className="diagnostic_question">
              <p>
                Votre peau est-elle sensible (rougeurs, tiraillements,
                picotements fréquents) ?
              </p>
              <div>
                <input
                  type="radio"
                  name="isSkinSensitive"
                  id="isSkinSensitiveYes"
                  value="1"
                  //checked={isSkinSensitive === 1}
                  onChange={() => {
                    setIsSkinSensitive(1);
                    setErrorMessage("");
                  }}
                />
                <label htmlFor="isSkinSensitiveYes">Oui</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="isSkinSensitive"
                  id="isSkinSensitiveNo"
                  value="0"
                  //checked={isSkinSensitive === 0}
                  onChange={() => {
                    setIsSkinSensitive(0);
                    setErrorMessage("");
                  }}
                />
                <label htmlFor="isSkinSensitiveNo">Non</label>
              </div>
            </div>
            <div className="diagnostic_question">
              <p>À quelle fréquence êtes-vous exposé(e) à la pollution ?</p>
              <div>
                <input
                  type="radio"
                  name="isExposedToPollution"
                  id="isExposedToPollutionYes"
                  value="1"
                  //checked={isExposedToPollution === 1}
                  onChange={() => {
                    setIsExposedToPollution(1);
                    setErrorMessage("");
                  }}
                />

                <label htmlFor="isExposedToPollutionYes">Fréquemment</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="isExposedToPollution"
                  id="isExposedToPollutionNo"
                  value="0"
                  //checked={isExposedToPollution === 0}
                  onChange={() => {
                    setIsExposedToPollution(0);
                    setErrorMessage("");
                  }}
                />
                <label htmlFor="isExposedToPollutionNo">
                  Occasionnellement
                </label>
              </div>
            </div>
            <div className="diagnostic_question">
              <p>À quelle fréquence vous exposez-vous au soleil ?</p>
              <div>
                <input
                  type="radio"
                  name="isExposedToSun"
                  id="isExposedToSunYes"
                  value="1"
                  //checked={isExposedToSun === 1}
                  onChange={() => {
                    setIsExposedToSun(1);
                    setErrorMessage("");
                  }}
                />
                <label htmlFor="isExposedToSunYes">Fréquemment</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="isExposedToSun"
                  id="isExposedToSunNo"
                  value="0"
                  //checked={isExposedToSun === 0}
                  onChange={() => {
                    setIsExposedToSun(0);
                    setErrorMessage("");
                  }}
                />
                <label htmlFor="isExposedToSunNo">
                  Occasionnellement, voire jamais
                </label>
              </div>
            </div>
            <div className="diagnostic_question">
              <p>
                Êtes-vous actuellement enceinte ou en période d’allaitement ?
              </p>
              <div>
                <input
                  type="radio"
                  name="isPregnantOrBreastfeeding"
                  id="isPregnantOrBreastfeedingYes"
                  value="1"
                  //checked={isPregnantOrBreastfeeding === 1}
                  onChange={() => {
                    setIsPregnantOrBreastfeeding(1);
                    setErrorMessage("");
                  }}
                />
                <label htmlFor="isPregnantOrBreastfeedingYes">Oui</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="isPregnantOrBreastfeeding"
                  id="isPregnantOrBreastfeedingNo"
                  value="0"
                  //checked={isPregnantOrBreastfeeding === 0}
                  onChange={() => {
                    setIsPregnantOrBreastfeeding(0);
                    setErrorMessage("");
                  }}
                />
                <label htmlFor="isPregnantOrBreastfeedingNo">Non</label>
              </div>
            </div>
            <button type="submit">Envoyer</button>
          </form>
        ) : (
          <div className="redirection">
            <p>Vous devez être connecté pour accéder à cette page.</p>
            <Link to="/authentification/login" tabIndex="0" className="link">
              Connectez-vous
            </Link>
          </div>
        )}
      </section>
      <section aria-live="polite" className="product_details_section">
        {isSubmitted && (
          <>
            {recommendedProduct ? (
              <>
                <h3>Produit recommandé</h3>
                <div className="product_details_top">
                  <img
                    src={recommendedProduct.image}
                    alt={recommendedProduct.alt}
                  />
                  <div>
                    <h4>{recommendedProduct.name}</h4>
                    <p>{recommendedProduct.description}</p>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/product/${recommendedProduct.id}`)
                    }
                    aria-label={`Voir plus de détails sur le produit ${recommendedProduct.name}`}
                  >
                    Voir plus
                  </button>
                </div>
              </>
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
