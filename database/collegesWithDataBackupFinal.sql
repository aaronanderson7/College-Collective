/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- ------------------------------
-- Team Comments
-- ------------------------------
-- This dump represents the College Collective Centralized College Database Management System created by Steve Rector and Aaron Anderson. 
-- The dump represents the schema of all of our tables, including 5 records of sample data for each table.
-- The aforementioned tables are Classes, Departments, Students, Professors (which are the entities), and the intersection tables Students_Has_classes and Students_Has_Professors

-- disables foreign key checks and autocommits 
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- ------------------------------
-- Table structure for table `Classes`
-- ------------------------------

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE OR REPLACE TABLE `Classes` (
  `classID` int(11) NOT NULL AUTO_INCREMENT,
  `className` varchar(145) NOT NULL,
  `credit` int(11) NOT NULL,
  `departmentID` int(11) NOT NULL,
  `professorID` int(11) NOT NULL,
  PRIMARY KEY (`classID`),
  KEY `fk_Classes_Departments_idx` (`departmentID`),
  KEY `fk_Classes_Professors1_idx` (`professorID`),
  CONSTRAINT `fk_Classes_Departments` FOREIGN KEY (`departmentID`) REFERENCES `Departments` (`departmentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Classes_Professors1` FOREIGN KEY (`professorID`) REFERENCES `Professors` (`professorID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- INSERTing data for table `Classes`
LOCK TABLES `Classes` WRITE;
/*!40000 ALTER TABLE `Classes` DISABLE KEYS */;
INSERT INTO `Classes` VALUES 
(1,'Accounting',4,1,1),
(2,'Organic Chemistry',4,2,2),
(3,'Primary Mathematics',4,3,3),
(4,'Victorian Poetry',3,4,4),
(5,'Physiology',4,5,5);
/*!40000 ALTER TABLE `Classes` ENABLE KEYS */;
UNLOCK TABLES;

-- ------------------------------
-- Table structure for table `Departments`
-- ------------------------------

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE OR REPLACE TABLE `Departments` (
  `departmentID` int(11) NOT NULL AUTO_INCREMENT,
  `departmentName` varchar(145) NOT NULL,
  PRIMARY KEY (`departmentID`),
  UNIQUE KEY `departmentName_UNIQUE` (`departmentName`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


-- INSERTing data for table `Departments`
LOCK TABLES `Departments` WRITE;
/*!40000 ALTER TABLE `Departments` DISABLE KEYS */;
INSERT INTO `Departments` VALUES 
(1,'Business'),
(3,'Education'),
(4,'Humanities'),
(5,'Nursing'),
(2,'STEM');
/*!40000 ALTER TABLE `Departments` ENABLE KEYS */;
UNLOCK TABLES;

-- ------------------------------
-- Table structure for table `Professors`
-- ------------------------------
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE OR REPLACE TABLE `Professors` (
  `professorID` int(11) NOT NULL AUTO_INCREMENT,
  `lastName` varchar(145) NOT NULL,
  `email` varchar(145) NOT NULL,
  `departmentID` int(11) NOT NULL,
  PRIMARY KEY (`professorID`),
  KEY `fk_Professors_Departments1_idx` (`departmentID`),
  CONSTRAINT `fk_Professors_Departments1` FOREIGN KEY (`departmentID`) REFERENCES `Departments` (`departmentID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


-- INSERTing data for table `Professors`
LOCK TABLES `Professors` WRITE;
/*!40000 ALTER TABLE `Professors` DISABLE KEYS */;
INSERT INTO `Professors` VALUES 
(1,'Hamilton','hamilton@college.edu',1),
(2,'Money','money@college.edu',2),
(3,'Smith','smith@college.edu',3),
(4,'Wilson','wilson@college.edu',4),
(5,'Carrey','carrey@college.edu',5);
/*!40000 ALTER TABLE `Professors` ENABLE KEYS */;
UNLOCK TABLES;

-- ------------------------------
-- Table structure for table `Students`
-- ------------------------------

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE OR REPLACE TABLE `Students` (
  `studentID` int(11) NOT NULL AUTO_INCREMENT,
  `lastName` varchar(145) NOT NULL,
  `email` varchar(145) NOT NULL,
  `startDate` date DEFAULT NULL,
  `graduationDate` date DEFAULT NULL,
  PRIMARY KEY (`studentID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


-- INSERTing data for table `Students
LOCK TABLES `Students` WRITE;
/*!40000 ALTER TABLE `Students` DISABLE KEYS */;
INSERT INTO `Students` VALUES 
(1,'Brown','brown@college.edu','2020-09-01','2024-06-15'),
(2,'Miller','miller@college.edu','2021-09-01','2025-06-15'),
(3,'Johnson','johnson@college.edu','2022-09-01','2026-06-15'),
(4,'Lee','lee@college.edu','2020-09-01','2024-06-15'),
(5,'Adams','adams@college.edu','2021-09-01','2025-06-15');
/*!40000 ALTER TABLE `Students` ENABLE KEYS */;
UNLOCK TABLES;

-- ------------------------------
-- Table structure for table `Students_has_Classes`
-- ------------------------------

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE OR REPLACE TABLE `Students_has_Classes` (
  `StudentHasClassID` int(11) NOT NULL AUTO_INCREMENT,
  `studentID` int(11) NOT NULL,
  `classID` int(11) NOT NULL,
  PRIMARY KEY (`StudentHasClassID`),
  KEY `fk_Students_has_Classes_Classes1_idx` (`classID`),
  KEY `fk_Students_has_Classes_Students1_idx` (`studentID`),
  CONSTRAINT `fk_Students_has_Classes_Classes1` FOREIGN KEY (`classID`) REFERENCES `Classes` (`classID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Students_has_Classes_Students1` FOREIGN KEY (`studentID`) REFERENCES `Students` (`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


-- INSERTing data for table `Students_has_Classes`
LOCK TABLES `Students_has_Classes` WRITE;
/*!40000 ALTER TABLE `Students_has_Classes` DISABLE KEYS */;
INSERT INTO `Students_has_Classes` VALUES 
(1,1,1),
(2,2,2),
(3,3,3),
(4,4,4),
(5,5,5);
/*!40000 ALTER TABLE `Students_has_Classes` ENABLE KEYS */;
UNLOCK TABLES;

-- ------------------------------
-- Table structure for table `Students_has_Professors`
-- ------------------------------

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE OR REPLACE TABLE `Students_has_Professors` (
  `StudentHasProfessorID` int(11) NOT NULL AUTO_INCREMENT,
  `studentID` int(11) NOT NULL,
  `professorID` int(11) NOT NULL,
  PRIMARY KEY (`StudentHasProfessorID`),
  KEY `fk_Students_has_Professors_Professors1_idx` (`professorID`),
  KEY `fk_Students_has_Professors_Students1_idx` (`studentID`),
  CONSTRAINT `fk_Students_has_Professors_Professors1` FOREIGN KEY (`professorID`) REFERENCES `Professors` (`professorID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Students_has_Professors_Students1` FOREIGN KEY (`studentID`) REFERENCES `Students` (`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


-- INSERTing data for table `Students_has_Professors`
LOCK TABLES `Students_has_Professors` WRITE;
/*!40000 ALTER TABLE `Students_has_Professors` DISABLE KEYS */;
INSERT INTO `Students_has_Professors` VALUES 
(1,1,1),
(2,2,2),
(3,3,3),
(4,4,4),
(5,5,5);
/*!40000 ALTER TABLE `Students_has_Professors` ENABLE KEYS */;
UNLOCK TABLES;

-- enables foreign key checks and autocommits
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
