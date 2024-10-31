import { Link } from "react-router-dom";
import Nav from "./Nav.jsx";

function Header() {
  return (
    <header>
      <Link to={"/admin"}>
        <h1>Admin</h1>
      </Link>
      <Nav />
    </header>
  );
}

export default Header;
