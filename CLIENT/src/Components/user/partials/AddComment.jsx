import { useState } from "react";
import useCheckAuth from "../../../Hook/useCheckAuth";

function AddComment({ productId }) {
  const [user, isLoading] = useCheckAuth();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function onSumbitAddComment(e) {
    e.preventDefault();
    setSuccessMessage("");

    try {
      const response = await fetch(`/api/v1/product/${productId}/addcomment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          id_user: user.id,
          id_product: productId,
        }),
      });
      if (response.ok) {
        setSuccessMessage(
          "Votre commentaire a été envoyé avec succès et est en attente de modération."
        );
        setNewTitle("");
        setNewContent("");
        setIsFormVisible(false);
      } else {
        console.error("Erreur lors de l'envoi du commentaire.");
      }
    } catch (err) {
      console.error("Impossible d'envoyer le commentaire :", err);
    }
  }

  function onClickFormHandler() {
    if (user.isLogged) {
      setIsFormVisible(true);
    } else {
      alert("Vous devez vous connecter");
    }
  }

  const maxCharactersTitle = 50;
  const maxCharactersContent = 255;

  function onChangeNbrMaxTitle(e) {
    const value = e.target.value;
    if (value.length <= maxCharactersTitle) {
      setNewTitle(value);
    }
  }

  function onChangeNbrMaxContent(e) {
    const value = e.target.value;
    if (value.length <= maxCharactersContent) {
      setNewContent(value);
    }
  }

  return (
    <>
      {!isFormVisible && !successMessage && (
        <button
          onClick={onClickFormHandler}
          aria-label="Cliquez pour rédiger un commentaire"
        >
          Rédiger un commentaire
        </button>
      )}
      {isFormVisible && !successMessage && (
        <form onSubmit={onSumbitAddComment}>
          <h5>Rédigez un commentaire</h5>
          <div>
            <label htmlFor="title">
              Votre impression générale sur le produit :
            </label>
            <input
              type="text"
              name="title"
              value={newTitle}
              onChange={
                ((e) => setNewTitle(e.target.value), onChangeNbrMaxTitle)
              }
              aria-required="true"
              aria-describedby="title-limit"
              required
            />
            <p>{maxCharactersTitle - newTitle.length} caractères restants</p>
          </div>
          <div>
            <label htmlFor="content">Votre commentaire</label>
            <input
              type="text"
              name="content"
              value={newContent}
              onChange={
                ((e) => setNewContent(e.target.value), onChangeNbrMaxContent)
              }
              aria-required="true"
              aria-describedby="content-limit"
              required
            />
            <p>
              {maxCharactersContent - newContent.length} caractères restants
            </p>
          </div>
          <button type="submit">Envoyer</button>
        </form>
      )}
      {successMessage && <p role="status">{successMessage}</p>}
    </>
  );
}

export default AddComment;
