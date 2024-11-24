import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const message = useSelector((state) => state.user.message);

  const [pseudo, setPseudo] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  //const [isPseudoTaken, setIsPseudoTaken] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmitBtnHandler(e) {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      dispatch(setMessage("Les mots de passe ne correspondent pas."));
      return;
    }

    try {
      const response = await fetch(`/api/v1/authentification/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, birthdate, email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/authentification/login");
      } else {
        const errorData = await response.json();
        dispatch(loginFailed({ error: errorData.message }));
      }
    } catch (error) {
      dispatch(setMessage("Erreur lors de l'inscription. Veuillez réessayer."));
    }
  }

  return (
    <main>
      <h2>Créer un compte</h2>
      <form onSubmit={onSubmitBtnHandler}>
        <p>*Champs obligatoires</p>
        <div>
          <label htmlFor="pseudo">
            Nom d&apos;utilisateur<span>*</span>
          </label>
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="birthdate">
            Votre date de naissance<span>*</span>
          </label>
          <input
            type="date"
            name="birthdate"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
        </div>
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
            required
          />
        </div>
        <div>
          <label htmlFor="password">
            Entrez votre mot de passe<span>*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="passwordConfirmation">
            Confirmer votre mot de passe<span>*</span>
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        {message && <p>{message}</p>}
        <button type="submit">S&apos;inscrire</button>
      </form>
    </main>
  );
}

export default Register;
