import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailed } from "../../Store/slices/user";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmitBtnHandler(e) {
    e.preventDefault();

    try {
      const response = await fetch(`/api/v1/authentification/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const datas = await response.json();
        dispatch(login(datas));
        navigate("/");
      } else {
        const errorDatas = await response.json();
        //dispatch(loginFailed({ error: errorDatas.message }));
      }
    } catch (error) {
      console.log(error);
      //dispatch(setMessage("Erreur lors de la connexion. Veuillez réessayer.")); // Gestion d'une erreur de connexion
    }
  }

  return (
    <>
      <form onSubmit={onSubmitBtnHandler}>
        <label htmlFor="email">Entrez votre adresse mail</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Entrez votre mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/*authError && <p>{authError}</p>*/}
        <button type="submit">Se connecter</button>
      </form>
      <p>Pas de compte ?</p>
      <button onClick={() => navigate("register")}>S&apos;inscrire</button>
    </>
  );
}

export default Login;
