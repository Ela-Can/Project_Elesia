import { useEffect, useState } from "react";

function CommentHistory() {
  const [moderatedComments, setModeratedComments] = useState([]);

  // Fetch moderated comments

  useEffect(() => {
    async function fetchModeratedComments() {
      const response = await fetch(`/api/v1/comment/list/moderated`);
      const [data] = await response.json();
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
            <div>
              <p>{comment.title}</p>
              <p>{comment.content}</p>
              <p>publié par : {comment.pseudo}</p>
              <p>le : {comment.publishDate} </p>
            </div>
            <div>
              <p>{comment.isPublished}</p>
            </div>
          </article>
        ))
      )}
    </>
  );
}

export default CommentHistory;
