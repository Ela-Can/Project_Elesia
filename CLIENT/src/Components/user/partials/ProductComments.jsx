import { useState, useEffect } from "react";

function ProductComments({ productId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchCommentsByProduct() {
      const response = await fetch(`/api/v1/comment/from-product/${productId}`);
      const datas = await response.json();
      console.log(datas);
      setComments(datas);
    }
    fetchCommentsByProduct();
  }, [productId]);

  return (
    <>
      {comments.length === 0 ? (
        <p>Aucun commentaire</p>
      ) : (
        comments.map((comment) => (
          <article key={comment.id}>
            <h4>{comment.pseudo ? comment.pseudo : "Utilisateur inconnu"}</h4>
            <h5>{comment.title}</h5>
            <p>{comment.content}</p>
          </article>
        ))
      )}
    </>
  );
}

export default ProductComments;
