import { Link } from "react-router-dom";
import Nav from "./Nav.jsx";

function Header() {
  return (
    <header>
      <Link to={"/"} aria-label="Aller à la page d'accueil">
        <h1>Elésia</h1>
      </Link>
      <Nav />
    </header>
  );
}

export default Header;
