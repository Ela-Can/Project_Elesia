import { useEffect, useState } from "react";
import CommentHistory from "./CommentHistory";

function CommentList({ isPublished, setUnmoderatedCount }) {
  const [activeSection, setActiveSection] = useState("comment/pending");

  const [pendingComments, setPendingComments] = useState([]);

  // Fetch pending comments

  async function fetchPendingComments() {
    const response = await fetch("/api/v1/comment/list/pending");
    const [data] = await response.json();
    setPendingComments(data);

    let unmoderatedCount = 0;
    for (const comment of data) {
      if (comment.isPublished === "commentaire en attente") {
        unmoderatedCount++;
      }
    }
    setUnmoderatedCount(unmoderatedCount);
  }

  // Mark a comment as not valid

  async function onClickMarkAsNotValid(commentId) {
    const response = await fetch(`/api/v1/comment/update/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isPublished: 2 }),
    });

    setPendingComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  }

  // Mark a comment as valid

  async function onClickMarkAsValid(commentId) {
    const response = await fetch(`/api/v1/comment/update/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isPublished: 3 }),
    });
    setPendingComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  }

  useEffect(() => {
    fetchPendingComments();
  }, []);

  return (
    <>
      <section className="dashboard_controls">
        <button onClick={() => setActiveSection("comment/pending")}>
          Commentaires en attente
        </button>
        <button onClick={() => setActiveSection("comment/moderated")}>
          Historique
        </button>
      </section>

      <section className="dashboard_comments">
        {activeSection === "comment/pending" && (
          <>
            <h3>Commentaires en attente</h3>
            {pendingComments.length === 0 ? (
              <p>Aucun commentaire en attente</p>
            ) : (
              pendingComments.map((comment) => (
                <article key={comment.id}>
                  <div>
                    <p>{comment.title}</p>
                    <p>{comment.content}</p>
                    <p>publié par : {comment.pseudo}</p>
                    <p>le : {comment.publishDate} </p>
                  </div>
                  <div>
                    <button onClick={() => onClickMarkAsValid(comment.id)}>
                      Valider le commentaire
                    </button>
                    <button onClick={() => onClickMarkAsNotValid(comment.id)}>
                      Refuser le commentaire
                    </button>
                  </div>
                </article>
              ))
            )}
          </>
        )}
      </section>

      <section className="dashboard_comments">
        {activeSection === "comment/moderated" && <CommentHistory />}
      </section>
    </>
  );
}

export default CommentList;
