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
        <ul>
          <li>
            <a href="#" aria-label="Visitez notre page Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li>
            <a href="#" aria-label="Visitez notre page Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </li>
          <li>
            <a href="#" aria-label="Visitez notre page TikTok">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </li>
        </ul>
      </div>
      <div aria-label="Mentions légales">
        <Link to="legal_information" aria-label="Mentions légales de Elésia">
          Mentions légales
        </Link>
        <Link
          to="privacy_policy"
          aria-label="Politique de confidentialité de Elésia"
        >
          Politique de confidentialité
        </Link>
        <Link
          to="terms_of_use"
          aria-label="Conditions générales d'utilisation de Elésia"
        >
          Conditions générales d'utilisation
        </Link>
        <p>Elésia&reg; - 2024</p>
      </div>
    </footer>
  );
}

export default Footer;
