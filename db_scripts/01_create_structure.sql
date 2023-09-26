
-- Drops en orden correcto
DROP TABLE IF EXISTS `photo`;
DROP TABLE IF EXISTS `message`;
DROP TABLE IF EXISTS `event`;
DROP TABLE IF EXISTS `event_history`;
DROP TABLE IF EXISTS `event_type`;


DROP TABLE IF EXISTS `pet`;
DROP TABLE IF EXISTS `pet_breed`;
DROP TABLE IF EXISTS `pet_type`;
DROP TABLE IF EXISTS `pet_status`;

DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `user_type`;


-- Creates en orden correcto

--
-- Table structure for table `pet_type`
--
CREATE TABLE `pet_type` (
  `id` int NOT NULL,
  `type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `pet_breed`
--
CREATE TABLE `pet_breed` (
  `breed_id` int NOT NULL,
  `pet_type` int NOT NULL,
  `breed_name` varchar(150) NOT NULL,
  PRIMARY KEY (`breed_id`,`pet_type`),
  KEY `fk_pet_breedtype_idx` (`pet_type`),
  CONSTRAINT `fk_pet_breedtype` FOREIGN KEY (`pet_type`) REFERENCES `pet_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `pet_status`
--
CREATE TABLE `pet_status` (
  `status_id` int NOT NULL,
  `status` varchar(150) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


--
-- Table structure for table `event_type`
--
CREATE TABLE `event_type` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `final_flag` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


--
-- Table structure for table `user_type`
--
CREATE TABLE `user_type` (
  `id` int NOT NULL,
  `user_type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


--
-- Table structure for table `user`
--
CREATE TABLE `user` (
  `username` varchar(150) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_number` varchar(45) NOT NULL,
  `type` int NOT NULL,
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `photo_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_user_UK` (`email`),
  KEY `FK_USER_TYPE_idx` (`type`),
  CONSTRAINT `FK_USER_TYPE` FOREIGN KEY (`type`) REFERENCES `user_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


--
-- Table structure for table `pet`
--
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


--
-- Table structure for table `photo`
--
CREATE TABLE `photo` (
  `photo_id` int NOT NULL AUTO_INCREMENT,
  `pet_id` int NOT NULL,
  `event_id` int DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `main_photo` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`photo_id`),
  KEY `fk_photo_pet_idx` (`pet_id`),
  CONSTRAINT `fk_photo_pet` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3;


--
-- Table structure for table `event`
--
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


--
-- Table structure for table `event_history`
--
CREATE TABLE `event_history` (
  `history_id` int NOT NULL,
  `event_id` int NOT NULL,
  `pet_id` int NOT NULL,
  `event_type` int NOT NULL,
  `user` varchar(150) NOT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `latitude` decimal(7,4) DEFAULT NULL,
  `longitud` decimal(7,4) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `fk_event_pet_idx` (`pet_id`),
  KEY `fk_event_type_event_idx` (`event_type`),
  CONSTRAINT `fk_event_pet_his` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`),
  CONSTRAINT `fk_event_type_event_his` FOREIGN KEY (`event_type`) REFERENCES `event_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Table structure for table `message`
--
CREATE TABLE `message` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `pet_id` int NOT NULL,
  `event_id` int DEFAULT NULL,
  `from` varchar(150) NOT NULL,
  `to` varchar(150) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `message_text` varchar(255) NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `fk_message_pet_idx` (`pet_id`),
  CONSTRAINT `fk_message_pet` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


