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
-- Table structure for table `dog_breed`
--

DROP TABLE IF EXISTS `dog_breed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dog_breed` (
  `id` int NOT NULL,
  `breed_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dog_breed`
--

LOCK TABLES `dog_breed` WRITE;
/*!40000 ALTER TABLE `dog_breed` DISABLE KEYS */;
INSERT INTO `dog_breed` VALUES (1,'Labrador Retriever'),(2,'German Shepherd Dog'),(3,'Golden Retriever'),(4,'Bulldog'),(5,'Beagle'),(6,'French Bulldog'),(7,'Poodle'),(8,'Rottweiler'),(9,'Yorkshire Terrier'),(10,'German Shorthaired Pointer'),(11,'Boxer'),(12,'Siberian Husky'),(13,'Dachshund'),(14,'Great Dane'),(15,'Doberman Pinscher'),(16,'Shih Tzu'),(17,'Miniature Schnauzer'),(18,'Border Collie'),(19,'Bichon Frise'),(20,'Bernese Mountain Dog'),(21,'Cavalier King Charles Spaniel'),(22,'Australian Shepherd'),(23,'Bullmastiff'),(24,'Chihuahua'),(25,'English Springer Spaniel'),(26,'Havanese'),(27,'Brittany'),(28,'Akita'),(29,'Bloodhound'),(30,'Boston Terrier'),(31,'Chow Chow'),(32,'Alaskan Malamute'),(33,'Shetland Sheepdog'),(34,'St. Bernard'),(35,'Pomeranian'),(36,'West Highland White Terrier'),(37,'English Cocker Spaniel'),(38,'Collie'),(39,'Rhodesian Ridgeback'),(40,'Dalmatian'),(41,'Weimaraner'),(42,'Chinese Shar-Pei'),(43,'Cocker Spaniel'),(44,'Vizsla'),(45,'Shiba Inu'),(46,'Pug'),(47,'Staffordshire Bull Terrier'),(48,'Old English Sheepdog'),(49,'Irish Setter'),(50,'Newfoundland'),(51,'Mastiff'),(52,'Italian Greyhound'),(53,'Samoyed'),(54,'Miniature Pinscher'),(55,'Basset Hound'),(56,'Schnauzer'),(57,'American Staffordshire Terrier'),(58,'Basenji'),(59,'Pekingese'),(60,'Pointer'),(61,'Saluki'),(62,'Shar-Pei'),(63,'Schipperke'),(64,'Whippet'),(65,'Afghan Hound'),(66,'Airedale Terrier'),(67,'American Eskimo Dog'),(68,'American Foxhound'),(69,'Anatolian Shepherd Dog'),(70,'Australian Cattle Dog'),(71,'Australian Terrier'),(72,'Borzoi'),(73,'Bouvier des Flandres'),(74,'Brussels Griffon'),(75,'Bull Terrier'),(76,'Cairn Terrier'),(77,'Cardigan Welsh Corgi'),(78,'Catahoula Leopard Dog'),(79,'Caucasian Shepherd Dog'),(80,'Chesapeake Bay Retriever'),(81,'Chinese Crested'),(82,'Chinook'),(83,'Chow Lab Mix');
/*!40000 ALTER TABLE `dog_breed` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-23 18:31:40
