import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Accordion from "../partials/Accordion";
import ProductComments from "./partials/ProductComments.jsx";

import productImage from "../../../../SERVER/public/img/productImg/pexels-vie-studio-7005936.jpg";

function ProductDetails() {
  const [product, setProduct] = useState([]);
  const [isToggleVisible, setIsToggleVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProductById() {
      const response = await fetch(`/api/v1/product/${id}`);
      const [data] = await response.json();
      console.log("Données du produit :", data);
      setProduct(data);
    }
    fetchProductById();
  }, [id]);

  function onClickBuyBtn() {
    setIsToggleVisible(!isToggleVisible);
  }

  function onClickBuyOnlineBtn() {
    setIsPopupOpen(true);
  }

  function onClickFindStoreBtn() {
    navigate("/store_locator");
  }

  function onClickClosePopUp() {
    setIsPopupOpen(false);
  }

  return (
    <main>
      <section className="product_details_section">
        {product.length === 0 ? (
          <p>Product not found</p>
        ) : (
          <article key={product.id}>
            <div className="product_details_top">
              <img src={productImage} alt={product.alt} />
              <div>
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <p>{product.precautions}</p>
              </div>
            </div>
            <button onClick={onClickBuyBtn}>Acheter</button>
            <div className="product_details_bottom">
              <Accordion title="Ingrédients">
                <p>{product.ingredients}</p>
              </Accordion>
              <Accordion title="Conseils d'utilisation">
                <p>{product.howToUse}</p>
              </Accordion>
              <Accordion title="Durée d'utilisation après ouverture">
                <p>{product.useDuration}</p>
              </Accordion>
              <Accordion title="Packaging">
                <p>{product.packaging}</p>
              </Accordion>
            </div>
          </article>
        )}
      </section>
      <section>
        <h3>Vous pourriez aussi aimer</h3>
      </section>
      <section>
        <ProductComments productId={id} />
      </section>

      {isToggleVisible && (
        <div>
          <button onClick={onClickBuyOnlineBtn}>Acheter en ligne</button>
          <button onClick={onClickFindStoreBtn}>
            Trouver un point de vente
          </button>
        </div>
      )}

      {isPopupOpen && (
        <div>
          <h5>Nos partenaires en ligne</h5>
          <a href="#">Pharma...</a>
          <button onClick={onClickClosePopUp}>Fermer</button>
        </div>
      )}
    </main>
  );
}

export default ProductDetails;
