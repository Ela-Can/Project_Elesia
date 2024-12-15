import { useEffect, useState } from "react";
import ContactHistory from "./ContactHistory";
import ContactDetails from "./ContactDetails";

function ContactList({ status, setUnreadCount }) {
  const [activeSection, setActiveSection] = useState("contact/pending");

  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Fetch pending contact requests

  async function fetchPendingContact() {
    const response = await fetch(`/api/v1/contact/list/pending`);
    const data = await response.json();
    setPendingRequests(data);

    let unreadCount = 0;
    for (const contact of data) {
      if (contact.status === "demande non lue") {
        unreadCount++;
      }
    }
    setUnreadCount(unreadCount);
  }

  // Mark as unread

  async function onClickMarkAsUnread(contactId) {
    const response = await fetch(`/api/v1/contact/update/${contactId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: 0 }),
    });
    const data = await response.json();
    fetchPendingContact();
  }

  useEffect(() => {
    fetchPendingContact();
  }, []);

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

      <section className="dashboard_contacts">
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
                    <article
                      className={
                        contact.status === "demande non lue" ? "unread" : "read"
                      }
                    >
                      <div
                        key={contact.id}
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

      <section className="dashboard_contacts">
        {activeSection === "contact/history" && <ContactHistory />}
      </section>
    </>
  );
}

export default ContactList;
