import { useEffect, useState } from "react";
import ContactHistory from "./ContactHistory";
import UpdateContact from "./UpdateContact";

function ContactList({ status }) {
  const [pendingRequests, setPendingRequests] = useState([]);

  async function fetchPendingContact() {
    const response = await fetch(`/api/v1/contact/list/pending`);
    const data = await response.json();
    console.log("Demandes récupérées :", data);
    setPendingRequests(data);
  }

  useEffect(() => {
    fetchPendingContact();
  }, [status]);

  return (
    <>
      <h3>Demandes de contact en attente</h3>
      <ul>
        {pendingRequests.length === 0 ? (
          <p>Aucune demande</p>
        ) : (
          pendingRequests.map((contact) => (
            <li key={contact.id}>
              <>
                <p>{contact.email}</p>
                <p>{contact.content}</p>
                <p>{contact.date}</p>
                <UpdateContact
                  id={contact.id}
                  statusUpdated={fetchPendingContact}
                />
              </>
            </li>
          ))
        )}
      </ul>

      <h3>Historique des demandes cloturées</h3>
      <ContactHistory />
    </>
  );
}

export default ContactList;
