import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faTiktok,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <div>
        <h5>Retrouvez-nous</h5>
        <a href="#">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faTiktok} />
        </a>
      </div>
      <div>
        <h5>Mentions légales</h5>
        <ul>
          <li>
            <Link to="/mentions-legales">Mentions légales</Link>
          </li>
          <li>
            <Link to="/politique-de-confidentialite">
              Politique de confidentialité
            </Link>
          </li>
          <li>
            <Link to="/conditions-generales">
              Conditions générales d'utilisation
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
