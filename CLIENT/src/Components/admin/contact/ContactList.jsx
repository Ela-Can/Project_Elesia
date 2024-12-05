import { useEffect, useState } from "react";
import ContactHistory from "./ContactHistory";
import ContactDetails from "./ContactDetails";

function ContactList({ status, setUnreadCount }) {
  const [activeSection, setActiveSection] = useState("contact/pending");

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
      <section className="dashboard_controls">
        <button onClick={() => setActiveSection("contact/pending")}>
          Demandes en attente
        </button>
        <button onClick={() => setActiveSection("contact/history")}>
          Historique
        </button>
      </section>
      <section className="dashboard_comments">
        {activeSection === "contact/pending" && (
          <>
            <h3>Demandes de contact en attente</h3>
            {selectedRequest ? (
              <ContactDetails
                contact={selectedRequest}
                statusUpdated={fetchPendingContact}
                setSelectedRequest={setSelectedRequest}
              />
            ) : (
              <>
                {pendingRequests.length === 0 ? (
                  <p>Aucune demande</p>
                ) : (
                  pendingRequests.map((contact) => (
                    <article>
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
                    </article>
                  ))
                )}
              </>
            )}
          </>
        )}
      </section>
      <section>
        {activeSection === "contact/history" && <ContactHistory />}
      </section>
    </>
  );
}

export default ContactList;
