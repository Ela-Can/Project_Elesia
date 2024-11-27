import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import { toggleMenu } from "../../store/slices/menu.js";
import { logout } from "../../store/slices/user.js";

function Nav() {
  const user = useSelector((state) => state.user);
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [type, setType] = useState(
    window.innerWidth > 768 ? "tabletAndMore" : "mobile"
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setType("tabletAndMore");
        return;
      }
      setType("mobile");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function onClickLogout() {
    try {
      const response = await fetch("/api/v1/authentification/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Logout successful:", data);
        dispatch(logout(data.isLogged));
        dispatch(toggleMenu());
        navigate("/");
      } else {
        console.error(
          `Logout failed. Status: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("An error occurred during logout:", error.message);
    }
  }

  return (
    <>
      {type === "mobile" && (
        <button onClick={() => dispatch(toggleMenu())}>
          <FontAwesomeIcon icon={menu.isOpen ? faTimes : faBars} />
        </button>
      )}
      <nav
        className={`nav ${
          type === "mobile" && menu.isOpen ? "burger" : "screen"
        }`}
      >
        <NavLink to={"/"}>Accueil</NavLink>
        <NavLink to={"product"}>Produits</NavLink>
        <NavLink to={"diagnostic/create"}>Diagnostic</NavLink>
        <NavLink to={"contact"}>Contact</NavLink>

        {user.isLogged ? (
          user.role === "user" ? (
            <>
              <NavLink to={"user"}>Dashboard</NavLink>
              <button onClick={onClickLogout}>Se déconnecter</button>
            </>
          ) : (
            <>
              <NavLink to={"admin"}>Tableau de bord admin</NavLink>
              <button onClick={onClickLogout}>Se déconnecter</button>
            </>
          )
        ) : (
          <NavLink to={"authentification/login"}>Se connecter</NavLink>
        )}
      </nav>
    </>
  );
}

export default Nav;
