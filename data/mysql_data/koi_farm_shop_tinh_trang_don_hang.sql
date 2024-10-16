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
-- Table structure for table `tinh_trang_don_hang`
--

DROP TABLE IF EXISTS `tinh_trang_don_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tinh_trang_don_hang` (
  `order_id` int NOT NULL,
  `situation` varchar(255) NOT NULL,
  `status_details` varchar(255) DEFAULT NULL,
  `times` varchar(255) NOT NULL,
  KEY `fk_order_id` (`order_id`),
  CONSTRAINT `fk_order_id` FOREIGN KEY (`order_id`) REFERENCES `donhang` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tinh_trang_don_hang`
--

LOCK TABLES `tinh_trang_don_hang` WRITE;
/*!40000 ALTER TABLE `tinh_trang_don_hang` DISABLE KEYS */;
INSERT INTO `tinh_trang_don_hang` VALUES (1,'Đang xử lý','Đơn hàng đang được xử lý','2024-10-14 10:00:00'),(2,'Đã giao hàng','Đơn hàng đã được giao thành công','2024-10-15 12:30:00'),(3,'Đang vận chuyển','Đơn hàng đang trên đường vận chuyển','2024-10-16 14:45:00'),(4,'Đã hủy','Đơn hàng đã bị hủy bởi khách hàng','2024-10-17 16:00:00'),(1,'Đang xử lý','Chuẩn bị nhận đơn hàng','2024-10-18 11:00:00'),(3,'Đã giao hàng','Đơn hàng đã được giao thành công','2024-10-18 13:30:00'),(1,'Đã giao hàng','kaka','2024-10-19 16:00:00'),(1,'Đã giao hàng','ok','2024-10-30 16:00:00'),(4,'Đang xử lý','kaka','2024-10-19 16:00:00'),(4,'Đã hủy','fdsaf','2024-10-20 20:00:00');
/*!40000 ALTER TABLE `tinh_trang_don_hang` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-16 22:23:24
