-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.12-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for portailetudiant
CREATE DATABASE IF NOT EXISTS `portailetudiant` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `portailetudiant`;

-- Dumping structure for table portailetudiant.exercices
CREATE TABLE IF NOT EXISTS `exercices` (
  `id_exercice` int(11) NOT NULL,
  `niveau_exercice` int(11) DEFAULT NULL,
  `id_prof` int(11) DEFAULT NULL,
  `enonce_exercice` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id_exercice`),
  KEY `id_exercice` (`id_exercice`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Dumping data for table portailetudiant.exercices: 1 rows
/*!40000 ALTER TABLE `exercices` DISABLE KEYS */;
INSERT INTO `exercices` (`id_exercice`, `niveau_exercice`, `id_prof`, `enonce_exercice`) VALUES
	(1, 1, 1, '[1,2,3,4,5]\r\nf(x) = x+2\r\nAppliquer la fonction f pour chaque element du tableau.');
/*!40000 ALTER TABLE `exercices` ENABLE KEYS */;

-- Dumping structure for table portailetudiant.solution_eleve
CREATE TABLE IF NOT EXISTS `solution_eleve` (
  `id_eleve` int(11) DEFAULT NULL,
  `id_prof` int(11) DEFAULT NULL,
  `id_exercice` int(11) DEFAULT NULL,
  `note_attribue` int(11) DEFAULT NULL,
  `solution_eleve` varchar(200) DEFAULT NULL,
  `liens_image` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Dumping data for table portailetudiant.solution_eleve: 0 rows
/*!40000 ALTER TABLE `solution_eleve` DISABLE KEYS */;
/*!40000 ALTER TABLE `solution_eleve` ENABLE KEYS */;

-- Dumping structure for table portailetudiant.solution_prof
CREATE TABLE IF NOT EXISTS `solution_prof` (
  `id_prof` int(11) DEFAULT NULL,
  `id_exercice` int(11) DEFAULT NULL,
  `solution_prof` varchar(200) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Dumping data for table portailetudiant.solution_prof: 0 rows
/*!40000 ALTER TABLE `solution_prof` DISABLE KEYS */;
/*!40000 ALTER TABLE `solution_prof` ENABLE KEYS */;

-- Dumping structure for table portailetudiant.utilisateurs
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `prenom` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `pw` varchar(50) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL DEFAULT '',
  `nbr_exercice_fait` int(11) DEFAULT NULL,
  `moyenne_g` int(11) DEFAULT NULL,
  `rang_eleve` int(11) DEFAULT NULL,
  `prof` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_eleve` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;

-- Dumping data for table portailetudiant.utilisateurs: 5 rows
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `email`, `pw`, `nbr_exercice_fait`, `moyenne_g`, `rang_eleve`, `prof`) VALUES
	(1, 'anis', 'soltane', 'anisoltane@gmail.com', '123', 0, 0, 0, b'0'),
	(2, 'ANIS2', 'Soltane2', '', '123', NULL, NULL, NULL, b'0'),
	(39, 'awer', 'waer', 'waerawra@rewaer.ca', '123321', NULL, NULL, NULL, b'1'),
	(40, 'awerawe', 'awerawer', 'waerawttersgs@test.ca', '123321', NULL, NULL, NULL, b'1'),
	(41, 'tes', 'test', 'test@test.ca', '123', NULL, NULL, NULL, b'1');
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
