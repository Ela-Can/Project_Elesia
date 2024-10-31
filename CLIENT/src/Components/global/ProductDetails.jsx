import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProductDetails() {
  //const { productId } = useSelector((state) => state.product);
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProductById() {
      const response = await fetch(`/api/v1/product/${id}`);
      const data = await response.json();
      setProduct(data);
    }
    fetchProductById();
  }, []);

  return (
    <>
      {!product ? (
        <p>Product not found</p>
      ) : (
        <article key={product.id}>
          <h3>{product.name}</h3>
          <img src={product.image} alt={product.alt} />
          <p>{product.description}</p>
        </article>
      )}
    </>
  );
}

export default ProductDetails;
