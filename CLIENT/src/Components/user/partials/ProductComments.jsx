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
    <section className="comment_section" role="region">
      <h3>Vous en parlez le mieux</h3>

      {comments.length === 0 ? (
        <p role="status">Soyez le premier à laisser un avis sur le produit !</p>
      ) : (
        comments.map((comment) => (
          <article key={comment.id}>
            <div>
              <p>{comment.pseudo ? comment.pseudo : "Utilisateur inconnu"}</p>
              <p>{comment.publishDate}</p>
            </div>
            <p>{comment.title}</p>
            <p>{comment.content}</p>
          </article>
        ))
      )}
      <AddComment productId={productId} />
    </section>
  );
}

export default ProductComments;
