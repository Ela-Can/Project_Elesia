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
        <div>
          <h5>Retrouvez-nous</h5>
          <ul>
            <li>
              <a
                href="#"
                aria-label="Visitez notre page Instagram"
                tabIndex="0"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="#" aria-label="Visitez notre page Twitter" tabIndex="0">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="#" aria-label="Visitez notre page TikTok" tabIndex="0">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </li>
          </ul>
        </div>
        <div aria-label="Mentions légales">
          <Link
            to="legal_information"
            aria-label="Mentions légales de Elésia"
            tabIndex="0"
          >
            Mentions légales
          </Link>
          <Link
            to="privacy_policy"
            aria-label="Politique de confidentialité de Elésia"
            tabIndex="0"
          >
            Politique de confidentialité
          </Link>
          <Link
            to="terms_of_use"
            aria-label="Conditions générales d'utilisation de Elésia"
            tabIndex="0"
          >
            Conditions générales d'utilisation
          </Link>
          <Link
            to="code_of_conduct"
            aria-label="Charte de bonne conduite de Elésia"
            tabIndex="0"
          >
            Charte de bonne conduite
          </Link>
        </div>
      </div>
      <p>Elésia&reg; - 2024</p>
    </footer>
  );
}

export default Footer;
