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

-- Listage de la structure de la table exercices_ecole. utilisateurs
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `niveau` int(11) DEFAULT NULL,
  `adresse_email` varchar(50) DEFAULT NULL,
  `nbr_exercice_fait` int(11) DEFAULT NULL,
  `moyenne_g` int(11) DEFAULT NULL,
  `rang_eleve` int(11) DEFAULT NULL,
  `prof` char(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_eleve` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Listage des données de la table exercices_ecole.utilisateurs : 2 rows
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `niveau`, `adresse_email`, `nbr_exercice_fait`, `moyenne_g`, `rang_eleve`, `prof`) VALUES
	(1, 'anis', 'soltane', 3, 'anisoltane@gmail.com', 0, 0, 0, NULL),
	(2, 'ANIS2', 'Soltane2', NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
