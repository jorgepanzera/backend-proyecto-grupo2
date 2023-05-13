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
-- Table structure for table `cat_breed`
--

DROP TABLE IF EXISTS `cat_breed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat_breed` (
  `id` int NOT NULL,
  `breed_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat_breed`
--

LOCK TABLES `cat_breed` WRITE;
/*!40000 ALTER TABLE `cat_breed` DISABLE KEYS */;
INSERT INTO `cat_breed` VALUES (1001,'Domestic Shorthair'),(1002,'Domestic Longhair'),(1003,'Siamese'),(1004,'Persian'),(1005,'Maine Coon'),(1006,'Sphynx'),(1007,'Bengal'),(1008,'Scottish Fold'),(1009,'Russian Blue'),(1010,'American Shorthair'),(1011,'British Shorthair'),(1012,'Ragdoll'),(1013,'Devon Rex'),(1014,'Siberian'),(1015,'Birman'),(1016,'Norwegian Forest Cat'),(1017,'Cornish Rex'),(1018,'Oriental'),(1019,'Egyptian Mau'),(1020,'Tonkinese'),(1021,'Exotic Shorthair'),(1022,'Bombay'),(1023,'Turkish Angora'),(1024,'Balinese'),(1025,'Abyssinian'),(1026,'Himalayan'),(1027,'Manx'),(1028,'Japanese Bobtail'),(1029,'Chartreux'),(1030,'Turkish Van'),(1031,'Snowshoe'),(1032,'American Curl'),(1033,'Somali'),(1034,'Burmese'),(1035,'Pixie-Bob'),(1036,'Munchkin'),(1037,'Nebelung'),(1038,'Singapura'),(1039,'Ocicat'),(1040,'Burmilla'),(1041,'Korat'),(1042,'Havana Brown'),(1043,'LaPerm'),(1044,'Peterbald'),(1045,'Selkirk Rex'),(1046,'Cymric'),(1047,'Bambino'),(1048,'Australian Mist'),(1049,'Sokoke'),(1050,'Chausie'),(1051,'Egyptian Mau'),(1052,'Kurilian Bobtail'),(1053,'Thai'),(1054,'Savannah'),(1055,'Khao Manee'),(1056,'Toyger'),(1057,'American Wirehair'),(1058,'Don Sphynx'),(1059,'Minskin'),(1060,'Dwelf'),(1061,'Napoleon'),(1062,'British Longhair'),(1063,'Highlander'),(1064,'Cheetoh'),(1065,'Ojos Azules'),(1066,'Brazilian Shorthair'),(1067,'Caracat'),(1068,'Kucing Malaysia'),(1069,'Chantilly-Tiffany'),(1070,'Dragon Li'),(1071,'Mekong Bobtail'),(1072,'California Spangled'),(1073,'German Rex'),(1074,'Javanese'),(1075,'Serengeti'),(1076,'SphynxieBob'),(1077,'Mandalay'),(1078,'Ragamuffin'),(1079,'RagaMuffin'),(1080,'Munchkin Longhair'),(1081,'Ukrainian Levkoy'),(1082,'Brazilian Shorthair'),(1083,'Cymric');
/*!40000 ALTER TABLE `cat_breed` ENABLE KEYS */;
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
