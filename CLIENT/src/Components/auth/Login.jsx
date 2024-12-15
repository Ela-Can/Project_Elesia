import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login, loginFailed } from "../../store/slices/user";

import { validEmail } from "../../services/validators";

import useCloseMenu from "../../Hook/useCloseMenu";

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

        if (datas.user.isActive === 0) {
          setErrorMessage(
            "Votre compte est désactivé. Vous ne pouvez plus vous connecter."
          );
          return;
        }

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

      <section>
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
              autoComplete="email"
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-required="true"
              required
            />
          </div>

          <button type="submit">Se connecter</button>
        </form>

        <div className="redirection">
          <p>Pas de compte ?</p>
          <Link to="/authentification/register" tabIndex="0" className="link">
            Inscrivez-vous
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Login;
