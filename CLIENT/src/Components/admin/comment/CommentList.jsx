import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment, setComment } from "../../../StoreRedux/slices/comment";

function CommentList() {
  const commentList = useSelector((state) => state.comment.commentList);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function onClickDeleteComment(id, id_user) {
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
        dispatch(deleteComment(id));
      } else {
        const errorMessage = await response.text();
        console.error("Erreur lors de la suppression :", errorMessage);
      }
    } catch (error) {
      console.error("Erreur de connexion à l'API", error);
    }
  }

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch("/api/v1/comment/list");
      const data = await response.json();
      console.log("Commentaires récupérées :", data);
      dispatch(setComment(data));
    }
    fetchComments();
  }, []);

  return (
    <>
      <h3>Liste des commentaires</h3>
      {commentList.length > 0 ? (
        <ul>
          {commentList.map((comment) => (
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
