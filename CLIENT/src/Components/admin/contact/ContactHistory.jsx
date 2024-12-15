import { useEffect, useState } from "react";

function ContactHistory() {
  const [finishedRequests, setFinishedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch finished contact requests

  useEffect(() => {
    async function fetchFinishedContact() {
      const response = await fetch(`/api/v1/contact/list/finished`);
      const data = await response.json();
      setFinishedRequests(data);
    }
    fetchFinishedContact();
  }, []);

  return (
    <>
      {selectedRequest ? (
        <article className="contact_details">
          <p>{selectedRequest.email}</p>
          <p>{selectedRequest.date}</p>
          <p>{selectedRequest.subject}</p>
          <p>{selectedRequest.content}</p>

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
                <div
                  onClick={() => setSelectedRequest(contact)}
                  role="button"
                  aria-label={`Demande de ${contact.email}`}
                  tabIndex="0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedRequest(contact);
                    }
                  }}
                >
                  <p>{contact.email}</p>
                  <p>{contact.date}</p>
                  <p>{contact.subject}</p>
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
