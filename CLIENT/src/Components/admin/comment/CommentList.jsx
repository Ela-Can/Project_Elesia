import { useEffect, useState } from "react";
import CommentHistory from "./CommentHistory";

function CommentList({ isPublished, setUnmoderatedCount }) {
  const [activeSection, setActiveSection] = useState("comment/pending");

  const [pendingComments, setPendingComments] = useState([]);

  async function fetchPendingComments() {
    const response = await fetch("/api/v1/comment/list/pending");
    const [data] = await response.json();
    console.log("Commentaires récupérées :", data);
    setPendingComments(data);

    let unmoderatedCount = 0;
    for (const comment of data) {
      if (comment.isPublished === "commentaire en attente") {
        unmoderatedCount++;
      }
    }
    setUnmoderatedCount(unmoderatedCount);
  }

  async function onClickMarkAsNotValid(commentId) {
    try {
      const response = await fetch(`/api/v1/comment/update/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPublished: 2 }),
      });

      if (!response.ok) {
        console.error("Failed to update comment status");
        return;
      }
      setPendingComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );

      console.log(`Comment ${commentId} marked as not valid.`);
    } catch (error) {
      console.error("Error while updating comment status:", error);
    }
  }

  async function onClickMarkAsValid(commentId) {
    try {
      const response = await fetch(`/api/v1/comment/update/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPublished: 3 }),
      });

      if (!response.ok) {
        console.error("Failed to update comment status");
        return;
      }
      setPendingComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );

      console.log(`Comment ${commentId} marked as not valid.`);
    } catch (error) {
      console.error("Error while updating comment status:", error);
    }
  }

  useEffect(() => {
    fetchPendingComments();
  }, [isPublished]);

  return (
    <main>
      <section>
        <button onClick={() => setActiveSection("comment/pending")}>
          Commentaires en attente
        </button>
        <button onClick={() => setActiveSection("comment/moderated")}>
          Historique
        </button>
      </section>
      <section>
        {activeSection === "comment/pending" && (
          <>
            <h3>Commentaires en attente</h3>
            {pendingComments.length === 0 ? (
              <p>Aucun commentaire en attente</p>
            ) : (
              pendingComments.map((comment) => (
                <article key={comment.id}>
                  {comment.pseudo} {comment.publishDate}: {comment.title}{" "}
                  {comment.content} {comment.product_name}
                  <p>Statut : {comment.isPublished}</p>
                  <button onClick={() => onClickMarkAsValid(comment.id)}>
                    Valider le commentaire
                  </button>
                  <button onClick={() => onClickMarkAsNotValid(comment.id)}>
                    Refuser le commentaire
                  </button>
                </article>
              ))
            )}
          </>
        )}
      </section>
      <section>
        {activeSection === "comment/moderated" && <CommentHistory />}
      </section>
    </main>
  );
}

export default CommentList;
