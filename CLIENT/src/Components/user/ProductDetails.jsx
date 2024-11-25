import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Accordion from "../partials/Accordion";
import ProductComments from "./partials/ProductComments.jsx";

import productImage from "../../../../SERVER/public/img/productImg/pexels-vie-studio-7005936.jpg";

function ProductDetails() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProductById() {
      const response = await fetch(`/api/v1/product/${id}`);
      const [data] = await response.json();
      console.log("Données du produit :", data);
      setProduct(data);
    }
    fetchProductById();
  }, [id]);

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
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.precautions}</p>
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

      <ProductComments productId={id} />
    </main>
  );
}

export default ProductDetails;
