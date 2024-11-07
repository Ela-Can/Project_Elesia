import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteComment,
  setComment,
  updateComment,
} from "../../../StoreRedux/slices/comment.js";

function CommentsHistory() {
  const commentList = useSelector((state) => state.comment.commentList);
  const user = useSelector((state) => state.user);
  //onsole.log("User ID dans le composant :", user);
  //console.log("Liste des commentaires dans Redux :", commentList);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCommentsByUserId() {
      //console.log("User ID pour les commentaires:", user.id);
      const response = await fetch(`api/v1/user/${user.id}/comments/list`);
      const data = await response.json();
      //console.log("Commentaires récupérés :", data);
      dispatch(setComment(data));
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
          body: JSON.stringify({ title, content }),
        }
      );
      dispatch(updateComment(id, commentTitle, commentContent));
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
      dispatch(deleteComment(id));
      console.log("Commentaire supprimé, ID:", id);
      console.log("Liste de commentaires après suppression:", commentList);
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire:", error);
    }
  }

  // Inclure le formulaire de modification du commentaire + le bouton

  return (
    <>
      {commentList.length > 0 ? (
        <ul>
          {commentList.map((comment) => (
            <li key={comment.id}>
              <h4>{comment.title}</h4>
              <p>{comment.content}</p>
              <p>{comment.isPublished}</p>
              <p>Produit : {comment.product_name}</p>
              <button onClick={() => onClickDeleteComment(comment.id, user.id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Vous n'avez pas encore de commentaires.</p>
      )}
    </>
  );
}
export default CommentsHistory;
