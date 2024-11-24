import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import bannerVideo from "../../assets/medias/banner.mp4";

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
        <video
          autoplay
          muted
          loop
          playsInline
          src={bannerVideo}
          type="video/mp4"
        ></video>
        <h3>Découvrez notre nouveauté</h3>
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
