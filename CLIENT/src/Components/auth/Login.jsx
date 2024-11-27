import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, loginFailed } from "../../store/slices/user";
import useCloseMenu from "../../Hook/useCloseMenu";

function Login() {
  useCloseMenu();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmitBtnHandler(e) {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const requestBody = { email, password };
      console.log("Request Body:", requestBody);

      const response = await fetch(`/api/v1/authentification/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      console.log("Server response status:", response.status);

      if (response.ok) {
        const datas = await response.json();
        console.log("Données utilisateur reçues :", datas);
        dispatch(login(datas));
        setMessage("Connexion réussie !");
        setTimeout(() => navigate("/"), 2000);
      } else {
        const errorDatas = await response.json();
        dispatch(loginFailed({ error: errorDatas.message }));
      }
    } catch (error) {
      console.log(error);
      dispatch(setMessage("Erreur lors de la connexion. Veuillez réessayer.")); // Gestion d'une erreur de connexion
    }
  }

  return (
    <main>
      <h2>Connectez-vous</h2>
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
        {/*authError && <p>{authError}</p>*/}
        <button type="submit">Se connecter</button>
      </form>
      <p>Pas de compte ?</p>
      <button onClick={() => navigate("/authentification/register")}>
        S&apos;inscrire
      </button>
    </main>
  );
}

export default Login;
