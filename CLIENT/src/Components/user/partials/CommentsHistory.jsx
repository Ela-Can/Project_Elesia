import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function CommentsHistory() {
  const [comments, setComments] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [commentId, setCommentId] = useState([]);

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCommentsByUserId() {
      const response = await fetch(`api/v1/user/${user.id}/comments/list`);
      const data = await response.json();
      setComments(data);
    }
    fetchCommentsByUserId();
  }, [user.id]);

  async function onClickUpdateComment(commentId, id_user) {
    if (!isChecked) {
      setErrorMessage(
        "Vous devez accepter la charte de bonne conduite avant de soumettre votre commentaire."
      );
      return;
    }

    try {
      const response = await fetch(
        `/api/v1/user/${id_user}/comments/update/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updatedTitle,
            content: updatedContent,
          }),
        }
      );

      const updatedComment = await response.json();

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, title: updatedTitle, content: updatedContent }
            : comment
        )
      );

      setIsEditing(false);
      setSuccessMessage(
        "Votre commentaire a été mis à jour avec succès et est en attente de modération."
      );
      setIsChecked(false);
    } catch (error) {
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  }

  async function onClickDeleteComment(commentId, id_user) {
    if (!user.id) {
      setErrorMessage("Utilisateur non identifié. Veuillez vous reconnecter.");
      return;
    }

    try {
      const response = await fetch(
        `/api/v1/user/${id_user}/comments/delete/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to update isPublished");
      }

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );

      setSuccessMessage("Commentaire supprimé avec succès");
      setShowConfirmation(false);
    } catch (error) {
      setErrorMessage(
        "Une erreur s'est produite lors de l'archivage. Veuillez réessayer."
      );
    }
  }

  function onClickEditComment(comment) {
    setIsEditing(true);
    setCommentId(comment.id);
    setUpdatedTitle(comment.title);
    setUpdatedContent(comment.content);
    resetMessages();
  }

  function resetMessages() {
    setSuccessMessage("");
    setErrorMessage("");
  }

  function onCloseOrCancel() {
    setIsEditing(false);
    setShowConfirmation(false);
    setCommentId(null);
  }

  function onClickOpenConfirmation(commentId) {
    setCommentId(commentId);
    setShowConfirmation(true);
  }

  const maxCharactersTitle = 100;
  const maxCharactersContent = 255;

  function onChangeNbrMaxTitle(e) {
    const value = e.target.value;
    if (value.length <= maxCharactersTitle) {
      setUpdatedTitle(value);
    }
  }

  function onChangeNbrMaxContent(e) {
    const value = e.target.value;
    if (value.length <= maxCharactersContent) {
      setUpdatedContent(value);
    }
  }

  // Inclure le formulaire de modification du commentaire + le bouton

  return (
    <>
      <h4>Vos commentaires</h4>
      {showConfirmation && (
        <div className="popup_confirmation">
          <p>Êtes-vous sûr de vouloir supprimer cette préoccupation?</p>
          <button onClick={() => onClickDeleteComment(commentId, user.id)}>
            Confirmer
          </button>
          <button onClick={onCloseOrCancel}>Annuler</button>
        </div>
      )}

      {errorMessage && (
        <p className="error-message" role="alert">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p className="success-message" role="status">
          {successMessage}
        </p>
      )}

      {comments.length > 0 ? (
        <ul role="status">
          {comments.map((comment) => (
            <li key={comment.id} role="listitem">
              {isEditing === true && commentId === comment.id ? (
                <article>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      onClickUpdateComment(comment.id, user.id);
                    }}
                  >
                    <div>
                      <label htmlFor="title">
                        Votre impression générale sur le produit :
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={updatedTitle}
                        onChange={(e) => {
                          setUpdatedTitle(e.target.value), onChangeNbrMaxTitle;
                        }}
                        aria-required="true"
                        aria-describedby="title-limit"
                        required
                      />
                      <p>
                        {maxCharactersTitle - updatedTitle.length} caractères
                        restants
                      </p>
                    </div>
                    <div>
                      <label htmlFor="content">Votre commentaire :</label>
                      <input
                        type="text"
                        name="content"
                        value={updatedContent}
                        onChange={(e) => {
                          setUpdatedContent(e.target.value),
                            onChangeNbrMaxContent;
                        }}
                        aria-required="true"
                        aria-describedby="content-limit"
                        required
                      />
                      <p>
                        {maxCharactersTitle - updatedContent.length} caractères
                        restants
                      </p>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="acceptCharte"
                        checked={isChecked}
                        onChange={(e) => {
                          setIsChecked(e.target.checked), setErrorMessage("");
                        }}
                        required
                      />
                      <label htmlFor="acceptCharte">
                        J'ai lu et j'accepte la{" "}
                        <Link to="/code_of_conduct" target="_blank">
                          charte de bonne conduite
                        </Link>
                        .
                      </label>
                      {errorMessage && <p>{errorMessage}</p>}
                    </div>
                    <button type="submit">Enregistrer</button>
                    <button onClick={onCloseOrCancel}>Annuler</button>
                  </form>
                </article>
              ) : (
                <div id="comment_history">
                  <p>{comment.title}</p>
                  <p>{comment.content}</p>
                  <p>Produit concerné : {comment.product_name}</p>
                  <div>
                    <button onClick={() => onClickEditComment(comment)}>
                      Modifier
                    </button>
                    <button
                      onClick={() => {
                        onClickOpenConfirmation(comment.id, user.id),
                          resetMessages();
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              )}
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
