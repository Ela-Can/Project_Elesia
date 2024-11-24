import { useEffect, useState } from "react";

// ajouter le nombre de caractères max

function Contact() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchSujects() {
      try {
        const response = await fetch(`/api/v1/subject/list/1`);
        const data = await response.json();
        console.log(data);
        setSubjects(data);
      } catch (error) {
        console.error("Erreur de récupération des sujets :", error);
      }
    }
    fetchSujects();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();

    const response = await fetch(`/api/v1/contact/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, content, subject }),
    });
    if (response === 201) {
      setEmail("");
      setSubject("");
      setContent("");
    }
  }
  return (
    <main>
      <h2>Contactez-nous</h2>
      <section>
        <form onSubmit={submitHandler}>
          <p>*Champs obligatoires</p>
          <div>
            <label htmlFor="email">
              Entrez votre adresse mail<span>*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="subject">
              Sélectionner un sujet<span>*</span>
            </label>
            <select
              name="subject"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >
              <option value="" disabled>
                Choisissez un sujet
              </option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="content">
              Entrez votre message<span>*</span>
            </label>
            <textarea
              name="content"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </section>
    </main>
  );
}

export default Contact;
