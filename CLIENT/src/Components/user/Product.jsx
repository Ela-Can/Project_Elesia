import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCloseMenu from "../../Hook/useCloseMenu";
import Accordion from "../partials/Accordion";

import {
  fetchProducts,
  fetchCategories,
  fetchSkinTypes,
  fetchSkinConcerns,
} from "../../services/api";

function Product() {
  useCloseMenu();

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
    fetchCategories().then((data) => {
      setCategories(data);
    });
  }, []);

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

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setAllProducts(data);
    });
  }, []);

  useEffect(() => {
    let filteredProducts = allProducts;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === parseInt(selectedCategory)
      );
    }

    if (selectedSkinType) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.skinType === parseInt(selectedSkinType) ||
          product.skinType_label === "Tous types de peau"
      );
    }

    if (selectedSkinConcern) {
      filteredProducts = filteredProducts.filter(
        (product) => product.skinConcern === parseInt(selectedSkinConcern)
      );
    }

    setProducts(filteredProducts);
  }, [selectedCategory, selectedSkinType, selectedSkinConcern, allProducts]);

  function categoryChangeBtnHandler(categoryId) {
    setSelectedCategory(categoryId);
  }

  function skinTypeChangeBtnHandler(skinTypeId) {
    setSelectedSkinType(skinTypeId);
  }

  function skinConcernChangeBtnHandler(skinConcernId) {
    setSelectedSkinConcern(skinConcernId);
  }

  function seeMoreBtnHandler(productId) {
    navigate(`/product/${productId}`);
  }

  return (
    <main>
      <h2>Nos produits</h2>
      <Accordion title="Filtrer">
        <div>
          <label htmlFor="category">Que recherchez-vous ?</label>
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
          <label htmlFor="skinType">Quel est votre type de peau ?</label>
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
          <label htmlFor="skinConcern">
            Quelle est votre préoccupation principale ?
          </label>
          <select
            id="skinConcern"
            value={selectedSkinConcern}
            onChange={(e) => skinConcernChangeBtnHandler(e.target.value)}
          >
            <option value="">Sélectionner une préoccupation</option>
            {skinConcerns.map((skinConcern) => (
              <option key={skinConcern.id} value={skinConcern.id}>
                {skinConcern.label}
              </option>
            ))}
          </select>
        </div>
      </Accordion>
      <section className="card_section">
        {products.length === 0 ? (
          <p role="status">Aucun produit disponible</p>
        ) : (
          products.map((product) => (
            <article
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="card"
              role="button"
              tabIndex="0"
            >
              <p>{product.skinConcern_label}</p>
              <img src={product.image} alt={product.alt} />
              <h4>{product.name}</h4>
              <p>{product.skinType_label}</p>
              <button
                onClick={() => {
                  e.stopPropagation();
                  seeMoreBtnHandler(product.id);
                }}
                aria-label={`Voir plus sur le produit ${product.name}`}
              >
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
