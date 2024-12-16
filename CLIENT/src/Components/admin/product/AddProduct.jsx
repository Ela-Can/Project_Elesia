import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProducts } from "../../../store/slices/product.js";

import {
  fetchCategories,
  fetchSkinTypes,
  fetchSkinConcerns,
} from "../../../services/api.js";

function AddProduct() {
  const dispatch = useDispatch();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [file, setFile] = useState(null);

  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    ingredients: "",
    howToUse: "",
    precautions: "",
    useDuration: "",
    packaging: "",
    alt: "",
    id_skinType: "",
    id_skinConcern: "",
    id_category: "",
    adaptedToSensitiveSkin: "",
    protectsFromPollution: "",
    protectsFromSun: "",
    compatibleWithPregOrBreastfeed: "",
    isOnline: "",
  });

  const [categories, setCategories] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
  const [skinConcerns, setSkinConcerns] = useState([]);

  // Fetch Categories

  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
    });
  }, []);

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

  function onChangeProductInfo(e) {
    const { name, value } = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
    setSuccessMessage("");
    setErrorMessage("");
  }

  function onChangeProductImage(e) {
    setFile(e.target.files[0]);
    setSuccessMessage("");
    setErrorMessage("");
  }

  async function onSubmitAddProduct(e) {
    e.preventDefault();

    try {
      const requiredFields = [
        "name",
        "description",
        "ingredients",
        "howToUse",
        "precautions",
        "useDuration",
        "packaging",
        "alt",
        "id_skinType",
        "id_skinConcern",
        "id_category",
        "adaptedToSensitiveSkin",
        "protectsFromPollution",
        "protectsFromSun",
        "compatibleWithPregOrBreastfeed",
        "isOnline",
      ];

      for (const field of requiredFields) {
        if (!createForm[field] || createForm[field].trim() === "") {
          setErrorMessage(`Le champ "${field}" est requis.`);
          return;
        }
      }

      if (!file) {
        setErrorMessage("L'image du produit est requise.");
        return;
      }

      const data = new FormData();

      Object.keys(createForm).forEach((key) => {
        data.append(key, createForm[key]);
      });

      if (file) {
        data.append("image", file);
      }

      const response = await fetch("api/v1/product/create/productImg", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        setErrorMessage(
          error.error || "Une erreur s'est produite. Veuillez réessayer."
        );
        return;
      }

      const result = await response.json();

      const newProduct = { id: result.id, ...createForm, image: result.image };
      dispatch(addProducts(newProduct));

      setCreateForm({
        name: "",
        description: "",
        ingredients: "",
        howToUse: "",
        precautions: "",
        useDuration: "",
        packaging: "",
        alt: "",
        id_skinType: "",
        id_skinConcern: "",
        id_category: "",
        adaptedToSensitiveSkin: "",
        protectsFromPollution: "",
        protectsFromSun: "",
        compatibleWithPregOrBreastfeed: "",
        isOnline: "",
      });
      setFile((e.target.value = ""));
      setSuccessMessage("Produit créé avec succès !");
    } catch (error) {
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  }

  return (
    <>
      {errorMessage && (
        <p className="error-message" role="alert">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p className="success-message" role="status">
          {successMessage}
        </p>
      )}

      <form onSubmit={onSubmitAddProduct} noValidate>
        <div>
          <label htmlFor="name">Nom du produit : </label>
          <input
            type="text"
            name="name"
            value={createForm.name}
            onChange={onChangeProductInfo}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description du produit : </label>
          <input
            type="text"
            name="description"
            value={createForm.description}
            onChange={onChangeProductInfo}
            required
          />
        </div>

        <div>
          <label htmlFor="ingredients">Ingrédients : </label>
          <input
            type="text"
            name="ingredients"
            value={createForm.ingredients}
            onChange={onChangeProductInfo}
            required
          />
        </div>

        <div>
          <label htmlFor="howToUse">Conseils d'utilisation : </label>
          <input
            type="text"
            name="howToUse"
            value={createForm.howToUse}
            onChange={onChangeProductInfo}
            required
          />
        </div>

        <div>
          <label htmlFor="precautions">Précautions d'emploi : </label>
          <input
            type="text"
            name="precautions"
            value={createForm.precautions}
            onChange={onChangeProductInfo}
            required
          />
        </div>

        <div>
          <label htmlFor="useDuration">Durée d'utilisation : </label>
          <input
            type="text"
            name="useDuration"
            value={createForm.useDuration}
            onChange={onChangeProductInfo}
            required
          />
        </div>

        <div>
          <label htmlFor="packaging">Packaging : </label>
          <input
            type="text"
            name="packaging"
            value={createForm.packaging}
            onChange={onChangeProductInfo}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Image : </label>
          <input
            type="file"
            name="image"
            onChange={onChangeProductImage}
            required
          />
        </div>

        <div>
          <label htmlFor="alt">Description de l'image : </label>
          <input
            type="text"
            name="alt"
            value={createForm.alt}
            onChange={onChangeProductInfo}
            required
          />
        </div>

        <div>
          <label htmlFor="id_category">Catégorie :</label>
          <select
            name="id_category"
            id="id_category"
            value={createForm.id_category}
            onChange={onChangeProductInfo}
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="id_skinType">Type de peau :</label>
          <select
            name="id_skinType"
            id="id_skinType"
            value={createForm.id_skinType}
            onChange={onChangeProductInfo}
          >
            <option value="">Sélectionnez un type de peau</option>
            {skinTypes.map((skinType) => (
              <option key={skinType.id} value={skinType.id}>
                {skinType.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="id_skinConcern">Préoccupation :</label>
          <select
            name="id_skinConcern"
            id="id_skinConcern"
            value={createForm.id_skinConcern}
            onChange={onChangeProductInfo}
          >
            <option value="">Sélectionnez une préoccupation</option>
            {skinConcerns.map((skinConcern) => (
              <option key={skinConcern.id} value={skinConcern.id}>
                {skinConcern.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="adapatedToSensitiveSkin">
            Produit adapté aux peaux sensibles ?
          </label>
          <select
            name="adaptedToSensitiveSkin"
            id="adaptedToSensitiveSkin"
            value={createForm.adaptedToSensitiveSkin}
            onChange={onChangeProductInfo}
            required
          >
            <option value="">Sélectionnez une option</option>
            <option value="1">Oui</option>
            <option value="0">Non</option>
          </select>
        </div>

        <div>
          <label htmlFor="protectsFromPollution">
            Produit protegeant de la pollution
          </label>
          <select
            name="protectsFromPollution"
            id="protectsFromPollution"
            value={createForm.protectsFromPollution}
            onChange={onChangeProductInfo}
            required
          >
            <option value="">Sélectionnez une option</option>
            <option value="1">Oui</option>
            <option value="0">Non</option>
          </select>
        </div>

        <div>
          <label htmlFor="protectsFromSun">Produit protegeant du soleil</label>
          <select
            name="protectsFromSun"
            id="protectsFromSun"
            value={createForm.protectsFromSun}
            onChange={onChangeProductInfo}
            required
          >
            <option value="">Sélectionnez une option</option>
            <option value="1">Oui</option>
            <option value="0">Non</option>
          </select>
        </div>

        <div>
          <label htmlFor="compatibleWithPregOrBreastfeed">
            Produit compatible avec la grossesse et l'allaitemment
          </label>
          <select
            name="compatibleWithPregOrBreastfeed"
            id="compatibleWithPregOrBreastfeed"
            value={createForm.compatibleWithPregOrBreastfeed}
            onChange={onChangeProductInfo}
            required
          >
            <option value="">Sélectionnez une option</option>
            <option value="1">Oui</option>
            <option value="0">Non</option>
          </select>
        </div>

        <div>
          <label htmlFor="isOnline">Produit visible sur le site</label>
          <select
            name="isOnline"
            id="isOnline"
            value={createForm.isOnline}
            onChange={onChangeProductInfo}
            required
          >
            <option value="">Sélectionnez une option</option>
            <option value="1">Oui</option>
            <option value="0">Non</option>
          </select>
        </div>

        <button type="submit">Ajouter le produit</button>
      </form>
    </>
  );
}
export default AddProduct;
