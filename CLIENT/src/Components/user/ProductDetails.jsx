import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Accordion from "../partials/Accordion";
import ProductComments from "./partials/ProductComments.jsx";

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
    <>
      {product.length === 0 ? (
        <p>Product not found</p>
      ) : (
        <article key={product.id}>
          <h3>{product.name}</h3>
          <img src={product.image} alt={product.alt} />
          <p>{product.description}</p>
          <p>{product.precautions}</p>
          <Accordion title="Ingrédients">
            <p>{product.ingredients}</p>
          </Accordion>
          <Accordion title="Conseils d'utilisation">
            <p>{product.howToUse}</p>
          </Accordion>
          <Accordion title="Durée d'utilisation après ouverture">
            <p>{product.useDuration}</p>
          </Accordion>
          <ProductComments productId={id} />
        </article>
      )}
    </>
  );
}

export default ProductDetails;
