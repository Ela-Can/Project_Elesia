import { useEffect, useState } from "react";
import ContactHistory from "./ContactHistory";
import ContactDetails from "./ContactDetails";

function ContactList({ status, setUnreadCount }) {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  async function fetchPendingContact() {
    const response = await fetch(`/api/v1/contact/list/pending`);
    const data = await response.json();
    console.log("Demandes récupérées :", data);
    setPendingRequests(data);

    let unreadCount = 0;
    for (const contact of data) {
      if (contact.status === "demande non lue") {
        unreadCount++;
      }
    }
    setUnreadCount(unreadCount);
  }

  useEffect(() => {
    fetchPendingContact();
  }, [status]);

  async function onClickMarkAsUnread(contactId) {
    try {
      const response = await fetch(`/api/v1/contact/update/${contactId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: 0 }),
      });
      const data = await response.json();
      fetchPendingContact();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <>
      {selectedRequest ? (
        <ContactDetails
          contact={selectedRequest}
          statusUpdated={fetchPendingContact}
          setSelectedRequest={setSelectedRequest}
        />
      ) : (
        <>
          <h3>Demandes de contact en attente</h3>
          <ul>
            {pendingRequests.length === 0 ? (
              <p>Aucune demande</p>
            ) : (
              pendingRequests.map((contact) => (
                <>
                  <li>
                    <div
                      key={contact.id}
                      onClick={() => setSelectedRequest(contact)}
                    >
                      <p>{contact.email}</p>
                      <p>{contact.subject}</p>
                      <p>{contact.content}</p>
                      <p>{contact.date}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        onClickMarkAsUnread(contact.id);
                      }}
                    >
                      Marquer comme non lu
                    </button>
                  </li>
                </>
              ))
            )}
          </ul>
          <h3>Historique des demandes cloturées</h3>
          <ContactHistory />
        </>
      )}
    </>
  );
}

export default ContactList;
