import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <>
      <NavLink to={"/"}>Accueil</NavLink>
      <NavLink to={"product"}>Produits</NavLink>
      <NavLink to={"contact"}>Contact</NavLink>
      <NavLink to={"authentification/login"}>Se connecter</NavLink>
    </>
  );
}

export default Nav;
