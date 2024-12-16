import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Accordion from "../partials/Accordion";
import ProductComments from "./partials/ProductComments.jsx";

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
        {!product || !product.id ? (
          <p role="status">Produit introuvable</p>
        ) : (
          <article key={product.id}>
            <div className="product_details_top">
              <img src={product.image} alt={product.alt} />
              <div>
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <p>{product.precautions}</p>

                <button
                  onClick={onClickBuyBtn}
                  aria-label="Afficher les options d'achat"
                >
                  Acheter
                </button>
                {isToggleVisible && (
                  <div
                    className={
                      isToggleVisible
                        ? "purchase_options active"
                        : "purchase_options"
                    }
                  >
                    <button onClick={onClickBuyOnlineBtn}>
                      Acheter en ligne
                    </button>
                    <button onClick={onClickFindStoreBtn}>
                      Trouver un point de vente
                    </button>
                  </div>
                )}
              </div>
            </div>

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
      <ProductComments productId={id} className="comment_section" />

      {isPopupOpen && (
        <div className={isPopupOpen ? "popup active" : "popup"} role="dialog">
          <h5>Nos partenaires en ligne</h5>
          <p>
            Les partenaires listés ci-dessus sont des distributeurs agréés par
            notre marque. Ils sont libres de fixer leurs propres prix.
          </p>
          <div>
            <a href="#">
              <img
                src="/src/assets/img/partners/pharma_GDD.svg"
                alt="Logo de Pharma GDD"
              />
            </a>
            <a href="#">
              <img
                src="/src/assets/img/partners/newpharma.svg"
                alt="Logo de Pharma GDD"
              />
            </a>
            <a href="#">
              <img
                src="/src/assets/img/partners/docmorris.svg"
                alt="Logo de Pharma GDD"
              />
            </a>
          </div>

          <button onClick={onClickClosePopUp} aria-label="Fermer la popup">
            Fermer
          </button>
        </div>
      )}
    </main>
  );
}

export default ProductDetails;
