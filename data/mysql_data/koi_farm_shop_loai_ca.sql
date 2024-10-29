-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: koi_farm_shop
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `loai_ca`
--

DROP TABLE IF EXISTS `loai_ca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loai_ca` (
  `type_of_fish` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`type_of_fish`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai_ca`
--

LOCK TABLES `loai_ca` WRITE;
/*!40000 ALTER TABLE `loai_ca` DISABLE KEYS */;
INSERT INTO `loai_ca` VALUES ('Asagi','https://onkoi.vn/wp-content/uploads/2021/01/6.jpg','https://www.youtube.com/embed/p5LS7re3124?rel=0&autoplay=1&mute=1'),('Kohaku','https://onkoi.vn/wp-content/uploads/2020/04/1920x700.jpg','https://www.youtube.com/embed/p1T9Ig0ekEs?rel=0&autoplay=1&mute=1'),('Showa','https://onkoi.vn/wp-content/uploads/2021/01/5.jpg','https://www.youtube.com/embed/jMHxuxI55CU?rel=0&autoplay=1&mute=1'),('Shusui','https://onkoi.vn/wp-content/uploads/2021/01/7.jpg','https://www.youtube.com/embed/V0eImzXYxp8?rel=0&autoplay=1&mute=1'),('Tancho','https://onkoi.vn/wp-content/uploads/2021/01/8.jpg','https://www.youtube.com/embed/30Z0hSO3at8?rel=0&autoplay=1&mute=1');
/*!40000 ALTER TABLE `loai_ca` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-22 23:04:14
