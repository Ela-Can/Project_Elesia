import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
    };
    fetchProducts();
  }, []);

  function seeMoreBtnHandler(productId) {
    navigate(`/product/${productId}`);
  }

  return (
    <main>
      <section>
        {products.length === 0 ? (
          <p>Aucun produit disponible</p>
        ) : (
          products.map((product) => (
            <article key={product.id}>
              <img src={product.image} alt={product.alt} />
              <h4>{product.name}</h4>
              <p>{product.description}</p>
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

export default Home;
