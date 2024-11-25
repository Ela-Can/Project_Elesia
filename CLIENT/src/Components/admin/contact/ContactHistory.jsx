import { useEffect, useState } from "react";

function ContactHistory() {
  const [finishedRequests, setFinishedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    async function fetchFinishedContact() {
      const response = await fetch(`/api/v1/contact/list/finished`);
      const data = await response.json();
      console.log("Demandes cloturées :", data);
      setFinishedRequests(data);
    }
    fetchFinishedContact();
  }, []);

  return (
    <>
      {selectedRequest ? (
        <article>
          <h3>Détails de la demande</h3>
          <p>Email : {selectedRequest.email}</p>
          <p>Sujet : {selectedRequest.subject}</p>
          <p>Contenu : {selectedRequest.content}</p>
          <p>Date : {selectedRequest.date}</p>
          <button onClick={() => setSelectedRequest(null)}>Retour</button>
        </article>
      ) : (
        <>
          <h3>Historique</h3>
          {finishedRequests.length === 0 ? (
            <p>Aucune demande</p>
          ) : (
            finishedRequests.map((contact) => (
              <article key={contact.id}>
                <div onClick={() => setSelectedRequest(contact)}>
                  <p>{contact.email}</p>
                  <p>{contact.subject}</p>
                  <p>{contact.content}</p>
                  <p>{contact.date}</p>
                </div>
              </article>
            ))
          )}
        </>
      )}
    </>
  );
}

export default ContactHistory;
