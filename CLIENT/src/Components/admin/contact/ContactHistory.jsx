import { useEffect, useState } from "react";

function ContactHistory() {
  const [finishedRequests, setFinishedRequests] = useState([]);

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
      <ul>
        {finishedRequests.length === 0 ? (
          <p>Aucune demande</p>
        ) : (
          finishedRequests.map((contact) => (
            <li key={contact.id}>
              <>
                <p>{contact.email}</p>
                <p>{contact.content}</p>
                <p>{contact.date}</p>
              </>
            </li>
          ))
        )}
      </ul>
    </>
  );
}

export default ContactHistory;
