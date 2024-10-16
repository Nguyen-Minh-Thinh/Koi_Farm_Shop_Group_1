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
-- Table structure for table `donhang`
--

DROP TABLE IF EXISTS `donhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donhang` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `delivery_time` varchar(255) DEFAULT NULL,
  `order_date` date NOT NULL,
  `pay` varchar(50) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `phone_number` (`phone_number`),
  CONSTRAINT `phone_number` FOREIGN KEY (`phone_number`) REFERENCES `tai_khoan_cua_nguoi_dung` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
INSERT INTO `donhang` VALUES (1,'123 Đường ABC, Quận 1, TP. HCM','2024-10-15 10:00:00','2024-10-14','Thanh toán khi nhận hàng',1500000.00,'Nguyễn Văn A','0123456789'),(2,'456 Đường DEF, Quận 2, TP. HCM','2024-10-16 11:30:00','2024-10-15','Chuyển khoản ngân hàng',2000000.00,'Trần Thị B','0123456789'),(3,'789 Đường GHI, Quận 3, TP. HCM','2024-10-17 12:00:00','2024-10-16','Ví điện tử',2500000.00,'Lê Minh C','0123456789'),(4,'321 Đường JKL, Quận 4, TP. HCM','2024-10-18 14:00:00','2024-10-17','Thanh toán khi nhận hàng',1800000.00,'Phạm Thị D','0123456789');
/*!40000 ALTER TABLE `donhang` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-16 22:23:25