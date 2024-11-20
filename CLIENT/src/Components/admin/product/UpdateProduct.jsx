import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, updateProducts } from "../../../store/slices/product.js";

function UpdateProduct({ product, productId, setIsEditing }) {
  //const productList = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();

  const [updateForm, setUpdateForm] = useState({
    name: product.name,
    description: product.description,
    ingredients: product.ingredients,
    howToUse: product.howToUse,
    precautions: product.precautions,
    useDuration: product.useDuration,
    packaging: product.packaging,
    image: null,
    alt: product.alt,
    adaptedToSensitiveSkin: product.adaptedToSensitiveSkin_value,
    protectsFromPollution: product.protectsFromPollution_value,
    protectsFromSun: product.protectsFromSun_value,
    compatibleWithPregOrBreastfeed:
      product.compatibleWithPregOrBreastfeed_value,
    category: product.category,
    skinType: product.skinType,
    skinConcern: product.skinConcern,
    isOnline: product.isOnline_value,
  });

  const [categories, setCategories] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
  const [skinConcerns, setSkinConcerns] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/v1/product/list");
      const data = await response.json();
      console.log("produits récupérées :", data);
      dispatch(setProducts(data));
    }
    fetchProducts();
  }, []);

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
    setUpdateForm((prevState) => ({
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

  async function onSubmitUpdateProduct(e) {
    e.preventDefault();

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

    try {
      const response = await fetch(
        `/api/v1/product/update/productImg/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateForm),
        }
      );

      if (response.ok) {
        const updatedProduct = await response.json();
        console.log("Product modifié avec succès :", updatedProduct);
        dispatch(
          updateProducts({ id: productId, updatedData: updatedProduct })
        );

        setIsEditing(false);
      } else {
        const errorDetails = await response.text();
        console.error(
          "Erreur lors de la modif de la catégorie :",
          response.status,
          response.statusText,
          errorDetails
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête : ", error);
    }
  }

  return (
    <form onSubmit={onSubmitUpdateProduct}>
      <label htmlFor="name">Nom du produit : </label>
      <input
        type="text"
        name="name"
        value={updateForm.name}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      />
      <label htmlFor="description">Description du produit : </label>
      <textarea
        name="description"
        id="description"
        value={updateForm.description}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      ></textarea>
      <label htmlFor="ingredients">Ingrédients du produit : </label>
      <textarea
        name="ingredients"
        id="ingredients"
        value={updateForm.ingredients}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      ></textarea>
      <label htmlFor="howToUse">Conseils d'utilisation : </label>
      <input
        type="text"
        name="howToUse"
        value={updateForm.howToUse}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      />
      <label htmlFor="precautions">Précautions d'emploi : </label>
      <input
        type="text"
        name="precautions"
        value={updateForm.precautions}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      />
      <label htmlFor="useDuration">Date limite d'utilisation : </label>
      <input
        type="text"
        name="useDuration"
        value={updateForm.useDuration}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      />
      <label htmlFor="packaging">Packaging : </label>
      <input
        type="text"
        name="packaging"
        value={updateForm.packaging}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      />

      <label htmlFor="image">Image du produit</label>
      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        onChange={onChangeProductImage}
      />

      <label htmlFor="alt">Description de l'image : </label>
      <input
        type="text"
        name="alt"
        value={updateForm.alt}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      />

      <label htmlFor="adaptedToSensitiveSkin">
        Produit adapaté aux peaux sensibles ?
      </label>
      <select
        name="adaptedToSensitiveSkin"
        value={updateForm.adaptedToSensitiveSkin}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      >
        <option value="">Sélectionnez une réponse</option>
        <option value={1}>Oui</option>
        <option value={0}>Non</option>
      </select>

      <label htmlFor="protectsFromPollution">
        Produit protegeant de la pollution ?
      </label>
      <select
        name="protectsFromPollution"
        value={updateForm.protectsFromPollution}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      >
        <option value="">Sélectionnez une réponse</option>
        <option value={1}>Oui</option>
        <option value={0}>Non</option>
      </select>

      <label htmlFor="protectsFromSun">Produit protegeant du soleil ?</label>
      <select
        name="protectsFromSun"
        value={updateForm.protectsFromSun}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      >
        <option value="">Sélectionnez une réponse</option>
        <option value={1}>Oui</option>
        <option value={0}>Non</option>
      </select>

      <label htmlFor="compatibleWithPregOrBreastfeed">
        Compatible avec la grossesse et l'allaitemment ?
      </label>
      <select
        name="compatibleWithPregOrBreastfeed"
        value={updateForm.compatibleWithPregOrBreastfeed}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      >
        <option value="">Sélectionnez une réponse</option>
        <option value={1}>Oui</option>
        <option value={0}>Non</option>
      </select>

      <label htmlFor="category">Catégorie :</label>
      <select
        name="category"
        value={updateForm.category}
        onChange={(e) =>
          onChangeProductInfo(e.target.name, parseInt(e.target.value))
        }
      >
        <option value="">Sélectionnez une catégorie</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        ))}
      </select>

      <label htmlFor="skinType">Type de peau :</label>
      <select
        name="skinType"
        value={updateForm.skinType}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      >
        <option value="">Sélectionnez un type de peau</option>
        {skinTypes.map((skinType) => (
          <option key={skinType.id} value={skinType.id}>
            {skinType.label}
          </option>
        ))}
      </select>

      <label htmlFor="skinConcern">Préoccupation :</label>
      <select
        name="skinConcern"
        value={updateForm.skinConcern}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      >
        <option value="">Sélectionnez une préoccupation</option>
        {skinConcerns.map((skinConcern) => (
          <option key={skinConcern.id} value={skinConcern.id}>
            {skinConcern.label}
          </option>
        ))}
      </select>

      <label htmlFor="isOnline">Produit visible ?</label>
      <select
        name="isOnline"
        value={updateForm.isOnline}
        onChange={(e) => onChangeProductInfo(e.target.name, e.target.value)}
      >
        <option value="">Sélectionnez une réponse</option>
        <option value={1}>Oui</option>
        <option value={0}>Non</option>
      </select>

      <button type="submit">Enregistrer</button>
    </form>
  );
}

export default UpdateProduct;
