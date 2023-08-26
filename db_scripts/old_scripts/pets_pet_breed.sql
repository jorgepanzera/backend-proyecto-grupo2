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
-- Table structure for table `pet_breed`
--

DROP TABLE IF EXISTS `pet_breed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet_breed` (
  `breed_id` int NOT NULL,
  `pet_type` int NOT NULL,
  `breed_name` varchar(150) NOT NULL,
  PRIMARY KEY (`breed_id`,`pet_type`),
  KEY `fk_pet_breedtype_idx` (`pet_type`),
  CONSTRAINT `fk_pet_breedtype` FOREIGN KEY (`pet_type`) REFERENCES `pet_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet_breed`
--

LOCK TABLES `pet_breed` WRITE;
/*!40000 ALTER TABLE `pet_breed` DISABLE KEYS */;
INSERT INTO `pet_breed` VALUES (1,1,'Labrador Retriever'),(2,1,'German Shepherd Dog'),(3,1,'Golden Retriever'),(4,1,'Bulldog'),(5,1,'Beagle'),(6,1,'French Bulldog'),(7,1,'Poodle'),(8,1,'Rottweiler'),(9,1,'Yorkshire Terrier'),(10,1,'German Shorthaired Pointer'),(11,1,'Boxer'),(12,1,'Siberian Husky'),(13,1,'Dachshund'),(14,1,'Great Dane'),(15,1,'Doberman Pinscher'),(16,1,'Shih Tzu'),(17,1,'Miniature Schnauzer'),(18,1,'Border Collie'),(19,1,'Bichon Frise'),(20,1,'Bernese Mountain Dog'),(21,1,'Cavalier King Charles Spaniel'),(22,1,'Australian Shepherd'),(23,1,'Bullmastiff'),(24,1,'Chihuahua'),(25,1,'English Springer Spaniel'),(26,1,'Havanese'),(27,1,'Brittany'),(28,1,'Akita'),(29,1,'Bloodhound'),(30,1,'Boston Terrier'),(31,1,'Chow Chow'),(32,1,'Alaskan Malamute'),(33,1,'Shetland Sheepdog'),(34,1,'St. Bernard'),(35,1,'Pomeranian'),(36,1,'West Highland White Terrier'),(37,1,'English Cocker Spaniel'),(38,1,'Collie'),(39,1,'Rhodesian Ridgeback'),(40,1,'Dalmatian'),(41,1,'Weimaraner'),(42,1,'Chinese Shar-Pei'),(43,1,'Cocker Spaniel'),(44,1,'Vizsla'),(45,1,'Shiba Inu'),(46,1,'Pug'),(47,1,'Staffordshire Bull Terrier'),(48,1,'Old English Sheepdog'),(49,1,'Irish Setter'),(50,1,'Newfoundland'),(51,1,'Mastiff'),(52,1,'Italian Greyhound'),(53,1,'Samoyed'),(54,1,'Miniature Pinscher'),(55,1,'Basset Hound'),(56,1,'Schnauzer'),(57,1,'American Staffordshire Terrier'),(58,1,'Basenji'),(59,1,'Pekingese'),(60,1,'Pointer'),(61,1,'Saluki'),(62,1,'Shar-Pei'),(63,1,'Schipperke'),(64,1,'Whippet'),(65,1,'Afghan Hound'),(66,1,'Airedale Terrier'),(67,1,'American Eskimo Dog'),(68,1,'American Foxhound'),(69,1,'Anatolian Shepherd Dog'),(70,1,'Australian Cattle Dog'),(71,1,'Australian Terrier'),(72,1,'Borzoi'),(73,1,'Bouvier des Flandres'),(74,1,'Brussels Griffon'),(75,1,'Bull Terrier'),(76,1,'Cairn Terrier'),(77,1,'Cardigan Welsh Corgi'),(78,1,'Catahoula Leopard Dog'),(79,1,'Caucasian Shepherd Dog'),(80,1,'Chesapeake Bay Retriever'),(81,1,'Chinese Crested'),(82,1,'Chinook'),(83,1,'Chow Lab Mix'),(1001,2,'Domestic Shorthair'),(1002,2,'Domestic Longhair'),(1003,2,'Siamese'),(1004,2,'Persian'),(1005,2,'Maine Coon'),(1006,2,'Sphynx'),(1007,2,'Bengal'),(1008,2,'Scottish Fold'),(1009,2,'Russian Blue'),(1010,2,'American Shorthair'),(1011,2,'British Shorthair'),(1012,2,'Ragdoll'),(1013,2,'Devon Rex'),(1014,2,'Siberian'),(1015,2,'Birman'),(1016,2,'Norwegian Forest Cat'),(1017,2,'Cornish Rex'),(1018,2,'Oriental'),(1019,2,'Egyptian Mau'),(1020,2,'Tonkinese'),(1021,2,'Exotic Shorthair'),(1022,2,'Bombay'),(1023,2,'Turkish Angora'),(1024,2,'Balinese'),(1025,2,'Abyssinian'),(1026,2,'Himalayan'),(1027,2,'Manx'),(1028,2,'Japanese Bobtail'),(1029,2,'Chartreux'),(1030,2,'Turkish Van'),(1031,2,'Snowshoe'),(1032,2,'American Curl'),(1033,2,'Somali'),(1034,2,'Burmese'),(1035,2,'Pixie-Bob'),(1036,2,'Munchkin'),(1037,2,'Nebelung'),(1038,2,'Singapura'),(1039,2,'Ocicat'),(1040,2,'Burmilla'),(1041,2,'Korat'),(1042,2,'Havana Brown'),(1043,2,'LaPerm'),(1044,2,'Peterbald'),(1045,2,'Selkirk Rex'),(1046,2,'Cymric'),(1047,2,'Bambino'),(1048,2,'Australian Mist'),(1049,2,'Sokoke'),(1050,2,'Chausie'),(1051,2,'Egyptian Mau'),(1052,2,'Kurilian Bobtail'),(1053,2,'Thai'),(1054,2,'Savannah'),(1055,2,'Khao Manee'),(1056,2,'Toyger'),(1057,2,'American Wirehair'),(1058,2,'Don Sphynx'),(1059,2,'Minskin'),(1060,2,'Dwelf'),(1061,2,'Napoleon'),(1062,2,'British Longhair'),(1063,2,'Highlander'),(1064,2,'Cheetoh'),(1065,2,'Ojos Azules'),(1066,2,'Brazilian Shorthair'),(1067,2,'Caracat'),(1068,2,'Kucing Malaysia'),(1069,2,'Chantilly-Tiffany'),(1070,2,'Dragon Li'),(1071,2,'Mekong Bobtail'),(1072,2,'California Spangled'),(1073,2,'German Rex'),(1074,2,'Javanese'),(1075,2,'Serengeti'),(1076,2,'SphynxieBob'),(1077,2,'Mandalay'),(1078,2,'Ragamuffin'),(1079,2,'RagaMuffin'),(1080,2,'Munchkin Longhair'),(1081,2,'Ukrainian Levkoy'),(1082,2,'Brazilian Shorthair'),(1083,2,'Cymric');
/*!40000 ALTER TABLE `pet_breed` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-30 18:17:03
