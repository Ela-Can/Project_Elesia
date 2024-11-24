import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [skinTypes, setSkinTypes] = useState([]);
  const [selectedSkinType, setSelectedSkinType] = useState("");

  const [skinConcerns, setSkinConcerns] = useState([]);
  const [selectedSkinConcern, setSelectedSkinConcern] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/v1/category/list");
      const data = await response.json();
      console.log("Catégories récupérées :", data);
      setCategories(data);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchSkinTypes() {
      const response = await fetch("/api/v1/skintype/list");
      const data = await response.json();
      console.log("SkinType récupérées :", data);
      setSkinTypes(data);
    }
    fetchSkinTypes();
  }, []);

  useEffect(() => {
    async function fetchSkinConcerns() {
      const response = await fetch("/api/v1/skinconcern/list");
      const data = await response.json();
      console.log("SkinConcern récupérées :", data);
      setSkinConcerns(data);
    }
    fetchSkinConcerns();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/v1/product/list", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log("Données récupérées :", data);
      setProducts(data);
      setAllProducts(data);
    };
    fetchProducts();
  }, []);

  function categoryChangeBtnHandler(categoryId) {
    setSelectedCategory(categoryId);
    if (!categoryId) {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.category === parseInt(categoryId)
      );
      setProducts(filteredProducts);
    }
  }

  function skinTypeChangeBtnHandler(skinTypeId, skinTypeLabel) {
    setSelectedSkinType(skinTypeId);
    if (!skinTypeId || skinTypeLabel === "Tous types de peau") {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (product) =>
          product.skinType === parseInt(skinTypeId) ||
          product.skinType_label === "Tous types de peau"
      );
      setProducts(filteredProducts);
    }
  }

  function skinConcernChangeBtnHandler(skinConcernId) {
    setSelectedSkinConcern(skinConcernId);
    if (!skinConcernId) {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.skinConcern === parseInt(skinConcernId)
      );
      setProducts(filteredProducts);
    }
  }

  function seeMoreBtnHandler(productId) {
    navigate(`/product/${productId}`);
  }

  return (
    <main>
      <h2>Nos produits</h2>
      <section>
        <div>
          <label htmlFor="category">Filtrer par catégorie :</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => categoryChangeBtnHandler(e.target.value)}
          >
            <option value="">Sélectionner une categorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="skinType">Filtrer par type de peau :</label>
          <select
            id="skinType"
            value={selectedSkinType}
            onChange={(e) => skinTypeChangeBtnHandler(e.target.value)}
          >
            <option value="">Sélectionner un type de peau</option>
            {skinTypes
              .filter((skinType) => skinType.label !== "Tous types de peau")
              .map((skinType) => (
                <option key={skinType.id} value={skinType.id}>
                  {skinType.label}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="skinConcern">Filtrer par préoccupation :</label>
          <select
            id="skinConcern"
            value={selectedSkinConcern}
            onChange={(e) => skinConcernChangeBtnHandler(e.target.value)}
          >
            <option value="">Sélectionner une péroccupation</option>
            {skinConcerns.map((skinConcern) => (
              <option key={skinConcern.id} value={skinConcern.id}>
                {skinConcern.label}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section className="card_section">
        {products.length === 0 ? (
          <p>Aucun produit disponible</p>
        ) : (
          products.map((product) => (
            <article key={product.id} className="card">
              <p>{product.skinConcern_label}</p>
              <img src={product.image} alt={product.alt} />
              <h4>{product.name}</h4>
              <p>{product.skinType_label}</p>
              <button onClick={() => seeMoreBtnHandler(product.id)}>
                Voir plus
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default Product;
