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
  `id_exercice` int(11) NOT NULL AUTO_INCREMENT,
  `niveau_exercice` int(11) DEFAULT NULL,
  `id_prof` int(11) DEFAULT NULL,
  `enonce_exercice` varchar(2000) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `questions` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id_exercice`),
  KEY `id_exercice` (`id_exercice`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table portailetudiant.solution_eleve
CREATE TABLE IF NOT EXISTS `solution_eleve` (
  `id_eleve` int(11) DEFAULT NULL,
  `id_prof` int(11) DEFAULT NULL,
  `id_exercice` int(11) DEFAULT NULL,
  `note_attribue` int(11) DEFAULT NULL,
  `solutionE` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `liens_image` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table portailetudiant.solution_prof
CREATE TABLE IF NOT EXISTS `solution_prof` (
  `id_prof` int(11) DEFAULT NULL,
  `id_exercice` int(11) DEFAULT NULL,
  `solution_prof` varchar(2000) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

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
  `prof` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `id_eleve` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=90 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
