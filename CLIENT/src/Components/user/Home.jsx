import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import bannerImg from "../../assets/medias/banner.jpg";

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
      <section className="banner_section">
        <img src={bannerImg} alt="" />
        <h3>Des soins marins pensés pour l'efficacité</h3>
        <p>
          Chez Elésia, nous croyons que l'efficacité réside dans la simplicité.
          Chaque ingrédient marin est sélectionné avec soin pour sublimer votre
          peau, sans superflu.
        </p>
      </section>
      <section>
        <h3>Découvrez nos produits</h3>
        <div className="card_section">
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
        </div>
      </section>
    </main>
  );
}

export default Home;
