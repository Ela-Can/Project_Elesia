import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../../store/slices/product.js";

import UpdateProduct from "./UpdateProduct.jsx";
import AddProduct from "./AddProduct.jsx";

function ProductList() {
  const productList = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState(null);

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

  return (
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
                  //  onClick={() => onClickDeleteSkinConcern(skinConcern.id)}
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

      <AddProduct />
    </>
  );
}

export default ProductList;
