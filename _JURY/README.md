# Projet Elésia - Site Vitrine

## Description du projet

Elésia est une marque de cosmétiques spécialisée dans les soins à base d’ingrédients marins. Ce projet vise à créer un site vitrine mettant en valeur ses produits. Le site redirigera les utilisateurs vers des points de vente partenaires pour finaliser leurs achats (sans option de vente directe).

## Fonctionnalités principales

### Côté Utilisateur

Tout d'abord, le site incluera des pages produit qui fourniront des informations détaillées sur les produits ainsi que des avis d'utilisateurs.

Un formulaire de contact sera disponible pour tout utilisateur souhaitant soumettre une demande ou une question à la marque.

Plus spécifiquement, les utilisateurs connectés pourront réaliser des diagnostics de peau afin de trouver le produit qui leur correspond parmi ceux proposés par la marque mais aussi laisser des avis sur les pages produit.

Ils pourront également retrouver un historique des diagnostics réalisés et des commentaires postés sur le site.

### Côté Administrateur

L'administrateur pourra gérer le contenu du site via une interface dédiée (CRUD).

Egalement, un espace sera dédié à la modération des commentaires afin de vérifier la conformité de ces derniers à la charte mais aussi la gestion des demandes de contact.

## Technologies utilisées

- HTML, CSS, React.js, Redux
- Node.js, Express
- MySQL

## Lancement

1. Cloner

```bash
git clone [URL_du_repo]
```

2. Installer les dépendances

```bash
cd [nom_du_dossier]
npm install
```

3. Importer la base de données sur phpMyAdmin

Un export de la base de données est disponible dans le dossier \_JURY

4. Configurer la base de données

Créer un fichier .env à la source avec les informations suivantes :

```js
LOCAL_PORT = "9000";

HOST_DB = "localhost";
USER_DB = "[nom d'utilisateur de la base de données]";
PASS_DB = "[mot de passe de la base de données]";
NAME_DB = "[nom de la base de données]";
PORT_DB = "[port de la base de données]";
```

5. Lancer le projet

```bash
cd SERVER
npm run dev
```

puis

```bash
cd CLIENT
npm run dev
```

6. Accès au site

Cliquer sur le lien suivant http://localhost:5173/

## Accès aux comptes

### Compte Utilisateur

- Email : `user@gmail.com`
- Password : `User123!`

### Compte Administrateur

- Email : `admin@gmail.com`
- Password : `Admin123!`
