import { useEffect, useState } from "react";

function ContactDetails({ contact, statusUpdated, setSelectedRequest }) {
  const [updateStatus, setUpdateStatus] = useState("");

  // Mark as finished

  async function onClickMarkAsFinished() {
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

  // Mark as read

  useEffect(() => {
    async function onClickMarkAsRead() {
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
    }
    onClickMarkAsRead();
  }, []);

  return (
    <article className="contact_details">
      <p>{contact.email}</p>
      <p>{contact.date}</p>
      <p>{contact.subject}</p>
      <p>{contact.content}</p>

      <button onClick={onClickMarkAsFinished}>Marqué comme traité</button>
      <button onClick={() => setSelectedRequest(null)}>Retour</button>
    </article>
  );
}
export default ContactDetails;
