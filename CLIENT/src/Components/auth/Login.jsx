import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, loginFailed } from "../../store/slices/user";
import useCloseMenu from "../../Hook/useCloseMenu";
import { validEmail } from "../../services/validators";
import useCheckAuth from "../../Hook/useCheckAuth.jsx";

function Login() {
  useCloseMenu();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmitBtnHandler(e) {
    e.preventDefault();

    if (!validEmail(email, setErrorMessage)) {
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Veuillez entrer un mot de passe valide.");
      return;
    }

    try {
      const requestBody = { email, password };

      const response = await fetch(`/api/v1/authentification/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      if (response.ok) {
        const datas = await response.json();
        dispatch(login(datas));
        setSuccessMessage("Connexion réussie ! Vous allez être redirigés...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        const errorDatas = await response.json();
        dispatch(loginFailed({ error: errorDatas.message }));
        setErrorMessage("Adresse email ou mot de passe incorrect.");
      }
    } catch (error) {
      setErrorMessage("Erreur lors de la connexion. Veuillez réessayer.");
    }
  }

  return (
    <main>
      <h2>Connectez-vous</h2>
      {successMessage && (
        <p className="success-message" role="status">
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p className="error-message" role="status">
          {errorMessage}
        </p>
      )}
      <form onSubmit={onSubmitBtnHandler}>
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
            aria-required="true"
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
            aria-required="true"
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <p>Pas de compte ?</p>
      <button
        onClick={() => navigate("/authentification/register")}
        aria-label="Aller à la page d'inscription"
      >
        S&apos;inscrire
      </button>
    </main>
  );
}

export default Login;
