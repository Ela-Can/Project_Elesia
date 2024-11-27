import { useEffect, useState } from "react";
import { validEmail, validSubjet, validContent } from "../utils/validators.js";
import useCloseMenu from "../../Hook/useCloseMenu";

function Contact() {
  useCloseMenu();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [content, setContent] = useState("");

  const [message, setMessage] = useState("");

  // Handling maximum character limit

  const maxCharacters = 1500;

  function onChangeNbrMax(e) {
    const value = e.target.value;
    if (value.length <= maxCharacters) {
      setContent(value);
    }
  }

  // Validation of the required fields

  const [errors, setErrors] = useState({});

  function requiredFields() {
    const error = {};

    validEmail(email, error);
    validSubjet(subject, error);
    validContent(content, error);

    return error;
  }

  // Fetching active subjects

  useEffect(() => {
    async function fetchSujects() {
      try {
        const response = await fetch(`/api/v1/subject/list/1`);
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Erreur de récupération des sujets :", error);
      }
    }
    fetchSujects();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();

    const error = requiredFields();
    setErrors(error);

    if (error.email || error.subject || error.content) {
      return;
    }

    const response = await fetch(`/api/v1/contact/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, content, subject }),
    });

    if (response === 201) {
      setEmail("");
      setSubject("");
      setContent("");
      setErrors({});
      setMessage("Votre message a été envoyé avec succès !");
    } else {
      setMessage(
        "Une erreur s'est produite lors de l'envoi. Veuillez réessayer."
      );
    }
  }

  return (
    <main>
      <h2>Contactez-nous</h2>
      <p>Veuillez remplir ce formulaire pour nous contacter.</p>
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
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  email: "",
                }));
              }}
            />
            {errors.email && <span>{errors.email}</span>}
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
                setErrors((prev) => ({
                  ...prev,
                  subject: "",
                }));
              }}
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
            {errors.subject && <span>{errors.subject}</span>}
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
                setErrors((prev) => ({
                  ...prev,
                  content: "",
                }));
              }}
            ></textarea>
            <p>{maxCharacters - content.length} caractères restants</p>
            {errors.content && <span>{errors.content}</span>}
          </div>
          <button type="submit">Envoyer</button>
        </form>
        {message && <p>{message}</p>}
      </section>
    </main>
  );
}

export default Contact;
