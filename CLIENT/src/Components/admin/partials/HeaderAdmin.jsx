import { Link } from "react-router-dom";
import Header from "../../partials/Header.jsx";

function HeaderAdmin() {
  return (
    <header>
      <Header />
      <Link to={"/admin"}>
        <h2>Hello Admin</h2>
      </Link>
    </header>
  );
}

export default HeaderAdmin;
