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

-- Listage de la structure de la table portailetudiant. exercices
CREATE TABLE IF NOT EXISTS `exercices` (
  `id_exercice` int(11) NOT NULL AUTO_INCREMENT,
  `niveau_exercice` int(11) DEFAULT NULL,
  `id_prof` int(11) DEFAULT NULL,
  `enonce_exercice` varchar(2000) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_exercice`),
  KEY `id_exercice` (`id_exercice`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Listage des données de la table portailetudiant.exercices : 3 rows
/*!40000 ALTER TABLE `exercices` DISABLE KEYS */;
INSERT INTO `exercices` (`id_exercice`, `niveau_exercice`, `id_prof`, `enonce_exercice`, `email`) VALUES
	(4, 4, 5, 'TitreExercice1>f(x) = x-1 pour x de 1 à 3> 0,1,2!checked>3,4,5,6>6,5,3,2', 'prof2@gmail.com'),
	(3, 4, 5, 'TitreExercice1>f(x) = x/1 pour x de 1 à 3> 1,2,3!checked>3,4,5,6>6,5,3,2', 'prof2@gmail.com'),
	(2, 2, 4, 'TitreExercice1>f(x) = x*2 pour x de 1 à 3> 2,4,6!checked>3,4,5,6>6,5,3,2', 'prof1@gmail.com'),
	(1, 2, 4, 'TitreExercice1>f(x) = x+2 pour x de 1 à 7> 3,4,5,6,7,8,9!checked>3,4,5,6>6,5,3,2', 'prof1@gmail.com');
/*!40000 ALTER TABLE `exercices` ENABLE KEYS */;

-- Listage de la structure de la table portailetudiant. solution_eleve
CREATE TABLE IF NOT EXISTS `solution_eleve` (
  `id_eleve` int(11) DEFAULT NULL,
  `id_prof` int(11) DEFAULT NULL,
  `id_exercice` int(11) DEFAULT NULL,
  `note_attribue` int(11) DEFAULT NULL,
  `solutionE` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `liens_image` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Listage des données de la table portailetudiant.solution_eleve : 1 rows
/*!40000 ALTER TABLE `solution_eleve` DISABLE KEYS */;
INSERT INTO `solution_eleve` (`id_eleve`, `id_prof`, `id_exercice`, `note_attribue`, `solutionE`, `email`, `liens_image`) VALUES
	(2, 4, 2, 100, '1,2,3', 'student2@gmail.com', NULL),
	(1, 4, 1, NULL, 'je ne sais pas ', 'student1@gmail.com', NULL),
	(1, 4, 2, NULL, 'la solution est zero', 'student1@gmail.com', NULL);
/*!40000 ALTER TABLE `solution_eleve` ENABLE KEYS */;

-- Listage de la structure de la table portailetudiant. solution_prof
CREATE TABLE IF NOT EXISTS `solution_prof` (
  `id_prof` int(11) DEFAULT NULL,
  `id_exercice` int(11) DEFAULT NULL,
  `solution_prof` varchar(2000) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Listage des données de la table portailetudiant.solution_prof : 0 rows
/*!40000 ALTER TABLE `solution_prof` DISABLE KEYS */;
/*!40000 ALTER TABLE `solution_prof` ENABLE KEYS */;

-- Listage de la structure de la table portailetudiant. utilisateurs
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
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

-- Listage des données de la table portailetudiant.utilisateurs : 6 rows
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `email`, `pw`, `nbr_exercice_fait`, `moyenne_g`, `rang_eleve`, `prof`) VALUES
	(4, 'prof1', 'prof1', 'prof1@gmail.com', '123', NULL, NULL, NULL, 1),
	(3, 'student3', 'student3', 'student3@gmail.com', '123', NULL, NULL, NULL, 0),
	(2, 'student2', 'student2', 'student2@gmail.com', '123', NULL, NULL, NULL, 0),
	(1, 'student1', 'student1', 'student1@gmail.com', '123', NULL, NULL, NULL, 0),
	(5, 'prof2', 'prof2', 'prof2@gmail.com', '123', NULL, NULL, NULL, 1);
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
