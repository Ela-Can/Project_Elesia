import { Link } from "react-router-dom";

function LegalInformation() {
  return (
    <main>
      <h2>Mentions légales</h2>
      <section>
        <article>
          <h4>Éditeur du site</h4>
          <p>Nom de l&apos;entreprise : Elésia</p>
          <p>Forme juridique : SAS (Société par Actions Simplifiée)</p>
          <p>Capital social : 50 000 €</p>
          <p>Siège social : 123 Avenue des Exemples, 75001 Paris, France</p>
          <p>Numéro de téléphone : +33 1 23 45 67 89</p>
          <p>Email : contact@elesia.com</p>
          <p>Numéro SIRET : 123 456 789 00012</p>
          <p>Numéro de TVA intracommunautaire :FR12345678901</p>
        </article>
        <article>
          <h4>Hébergeur du site</h4>
          <p>Nom de l&apos;hébergeur : OVHcloud</p>
          <p>Adresse : 2 Rue Kellermann, 59100 Roubaix, France</p>
          <p>Numéro de téléphone : +33 9 72 10 10 07</p>
          <p>
            Site internet :
            <a
              href="https://www.ovhcloud.com"
              target="_blank"
              aria-label="Visitez le site d'OVHcloud (nouvel onglet)"
            >
              https://www.ovhcloud.com
            </a>
          </p>
        </article>
        <article>
          <h4>Développement du site</h4>
          <p>Développeur : Ela CAN</p>
        </article>
        <article>
          <h4>Services fournis</h4>
          <p>
            Le site Elesia.com a pour objet de fournir des informations sur les
            services et produits proposés par Elesia. L&apos;entreprise
            s&apos;efforce de fournir des informations aussi précises que
            possible. Toutefois, elle ne peut être tenue responsable des
            omissions, des inexactitudes et des carences dans la mise à jour des
            informations, qu&apos;elles soient de son fait ou du fait de tiers
            partenaires qui lui fournissent ces informations.
          </p>
        </article>
        <article>
          <h4>Propriété intellectuelle</h4>
          <p>
            Le contenu du site Elesia.com (textes, images, graphismes, logos,
            vidéos, icônes, etc.) est protégé par les lois relatives à la
            propriété intellectuelle. Toute reproduction, représentation,
            modification, publication, adaptation, totale ou partielle de ces
            éléments, quel que soit le moyen ou le procédé utilisé, est
            interdite, sauf autorisation écrite préalable d&apos;Elesia.
          </p>
        </article>
        <article>
          <h4>Données personnelles</h4>
          <p>
            Nous collectons des données personnelles dans le cadre de
            l’utilisation de notre site, conformément au Règlement Général sur
            la Protection des Données (RGPD). Ces données incluent [nom, email,
            etc.].
          </p>
          <p>
            Pour plus de détails sur la collecte, l’utilisation et la protection
            de vos données personnelles, veuillez consulter notre
            <Link to="/privacy_policy">Politique de Confidentialité</Link>.
          </p>
        </article>
        <article>
          <h4>Utilisation des cookies</h4>
          <p>
            Le site Elesia.com utilise des cookies pour améliorer votre
            expérience utilisateur et réaliser des statistiques. Vous pouvez
            configurer vos préférences dans les paramètres de votre navigateur
            ou via notre politique de cookies.
          </p>
        </article>
        <article>
          <h4>Litiges</h4>
          <p>
            Les présentes mentions légales sont régies par le droit français. En
            cas de litige, la compétence exclusive est attribuée aux tribunaux
            compétents de Paris.
          </p>
        </article>
        <article>
          <h4>Crédits</h4>
          <p>
            Design et développement par Ela CAN. Illustrations et images issues
            de banques d&apos; libres de droits ou créées par Elesia.
          </p>
        </article>
      </section>
    </main>
  );
}

export default LegalInformation;
