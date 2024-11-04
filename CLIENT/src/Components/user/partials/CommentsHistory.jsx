import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setComment } from "../../../Store/slices/comment.js";

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

  return (
    <>
      {commentList.length > 0 ? (
        <ul>
          {commentList.map((comment) => (
            <li key={comment.id}>
              <h4>{comment.title}</h4>
              <p>{comment.content}</p>
              <p>Produit : {comment.product_name}</p>
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
