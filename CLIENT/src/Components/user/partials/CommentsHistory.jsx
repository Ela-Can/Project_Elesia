import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function CommentsHistory() {
  const [comments, setComments] = useState([]);
  const [commentTitle, setCommentTitle] = useState("");
  const [commentContent, setCommentContent] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCommentsByUserId() {
      //console.log("User ID pour les commentaires:", user.id);
      const response = await fetch(`api/v1/user/${user.id}/comments/list`);
      const data = await response.json();
      //console.log("Commentaires récupérés :", data);
      setComments(data);
    }
    fetchCommentsByUserId();
  }, [user.id]);

  async function onClickUpdateComment(id, id_user) {
    try {
      const response = await fetch(
        `/api/v1/user/${id_user}/comments/update/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: commentTitle,
            content: commentContent,
          }),
        }
      );

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id
            ? { ...comment, title: commentTitle, content: commentContent }
            : comment
        )
      );

      console.log("Commentaire mis à jour, ID:", id);
    } catch (error) {
      console.error("Erreur lors de la MAJ du commentaire:", error);
    }
  }

  async function onClickDeleteComment(id, id_user) {
    try {
      const response = await fetch(
        `/api/v1/user/${id_user}/comments/delete/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setComments((prevComments) => {
        const idToDelete = id;

        const updatedList = [];

        for (let i = 0; i < prevComments.length; i++) {
          if (prevComments[i].id !== idToDelete) {
            updatedList[updatedList.length] = prevComments[i];
          }
        }
        return updatedList;
      });

      console.log("Commentaire supprimé, ID:", id);
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire:", error);
    }
  }

  // Inclure le formulaire de modification du commentaire + le bouton

  return (
    <>
      <h4>Vos commentaires</h4>
      {comments.length > 0 ? (
        <ul role="status">
          {comments.map((comment) => (
            <li key={comment.id} role="listitem">
              <h4>{comment.title}</h4>
              <p>{comment.content}</p>
              <p>{comment.isPublished}</p>
              <p>Produit : {comment.product_name}</p>
              <button
                onClick={() => onClickDeleteComment(comment.id, user.id)}
                aria-label={`Supprimer le commentaire intitulé ${comment.title}`}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p role="status">Aucun commentaire</p>
      )}
    </>
  );
}
export default CommentsHistory;
