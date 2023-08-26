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
-- Table structure for table `pet`
--

DROP TABLE IF EXISTS `pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet` (
  `pet_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `owner_user` varchar(150) NOT NULL,
  `pet_type` int NOT NULL,
  `breed_id` int NOT NULL,
  `qr_code` varchar(200) NOT NULL,
  `pet_status` int DEFAULT NULL,
  `created_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `age` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`pet_id`),
  UNIQUE KEY `pet_id_UNIQUE` (`pet_id`),
  KEY `FK_PET_TYPE_idx` (`pet_type`),
  KEY `FK_OWNER_idx` (`owner_user`),
  KEY `fk_pet_status_idx` (`pet_status`),
  CONSTRAINT `fk_pet_status` FOREIGN KEY (`pet_status`) REFERENCES `pet_status` (`status_id`),
  CONSTRAINT `FK_PET_TYPE` FOREIGN KEY (`pet_type`) REFERENCES `pet_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet`
--

LOCK TABLES `pet` WRITE;
/*!40000 ALTER TABLE `pet` DISABLE KEYS */;
INSERT INTO `pet` VALUES (1,'Toby','testfreeuser',1,5,'qrcode43sdfsdf3',1,'2023-04-23 15:39:12',0),(2,'Laika','testfreeuser',1,12,'qrcode43sdfsdf3',1,'2023-04-23 15:39:12',0),(3,'Pepe','testfreeuser',1,3,'qrcode43sdfsdf3',2,'2023-04-23 15:39:12',0),(4,'Tom','testfreeuser',2,1001,'qrcode43sdfsdf3',2,'2023-04-23 15:39:12',0),(5,'Garfield','testfreeuser',2,1003,'qrcode43sdfsdf3',1,'2023-04-23 15:39:12',0),(6,'Doggy','testfreeuser',1,6,'testfreeuser-panzera.jorge@gmail.com-0342095634339',1,'2023-05-21 20:13:39',0),(7,'Caty','admin',2,1009,'admin-mail2@gmail.com-5982095624239',1,'2023-05-21 20:15:26',0),(8,'MyKat','testfreeuser',2,1003,'testfreeuser-panzera.jorge@gmail.com-0342095634339',1,'2023-05-21 20:35:15',0),(10,'Wifi','testfreeuser',1,22,'testfreeuser-panzera.jorge@gmail.com-0342095634339',1,'2023-06-06 20:30:41',0),(12,'WebPet2','testFreeUser',1,15,'testFreeUser-panzera.jorge@gmail.com-0342095634339',1,'2023-08-26 11:26:34',0),(13,'WebPet2','testFreeUser',2,15,'testFreeUser-panzera.jorge@gmail.com-0342095634339',1,'2023-08-26 11:26:49',0),(14,'WebPet2','testFreeUser',2,15,'testFreeUser-panzera.jorge@gmail.com-0342095634339',1,'2023-08-26 11:31:02',0),(15,'WebPet2','testFreeUser',2,15,'testFreeUser-panzera.jorge@gmail.com-0342095634339',1,'2023-08-26 11:33:23',0),(16,'WebPet2','testFreeUser',2,15,'testFreeUser-panzera.jorge@gmail.com-0342095634339',1,'2023-08-26 11:34:56',0),(17,'WebPet2','testFreeUser',2,1015,'testFreeUser-panzera.jorge@gmail.com-0342095634339',1,'2023-08-26 11:38:06',0);
/*!40000 ALTER TABLE `pet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-26 15:03:59
