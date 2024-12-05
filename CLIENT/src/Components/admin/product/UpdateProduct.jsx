import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, updateProducts } from "../../../store/slices/product.js";

function UpdateProduct({
  product,
  productId,
  setIsEditing,
  setErrorMessage,
  setSuccessMessage,
  onCloseOrCancel,
}) {
  //const productList = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const [updateForm, setUpdateForm] = useState({
    name: "",
    description: "",
    ingredients: "",
    howToUse: "",
    precautions: "",
    useDuration: "",
    packaging: "",
    alt: "",
    adaptedToSensitiveSkin: "",
    protectsFromPollution: "",
    protectsFromSun: "",
    compatibleWithPregOrBreastfeed: "",
    id_category: "",
    id_skinType: "",
    id_skinConcern: "",
    isOnline: "",
    image: "",
  });

  useEffect(() => {
    if (product) {
      setUpdateForm({
        name: product.name,
        description: product.description,
        ingredients: product.ingredients,
        howToUse: product.howToUse,
        precautions: product.precautions,
        useDuration: product.useDuration,
        packaging: product.packaging,
        alt: product.alt,
        adaptedToSensitiveSkin: product.adaptedToSensitiveSkin,
        protectsFromPollution: product.protectsFromPollution,
        protectsFromSun: product.protectsFromSun,
        compatibleWithPregOrBreastfeed: product.compatibleWithPregOrBreastfeed,
        id_category: product.category,
        id_skinType: product.skinType,
        id_skinConcern: product.skinConcern,
        isOnline: product.isOnline,
        image: product.image,
      });
    }
  }, [product]);

  const [categories, setCategories] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
  const [skinConcerns, setSkinConcerns] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/v1/product/list");
      const data = await response.json();
      dispatch(setProducts(data));
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/v1/category/list");
      const data = await response.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchSkinTypes() {
      const response = await fetch("/api/v1/skintype/list");
      const data = await response.json();
      setSkinTypes(data);
    }
    fetchSkinTypes();
  }, []);

  useEffect(() => {
    async function fetchSkinConcerns() {
      const response = await fetch("/api/v1/skinconcern/list");
      const data = await response.json();
      setSkinConcerns(data);
    }
    fetchSkinConcerns();
  }, []);

  function onChangeProductInfo(e) {
    const { name, value } = e.target;
    setUpdateForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function onChangeProductImage(e) {
    setFile(e.target.files[0]);
  }

  async function onSubmitUpdateProduct(e) {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(updateForm).forEach((key) => {
        if (key === "image" && file) {
          data.append("image", file);
        } else if (key === "image") {
          data.append("image", updateForm.image);
        } else {
          data.append(key, updateForm[key]);
        }
      });

      const response = await fetch(
        `/api/v1/product/update/productImg/${productId}`,
        {
          method: "PATCH",
          body: data,
        }
      );

      const result = await response.json();

      const updatedProduct = {
        id: productId,
        ...updateForm,
        image: result.image || updateForm.image,
      };

      dispatch(updateProducts({ id: product.id, updatedData: updatedProduct }));
      setSuccessMessage("Produit mis à jour avec succès !");
      setIsEditing(false);
      onCloseOrCancel();
    } catch (error) {
      setErrorMessage("Une erreur s'est produite lors de la mise à jour.");
    }
  }

  return (
    <form onSubmit={onSubmitUpdateProduct}>
      <div>
        <label htmlFor="name">Nom du produit : </label>
        <input
          type="text"
          name="name"
          value={updateForm.name}
          onChange={onChangeProductInfo}
        />
      </div>
      <div>
        <label htmlFor="description">Description du produit : </label>
        <textarea
          name="description"
          id="description"
          value={updateForm.description}
          onChange={onChangeProductInfo}
        ></textarea>
      </div>
      <div>
        <label htmlFor="ingredients">Ingrédients du produit : </label>
        <textarea
          name="ingredients"
          id="ingredients"
          value={updateForm.ingredients}
          onChange={onChangeProductInfo}
        ></textarea>
      </div>
      <div>
        <label htmlFor="howToUse">Conseils d'utilisation : </label>
        <input
          type="text"
          name="howToUse"
          value={updateForm.howToUse}
          onChange={onChangeProductInfo}
        />
      </div>
      <div>
        <label htmlFor="precautions">Précautions d'emploi : </label>
        <input
          type="text"
          name="precautions"
          value={updateForm.precautions}
          onChange={onChangeProductInfo}
        />
      </div>
      <div>
        <label htmlFor="useDuration">Date limite d'utilisation : </label>
        <input
          type="text"
          name="useDuration"
          value={updateForm.useDuration}
          onChange={onChangeProductInfo}
        />
      </div>
      <div>
        <label htmlFor="packaging">Packaging : </label>
        <input
          type="text"
          name="packaging"
          value={updateForm.packaging}
          onChange={onChangeProductInfo}
        />
      </div>
      <div>
        <label htmlFor="image">Image du produit</label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={onChangeProductImage}
        />
      </div>
      <div>
        <label htmlFor="alt">Description de l'image : </label>
        <input
          type="text"
          name="alt"
          value={updateForm.alt}
          onChange={onChangeProductInfo}
        />
      </div>
      <div>
        <label htmlFor="adaptedToSensitiveSkin">
          Produit adapaté aux peaux sensibles ?
        </label>
        <select
          name="adaptedToSensitiveSkin"
          value={updateForm.adaptedToSensitiveSkin}
          onChange={onChangeProductInfo}
        >
          <option value="">Sélectionnez une réponse</option>
          <option value={1}>Oui</option>
          <option value={0}>Non</option>
        </select>
      </div>
      <div>
        <label htmlFor="protectsFromPollution">
          Produit protegeant de la pollution ?
        </label>
        <select
          name="protectsFromPollution"
          value={updateForm.protectsFromPollution}
          onChange={onChangeProductInfo}
        >
          <option value="">Sélectionnez une réponse</option>
          <option value={1}>Oui</option>
          <option value={0}>Non</option>
        </select>
      </div>
      <div>
        <label htmlFor="protectsFromSun">Produit protegeant du soleil ?</label>
        <select
          name="protectsFromSun"
          value={updateForm.protectsFromSun}
          onChange={onChangeProductInfo}
        >
          <option value="">Sélectionnez une réponse</option>
          <option value={1}>Oui</option>
          <option value={0}>Non</option>
        </select>
      </div>
      <div>
        <label htmlFor="compatibleWithPregOrBreastfeed">
          Compatible avec la grossesse et l'allaitemment ?
        </label>
        <select
          name="compatibleWithPregOrBreastfeed"
          value={updateForm.compatibleWithPregOrBreastfeed}
          onChange={onChangeProductInfo}
        >
          <option value="">Sélectionnez une réponse</option>
          <option value={1}>Oui</option>
          <option value={0}>Non</option>
        </select>
      </div>
      <div>
        <label htmlFor="id_category">Catégorie :</label>
        <select
          name="id_category"
          value={updateForm.id_category}
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
          value={updateForm.id_skinType}
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
          value={updateForm.id_skinConcern}
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
        <label htmlFor="isOnline">Produit visible ?</label>
        <select
          name="isOnline"
          value={updateForm.isOnline}
          onChange={onChangeProductInfo}
        >
          <option value="">Sélectionnez une réponse</option>
          <option value={1}>Oui</option>
          <option value={0}>Non</option>
        </select>
      </div>
      <button type="submit">Mettre à jour</button>
    </form>
  );
}

export default UpdateProduct;
