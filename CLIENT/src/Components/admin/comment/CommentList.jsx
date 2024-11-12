import { useEffect, useState } from "react";

function CommentList() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch("/api/v1/comment/list");
      const data = await response.json();
      console.log("Commentaires récupérées :", data);
      setComments(data);
    }
    fetchComments();
  }, []);

  async function onClickDeleteComment(id) {
    try {
      const response = await fetch(`/api/v1/comment/delete/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id, isPublished: 0 }),
      });
      if (response.ok) {
        alert("Commentaire marqué comme non publié avec succès.");

        setComments((prevCommentList) => {
          const updatedList = [...prevCommentList];

          for (let i = 0; i < updatedList.length; i++) {
            if (updatedList[i].id === id) {
              updatedList[i].isPublished = 0;
              break;
            }
          }

          return updatedList;
        });
      } else {
        const errorMessage = await response.text();
        console.error("Erreur lors de la suppression :", errorMessage);
      }
    } catch (error) {
      console.error("Erreur de connexion à l'API", error);
    }
  }

  return (
    <>
      <h3>Liste des commentaires</h3>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <>
              <li key={comment.id}>
                {comment.pseudo} {comment.publishDate}: {comment.title}{" "}
                {comment.content} {comment.product_name}
                <p>Statut : {comment.isPublished}</p>
              </li>
              <button onClick={() => onClickDeleteComment(comment.id)}>
                Supprimer
              </button>
            </>
          ))}
        </ul>
      ) : (
        <p> Aucun commentaire trouvé</p>
      )}
    </>
  );
}

export default CommentList;
