import { useState } from "react";

// ajouter le nombre de caractères max

function Contact() {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  async function submitHandler(e) {
    e.preventDefault();

    const datas = {
      email: email,
      content: content,
    };

    console.log(datas);

    const response = await fetch(`/api/v1/contact/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(datas),
    });

    console.log(response);
    if (response === 201) {
      setEmail("");
      setContent("");
    }
  }
  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Entrez votre adresse mail</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="content">Entrez votre message</label>
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Envoyer</button>
      </form>
    </>
  );
}

export default Contact;
