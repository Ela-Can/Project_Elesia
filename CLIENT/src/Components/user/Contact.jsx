import { useEffect, useState } from "react";
import useCloseMenu from "../../Hook/useCloseMenu";
import { validEmail } from "../../services/validators";

function Contact() {
  useCloseMenu();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [content, setContent] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handling maximum character limit

  const maxCharacters = 1500;

  function onChangeNbrMax(e) {
    const value = e.target.value;
    if (value.length <= maxCharacters) {
      setContent(value);
      setSuccessMessage("");
      setErrorMessage("");
    }
  }

  // Fetching active subjects

  useEffect(() => {
    async function fetchSujects() {
      const response = await fetch(`/api/v1/subject/list/1`);
      const data = await response.json();
      setSubjects(data);
    }
    fetchSujects();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();

    if (!validEmail(email, setErrorMessage)) {
      return;
    }

    if (!subject) {
      setErrorMessage("Veuillez sélectionner un sujet.");
      return;
    }

    if (!content.trim()) {
      setErrorMessage("Veuillez ajouter un message.");
      return;
    }

    const response = await fetch(`/api/v1/contact/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, content, subject }),
    });

    if (response.ok) {
      setEmail("");
      setSubject("");
      setContent("");
      setErrorMessage("");
      setSuccessMessage("Votre message a été envoyé avec succès !");
    } else {
      setErrorMessage(
        "Une erreur s'est produite lors de l'envoi. Veuillez réessayer."
      );
    }
  }

  return (
    <main>
      <h2>Contactez-nous</h2>
      <section>
        {successMessage && (
          <p className="success-message" role="status">
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="error-message" role="alert">
            {errorMessage}
          </p>
        )}
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
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSuccessMessage("");
                setErrorMessage("");
              }}
              aria-required="true"
              required
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
              onChange={(e) => {
                setSubject(e.target.value);
                setSuccessMessage("");
                setErrorMessage("");
              }}
              aria-required="true"
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
              rows="15"
              value={content}
              onChange={(e) => {
                onChangeNbrMax(e);
                setSuccessMessage("");
                setErrorMessage("");
              }}
              aria-required="true"
              aria-describedby="content-limit"
              required
            ></textarea>
            <p>{maxCharacters - content.length} caractères restants</p>
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </section>
    </main>
  );
}

export default Contact;
