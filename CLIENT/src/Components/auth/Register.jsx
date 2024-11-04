import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const [pseudo, setPseudo] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmitBtnHandler(e) {
    e.preventDefault();

    try {
      const requestBody = { pseudo, birthdate, email, password };
      console.log("Request Body:", requestBody);

      const response = await fetch(`/api/v1/authentification/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });

      console.log("Response Status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // inclure un dispatch ?
        navigate("/authentification/login");
      } else {
        const errorData = await response.json();
        //dispatch(loginFailed({ error: errorData.message }));
      }
    } catch (error) {
      console.log(error);
      //dispatch(setMessage("Erreur lors de l'inscription. Veuillez réessayer."));
    }
  }

  return (
    <>
      <form onSubmit={onSubmitBtnHandler}>
        <label htmlFor="pseudo">Nom d&apos;utilisateur</label>
        <input
          type="text"
          name="pseudo"
          id="pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          required
        />
        <label htmlFor="birthdate">Votre date de naissance</label>
        <input
          type="date"
          name="birthdate"
          id="birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />
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
        {/*msg && <p>{msg}</p>*/}
        <button type="submit">S&apos;inscrire</button>
      </form>
    </>
  );
}

export default Register;
