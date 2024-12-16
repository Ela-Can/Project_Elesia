-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : lun. 16 déc. 2024 à 10:07
-- Version du serveur : 8.0.35
-- Version de PHP : 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `elesia`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `label` varchar(50) NOT NULL,
  `ref` enum('produits','articles') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `label`, `ref`) VALUES
(21, 'Crème de jour', 'produits'),
(22, 'Masque', 'produits'),
(23, 'Sérum', 'produits'),
(24, 'Exfoliant', 'produits'),
(34, 'Nettoyant visage', 'produits'),
(35, 'Toner visage', 'produits');

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `id` int NOT NULL,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `publishDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `isPublished` tinyint NOT NULL DEFAULT '0' COMMENT '0 = commentaire en attente, 1 = commentaire supprimé par l''utilisateur,  2 = commentaire refusé par le modérateur, 3 = commentaire validé par le modérateur',
  `id_user` int DEFAULT NULL,
  `id_product` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `title`, `content`, `publishDate`, `isPublished`, `id_user`, `id_product`) VALUES
(21, 'Effet purifiant garanti', 'Ce masque est parfait après une journée stressante. Ma peau est nette et paraît plus saine après chaque application. Je le recommande pour les peaux mixtes !', '2024-12-12 14:27:16', 3, 20, 21),
(22, 'Pas assez hydratante', 'Je m’attendais à une meilleure hydratation, mais ma peau reste sèche par endroits. Je vais essayer un autre produit.', '2024-12-12 14:29:12', 3, 21, 22),
(23, 'Ma peau raffermie', 'Ce sérum est devenu un indispensable de ma routine du soir. Ma peau paraît plus jeune et mes ridules sont moins marquées. J’adore le rendu !', '2024-12-12 14:30:24', 0, 22, 23),
(24, 'Texture agréable et efficace', 'Très satisfaite de cette crème. Elle pénètre rapidement et laisse ma peau douce toute la journée. Le SPF 20 est un bonus parfait pour ma routine.', '2024-12-12 14:32:23', 3, 23, 22),
(25, 'Pas assez hydratante', 'Je m’attendais à une meilleure hydratation, mais ma peau reste sèche par endroits. Je vais essayer un autre produit.', '2024-12-12 14:33:42', 3, 24, 22),
(26, 'Sensation de tiraillement', 'Après l’utilisation, ma peau tiraille un peu, ce qui est désagréable. Dommage, car le produit nettoie bien sinon.', '2024-12-12 14:35:18', 3, 25, 24),
(27, 'Une marque qui exploite la crédulité', 'Encore une marque qui profite du capitalisme à outrance pour vendre du rêve et se remplir les poches. Ils jouent sur la crédulité des consommateurs avec leurs promesses \"miracles\". Rien de sincère, tout est marketing !', '2024-12-12 14:44:21', 2, 27, 25),
(28, 'Pas à la hauteur de mes attentes', 'Ce masque purifiant est une déception. Il assèche ma peau sans vraiment éliminer les impuretés. Je n’ai vu aucune amélioration, et j’ai même eu quelques rougeurs après l’avoir utilisé. Je ne recommande pas.', '2024-12-12 14:48:53', 1, 28, 21);

-- --------------------------------------------------------

--
-- Structure de la table `contactForm`
--

CREATE TABLE `contactForm` (
  `id` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '0 = non lu, 1 = lu, 2 = traité',
  `id_subject` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `contactForm`
--

INSERT INTO `contactForm` (`id`, `email`, `content`, `date`, `status`, `id_subject`) VALUES
(57, 'marie.@gmail.com', '\nJe suis particulièrement intéressée par votre crème hydratante après avoir lu plusieurs avis positifs sur votre site. Cependant, j\'ai la peau très sensible et réactive, et je voudrais m\'assurer que ce produit conviendra à mon type de p', '2024-12-15 18:14:49', 0, 17),
(58, 'marie.exemple@gmail.com', 'Bonjour,\nJe suis particulièrement intéressée par votre crème hydratante \"Élixir Marin\" après avoir lu plusieurs avis positifs sur votre site. Cependant, j\'ai la peau très sensible et réactive, et je voudrais m\'assurer que ce produit conviendra à mon type de peau. Pouvez-vous me confirmer s\'il est testé dermatologiquement pour les peaux sensibles ?\nPar ailleurs, j\'aurais aimé savoir si vous proposez des formats d\'échantillons pour tester le produit avant d\'investir dans un format complet. Cela me permettrait de vérifier si ma peau tolère bien la formulation.\nJe vous remercie pour votre attention et votre retour rapide. J’apprécie beaucoup vos engagements pour des produits issus d\'ingrédients marins naturels.\nCordialement,\nMarie Dupont', '2024-12-15 18:15:34', 0, 17),
(59, 'pierre.exemple@gmail.com', 'Bonjour,\nJe vous contacte car je rencontre un problème pour accéder à mon compte client. Depuis hier, je ne parviens plus à me connecter malgré plusieurs tentatives avec mon identifiant habituel. \nMon adresse e-mail associée au compte est pierre.martin87@example.com. Serait-il possible de vérifier si mon compte est toujours actif ou s\'il y a eu un problème technique ?\nMerci par avance pour votre aide et votre retour.\nBien cordialement,\nPierre Martin', '2024-12-15 18:16:19', 0, 18),
(60, 'laura.exemple@gmail.com', 'Bonjour,\nConformément au Règlement Général sur la Protection des Données (RGPD), je souhaite exercer mon droit d\'accès aux informations personnelles que vous détenez à mon sujet. Je suis actuellement inscrite sur votre site avec l\'adresse e-mail laura.boucher34@example.com.\nJe vous prie de bien vouloir me transmettre un récapitulatif détaillé des informations me concernant. Si possible, j\'aimerais également connaître la durée de conservation de ces données ainsi que leur finalité d’utilisation.\nJe vous remercie par avance pour votre coopération et reste à votre disposition pour toute pièce justificative si nécessaire.\n', '2024-12-15 18:17:29', 2, 19);

-- --------------------------------------------------------

--
-- Structure de la table `diagnosticForm`
--

CREATE TABLE `diagnosticForm` (
  `id` int NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isSkinSensitive` tinyint NOT NULL COMMENT '0 = false, 1 = true',
  `isExposedToPollution` tinyint NOT NULL COMMENT '0 = pas fréquemmen, 1 = fréquemment',
  `isExposedToSun` tinyint NOT NULL COMMENT '0 = pas fréquemment, 1 = fréquemment',
  `isPregnantOrBreastfeeding` tinyint NOT NULL COMMENT '0 = false, 1 = true',
  `id_user` int NOT NULL,
  `id_skinType` int DEFAULT NULL,
  `id_skinConcern` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `diagnosticForm`
--

INSERT INTO `diagnosticForm` (`id`, `createdDate`, `isSkinSensitive`, `isExposedToPollution`, `isExposedToSun`, `isPregnantOrBreastfeeding`, `id_user`, `id_skinType`, `id_skinConcern`) VALUES
(341, '2024-12-10 17:41:13', 1, 1, 1, 1, 13, 15, 10),
(363, '2024-12-15 16:58:10', 1, 1, 1, 1, 26, 13, 10),
(364, '2024-12-15 17:01:20', 1, 1, 1, 1, 26, 13, 10),
(365, '2024-12-15 17:11:51', 1, 1, 1, 1, 26, 13, 10),
(366, '2024-12-15 17:12:05', 1, 1, 1, 1, 26, 13, 10),
(367, '2024-12-15 17:13:06', 1, 1, 0, 1, 26, 14, 11),
(368, '2024-12-15 17:13:34', 1, 1, 0, 1, 26, 14, 12),
(375, '2024-12-15 17:35:20', 1, 1, 1, 1, 25, 13, 10),
(377, '2024-12-15 17:37:37', 1, 1, 1, 1, 25, 13, 10),
(378, '2024-12-15 17:40:01', 1, 1, 1, 1, 25, 13, 10),
(379, '2024-12-15 17:42:58', 1, 1, 0, 1, 25, 13, 10),
(380, '2024-12-15 17:43:10', 1, 1, 0, 1, 25, 14, 11),
(381, '2024-12-15 17:43:20', 1, 1, 0, 1, 25, 14, 11),
(382, '2024-12-15 17:44:40', 1, 1, 0, 1, 25, 14, 11),
(383, '2024-12-15 17:44:43', 1, 1, 0, 1, 25, 14, 11),
(384, '2024-12-15 17:44:45', 1, 1, 0, 1, 25, 14, 11),
(385, '2024-12-15 17:44:46', 1, 1, 0, 0, 25, 14, 11),
(386, '2024-12-15 17:44:47', 1, 1, 0, 0, 25, 14, 11),
(388, '2024-12-15 17:45:01', 1, 1, 0, 1, 25, 14, 11),
(389, '2024-12-15 17:45:10', 1, 1, 0, 1, 25, 15, 13),
(390, '2024-12-15 17:45:13', 1, 1, 0, 0, 25, 15, 13),
(391, '2024-12-15 17:45:27', 0, 0, 0, 0, 25, 15, 18),
(392, '2024-12-15 17:45:55', 0, 0, 0, 0, 25, 15, 18),
(394, '2024-12-15 18:01:57', 1, 1, 0, 1, 25, 14, 11),
(395, '2024-12-15 18:02:10', 1, 1, 0, 1, 25, 14, 11),
(396, '2024-12-16 10:10:42', 1, 0, 1, 1, 13, 13, 10),
(397, '2024-12-16 10:14:10', 1, 1, 0, 1, 13, 13, 10),
(398, '2024-12-16 10:14:19', 1, 1, 0, 1, 13, 14, 11),
(409, '2024-12-16 10:24:54', 1, 1, 0, 1, 13, 14, 11),
(410, '2024-12-16 10:25:19', 1, 1, 0, 1, 13, 14, 11),
(411, '2024-12-16 10:26:41', 1, 0, 0, 1, 13, 13, 17),
(412, '2024-12-16 10:26:52', 1, 0, 0, 1, 13, 15, 10);

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `ingredients` text NOT NULL,
  `howToUse` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `precautions` varchar(255) NOT NULL,
  `useDuration` varchar(100) NOT NULL,
  `packaging` text NOT NULL,
  `image` varchar(100) NOT NULL,
  `alt` varchar(255) NOT NULL,
  `isOnline` tinyint NOT NULL COMMENT '0 = produit non en ligne, 1 = produit en ligne',
  `adaptedToSensitiveSkin` tinyint NOT NULL COMMENT '0 = produit pas adapté, 1 = produit adapté',
  `protectsFromPollution` tinyint NOT NULL COMMENT '0 = produit ne protège pas, 1 = produit protège',
  `protectsFromSun` tinyint NOT NULL COMMENT '0 = produit ne protège pas, 1 = produit protège',
  `compatibleWithPregOrBreastfeed` tinyint NOT NULL COMMENT '0 = produit non compatible, 1 = produit compatible',
  `id_category` int NOT NULL,
  `id_skinType` int NOT NULL,
  `id_skinConcern` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `ingredients`, `howToUse`, `precautions`, `useDuration`, `packaging`, `image`, `alt`, `isOnline`, `adaptedToSensitiveSkin`, `protectsFromPollution`, `protectsFromSun`, `compatibleWithPregOrBreastfeed`, `id_category`, `id_skinType`, `id_skinConcern`) VALUES
(21, 'Masque Purifiant aux Algues Brunes', 'Un masque conçu pour rétablir l’équilibre naturel de votre peau. Sa formule courte et clean associe les bienfaits purifiants de l’argile marine et des algues brunes pour absorber les impuretés, réguler l’excès de sébum, et réduire les imperfections. Grâce à ses actifs marins riches en minéraux essentiels et antioxydants, ce masque laisse la peau fraîche, apaisée, et lumineuse, idéale pour les peaux sujettes aux déséquilibres.', 'Aqua (Water), Kaolin, Argile Marine, Macrocystis Pyrifera (Kelp) Extract, Glycerin, Xanthan Gum, Citric Acid.', 'Appliquez une couche uniforme sur une peau propre et sèche. Laissez agir 10 à 15 minutes, puis rincez abondamment à l’eau tiède.', 'Usage externe uniquement. Éviter le contact avec les yeux. Conserver dans un endroit frais et sec.', 'Utiliser dans les 6 mois après ouverture.', 'Pot en verre recyclable de 50 ml avec un couvercle en aluminium recyclable.', '/img/productImg/4d57c035-79f0-47cb-a30b-5170c7675d79.webp', 'Pot contenant le Masque Purifiant aux Algues Brunes et Argile Marine.', 1, 1, 1, 0, 1, 22, 14, 11),
(22, 'Crème Hydratante aux Perles Marines SPF 20', 'Une crème hydratante légère et protectrice, enrichie en extrait de perles marines, reconnues pour leurs acides aminés et minéraux essentiels. Ce soin hydrate intensément, protège la peau des agressions extérieures et offre une protection solaire SPF 20 contre les rayons UV nocifs. Adaptée aux peaux normales à sèches, cette crème combine efficacité et sécurité grâce à sa formule clean et naturelle. Sa texture légère, non grasse, et rapidement absorbée est parfaite pour un usage quotidien, assurant confort et éclat à votre peau.', 'Aqua (Water), Glycerin, Hydrolyzed Pearl, Squalane, Caprylic/Capric Triglyceride, Titanium Dioxide, Tocopherol, Xanthan Gum.', 'Appliquer une quantité suffisante le matin sur une peau propre et sèche. Masser délicatement sur le visage et le cou jusqu’à absorption complète.', 'Usage externe uniquement. Éviter le contact avec les yeux. Conserver dans un endroit frais et sec.', 'Utiliser dans les 6 mois après ouverture.', 'Tube recyclable en plastique de 50 ml.', '/img/productImg/83397544-780e-4b0c-9568-fea19d978025.webp', 'Tube blanc contenant la Crème Hydratante aux Perles Marines SPF 20.', 1, 1, 1, 1, 1, 21, 15, 10),
(23, 'Sérum Anti-Âge au Collagène Marin', 'Un sérum anti-âge ultra-concentré conçu pour réduire l\'apparence des rides, améliorer l\'élasticité de la peau et raviver son éclat naturel. Formulé avec du collagène marin et du caviar d’algues, il hydrate intensément et stimule la régénération cellulaire, laissant la peau visiblement plus jeune et ferme.', 'Aqua (Water), Glycerin, Collagen, Caulerpa Lentillifera Extract, Sodium Hyaluronate, Ascophyllum Nodosum Extract, Tocopherol, Xanthan Gum, Citric Acid, Potassium Sorbate, Sodium Benzoate.', 'Appliquer 2 à 3 gouttes sur une peau propre et sèche matin et soir. Masser délicatement en mouvements circulaires jusqu’à absorption complète. ', 'Usage externe uniquement. Éviter le contact avec les yeux. Conserver dans un endroit frais et sec. En cas d\'irritation, interrompre l\'utilisation.', '6 mois après ouverture.', 'Flacon en verre recyclable de 30 ml avec pipette pour une application précise.', '/img/productImg/1c99977e-2822-429f-b8e0-046ba6935052.webp', 'Flacon transparent de 30 ml avec pipette contenant le Sérum Anti-Âge au Collagène Marin et Caviar d’Algues.', 1, 1, 0, 0, 1, 23, 13, 17),
(24, 'Nettoyant Visage aux Algues Marines', 'Un nettoyant doux mais efficace, formulé avec des extraits d’algues marines et de l’eau de mer pure. Il élimine les impuretés, l’excès de sébum et les traces de maquillage tout en respectant l’équilibre naturel de la peau. Grâce à ses propriétés apaisantes et hydratantes, ce nettoyant laisse la peau fraîche, douce et purifiée sans sensation de tiraillement.', 'Aqua (Water), Glycerin, Laminaria Digitata Extract, Maris Aqua (Sea Water), Cocamidopropyl Betaine, Sodium Lauroyl Glutamate, Aloe Barbadensis Leaf Extract, Citric Acid, Potassium Sorbate, Sodium Benzoate.', 'Appliquer une petite quantité sur une peau humide. Masser délicatement le visage en mouvements circulaires, en insistant sur la zone T. Rincer abondamment à l’eau tiède. Utiliser matin et soir pour un teint frais et purifié.', 'Usage externe uniquement. Éviter le contact direct avec les yeux. En cas de contact, rincer abondamment à l\'eau claire.', '12 mois après ouverture.', 'Flacon pompe recyclable de 150 ml pour une utilisation pratique et hygiénique.', '/img/productImg/56418e35-67f1-4f1d-a93e-68fd5cdf9c65.webp', 'Flacon pompe de 150 ml contenant le Nettoyant Visage aux Algues Marines et Eau de Mer.', 1, 1, 1, 0, 1, 34, 16, 18),
(25, 'Toner Visage aux Algues Marines', 'Ce toner visage frais et revitalisant, enrichi en extraits d’algues marines et en eau thermale riche en minéraux, équilibre et apaise la peau après le nettoyage. Il élimine les dernières impuretés, resserre les pores et prépare la peau à recevoir les soins suivants. Grâce à ses propriétés hydratantes et purifiantes, ce toner laisse la peau douce, lumineuse et tonifiée, idéale pour tous les types de peau, même sensibles.', 'Aqua (Water), Laminaria Digitata Extract, Maris Aqua (Sea Water), Hamamelis Virginiana Water, Glycerin, Sodium PCA, Ascophyllum Nodosum Extract, Panthenol (Provitamin B5), Citric Acid, Potassium Sorbate, Sodium Benzoate.', 'Appliquer matin et soir à l’aide d’un coton sur une peau propre et sèche, après le nettoyage. Ne pas rincer. Poursuivre avec votre sérum ou crème hydratante.', 'Usage externe uniquement. Éviter le contact avec les yeux. En cas d\'irritation, arrêter l\'utilisation.', '12 mois après ouverture.', 'Flacon recyclable de 150 ml avec un embout doseur pour une application facile et hygiénique.', '/img/productImg/1cbaa8c2-b61c-4d38-8aae-849b611d3754.webp', 'Flacon de 150 ml contenant le Toner Visage aux Algues Marines et Eau Thermale.', 1, 1, 0, 0, 1, 35, 16, 12);

-- --------------------------------------------------------

--
-- Structure de la table `productRecommandation`
--

CREATE TABLE `productRecommandation` (
  `id_product` int NOT NULL,
  `id_diagnosticForm` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `productRecommandation`
--

INSERT INTO `productRecommandation` (`id_product`, `id_diagnosticForm`) VALUES
(22, 341),
(21, 368),
(21, 381),
(21, 382),
(21, 383),
(21, 384),
(21, 385),
(21, 386),
(21, 388),
(21, 389),
(21, 390),
(21, 391),
(21, 392),
(21, 394),
(21, 395),
(22, 396),
(22, 397),
(22, 398),
(21, 410),
(22, 412);

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `skinConcern`
--

CREATE TABLE `skinConcern` (
  `id` int NOT NULL,
  `label` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `skinConcern`
--

INSERT INTO `skinConcern` (`id`, `label`) VALUES
(10, 'Déshydratation'),
(11, 'Imperfections'),
(12, 'Teint terne'),
(13, 'Pores dilatés'),
(17, 'Vieillissement cutané'),
(18, 'Impuretés');

-- --------------------------------------------------------

--
-- Structure de la table `skinType`
--

CREATE TABLE `skinType` (
  `id` int NOT NULL,
  `label` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `skinType`
--

INSERT INTO `skinType` (`id`, `label`) VALUES
(13, 'Peau normale'),
(14, 'Peau grasse'),
(15, 'Peau sèche'),
(16, 'Tous types de peau');

-- --------------------------------------------------------

--
-- Structure de la table `subject`
--

CREATE TABLE `subject` (
  `id` int NOT NULL,
  `label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `subjectStatus` int NOT NULL DEFAULT '1' COMMENT '0 : sujet non visible, 1 : sujet visible'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `subject`
--

INSERT INTO `subject` (`id`, `label`, `subjectStatus`) VALUES
(17, 'Questions sur un produit', 1),
(18, 'Problème de connexion ou accès au compte', 1),
(19, 'Demande liée aux données personnelles', 1),
(20, 'Avis ou suggestions sur un produit', 1),
(36, 'Problèmes techniques sur le site', 1),
(37, 'Questions sur les ingrédients ou allergènes', 1),
(38, 'Autre', 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `pseudo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` char(60) NOT NULL,
  `role` enum('user','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'user',
  `isActive` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 = compte inactif, 1 = compte actif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `pseudo`, `birthdate`, `email`, `password`, `role`, `isActive`) VALUES
(13, 'test9', '1986-11-15', 'test9@gmail.com', '$2b$10$LfxXRcfcniMuISz6a0BBt.gDVXTPIDPoTyjHWC.vtvEBqaJw01XcG', 'user', 1),
(15, 'admin789', '1997-11-12', 'admin9@gmail.com', '$2b$10$u4MLiZD6RK/zy3dQEQnvGOoA2t3IRDrPOG660LSI/3jrECTVeCjeu', 'admin', 1),
(20, 'Marie75', '1986-05-14', 'marie75@gmail.com', '$2b$10$laCn5rwuwmxJG1wFmKu9We3UcXd4zcZQbe4yvM4.WTcfDZGeSuJ.m', 'user', 1),
(21, 'Emma2023', '2002-12-04', 'emma2023@gmail.com', '$2b$10$E68ZS0R7/UmGoOtV6A/iNeDJwM/EeyKYWw0A5Pzj9s8ScZwiJIVeW', 'user', 1),
(22, 'Laura_Paris', '1975-11-19', 'laura_paris@gmail.com', '$2b$10$nKkrzLF7l3cI.TXXl8D3vumXx4RjKITFcWTDHgGB7xTaI7VVhNYAy', 'user', 1),
(23, 'Clara_07', '2005-11-30', 'clara_07@gmail.com', '$2b$10$Adhu9PGioxpLMzJNF8tu6enQIXVRmSCNl/tYm3KarQhfi04NK6tKu', 'user', 1),
(24, 'Julie59', '1999-04-01', 'julie59@gmail.com', '$2b$10$8T665i8dpNBSZekK9.Jwm.eTAJ/iSHDCLFZr02FaKbyaILVRZmYoi', 'user', 1),
(25, 'user', '1996-08-05', 'user@gmail.com', '$2b$10$FZea5CAbEQL.58nHnNL7yu7VIyTD1pINdx09FTzEHm7yBTTok2F2y', 'user', 1),
(26, 'admin', '1989-02-25', 'admin@gmail.com', '$2b$10$9TqSV4oeYpD9cTOtRzBIb.sRMXIbjEfCEm40d4jFm5jUJFRJZVsYu', 'admin', 1),
(27, 'ReveilConso9', '1982-10-22', 'reveillezvous@gmail.com', '$2b$10$B0CPtBZBxUQdNiotJPKpQuf9.GXKFi36.yrIjJwKXMIX0LPoDKPFK', 'user', 1),
(28, 'Sandrine32', '1970-11-21', 'sandrine32@gmail.com', '$2b$10$nhjFFz1aQDz.dstcC21sIeYCEw2LoP7ykh.l8pnSOS4w/bTYrtNN6', 'user', 1),
(29, 'user3', '1998-12-07', 'user3@gmail.com', '$2b$10$CyTsDFiCTYitK9AJR4ldXepboQ0fN74x.GhfckJchELF3sbV7j9Um', 'user', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `contactForm`
--
ALTER TABLE `contactForm`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contactform_ibfk_1` (`id_subject`);

--
-- Index pour la table `diagnosticForm`
--
ALTER TABLE `diagnosticForm`
  ADD PRIMARY KEY (`id`),
  ADD KEY `diagnosticform_ibfk_6` (`id_user`),
  ADD KEY `diagnosticform_ibfk_3` (`id_skinConcern`),
  ADD KEY `diagnosticform_ibfk_4` (`id_skinType`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`),
  ADD KEY `id_skinType` (`id_skinType`),
  ADD KEY `id_skinConcern` (`id_skinConcern`);

--
-- Index pour la table `productRecommandation`
--
ALTER TABLE `productRecommandation`
  ADD KEY `id_diagnosticForm` (`id_diagnosticForm`),
  ADD KEY `id_product` (`id_product`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Index pour la table `skinConcern`
--
ALTER TABLE `skinConcern`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `skinType`
--
ALTER TABLE `skinType`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `contactForm`
--
ALTER TABLE `contactForm`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT pour la table `diagnosticForm`
--
ALTER TABLE `diagnosticForm`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=413;

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `skinConcern`
--
ALTER TABLE `skinConcern`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `skinType`
--
ALTER TABLE `skinType`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

--
-- Contraintes pour la table `contactForm`
--
ALTER TABLE `contactForm`
  ADD CONSTRAINT `contactform_ibfk_1` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `diagnosticForm`
--
ALTER TABLE `diagnosticForm`
  ADD CONSTRAINT `diagnosticform_ibfk_3` FOREIGN KEY (`id_skinConcern`) REFERENCES `skinConcern` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  ADD CONSTRAINT `diagnosticform_ibfk_4` FOREIGN KEY (`id_skinType`) REFERENCES `skinType` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  ADD CONSTRAINT `diagnosticform_ibfk_6` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`id_skinType`) REFERENCES `skinType` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`id_skinConcern`) REFERENCES `skinConcern` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `productRecommandation`
--
ALTER TABLE `productRecommandation`
  ADD CONSTRAINT `productrecommandation_ibfk_1` FOREIGN KEY (`id_diagnosticForm`) REFERENCES `diagnosticForm` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `productrecommandation_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
