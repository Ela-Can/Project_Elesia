import { useEffect, useState } from "react";

function CommentHistory() {
  const [moderatedComments, setModeratedComments] = useState([]);

  useEffect(() => {
    async function fetchModeratedComments() {
      const response = await fetch(`/api/v1/comment/list/moderated`);
      const [data] = await response.json();
      console.log("Demandes cloturées :", data);
      setModeratedComments(data);
    }
    fetchModeratedComments();
  }, []);

  return (
    <>
      <h3>Historique</h3>
      {moderatedComments.length === 0 ? (
        <p>Aucun commentaire</p>
      ) : (
        moderatedComments.map((comment) => (
          <article key={comment.id}>
            {comment.pseudo} {comment.publishDate}: {comment.title}{" "}
            {comment.content} {comment.product_name}
            <p>Statut : {comment.isPublished}</p>
          </article>
        ))
      )}
    </>
  );
}

export default CommentHistory;
