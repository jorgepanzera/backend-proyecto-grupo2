-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pets
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `pet_id` int NOT NULL,
  `event_type` int NOT NULL,
  `user` varchar(150) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `latitude` decimal(7,4) DEFAULT NULL,
  `longitud` decimal(7,4) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `fk_event_pet_idx` (`pet_id`),
  KEY `fk_event_type_event_idx` (`event_type`),
  CONSTRAINT `fk_event_pet` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`),
  CONSTRAINT `fk_event_type_event` FOREIGN KEY (`event_type`) REFERENCES `event_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,1,1,'GuessUser','2023-04-23 21:04:31',-34.9011,-56.1645),(2,1,2,'GuessUser','2023-04-23 21:05:41',-34.8581,-56.1708),(3,1,2,'GuessUser2','2023-04-23 21:05:41',-34.9045,-56.1804),(4,1,3,'GuessUser2','2023-04-23 21:05:41',-34.9109,-56.1694),(5,3,1,'GuessUser','2023-04-23 21:06:06',-34.9021,-56.1538),(6,3,2,'GuessUser3','2023-04-23 21:06:22',-34.8972,-56.1667),(7,4,1,'GuessUser3','2023-04-23 21:06:56',-34.9028,-56.1556),(8,4,2,'GuessUser','2023-04-23 21:06:56',-34.9014,-56.1752),(9,4,2,'GuessUser2','2023-04-23 21:06:56',-34.9068,-56.1911),(10,4,3,'GuessUser3','2023-04-23 21:06:56',-34.8581,-56.1708);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-01 18:29:55
