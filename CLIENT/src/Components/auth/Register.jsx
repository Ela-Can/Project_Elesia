import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validEmail } from "../../services/validators";

function Register() {
  const message = useSelector((state) => state.user.message);

  const [pseudo, setPseudo] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  }

  async function onSubmitBtnHandler(e) {
    e.preventDefault();

    if (!isChecked) {
      setErrorMessage(
        "Vous devez accepter les CGU et la politique de confidentialité"
      );
      return;
    }

    if (!birthdate) {
      setErrorMessage("Veuillez entrer votre date de naissance.");
      return;
    }

    const age = calculateAge(birthdate);
    if (age < 18) {
      setErrorMessage("Vous devez avoir au moins 18 ans pour créer un compte.");
      return;
    }

    if (!validEmail(email, setErrorMessage)) {
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)."
      );
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
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
        setSuccessMessage("Création réussie ! Vous allez être redirigés...");
        setTimeout(() => navigate("/authentification/login"), 2000);
      } else {
        const errorData = await response.json();
        if (errorData.field === "email") {
          setErrorMessage("Cet email est déjà utilisé.");
        } else if (errorData.field === "pseudo") {
          setErrorMessage("Ce pseudo est déjà pris.");
        } else {
          setErrorMessage(errorData.msg || "Erreur lors de l'inscription.");
        }
      }
    } catch (error) {
      setErrorMessage("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  }

  return (
    <main>
      <h2>Créer un compte</h2>
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
            <label htmlFor="pseudo">
              Nom d&apos;utilisateur<span>*</span>
            </label>
            <input
              type="text"
              //name="pseudo"
              id="pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              aria-required="true"
              required
            />
          </div>
          <div>
            <label htmlFor="birthdate">
              Votre date de naissance<span>*</span>
            </label>
            <input
              type="date"
              //name="birthdate"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              aria-required="true"
              required
            />
          </div>
          <div>
            <label htmlFor="email">
              Entrez votre adresse mail<span>*</span>
            </label>
            <input
              type="email"
              //name="email"
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
              aria-required="true"
              required
            />
          </div>
          <div>
            <input
              type="checkbox"
              name="acceptConditions"
              checked={isChecked}
              onChange={(e) => {
                setIsChecked(e.target.checked), setErrorMessage("");
              }}
              required
            />
            <label htmlFor="acceptConditions">
              J'ai lu et j'accepte les{" "}
              <Link to="/terms_of_use" target="_blank">
                conditions générales d'utilisation{" "}
              </Link>
              et la{" "}
              <Link to="/privacy_policy" target="_blank">
                politique de confidentialité
              </Link>
              .
            </label>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          <button type="submit">S&apos;inscrire</button>
        </form>
      </section>
    </main>
  );
}

export default Register;
