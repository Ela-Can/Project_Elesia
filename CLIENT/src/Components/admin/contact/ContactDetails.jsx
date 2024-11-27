import { useEffect, useState } from "react";

function ContactDetails({ contact, statusUpdated, setSelectedRequest }) {
  const [updateStatus, setUpdateStatus] = useState("");

  async function onClickMarkAsFinished(e) {
    try {
      const response = await fetch(`/api/v1/contact/update/${contact.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: 2 }),
      });
      const data = await response.json();
      setUpdateStatus(data);
      statusUpdated();
      setSelectedRequest(null);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  useEffect(() => {
    async function onClickMarkAsRead(e) {
      try {
        const response = await fetch(`/api/v1/contact/update/${contact.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: 1 }),
        });
        const data = await response.json();
        setUpdateStatus(data);
        statusUpdated();
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
    onClickMarkAsRead();
  }, []);

  return (
    <>
      <h3>Détails de la demande</h3>
      <p>Email :{contact.email}</p>
      <p>Sujet : {contact.subject}</p>
      <p>Contenu : {contact.content}</p>
      <p>{contact.date}</p>

      <button onClick={onClickMarkAsFinished}>Marqué comme traité</button>
      <button onClick={() => setSelectedRequest(null)}>Retour</button>
    </>
  );
}
export default ContactDetails;
