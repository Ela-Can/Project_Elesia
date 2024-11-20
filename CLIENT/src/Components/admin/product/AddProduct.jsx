import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, addProducts } from "../../../store/slices/product.js";

function AddProduct() {
  const dispatch = useDispatch();

  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    ingredients: "",
    howToUse: "",
    useDuration: "",
    precautions: "",
    packaging: "",
    image: null,
    alt: "",
    isOnline: "",
    id_skinType: "",
    id_skinConcern: "",
    adaptedToSensitiveSkin: "",
    protectsFromPollution: "",
    protectsFromSun: "",
    compatibleWithPregOrBreastfeed: "",
    id_category: "",
  });

  const [categories, setCategories] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
  const [skinConcerns, setSkinConcerns] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/v1/category/list");
      const data = await response.json();
      console.log("categories récupérées :", data);
      setCategories(data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchSkinTypes() {
      const response = await fetch("/api/v1/skintype/list");
      const data = await response.json();
      console.log("skinType récupérées :", data);
      setSkinTypes(data);
    }
    fetchSkinTypes();
  }, []);

  useEffect(() => {
    async function fetchSkinConcerns() {
      const response = await fetch("/api/v1/skinconcern/list");
      const data = await response.json();
      console.log("skinconcern récupérées :", data);
      setSkinConcerns(data);
    }
    fetchSkinConcerns();
  }, []);

  function onChangeProductInfo(name, value) {
    console.log(`Changement dans le champ ${name} :`, value);
    setCreateForm((prevState) => ({
      ...prevState,
      [name]: isNaN(value) ? value : Number(value),
    }));
  }

  function onChangeProductImage(e) {
    const file = e.target.files[0];
    console.log("Fichier image sélectionné :", file);
    if (file) {
      setCreateForm((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  }

  async function onSubmitAddProduct(e) {
    e.preventDefault();

    //const payload = {
    //  ...createForm,
    //  id_skinType: parseInt(createForm.id_skinType, 10),
    //  id_skinConcern: parseInt(createForm.id_skinConcern, 10),
    //  id_category: parseInt(createForm.id_category, 10),
    //  adaptedToSensitiveSkin: parseInt(createForm.adaptedToSensitiveSkin, 10),
    //  protectsFromPollution: parseInt(createForm.protectsFromPollution, 10),
    //  protectsFromSun: parseInt(createForm.protectsFromSun, 10),
    //  compatibleWithPregOrBreastfeed: parseInt(
    //    createForm.compatibleWithPregOrBreastfeed,
    //    10
    //  ),
    //};

    //console.log("Données envoyées au backend :", payload);

    const formData = new FormData();

    for (const key in createForm) {
      if (
        [
          "id_skinType",
          "id_skinConcern",
          "adaptedToSensitiveSkin",
          "protectsFromPollution",
          "protectsFromSun",
          "compatibleWithPregOrBreastfeed",
          "id_category",
          "isOnline",
        ].includes(key)
      ) {
        formData.append(key, Number(createForm[key]));
      } else {
        formData.append(key, createForm[key]);
      }
    }

    const imageFile = createForm.image;
    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      console.error("Aucun fichier image sélectionné");
      return;
    }

    console.log("FormData avant envoi :");

    try {
      const response = await fetch("api/v1/product/create/productImg", {
        method: "POST",
        //headers: {
        //  "Content-Type": "application/json",
        //},
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(addProducts(data));
      }

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(
          `Erreur lors de l'ajout de la catégorie (HTTP ${response.status}): ${errorMessage}`
        );
        alert(
          `Erreur: Impossible d'ajouter le produit. Veuillez vérifier les informations saisies.\nDétails: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête : ", error);
    }
  }

  return (
    <form onSubmit={onSubmitAddProduct} encType="multipart/form-data">
      <label htmlFor="name">Nom du produit : </label>
      <input
        type="text"
        name="name"
        value={createForm.name}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
        required
      />

      <label htmlFor="description">Description du produit : </label>
      <input
        type="text"
        name="description"
        value={createForm.description}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
        required
      />

      <label htmlFor="ingredients">Ingrédients : </label>
      <input
        type="text"
        name="ingredients"
        value={createForm.ingredients}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
        required
      />

      <label htmlFor="howToUse">Conseils d'utilisation : </label>
      <input
        type="text"
        name="howToUse"
        value={createForm.howToUse}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
        required
      />

      <label htmlFor="precautions">Précautions d'emploi : </label>
      <input
        type="text"
        name="precautions"
        value={createForm.precautions}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
        required
      />

      <label htmlFor="useDuration">Durée d'utilisation : </label>
      <input
        type="text"
        name="useDuration"
        value={createForm.useDuration}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
        required
      />

      <label htmlFor="packaging">Packaging : </label>
      <input
        type="text"
        name="packaging"
        value={createForm.packaging}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
        required
      />

      <label htmlFor="image">Image : </label>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={onChangeProductImage}
        required
      />

      <label htmlFor="alt">Description de l'image : </label>
      <input
        type="text"
        name="alt"
        value={createForm.alt}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
        required
      />

      <label htmlFor="id_category">Catégorie :</label>
      <select
        name="id_category"
        id="id_category"
        value={createForm.id_category}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      >
        <option value="">Sélectionnez une catégorie</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        ))}
      </select>

      <label htmlFor="id_skinType">Type de peau :</label>
      <select
        name="id_skinType"
        id="id_skinType"
        value={createForm.id_skinType}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      >
        <option value="">Sélectionnez un type de peau</option>
        {skinTypes.map((skinType) => (
          <option key={skinType.id} value={skinType.id}>
            {skinType.label}
          </option>
        ))}
      </select>

      <label htmlFor="id_skinConcern">Préoccupation :</label>
      <select
        name="id_skinConcern"
        id="id_skinConcern"
        value={createForm.id_skinConcern}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      >
        <option value="">Sélectionnez une préoccupation</option>
        {skinConcerns.map((skinConcern) => (
          <option key={skinConcern.id} value={skinConcern.id}>
            {skinConcern.label}
          </option>
        ))}
      </select>

      <label htmlFor="adapatedToSensitiveSkin">
        Produit adapté aux peaux sensibles ?
      </label>
      <select
        name="adaptedToSensitiveSkin"
        id="adaptedToSensitiveSkin"
        value={createForm.adaptedToSensitiveSkin}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
        required
      >
        <option value="">Sélectionnez une option</option>
        <option value="1">Oui</option>
        <option value="0">Non</option>
      </select>

      <label htmlFor="protectsFromPollution">
        Produit protegeant de la pollution
      </label>
      <select
        name="protectsFromPollution"
        id="protectsFromPollution"
        value={createForm.protectsFromPollution}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
        required
      >
        <option value="">Sélectionnez une option</option>
        <option value="1">Oui</option>
        <option value="0">Non</option>
      </select>

      <label htmlFor="protectsFromSun">Produit protegeant du soleil</label>
      <select
        name="protectsFromSun"
        id="protectsFromSun"
        value={createForm.protectsFromSun}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
        required
      >
        <option value="">Sélectionnez une option</option>
        <option value="1">Oui</option>
        <option value="0">Non</option>
      </select>

      <label htmlFor="compatibleWithPregOrBreastfeed">
        Produit compatible avec la grossesse et l'allaitemment
      </label>
      <select
        name="compatibleWithPregOrBreastfeed"
        id="compatibleWithPregOrBreastfeed"
        value={createForm.compatibleWithPregOrBreastfeed}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
        required
      >
        <option value="">Sélectionnez une option</option>
        <option value="1">Oui</option>
        <option value="0">Non</option>
      </select>

      <label htmlFor="isOnline">Produit visible sur le site</label>
      <select
        name="isOnline"
        id="isOnline"
        value={createForm.isOnline}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
        required
      >
        <option value="">Sélectionnez une option</option>
        <option value="1">Oui</option>
        <option value="0">Non</option>
      </select>

      <button type="submit">Ajouter le produit</button>
    </form>
  );
}
export default AddProduct;
