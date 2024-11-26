import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../../store/slices/product.js";

import UpdateProduct from "./UpdateProduct.jsx";
import AddProduct from "./AddProduct.jsx";

function ProductList() {
  const productList = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [activeSection, setActiveSection] = useState("product/list");

  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/v1/product/list");
      const data = await response.json();
      console.log("produits récupérées :", data);
      dispatch(setProducts(data));
    }
    fetchProducts();
  }, []);

  function onClickCancelBtn() {
    setIsEditing(false);
  }

  async function onClickDeleteProduct(productId) {
    try {
      const response = await fetch(`/api/v1/product/delete/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erreur côté serveur :", errorText);
        throw new Error("Erreur lors de la suppression du produit");
      }

      const updatedProductList = [];

      for (let i = 0; i < productList.length; i++) {
        if (productList[i].id !== productId) {
          updatedProductList[updatedProductList.length] = productList[i];
        }
      }
      dispatch(setProducts(updatedProductList));
    } catch (error) {
      console.error("Erreur lors de la requête : ", error);
    }
  }

  return (
    <main>
      <section>
        <button onClick={() => setActiveSection("product/list")}>
          Liste des produits
        </button>
        <button onClick={() => setActiveSection("product/addProduct")}>
          Ajouter un produit
        </button>
      </section>
      <section>
        {activeSection === "product/list" && (
          <>
            <h3>Liste des produits</h3>
            {productList.length > 0 ? (
              <ul>
                {productList.map((product) => (
                  <li key={product.id}>
                    {isEditing === true && productId === product.id ? (
                      <>
                        <UpdateProduct
                          product={selectedProduct}
                          productId={product.id}
                          setIsEditing={setIsEditing}
                        />
                        <button onClick={() => onClickCancelBtn(product.id)}>
                          Annuler
                        </button>
                      </>
                    ) : (
                      <>
                        {product.name}
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setProductId(product.id);
                            setSelectedProduct(product);
                          }}
                        >
                          Modifier
                        </button>

                        <button
                          onClick={() => onClickDeleteProduct(product.id)}
                        >
                          Supprimer
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun produit</p>
            )}
          </>
        )}
      </section>
      <section>
        {activeSection === "product/addProduct" && <AddProduct />}
      </section>
    </main>
  );
}

export default ProductList;
