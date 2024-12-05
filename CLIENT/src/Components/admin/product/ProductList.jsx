import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../../store/slices/product.js";

import UpdateProduct from "./UpdateProduct.jsx";
import AddProduct from "./AddProduct.jsx";

import { fetchProducts } from "../../../services/api.js";

function ProductList() {
  const productList = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [activeSection, setActiveSection] = useState("product/list");

  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState([]);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProducts().then((data) => {
      dispatch(setProducts(data));
    });
  }, []);

  async function onClickDeleteProduct(productId) {
    try {
      const response = await fetch(`/api/v1/product/delete/${productId}`, {
        method: "DELETE",
      });

      const updatedProductList = productList.filter(
        (product) => product.id !== productId
      );

      dispatch(setProducts(updatedProductList));

      setSuccessMessage("Produit supprimé avec succès");
      setShowConfirmation(false);
    } catch (error) {
      setErrorMessage(
        "Une erreur s'est produite lors de l'archivage. Veuillez réessayer."
      );
    }
  }

  function resetMessages() {
    setSuccessMessage("");
    setErrorMessage("");
  }

  function onCloseOrCancel() {
    setIsEditing(false);
    setShowConfirmation(false);
    setProductId(null);
    setIsEditing(false);
  }

  function onClickOpenConfirmation(productId) {
    setProductId(productId);
    setShowConfirmation(true);
  }

  return (
    <>
      <section className="dashboard_controls">
        <button
          onClick={() => {
            setActiveSection("product/list"), resetMessages();
          }}
        >
          Liste des produits
        </button>
        <button
          onClick={() => {
            setActiveSection("product/addProduct"), resetMessages();
          }}
        >
          Ajouter un produit
        </button>
      </section>
      <section className="dashboard_content">
        {showConfirmation && (
          <div className="popup_confirmation">
            <p>Êtes-vous sûr de vouloir supprimer ce produit?</p>
            <button onClick={() => onClickDeleteProduct(productId)}>
              Confirmer
            </button>
            <button onClick={onCloseOrCancel}>Annuler</button>
          </div>
        )}

        {activeSection === "product/list" && (
          <>
            <h3>Liste des produits</h3>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}

            {productList.length > 0 ? (
              <ul>
                {productList.map((product) => (
                  <li key={product.id}>
                    {isEditing === true && productId === product.id ? (
                      <article>
                        <UpdateProduct
                          product={selectedProduct}
                          productId={product.id}
                          setIsEditing={setIsEditing}
                          setSuccessMessage={setSuccessMessage}
                          setErrorMessage={setErrorMessage}
                          onCloseOrCancel={onCloseOrCancel}
                        />
                        <button
                          onClick={() => {
                            onCloseOrCancel(product.id), resetMessages();
                          }}
                        >
                          Annuler
                        </button>
                      </article>
                    ) : (
                      <>
                        {product.name}
                        <div>
                          <button
                            onClick={() => {
                              setProductId(product.id);
                              setSelectedProduct(product);
                              setIsEditing(true);
                              resetMessages();
                            }}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>

                          <button
                            onClick={() => {
                              onClickOpenConfirmation(product.id),
                                resetMessages();
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
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
    </>
  );
}

export default ProductList;
