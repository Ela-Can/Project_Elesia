import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faUser,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import { toggleMenu } from "../../store/slices/menu.js";
import { logout } from "../../store/slices/user.js";

function Nav() {
  const user = useSelector((state) => state.user);
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  async function onClickLogout() {
    try {
      const response = await fetch("/api/v1/authentification/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(logout(data.isLogged));
        dispatch(toggleMenu());
        navigate("/");
      }
    } catch (error) {
      setMessageErreur(
        "Une erreur est survenue lors de la déconnexion. Veuillez réessayer plus tard."
      );
    }
  }

  return (
    <>
      <div className="burger-menu">
        <button
          onClick={() => dispatch(toggleMenu())}
          aria-label={menu.isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <FontAwesomeIcon icon={menu.isOpen ? faTimes : faBars} />
        </button>

        <button
          onClick={() => navigate("/authentification/login")}
          aria-label="Se connecter"
        >
          <FontAwesomeIcon icon={faUser} />
        </button>
        <button
          onClick={() => {
            navigate("/store_locator");
          }}
          aria-label="Trouver un point de vente"
        >
          <FontAwesomeIcon icon={faLocationDot} />
        </button>
      </div>

      <nav className={menu.isOpen ? "nav_open" : "nav_closed"}>
        <NavLink to={"/"} tabIndex="0">
          Accueil
        </NavLink>
        <NavLink to={"product"} tabIndex="0">
          Produits
        </NavLink>
        <NavLink to={"diagnostic/create"} tabIndex="0">
          Diagnostic
        </NavLink>
        <NavLink to={"contact"} tabIndex="0">
          Contact
        </NavLink>

        {user.isLogged ? (
          user.role === "user" ? (
            <>
              <NavLink to={"user"} tabIndex="0">
                Dashboard
              </NavLink>
              <button onClick={onClickLogout} aria-label="Se déconnecter">
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <NavLink to={"admin"} tabIndex="0">
                Dashboard admin
              </NavLink>
              <button onClick={onClickLogout} aria-label="Se déconnecter">
                Se déconnecter
              </button>
            </>
          )
        ) : (
          <NavLink to={"authentification/login"} tabIndex="0">
            Se connecter
          </NavLink>
        )}
      </nav>
      {errorMessage && <p className="message-erreur">{errorMessage}</p>}
    </>
  );
}

export default Nav;
