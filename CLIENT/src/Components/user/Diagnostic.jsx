import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setSkinType } from "../../StoreRedux/slices/skinType.js";
import { setSkinConcern } from "../../StoreRedux/slices/skinConcern.js";
import useCheckAuth from "../../Hook/useCheckAuth.jsx";

function Diagnostic() {
  const [user, isLoading] = useCheckAuth();

  const [selectedSkinType, setSelectedSkinType] = useState(null);
  const [selectedSkinConcern, setSelectedSkinConcern] = useState(null);
  const [isSkinSensitive, setIsSkinSensitive] = useState("");
  const [isExposedToPollution, setIsExposedToPollution] = useState("");
  const [isExposedToSun, setIsExposedToSun] = useState("");
  const [isPregnantOrBreastfeeding, setIsPregnantOrBreastfeeding] =
    useState("");

  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  //const user = useSelector((state) => state.user);
  //console.log("User ID dans le composant :", user);

  const skinTypeList = useSelector((state) => state.skinType.skinTypeList);
  console.log("Les skinTypes dans le composant :", skinTypeList);

  const skinConcernList = useSelector(
    (state) => state.skinConcern.skinConcernList
  );
  console.log("Les skinTypes dans le composant :", skinConcernList);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchSkinTypes() {
      const response = await fetch("/api/v1/skintype/list");
      const data = await response.json();
      dispatch(setSkinType(data));
    }
    fetchSkinTypes();
  }, []);

  useEffect(() => {
    async function fetchSkinConcerns() {
      const response = await fetch("/api/v1/skinconcern/list");
      const data = await response.json();
      dispatch(setSkinConcern(data));
    }
    fetchSkinConcerns();
  }, []);

  async function onSubmitBtnHandler(e) {
    e.preventDefault();

    const diagnosticData = {
      id_user: user.id,
      id_skinType: parseInt(selectedSkinType),
      id_skinConcern: parseInt(selectedSkinConcern),
      isSkinSensitive,
      isExposedToPollution,
      isExposedToSun,
      isPregnantOrBreastfeeding,
    };
    console.log(diagnosticData);
    try {
      const response = await fetch(
        "/api/v1/diagnostic/create/",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(diagnosticData),
        },
        []
      );

      console.log("Statut de la réponse du backend :", response.status);
      console.log("Réponse complète du backend :", response);
      if (!response.ok) {
        throw new Error("Erreur lors de la création du diagnostic");
      }
      const result = await response.json();
      console.log("Diagnostic créé avec succès :", result);
      setRecommendedProduct(result.product);

      if (result.product) {
        setRecommendedProduct(result.product);
        setErrorMessage("");
      } else {
        setRecommendedProduct(null);
        setErrorMessage(
          "Aucun produit adapté n'a été trouvé pour ce diagnostic."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      setErrorMessage(error.message);
    }
    console.log("user IF", user.id);
    console.log("Type de peau sélectionné :", selectedSkinType);
    console.log("Préoccupation principale sélectionnée :", selectedSkinConcern);
    console.log("Peau sensible :", isSkinSensitive);
    console.log("Exposition à la pollution :", isExposedToPollution);
    console.log("Exposition au soleil :", isExposedToSun);
    console.log("Enceinte ou allaitement :", isPregnantOrBreastfeeding);
  }

  if (isLoading) {
    return <p>Vérification de l'authentification en cours...</p>;
  }

  return (
    <>
      <form onSubmit={onSubmitBtnHandler}>
        <div>
          <p>Quel est votre type de peau</p>
          {skinTypeList.length > 0 ? (
            skinTypeList.map((skinType) => (
              <div key={skinType.id}>
                <input
                  type="radio"
                  name="skinType"
                  id={skinType.label}
                  value={skinType.id}
                  onChange={(e) => {
                    console.log(
                      "Nouveau type de peau sélectionné :",
                      e.target.value
                    );
                    setSelectedSkinType(e.target.value);
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
          <p>Quelle est votre principale préoccupation</p>
          {skinConcernList.length > 0 ? (
            skinConcernList.map((skinConcern) => (
              <div key={skinConcern.id}>
                <input
                  type="radio"
                  name="skinConcern"
                  id={skinConcern.label}
                  value={skinConcern.id}
                  onChange={(e) => setSelectedSkinConcern(e.target.value)}
                />
                <label for="skinConcern">{skinConcern.label}</label>
              </div>
            ))
          ) : (
            <p>Une erreur est survenue</p>
          )}
        </div>
        <div>
          <p>Votre peau est-elle sensible ?</p>
          <input
            type="radio"
            name="isSkinSensitive"
            id="isSkinSensitiveYes"
            value="true"
            checked={isSkinSensitive === true}
            onChange={() => setIsSkinSensitive(true)}
          />
          <label htmlFor="isSkinSensitiveYes">Oui</label>
          <input
            type="radio"
            name="isSkinSensitive"
            id="isSkinSensitiveNo"
            value="false"
            checked={isSkinSensitive === false}
            onChange={() => setIsSkinSensitive(false)}
          />
          <label htmlFor="isSkinSensitiveNo">Non</label>
        </div>
        <div>
          <p>A quelle fréquence êtes-vous exposé à la pollution ?</p>
          <input
            type="radio"
            name="isExposedToPollution"
            id="isExposedToPollutionYes"
            value="true"
            checked={isExposedToPollution === true}
            onChange={() => setIsExposedToPollution(true)}
          />
          <label htmlFor="isExposedToPollutionYes">Fréquemment</label>
          <input
            type="radio"
            name="isExposedToPollution"
            id="isExposedToPollutionNo"
            value="false"
            checked={isExposedToPollution === false}
            onChange={() => setIsExposedToPollution(false)}
          />
          <label htmlFor="isExposedToPollutionNo">Occasionnellement</label>
        </div>
        <div>
          <p>A quelle fréquence vous exposez-vous au soleil ?</p>
          <input
            type="radio"
            name="isExposedToSun"
            id="isExposedToSunYes"
            value="true"
            checked={isExposedToSun === true}
            onChange={() => setIsExposedToSun(true)}
          />
          <label htmlFor="isExposedToSunYes">Fréquemment</label>
          <input
            type="radio"
            name="isExposedToSun"
            id="isExposedToSunNo"
            value="false"
            checked={isExposedToSun === false}
            onChange={() => setIsExposedToSun(false)}
          />
          <label htmlFor="isExposedToSunNo">
            Occasionnellement, voire jamais
          </label>
        </div>
        <div>
          <p>Etes-vous enceinte ou allaitez-vous ?</p>
          <input
            type="radio"
            name="isPregnantOrBreastfeeding"
            id="isPregnantOrBreastfeedingYes"
            value="true"
            checked={isPregnantOrBreastfeeding === true}
            onChange={() => setIsPregnantOrBreastfeeding(true)}
          />
          <label htmlFor="isPregnantOrBreastfeedingYes">Oui</label>
          <input
            type="radio"
            name="isPregnantOrBreastfeeding"
            id="isPregnantOrBreastfeedingNo"
            value="false"
            checked={isPregnantOrBreastfeeding === false}
            onChange={() => setIsPregnantOrBreastfeeding(false)}
          />
          <label htmlFor="isPregnantOrBreastfeedingNo">Non</label>
        </div>
        <button type="submit">Envoyer</button>
        {recommendedProduct && (
          <div className="product-recommendation">
            <h2>Produit Recommandé :</h2>
            <div>
              <img
                src={recommendedProduct.image}
                alt={recommendedProduct.alt}
              />
              <h3>{recommendedProduct.name}</h3>
              <p>{recommendedProduct.description}</p>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default Diagnostic;
