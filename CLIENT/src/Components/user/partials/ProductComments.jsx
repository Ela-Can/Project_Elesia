import { useState, useEffect } from "react";
import AddComment from "./AddComment";

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
    <section className="comment_section">
      <h3>Vous en parlez le mieux</h3>
      {comments.length === 0 ? (
        <p>Soyez le premier à laisser un avis sur le produit !</p>
      ) : (
        comments.map((comment) => (
          <article key={comment.id}>
            <h4>{comment.pseudo ? comment.pseudo : "Utilisateur inconnu"}</h4>
            <h5>{comment.title}</h5>
            <p>{comment.content}</p>
          </article>
        ))
      )}
      <AddComment productId={productId} />
    </section>
  );
}

export default ProductComments;
