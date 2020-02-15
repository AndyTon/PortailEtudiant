-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           10.4.10-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Listage de la structure de la table exercices_ecole. eleves
CREATE TABLE IF NOT EXISTS `eleves` (
  `id_eleve` int(11) NOT NULL,
  `nom_eleve` varchar(50) DEFAULT NULL,
  `prenom_eleve` varchar(50) DEFAULT NULL,
  `niveau_eleve` int(11) DEFAULT NULL,
  `adresse_email_eleve` varchar(50) DEFAULT NULL,
  `nbr_exercice_fait` int(11) DEFAULT NULL,
  `moyenne_g` int(11) DEFAULT NULL,
  `rang_eleve` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_eleve`),
  KEY `id_eleve` (`id_eleve`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Listage des données de la table exercices_ecole.eleves : 1 rows
/*!40000 ALTER TABLE `eleves` DISABLE KEYS */;
INSERT INTO `eleves` (`id_eleve`, `nom_eleve`, `prenom_eleve`, `niveau_eleve`, `adresse_email_eleve`, `nbr_exercice_fait`, `moyenne_g`, `rang_eleve`) VALUES
	(1, 'anis', 'soltane', 3, 'anisoltane@gmail.com', 0, 0, 0);
/*!40000 ALTER TABLE `eleves` ENABLE KEYS */;

-- Listage de la structure de la table exercices_ecole. exercices
CREATE TABLE IF NOT EXISTS `exercices` (
  `id_exercice` int(11) NOT NULL,
  `niveau_exercice` int(11) DEFAULT NULL,
  `id_prof` int(11) DEFAULT NULL,
  `enonce_exercice` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id_exercice`),
  KEY `id_exercice` (`id_exercice`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Listage des données de la table exercices_ecole.exercices : 1 rows
/*!40000 ALTER TABLE `exercices` DISABLE KEYS */;
INSERT INTO `exercices` (`id_exercice`, `niveau_exercice`, `id_prof`, `enonce_exercice`) VALUES
	(1, 1, 1, '[1,2,3,4,5]\r\nf(x) = x+2\r\nAppliquer la fonction f pour chaque element du tableau.');
/*!40000 ALTER TABLE `exercices` ENABLE KEYS */;

-- Listage de la structure de la table exercices_ecole. professeurs
CREATE TABLE IF NOT EXISTS `professeurs` (
  `id_prof` int(11) NOT NULL,
  `id_exercice` int(11) DEFAULT NULL,
  `nom_prof` varchar(50) DEFAULT NULL,
  `prenom_prof` varchar(50) DEFAULT NULL,
  `adresse_email_prof` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_prof`),
  KEY `id_prof` (`id_prof`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Listage des données de la table exercices_ecole.professeurs : 1 rows
/*!40000 ALTER TABLE `professeurs` DISABLE KEYS */;
INSERT INTO `professeurs` (`id_prof`, `id_exercice`, `nom_prof`, `prenom_prof`, `adresse_email_prof`) VALUES
	(1, 1, 'proffesseur1', 'nom_prof1', 'prof@gmail.com');
/*!40000 ALTER TABLE `professeurs` ENABLE KEYS */;

-- Listage de la structure de la table exercices_ecole. solution_eleve
CREATE TABLE IF NOT EXISTS `solution_eleve` (
  `id_eleve` int(11) DEFAULT NULL,
  `id_prof` int(11) DEFAULT NULL,
  `id_exercice` int(11) DEFAULT NULL,
  `note_attribue` int(11) DEFAULT NULL,
  `solution_eleve` varchar(200) DEFAULT NULL,
  `liens_image` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Listage des données de la table exercices_ecole.solution_eleve : 0 rows
/*!40000 ALTER TABLE `solution_eleve` DISABLE KEYS */;
/*!40000 ALTER TABLE `solution_eleve` ENABLE KEYS */;

-- Listage de la structure de la table exercices_ecole. solution_prof
CREATE TABLE IF NOT EXISTS `solution_prof` (
  `id_prof` int(11) DEFAULT NULL,
  `id_exercice` int(11) DEFAULT NULL,
  `solution_prof` varchar(200) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Listage des données de la table exercices_ecole.solution_prof : 0 rows
/*!40000 ALTER TABLE `solution_prof` DISABLE KEYS */;
/*!40000 ALTER TABLE `solution_prof` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
