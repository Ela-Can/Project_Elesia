import { useEffect, useState } from "react";

function UpdateContact({ id, statusUpdated }) {
  const [updateStatus, setUpdateStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function onClickUpdateBtn(e) {
    try {
      const response = await fetch(`/api/v1/contact/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: 2 }),
      });
      const data = await response.json();
      setUpdateStatus(data);
      statusUpdated();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  return (
    <button onClick={onClickUpdateBtn}>
      {loading ? "Mise à jour..." : "Marquer comme traité"}
    </button>
  );
}

export default UpdateContact;
