import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCloseMenu from "../../Hook/useCloseMenu";

import { fetchProducts } from "../../services/api";

function Home() {
  useCloseMenu();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <>
      <header id="home_banner" role="banner">
        <img
          src="src/assets/img/banner/banner-small.webp"
          srcSet="
            src/assets/img/banner/banner-small.webp 2000w, 
            src/assets/img/banner/banner-medium.webp 3000w, 
            src/assets/img/banner/banner-large.webp 4000w"
          alt="Flacon en verre posé sur le sable au bord de l'eau"
        />
        <h2>Des soins marins pensés pour l'efficacité</h2>
      </header>
      <main>
        <section>
          <h3>Nos produits</h3>
          <div className="card_section">
            {products.length === 0 ? (
              <p role="status">Aucun produit disponible</p>
            ) : (
              products.map((product) => (
                <article
                  key={product.id}
                  className="card"
                  tabIndex="0"
                  aria-label={product.name}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <p>{product.skinConcern_label}</p>
                  <img src={product.image} alt={product.alt} />
                  <h4>{product.name}</h4>
                  <p>{product.skinType_label}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                    aria-label={`Voir plus sur ${product.name}`}
                  >
                    Voir plus
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
        <section>
          <h3>Découvrez le produit qui vous convient</h3>
          <div id="diagnostic_banner">
            <img
              src="src/assets/img/diagnostic/diagnostic-small.webp"
              srcSet="
            src/assets/img/diagnostic/diagnostic-small.webp 2000w, 
            src/assets/img/diagnostic/diagnostic-medium.webp 3000w, 
            src/assets/img/diagnostic/diagnostic-large.webp 4000w"
              alt="Une femme portant un soin exfoliant sur sa joue"
            />
            <p>Trouvez le produit idéal pour sublimer votre peau.</p>
            <button
              onClick={() => navigate("diagnostic/create")}
              aria-label="Faire mon diagnostic"
            >
              Faire mon diagnostic
            </button>
          </div>
        </section>
        <section id="values_section">
          <h3>Nos valeurs</h3>
          <p>
            Nos produits sont soigneusement formulés à partir d'ingrédients
            d'origine marine, sélectionnés pour leur efficacité naturelle et
            leurs bienfaits exceptionnels sur la peau. Nous croyons en la
            puissance de la simplicité : des formules courtes et précises,
            pensées pour offrir des résultats visibles sans compromis. Chaque
            soin respecte votre peau autant que l'environnement, en s'inscrivant
            dans une démarche transparente et écoresponsable.
          </p>
        </section>
      </main>
    </>
  );
}

export default Home;
