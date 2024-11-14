CREATE DATABASE  IF NOT EXISTS `koi_farm_shop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `koi_farm_shop`;
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
-- Table structure for table `ca_koi_nhat`
--

DROP TABLE IF EXISTS `ca_koi_nhat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ca_koi_nhat` (
  `image` varchar(255) DEFAULT NULL,
  `sale_status` varchar(50) DEFAULT NULL,
  `name_of_fish` varchar(100) DEFAULT NULL,
  `id_of_fish` varchar(50) NOT NULL,
  `note` text,
  `sale_person` varchar(100) DEFAULT NULL,
  `sex_of_fish` varchar(50) DEFAULT NULL,
  `dob_of_fish` varchar(50) DEFAULT NULL,
  `size_of_fish` varchar(50) DEFAULT NULL,
  `type_of_fish` varchar(255) DEFAULT NULL,
  `origin_of_fish` varchar(100) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_of_fish`),
  KEY `type_of_fish` (`type_of_fish`),
  CONSTRAINT `ca_koi_nhat_ibfk_1` FOREIGN KEY (`type_of_fish`) REFERENCES `loai_ca` (`type_of_fish`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ca_koi_nhat`
--

LOCK TABLES `ca_koi_nhat` WRITE;
/*!40000 ALTER TABLE `ca_koi_nhat` DISABLE KEYS */;
INSERT INTO `ca_koi_nhat` VALUES ('https://onkoi.vn/wp-content/uploads/2020/06/tan-cho-70cm-2016-600x600.jpg',' Đang bán','Koi Tancho 70 cm 4 năm tuổi','034','Em koi Tancho 70 cm 4 tuổi nổi bật với là da Shiro trắng muốn, điểm Hi đỏ chót trên đầu, tròn vành vạnh như mặt trời mọc.','OnKoi Quang Minh','Koi Cái','2016','70 cm','Tancho','Dainichi Koi Farm','1250000'),('https://onkoi.vn/wp-content/uploads/2020/06/Doitsu-Tancho-Sanke-54-cm-2018-600x600.jpg',' Đã bán','Koi Tancho 54 cm 2 tuổi','036','Koi Tancho 54 cm 2 tuổi thân hình như 1 chiếc tàu ngầm – Form dáng chuẩn của 1 em koi đẹp. Bụng không to, thân đuôi dày, phần lưng dày, dáng bơi uyển chuyển vẫn mạnh mẽ.','OnKoi Quang Minh','Koi Cái','2018','54 cm','Tancho','Dainichi Koi Farm','2500000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-asagi-55-cm-2-tuoi-007-600x600.jpg',' Đang bán','Onkoi Asagi 2 tuổi 55cm','Asagi_007','Onkoi Onkoi Asagi 2 tuổi 55cm nổi bật với lớp furukin bao phủ trên da, màu chuẩn đẹp, thân hình mảnh mai, uyển chuyển nhẹ nhàng.','OnKoi Quang Minh','Koi Cái','2019','55 cm','Asagi','Dainichi Koi Farm','2000000'),('https://onkoi.vn/wp-content/uploads/2021/03/asagi-60-cm-2-tuoi-008-600x600.jpg',' Đang bán','Onkoi Asagi 2 tuổi 60 cm','Asagi_008','Em Onkoi Asagi 2 tuổi 60 cm này có thể nói là một trong những em koi vô cùng đặc biệt mà bất cứ dân chơi koi nào cũng nên sở hữu trong hồ.','OnKoi Quang Minh','Koi Cái','2019','60 cm','Asagi','Dainichi Koi Farm','3000000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-asagi-75-cm-3-tuoi-009-600x600.jpg',' Đang bán','Onkoi Asagi 3 tuổi 75 cm','Asagi_009','Onkoi Asagi 3 tuổi 75 cm này nổi “bần bật” giữa hồ với lớp vảy xám bạc lấp lánh, có tố chất rất cao, chắc chắn sẽ mang đến giá trị trong tương lai.','OnKoi Quang Minh','Koi Cái','2018','75 cm','Asagi','Dainichi Koi Farm','4000000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-asagi-80-cm-4-tuoi-010-600x600.jpg',' Đang bán','Onkoi Asagi 80cm 4 tuổi','Asagi_010','Đây là em koi Asagi 4 năm tuổi 80cm, kích thước rất lớn thuộc hàng jumbo nên thân hình rắn chắc, vạm vỡ như lực sĩ kết hợp với sự tuyệt hảo về màu sắc càng nâng tầm giá trị của em ấy hơn.','OnKoi Quang Minh','Koi Cái','2017','80 cm','Asagi','Dainichi Koi Farm','1000000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-asagi-70-cm-3-tuoi-011-600x600.jpg',' Đang bán','Onkoi Asagi 70cm 3 năm tuổi','Asagi_011','Đây là một em koi Asagi hội tụ đầy đủ những yếu tố tiêu chuẩn đỉnh cao khiến bất kì tay chơi koi nào cũng mong muốn được sở hữu.','OnKoi Quang Minh','Koi Cái','2018','70 cm','Asagi','Dainichi Koi Farm','2000000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-asagi-30-cm-2-tuoi-012-600x600.jpg',' Đang bán','Onkoi Asagi 60cm 2 tuổi','Asagi_012','Đây là em Koi Asagi rất đán để ngưỡng mộ với toàn thân đỏ chót như hoa dâm bút. May mắn Hi của em ấy đỏ dầy, chuẩn màu, không lem nhem hay lòe loẹt nên vẫn giữ được chuẩn mực của Koi Nhật sang trọng.','OnKoi Quang Minh','Koi Cái','2019','60 cm','Asagi','Dainichi Koi Farm','3000000'),('https://onkoi.vn/wp-content/uploads/2020/06/Asagi-53-cm-2-tuoi-nu-006-600x600.jpg',' Đang bán','Koi Asagi 53 cm 2 tuổi','Asagi_06','Asagi là một trong những dòng cá koi được ưa chuộng trên toàn thế giới. Onkoi Quang Minh tuần này sẽ lên sàn một em Asagi cực phẩm nhập khẩu trực tiếp từ trại cá Oyaji của Nhật Bản.','OnKoi Quang Minh','Koi Cái','2018','53 cm','Asagi','Oyaji Koi Farm','4000000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-kohaku-85-cm-4-tuoi-053-600x600.jpg',' Đã bán','Onkoi Kohaku 85 cm 3 tuổi','Kohaku_053','Đây là em koi Kohaku 85 cm 3 tuổi, kích thược vượt trội. Màu sắc đẹp, đỏ rần, dầy, trắng shiro trắng tinh, trắng muốt. Đường biên giữa 2 màu sắc rõ ràng, không lem nhem.','OnKoi Quang Minh','Koi Cái','2017','85 cm','Kohaku','Dainichi Koi Farm','5000000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-kohaku-93-cm5-tuoi-054-600x600.jpg',' Đang bán','Onkoi Kohaku 93 cm 5 tuổi','Kohaku_054','Quá bất ngờ về vẻ đẹp của em Kohaku 93cm 6 năm tuổi từ Dainichi Koi farm Nhật Bản về. Lâu quá rồi, on koi mới lại được sở hữu 1 em kohaku có thân hình tuyệt vời và màu sắc, hoa văn hoàn mĩ đến vậy.','OnKoi Quang Minh','Koi Cái','2016','93 cm','Kohaku','Dainichi Koi Farm','1500000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-kohaku-91-cm-7-tuoi-056-600x600.jpg',' Đã bán','Onkoi Kohaku 91 cm 7 tuổi','Kohaku_056','Lại 1 em siêu phẩm kohaku được on koi đưa về từ Dainichi Koi Farm. Đây là em koi kohaku trưởng thành 7 năm tuổi 91 cm, kích thước rất khỏng. Nhìn ở ngoài em ấy như 1 chiếc tàu ngầm lững lững bơi đến đâu thu hút mọi ánh nhìn đến đó.','OnKoi Quang Minh','Koi Cái','2014','91 cm','Kohaku','Dainichi Koi Farm','2500000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-kohaku-94-cm-6-tuoi-057-600x600.jpg',' Đang bán','Onkoi Kohaku 94 cm 6 tuổi','Kohaku_057','Đây là em koi kohaku 6 năm tuổi 94cm được Onkoi nhập trực tiếp từ Dainichi Koi farm. Em koi này thừa hưởng mọi tiêu chuẩn, điều kiện tốt nhất của 1 em koi hoàn hảo, thậm chí dư thừa khả năng tham gia các giải đấu lớn.','OnKoi Quang Minh','Koi Cái','2015','94 cm','Kohaku','Dainichi Koi Farm','3500000'),('https://onkoi.vn/wp-content/uploads/2021/01/onkoi-kohaku-101-cm-061-600x600.jpg',' Đang bán','Kohaku 101 cm 5 tuổi','Kohaku_061','Một em siêu phẩm Kohaku đỉnh cao đã dưỡng đủ 6 tháng tại On Koi. Đây là em kohaku có thân hình tuyệt phẩm, vẻ đẹp của em ấy khó koi thủ nào có thể cưỡng lại.','OnKoi Quang Minh','Koi Cái','2016','101cm','Kohaku','Dainichi Koi Farm','4500000'),('https://onkoi.vn/wp-content/uploads/2021/01/onkoi-kohaku-3-tuoi-70-cm-062-600x600.jpg',' Đang bán','Onkoi Kohaku 3 tuổi 70 cm','Kohaku_062','Đây là em kohaku thuần chủng của trại Dainichi, trải quá trình chọn lọc gắt gao từ khi được 1 tuần tuổi đến khi trưởng thành theo tỷ lệ 300.000/ 100 em.','OnKoi Quang Minh','Koi Cái','2019','70 cm','Kohaku','Dainichi Koi Farm','5500000'),('https://onkoi.vn/wp-content/uploads/2021/01/lo-kohaku-38-cm-066-600x600.jpg',' Đang bán','Set 9 Onkoi Kohaku 38 cm 1 tuổi','Kohaku_066','Set 9 Onkoi Kohaku 38 cm 1 tuổi đẹp lung linh, kích thước mỗi em lên tới 38 cm. Tất cả những em này đều là Koi chuẩn nhập từ trại Dainichi.','OnKoi Quang Minh','Koi Cái','2020','38 cm','Kohaku','Dainichi Koi Farm','800000'),('https://onkoi.vn/wp-content/uploads/2021/01/onkoi-kohaku-65-cm-067-600x600.jpg',' Đang bán','Onkoi Kohaku 65 cm 2 tuổi','Kohaku_067','Koi Kohaku 2 tuổi trại Dainichi kích thước lên tới 65cm, body cực phẩm đã được chăm dưỡng khỏe mạnh, ăn uống tốt và cách ly theo đúng quy trình chuẩn để làm quen với khí hậu tại Việt Nam.','OnKoi Quang Minh','Koi Cái','2019','65 cm','Kohaku','Dainichi Koi Farm','1800000'),('https://onkoi.vn/wp-content/uploads/2021/01/onkoi-kohaku-90-cm-068-600x600.jpg',' Đang bán','Onkoi Kohaku 90 cm 3 tuổi','Kohaku_068','Em Kohaku On Koi 3 năm tuổi 90cm là một trong những em koi “khủng” mà nhà On Koi đang sở hữu, hiện đang có rất nhiều khách yêu và chơi Koi rất hài lòng.','OnKoi Quang Minh','Koi Cái','2018','90 cm','Kohaku','Dainichi Koi Farm','2800000'),('https://onkoi.vn/wp-content/uploads/2020/04/onkoi-kohaku-80-cm-6-tuoi-069-600x600.jpg',' Đang bán','Onkoi Maruten Kohaku 7 năm 80 cm','Kohaku_069','Lên sàn em Koi khủng Kohaku 6 năm tuổi Mã koi: Koi Kohaku #69 Thông tin: Koi Kohaku thuẩn chủng F1','OnKoi Quang Minh','Koi Cái','2014','80 cm','Kohaku','Dainichi Koi Farm','3600000'),('https://onkoi.vn/wp-content/uploads/2020/07/showa-87-cm-5-nam-033-600x600.jpg',' Đang bán','Koi Doitsu Showa 87 cm 5 năm tuổi','Showa_033','Tiếp tục lên sàn siêu phẩm Koi Doitsu Showa đẹp không tỳ vết 5 tuổi dài 87cm, body cực chuẩn vầ hoàn toàn khỏe mạnh.','OnKoi Quang Minh','Koi Cái','2015','87 cm','Showa','Dainichi Koi Farm','4600000'),('https://onkoi.vn/wp-content/uploads/2020/06/tancho-showa-68-cm-2-nam-tuou-039-600x600.jpg',' Đang bán','OnKoi-Tancho Showa 68 cm 2.5 năm tuổi','Showa_039','OnKoi Quang Minh hiện đang sở hữu em Koi TanCho Showa  đạt 2.5 tuổi – một trong những em Koi đẹp nổi bật trong lô Koi mới về.','OnKoi Quang Minh','Koi Cái','2018','68 cm','Showa','Dainichi Koi Farm','2700000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-showa-3-tuoi-72-cm-043-600x600.jpg',' Đang bán','Onkoi Showa 3 tuổi 72 cm','Showa_043','Em koi Showa 3 tuổi 72 cm này được Onkoi Quang Minh nhập khẩu trực tiếp từ trại Dainichi vô cùng nổi bật với chiếc lưng gù, kích thước body hoàn toàn cân đối.','OnKoi Quang Minh','Koi Cái','2018','72 cm','Showa','Dainichi Koi Farm','3700000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-showa-70-cm-3-tuoi-044-600x600.jpg',' Đang bán','Onkoi Showa 3 tuổi 70cm','Showa_044','OnKoi tiếp tục lên sàn siêu phẩm Koi Showa 3 tuổi 70cm đẹp không tỳ vết, thân hình cực chuẩn và hoàn toàn khỏe mạnh.','OnKoi Quang Minh','Koi Cái','2018','70 cm','Showa','Dainichi Koi Farm','1400000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-showa-3-tuoi-76-cm-045-600x600.jpg',' Đang bán','Onkoi Showa 3 tuổi 76 cm','Showa_045','Onkoi Showa 3 tuổi 76cm là top em koi trưởng thành, tỉ lệ cân đối với nhiều phẩm chất tốt, trong tương lai sẽ còn phát triển kích thước lớn hơn nữa.','OnKoi Quang Minh','Koi Cái','2018','76 cm','Showa','Dainichi Koi Farm','2400000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-showa-80-cm-4-tuoi-046-600x600.jpg',' Đang bán','Onkoi showa 80 cm 4 tuổi','Showa_046','Em koi Showa 80 cm 4 năm tuổi này được đánh giá là đạt tiêu chuẩn màu sắc đỉnh cao của dòng showa. Toàn bộ thân là sự hài hòa của tổng thể trắng, đen, đỏ trên nền da trắng như tuyết.','OnKoi Quang Minh','Koi Cái','2017','80 cm','Showa','Momotaro Koi Farm','3400000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-showa-100-cm-5-tuoi-047-600x600.jpg',' Đang bán','Onkoi Showa 100 cm 5 tuổi','Showa_047','Đây là em koi được đánh giá là viên ngọc sáng giá của trại Momotaro sỡ hữu chiều dài đáng nể lến đến 100cm, màu sắc vô cùng ấn tượng với mảng beni rực rỡ.','OnKoi Quang Minh','Koi Cái','2016','100cm','Showa','Momotaro Koi Farm','4400000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-showa-100-cm-6-tuoi-048-600x600.jpg',' Đang bán','Onkoi Showa 100 cm 6 tuổi','Showa_048','Đây là em koi jumbo có kích thước 100 cm, rất lớn. Vì vậy nhìn tổng thể em ấy như 1 chiếc tàu ngầm lừng lững đi đến đâu cũng thu hút sự chú ý.','OnKoi Quang Minh','Koi Cái','2015','100cm','Showa','Momotaro Koi Farm','1000000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-showa-97-cm-5-tuoi-049-600x600.jpg',' Đang bán','Onkoi showa 97 cm 5 tuổi','Showa_049','Em koi showa 97 cm 5 tuổi thuộc dòng jumbo với kích thước rất khỏng. Vì vậy, màu sắc, hoa văn, hình thể của em ấy đạt đến chuẩn mực cao. Đây là em showa được on koi nhập về trực tiếp từ Dainichi Koi farm, đã dưỡng đủ 6 tháng khỏe mạnh, vạm vỡ.','OnKoi Quang Minh','Koi Cái','2016','97 cm','Showa','Dainichi Koi Farm','2000000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-showa-78-cm-3-tuoi-050-600x600.jpg',' Đã bán','Onkoi Showa 3 tuổi 78 cm','Showa_050',NULL,NULL,NULL,NULL,'78 cm','Showa',NULL,'3000000'),('https://onkoi.vn/wp-content/uploads/2020/07/Shusui-set-4-con-45-cm-50-cm-1-tuoi-nu-003-600x600.jpg',' Đang bán','Shusui set 4 con 45 cm-50 cm 1 tuổi nữ','Shusui_003','Hôm nay Onkoi Quang Minh sẽ lên sàn set 4 em Jumbo Baby Shusui vô cùng ấn tượng từ màu sắc đến kết cấu body chuẩn chỉnh chắc chắn sẽ hạ gục mọi khách hàng khó tính nhất.','OnKoi Quang Minh','Koi Cái','2019','45-50cm','Shusui','Dainichi Koi Farm','4000000'),('https://onkoi.vn/wp-content/uploads/2020/07/Koi-Shusui-60-cm-2018-004-600x600.jpg',' Đang bán','Koi Shusui 60 cm 2 tuổi','Shusui_004','Em Koi Shusui này nổi bật với lớp vảy giống như thủy tinh chạy dọc sống lưng, những vảy này được bắt đầu từ đầu của em Koi và kéo dài đến đuôi, không mở rộng hai bên vây Koi.','OnKoi Quang Minh','Koi Cái','2018','60 cm','Shusui','Dainichi Koi Farm','5000000'),('https://onkoi.vn/wp-content/uploads/2020/07/Onkoi-Shusui-75-cm-2-5-tuoi-nu-007-600x600.jpg',' Đang bán','Onkoi-Shusui 75 cm 2.5 tuổi','Shusui_007','Koi Sushui được lựa chọn nuôi như một cá thể bắt buộc cần phải có trong hồ, tượng trưng cho sự sung túc, ấm no, bình an . Đặc biệt, cá Koi Sushui còn có thể gánh đỡ vận hạn cho gia chủ.','OnKoi Quang Minh','Koi Cái',NULL,'75 cm','Shusui','Dainichi Koi Farm','1000000'),('https://onkoi.vn/wp-content/uploads/2020/07/Onkoi-Shusui-50-cm-2-tuoi-nu-008-600x600.jpg',' Đang bán','Onkoi-Shusui 50 cm 2 tuổi nữ','Shusui_008','Onkoi-Shusui 50 cm 2 tuổi nữ sở hữu gam màu nổi bật cùng những hình xăm uốn lượn trên thân, được cho là mang đến may mắn, tài lộc và thay đổi vận mệnh cho gia chủ.','OnKoi Quang Minh','Koi Cái','2018','50 cm','Shusui','Dainichi Koi Farm','2000000'),('https://onkoi.vn/wp-content/uploads/2020/07/Onkoi-Shusui-45-cm-1-5-tuoi-nu-009-600x600.jpg',' Đang bán','Onkoi Shusui 45 cm 1.5 tuổi nữ','Shusui_009','Onkoi Shusui 45 cm 1.5 tuổi là một em Koi đúng chuẩn phiên bản Doitsu của Asagi, màu da trắng dọc bên hai đường thân. Màu sắc nổi bật và đối xứng khiến cho em Koi này trở thành một biến thử rất độc lạ và thú vị.','OnKoi Quang Minh','Koi Cái','2019','45 cm','Shusui','Dainichi Koi Farm','3000000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-shusui-60-cm-2-tuoi-010-600x600.jpg',' Đang bán','Onkoi Shusui 60 cm 2 năm tuổi','Shusui_010','Phải mất hàng năm trời chúng tôi mới tìm được một em Onkoi Shusui 60cm 2 tuổi đẹp như tranh thế này. Em ấy đã được cách ly theo đúng quy trình dưỡng bệnh, hoàn toàn sạch sẽ và khỏe mạnh.','OnKoi Quang Minh','Koi Cái','2019','60 cm','Shusui','Dainichi Koi Farm','4000000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-shusui-75-cm-3-tuoi-011-600x600.jpg',' Đang bán','Onkoi Shusui 75 cm 3 năm tuổi','Shusui_011','Em koi Shusui 3 năm tuổi này nổi bật bởi sự cân đổi của 2 hàng vẩy liền mạch, kéo dài tư vai xuống tận dưới đuôi. Đặc biệt là không hề bị mở rộng hay xâm lấn phần trắng trên lưng koi.','OnKoi Quang Minh','Koi Cái','2019','75 cm','Shusui','Dainichi Koi Farm','5000000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-shusui-70-cm-3-tuoi-012-600x600.jpg',' Đang bán','Onkoi Shusui 70 cm 3 tuổi','Shusui_012','Onkoi Shusui 70cm 3 năm tuổi mang đến cho người chơi ấn tượng với vẻ đẹp độc – lạ về màu sắc. Không những thế, dù mới 3 tuổi nhưng em ấy đã đạt tới kích thước 70cm, kích thước size này thể hiện tiềm năng phát triển thành một em JumBo.','OnKoi Quang Minh','Koi Cái','2018','70 cm','Shusui','Dainichi Koi Farm','1500000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-shusui-80-cm-4-tuoi-013-600x600.jpg',' Đang bán','Onkoi Shusui 80 cm 4 tuổi','Shusui_013','Đây là em Shusui được nhập trực tiếp từ trại Dainichi. Sở hữu nhiều ưu điểm nổi trội từ kích thước khủng lên đến 80 cm, body tàu ngầm cân đối, dáng bơi mạnh mẽ mà không kém phần uyển chuyển đến màu sắc vô cùng độc đáo','OnKoi Quang Minh','Koi Cái','2017','80 cm','Shusui','Dainichi Koi Farm','2500000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-shusui-65-cm-2-tuoi-014-600x600.jpg',' Đang bán','Onkoi Shusui 65 cm 2 tuổi','Shusui_014','Đây là em koi shusui 65 cm 2 năm tuổi được On Koi nhập trực tiếp từ dainichi Koi Farm. Em koi này có rất nhiều ưu điểm về hình thể và màu sắc, hoa văn nên được koi thủ đánh giá rất cao.','OnKoi Quang Minh','Koi Cái','2019','65 cm','Shusui','Dainichi Koi Farm','3500000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-shusui-58-cm-2-tuoi-600x600.jpg',' Đang bán','Onkoi Shusui 58 cm 2 tuổi','Shusui_015','Em koi này tuy chỉ mới 2 năm tuổi nhưng cấu trúc body, hình thể của em koi Shusui này rất chắc chắn, lưng gù, thân đuôi dày, mang tai rộng, thân hình như chiếc tàu ngầm.','OnKoi Quang Minh','Koi Cái','2019','58 cm','Shusui','Dainichi Koi Farm','4500000'),('https://onkoi.vn/wp-content/uploads/2020/07/Tanaka-Asagi-38cm-1-nam-tuoi-005-600x600.jpg',' Đang bán','Koi Asagi 47 cm 1 tuổi','Tanaka Asagi _005','Em Koi Asagi này tuy chỉ mới 1 tuổi nhưng sở hữu body rắn chắc, khỏe mạnh, không quá ngắn, không quá dài, cân đối, vừa phải, 2 lưng dày, thân đuôi dày, dài bụng thon, mang tai rộng.','OnKoi Quang Minh','Koi Cái','2019','47 cm','Asagi','Dainichi Koi Farm','5500000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-tancho-55-cm-040-600x600.jpg',' Đang bán','Onkoi Tancho 55 cm 2 tuổi','Tancho_040','Em koi Tancho này sở hữu thân hình rắn chắc, khỏe mạnh, dầy mình, thân đuôi dày, không ngắn, không quá dài, lưng gù, vây bơi nhẹ nhàng, dáng bơi thẳng mà vẫn uốn lượn.','OnKoi Quang Minh','Koi Cái','2019','55 cm','Tancho','Dainichi Koi Farm','1500000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-tancho-35-55-cm-041-600x600.jpg',' Đang bán','Onkoi Tancho 35 – 55 cm 1 tuổi','Tancho_041','Lô Tancho Dainichi kích thước 35 đến 55cm sở hữu body tuyệt đẹp, rắn chắc, vạm vỡ, thân hình như 1 chiếc tàu ngầm, lưng dầy, bụng nhỏ, thân đuôi dầy.','OnKoi Quang Minh','Koi Cái','2020','35-55cm','Tancho','Dainichi Koi Farm','2500000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-tancho-70-cm-3-tuoi-042-600x600.jpg',' Đang bán','Onkoi Couple Tancho 70cm 3 tuổi','Tancho_042','2 em Koi Tancho 70 cm này nổi bật với làn da Shiro trắng muốt, Hachi đỏ chót trên đầu, tròn vành vạnh như mặt trời mọc, body săn chắc.','OnKoi Quang Minh','Koi Cái','2018','70 cm','Tancho','Dainichi Koi Farm','3500000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-tancho-82-cm-043-600x600.jpg',' Đang bán','Onkoi Tancho 82 cm 3 tuổi','Tancho_043','Em Onkoi Tancho 82 cm nổi bật với làn da trắng muốt, dấu đỏ tròn vành vạnh nằm trên giữa đầu và không chạm vào mắt. Thân hình lý tưởng, vạm vỡ, khỏe mạnh khiến bất cứ ai cũng bị “choáng ngợp” mỗi khi chạm mặt.','OnKoi Quang Minh','Koi Cái','2018','82 cm','Tancho','Dainichi Koi Farm','4500000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-tancho-80-cm-044-600x600.jpg',' Đang bán','Onkoi Tancho 80 cm 4 tuổi','Tancho_044','Lô 4 em koi Tancho 80 cm 4 tuổi xứng đáng nằm trong top những em koi nên có trong đàn bởi đây đều là những em koi thuộc hàng tuyển của Onkoi tại trại giống hàng đầu Nhật Bản Dainichi.','OnKoi Quang Minh','Koi Cái','2017','80 cm','Tancho','Dainichi Koi Farm','3900000'),('https://onkoi.vn/wp-content/uploads/2021/03/onkoi-tancho-87-cm-045-600x600.jpg',' Đang bán','Onkoi Tancho 87 cm 4 tuổi','Tancho_045','Onkoi tiếp tục giới thiệu đến quý vị và các bạn em Onkoi Tancho 4 tuổi, đạt kích thước 87cm, nằm trong top đầu tiên của dòng Onkoi Jumbo từ trước đến nay.','OnKoi Quang Minh','Koi Cái','2017','87 cm','Tancho','Dainichi Koi Farm','4000000');
/*!40000 ALTER TABLE `ca_koi_nhat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietdonhang`
--

DROP TABLE IF EXISTS `chitietdonhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietdonhang` (
  `don_hang_id` int NOT NULL,
  `id_of_fish` varchar(50) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`don_hang_id`,`id_of_fish`),
  KEY `fk_fish` (`id_of_fish`),
  KEY `idx_DonHangId` (`don_hang_id`),
  CONSTRAINT `don_hang_id` FOREIGN KEY (`don_hang_id`) REFERENCES `donhang` (`order_id`),
  CONSTRAINT `fk_fish` FOREIGN KEY (`id_of_fish`) REFERENCES `ca_koi_nhat` (`id_of_fish`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdonhang`
--

LOCK TABLES `chitietdonhang` WRITE;
/*!40000 ALTER TABLE `chitietdonhang` DISABLE KEYS */;
INSERT INTO `chitietdonhang` VALUES (1,'Asagi_06',2),(1,'Kohaku_053',1),(1,'Kohaku_054',3),(2,'Kohaku_056',1),(2,'Kohaku_057',2),(3,'Kohaku_054',3),(4,'Kohaku_056',1),(5,'034',1),(5,'036',1),(5,'Asagi_007',1);
/*!40000 ALTER TABLE `chitietdonhang` ENABLE KEYS */;
UNLOCK TABLES;

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
  `id_khuyen_mai` int DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `phone_number` (`phone_number`),
  KEY `fk_id_khuyen_mai` (`id_khuyen_mai`),
  CONSTRAINT `fk_id_khuyen_mai` FOREIGN KEY (`id_khuyen_mai`) REFERENCES `khuyen_mai` (`id`),
  CONSTRAINT `phone_number` FOREIGN KEY (`phone_number`) REFERENCES `tai_khoan_cua_nguoi_dung` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
INSERT INTO `donhang` VALUES (1,'123 Đường ABC, Quận 1, TP. HCM','2024-10-15 10:00:00','2024-10-14','Thanh toán khi nhận hàng',1500000.00,'Nguyễn Văn A','0123456787',NULL),(2,'456 Đường DEF, Quận 2, TP. HCM','2024-10-16 11:30:00','2024-10-15','Chuyển khoản ngân hàng',2000000.00,'Trần Thị B','0123456787',NULL),(3,'789 Đường GHI, Quận 3, TP. HCM','2024-10-17 12:00:00','2024-10-16','Ví điện tử',2500000.00,'Lê Minh C','0123456787',NULL),(4,'321 Đường JKL, Quận 4, TP. HCM','2024-10-18 14:00:00','2024-10-17','Thanh toán khi nhận hàng',1800000.00,'Phạm Thị D','0123456787',NULL),(5,'Phường Tân Chánh Hiệp, Quận 12, Tp Hồ Chí Minh.','14-11-2024','2024-11-12','credit',5750000.00,'Thịnh Nguyễn','0123456787',NULL);
/*!40000 ALTER TABLE `donhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gio_hang`
--

DROP TABLE IF EXISTS `gio_hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gio_hang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_of_fish` varchar(50) DEFAULT NULL,
  `tong_cong` int DEFAULT NULL,
  `tai_khoan_nguoi_dung` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_of_fish` (`id_of_fish`),
  KEY `tai_khoan_nguoi_dung` (`tai_khoan_nguoi_dung`),
  CONSTRAINT `gio_hang_ibfk_1` FOREIGN KEY (`id_of_fish`) REFERENCES `ca_koi_nhat` (`id_of_fish`),
  CONSTRAINT `gio_hang_ibfk_2` FOREIGN KEY (`tai_khoan_nguoi_dung`) REFERENCES `tai_khoan_cua_nguoi_dung` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gio_hang`
--

LOCK TABLES `gio_hang` WRITE;
/*!40000 ALTER TABLE `gio_hang` DISABLE KEYS */;
INSERT INTO `gio_hang` VALUES (107,'Tancho_040',1500000,'nguyenminhthinh'),(108,'Tancho_041',2500000,'nguyenminhthinh');
/*!40000 ALTER TABLE `gio_hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khuyen_mai`
--

DROP TABLE IF EXISTS `khuyen_mai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khuyen_mai` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_khuyen_mai` varchar(255) DEFAULT NULL,
  `giam_gia_percent` varchar(40) DEFAULT NULL,
  `ngay_bat_dau` date NOT NULL,
  `ngay_ket_thuc` date NOT NULL,
  `ma_khuyen_mai` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khuyen_mai`
--

LOCK TABLES `khuyen_mai` WRITE;
/*!40000 ALTER TABLE `khuyen_mai` DISABLE KEYS */;
INSERT INTO `khuyen_mai` VALUES (2,'Khuyến mãi cuối tháng 11','15','2024-11-12','2024-11-30','KM01');
/*!40000 ALTER TABLE `khuyen_mai` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `loai_ca` VALUES ('Asagi','https://onkoi.vn/wp-content/uploads/2021/01/6.jpg','https://www.youtube.com/embed/p5LS7re3124?rel=0&autoplay=1&mute=1'),('Kohaku','https://onkoi.vn/wp-content/uploads/2020/04/1920x700.jpg','https://www.youtube.com/embed/MymZYN82Rus?autoplay=1&mute=1'),('Showa','https://onkoi.vn/wp-content/uploads/2021/01/5.jpg','https://www.youtube.com/embed/jMHxuxI55CU?rel=0&autoplay=1&mute=1'),('Shusui','https://onkoi.vn/wp-content/uploads/2021/01/7.jpg','https://www.youtube.com/embed/V0eImzXYxp8?rel=0&autoplay=1&mute=1'),('Tancho','https://onkoi.vn/wp-content/uploads/2021/01/8.jpg','https://www.youtube.com/embed/30Z0hSO3at8?rel=0&autoplay=1&mute=1');
/*!40000 ALTER TABLE `loai_ca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tai_khoan_cua_nguoi_dung`
--

DROP TABLE IF EXISTS `tai_khoan_cua_nguoi_dung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tai_khoan_cua_nguoi_dung` (
  `user_name` varchar(50) NOT NULL,
  `pass_word` text,
  `email` varchar(50) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `ten_khach_hang` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_name`),
  UNIQUE KEY `phone_number` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tai_khoan_cua_nguoi_dung`
--

LOCK TABLES `tai_khoan_cua_nguoi_dung` WRITE;
/*!40000 ALTER TABLE `tai_khoan_cua_nguoi_dung` DISABLE KEYS */;
INSERT INTO `tai_khoan_cua_nguoi_dung` VALUES ('nguyenminhthinh','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','2251120114@ut.edu.vn','0704541242','Alex Nguyễn'),('thinhnguyen','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','nguyenminhthinh26122004@gmail.com','0123456787','Thịnh Nguyễn');
/*!40000 ALTER TABLE `tai_khoan_cua_nguoi_dung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tai_khoan_cua_quan_ly`
--

DROP TABLE IF EXISTS `tai_khoan_cua_quan_ly`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tai_khoan_cua_quan_ly` (
  `user_name` varchar(50) NOT NULL,
  `pass_word` varchar(50) NOT NULL,
  PRIMARY KEY (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tai_khoan_cua_quan_ly`
--

LOCK TABLES `tai_khoan_cua_quan_ly` WRITE;
/*!40000 ALTER TABLE `tai_khoan_cua_quan_ly` DISABLE KEYS */;
INSERT INTO `tai_khoan_cua_quan_ly` VALUES ('nguyenminhthinh','26122004');
/*!40000 ALTER TABLE `tai_khoan_cua_quan_ly` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thuc_an_cho_ca`
--

DROP TABLE IF EXISTS `thuc_an_cho_ca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thuc_an_cho_ca` (
  `Id` varchar(10) NOT NULL,
  `image` tinytext,
  `caption` tinytext,
  `Note` text,
  `Price` varchar(20) DEFAULT NULL,
  `Sale_person` varchar(50) DEFAULT NULL,
  `Brand` varchar(50) DEFAULT NULL,
  `Type_of_food` varchar(50) DEFAULT NULL,
  `Origin` varchar(50) DEFAULT NULL,
  `Weight` varchar(20) DEFAULT NULL,
  `sale_status` varchar(20) DEFAULT ' Đang bán',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thuc_an_cho_ca`
--

LOCK TABLES `thuc_an_cho_ca` WRITE;
/*!40000 ALTER TABLE `thuc_an_cho_ca` DISABLE KEYS */;
INSERT INTO `thuc_an_cho_ca` VALUES ('CA09','https://onkoi.vn/wp-content/uploads/2022/04/hikari-color-protein-40-vip-6-thuc-an-tang-truong-ca-koi-hat-chim-bao-20-kg-CA09-600x600.jpg','Hikari-Color Vip 6 thức ăn cá koi tăng trưởng 40% protein hạt chìm bao 20kg','Hikari-Color Vip 6 thức ăn cá koi tăng trưởng 40% protein hạt chìm bao 20kg được sản xuất theo công thức pha trộn độc đáo với hàm lượng đạm protein cao cùng các khoáng chất, nguyên tố vi lượng nên giúp cá koi phát triển toàn diện','1000000','OnKoi Quang Minh','Hikari','Hạt chìm','Nhật Bản','20 kg/bao',' Đang bán'),('CA10','https://onkoi.vn/wp-content/uploads/2022/04/Hikari-growth-protein-40-thuc-an-tang-truong-cho-ca-koi-20kg-CA10-600x600.jpg','Hikari-Growth thức ăn cho cá koi tăng trưởng vip protein 40% 20kg (hạt chìm)','Hikari-Growth thức ăn cho cá koi tăng trưởng vip protein 40% 20kg (hạt chìm) sản xuất theo công nghệ cao Nhật bản là sản phẩm dưỡng chất cao, không gây ô nhiễm hồ nuôi','8250000','OnKoi Quang Minh','Hikari','Hạt chìm','Nhật Bản','20 kg/bao',' Đã bán'),('CA11','https://onkoi.vn/wp-content/uploads/2022/04/Hikari-balance-40-protein-vip-6-thuc-an-ca-koi-tang-truong-20-kg-hat-chim-CA11-600x600.jpg','Hikari-Balance thức ăn cá koi tăng trưởng Vip 6 40% protein hạt chìm 20kg','Hikari-Balance thức ăn cá koi tăng trưởng Vip 6 40% protein hạt chìm 20kg từ Nhật Bản với ưu điểm đặc biệt nhất là dạng hạt chìm nhưng không gây đục nước, màng mặt nước nên hạn chế ô nhiễm nước hồ koi.','850000','OnKoi Quang Minh','Hikari','Hạt chìm','Nhật Bản','20 kg/bao',' Đã bán'),('CA15','https://onkoi.vn/wp-content/uploads/2022/04/avt-thuc-an-ca-koi-nhat-hikari-friend-28-protein-bao-10kg-CA15-600x600.jpg','Thức ăn cá koi Nhật Hikari-Friend 28% Protein bao 10kg','Thức ăn cá koi Nhật Hikari-Friend 28% Protein bao 10kg được nhập khẩu trực tiếp 100% từ Nhật Bản giúp Koi luôn khỏe mạnh, lên màu rực rỡ.','750000','OnKoi Quang Minh','Hikari','Hạt chìm','Nhật Bản','10 kg/ bao',' Đang bán'),('CA22','https://onkoi.vn/wp-content/uploads/2022/04/sakura-color-boosting-protein-40-hat-noi-CA22-600x600.jpg','Sakura-Color Boosting protein 40% hạt nổi (1.25kg đến 4kg/bao)','Sakura – Color Boosting thức ăn cá koi protein 40% tăng màu bền túi 1,25Kg đến 4Kg/1 bao hạt nổi sản xuất tại Thái Lan theo công thức nguyên liệu cao cấp của Nhật Bản giúp koi tăng trưởng và phát triển màu sắc đúng tiêu chuẩn Nhật.','900000','OnKoi Quang Minh','Sakura','Hạt nổi','Thái Lan','1.25- 4 Kg/bao',' Đang bán'),('CA23','https://onkoi.vn/wp-content/uploads/2022/04/sakura-perfect-white-40-protein-giup-trang-da-cho-ca-koi-CA23-600x600.jpg','Sakura-Perfect White Protein 40% 1.25 đến 4 kg/bao hạt nổi','Sakura-Perfect White Protein 40% 1.25 đến 4 kg/bao hạt nổi là sản phẩm sản xuất công nghệ cao vừa có độ đạm cao giúp tăng trưởng vừa làm trắng da siêu cấp phù hợp với những em koi dành đi thi những giải đấu lớn.','800000','OnKoi Quang Minh','Sakura','Hạt nổi','Thái Lan','1.25- 4 Kg/bao',' Đang bán'),('CAC10','https://onkoi.vn/wp-content/uploads/2022/04/thuc-an-ca-koi-aqua-master-40-protein-len-mau-colour-enhancer-CA17-600x600.jpg','Thức ăn siêu tăng màu cá koi Vip 1 Aqua Master – Colour Enhancer 40% protein','Thức ăn siêu tăng màu cá koi Vip 1 Aqua Master – Colour Enhancer 40% protein 10kg 1 bao là cám cá tăng màu chất lượng cao được nhập khẩu và phân phối chính hãng tại Onkoi Quang Minh.','1600000','OnKoi Quang Minh','Aqua Master','Hạt nổi','Đài Loan','10 kg/ bao',' Đang bán'),('CAC5','https://onkoi.vn/wp-content/uploads/2022/04/thuc-an-tang-mau-ca-koi-nhat-aqua-master-colour-enhancer-40-protein-CA19-600x600.jpg','Thức ăn siêu tăng màu cá koi Vip 1 Aqua Master-Colour Enhancer 40% protein','Thức ăn siêu tăng màu cá koi Vip 1 Aqua Master-Colour Enhancer 40% protein 5kg/bao là sản phẩm có chứa hàm lượng đạm tốt và cân đối, đầy đủ các chất dinh dưỡng, hỗ trợ koi tiêu hóa, tăng trưởng, phát triển dễ dàng và tối ưu.','850000','OnKoi Quang Minh','Aqua Master','Hạt nổi','Đài Loan','10 kg/ bao',' Đang bán'),('CAG10','https://onkoi.vn/wp-content/uploads/2022/04/thuc-an-koi-nhat-aquamaster-growth-38-protein-bao-10-kg-CA21-600x600.jpg','Thức ăn tăng trưởng cá koi Vip 1 Aqua Master-Growth 40% protein bao 10kg','Protein: min 40%, Chất Béo: min 4%, Chất sơ: max 5%, Độ ẩm: max 10%, Tro thô: max 10%','1300000','OnKoi Quang Minh','Aqua Master','Hạt nổi','Thái Lan','10 kg/ bao',' Đã bán'),('CAH','https://onkoi.vn/wp-content/uploads/2022/04/thuc-an-koi-40-protein-aquamaster-hi-growth-15-kg-CA16-600x600.jpg','Thức ăn siêu tăng trưởng body cá koi Vip 1 Aqua Master-Jumbo Hi Growth 42% protein','Thức ăn siêu tăng trưởng body cá koi Vip 1 Aqua Master- Jumbo Hi Growth 42% Protein 5 đến 10kg 1 bao được sản xuất tại Đài Loan. Sản phẩm cải tiến từ công thức đặc biệt nên giúp cá koi nhanh chóng tăng trưởng về kích thước và màu sắc.','1500000','OnKoi Quang Minh','Aqua Master','Hạt nổi','Đài Loan','10 kg/ bao',' Đang bán'),('CAHC10','https://onkoi.vn/wp-content/uploads/2022/04/thuc-an-ca-koi-aquamaster-hi-growth-40-protein-hat-chim-10-kg-CA18-600x600.jpg','Thức ăn siêu tăng trưởng cá koi Aqua Master-Hi Growth 40% protein hạt nổi 10kg','Protein: min 40%, Lysine: min 2%, Chất Béo: min 3,0%, Độ ẩm: max 10%, Tro thô: max 13%, Chất xơ: max 3,0%, Phốt pho: min 0,8%  ','1600000','OnKoi Quang Minh','Aqua Master','Hạt nổi','Đài Loan','10 kg/ bao',' Đang bán'),('CAS','https://onkoi.vn/wp-content/uploads/2022/04/thuc-an-ca-koi-Aquamaster-Staple-36-protein-bao-5-kg-CA20-600x600.jpg','Thức ăn tăng trưởng ổn định cá koi Vip 1 Aqua Master-Staple 36% protein bao 5kg','Thức ăn tăng trưởng ổn định cá koi Aqua Master-Staple 36% protein bao 5kg thuộc dòng sản phẩm thức ăn cơ bản dành cho cá Koi với thành phần chính là natto và nucleotide đáp ứng những yêu cầu cơ bản như dễ tiêu hóa và không làm bẩn nước, đảm bảo sức khỏe dành cho Koi.','1050000','OnKoi Quang Minh','Aqua Master','Hạt chìm','Đài Loan','10 kg/ bao',' Đang bán'),('CHB15','https://onkoi.vn/wp-content/uploads/2022/04/thuc-an-ca-koi-nhat-Hikari-Balance-43-protein-bao-15-kg-CA14-600x600.jpg','Thức ăn tăng trưởng ổn định cho cá koi Vip 1 Hikari-Balance 43% Protein bao 15kg','Thức ăn tăng trưởng ổn định cho cá koi Vip 1 Hikari-Balance 43% Protein bao 15kg là dòng sản phẩm thức ăn cho Koi được pha trộn theo công thức cao cấp và đặc biệt, giúp Koi tăng trưởng và có dáng vẻ như mong muốn.','3300000','OnKoi Quang Minh','Hikari','Hạt nổi','Nhật Bản','15 kg/bao',' Đang bán'),('CHC15','https://onkoi.vn/wp-content/uploads/2022/04/thuc-an-tang-mau-ca-koi-nhat-vip-1-hikari-colour-enhancing-floatin-40-protein-15-kg-CA12-600x600.jpg','Thức ăn tăng màu cá koi Vip 1 Hikari-Colour Enhancing Floating 40% protein15kg','Thức ăn tăng màu cá koi Vip 1 Hikari Colour Enhancing Floating 40% protein15kg được sử dụng công nghệ đặc biệt, giúp tăng cường màu sắc cho Koi, hạn chế những đốm trắng của Koi.','4500000','OnKoi Quang Minh','Hikari','Hạt nổi','Nhật Bản','15 kg/bao',' Đang bán'),('CHG15','https://onkoi.vn/wp-content/uploads/2022/04/thuc-an-tang-mau-cho-koi-nhat-hikari-growth-floating-40-protein-CA13-600x600.jpg','Thức ăn tăng trưởng cho cá koi Nhật Hikari-Growth Floating 40% Protein 15kg','Thức ăn tăng trưởng cho cá koi Nhật Hikari-Growth Floating 40% protein 15kg là dòng sản phẩm thức ăn cao cấp dành cho Koi giúp tăng cường hệ miễn dịch.','4125000','OnKoi Quang Minh','Hikari','Hạt chìm','Nhật Bản','15 kg/bao',' Đang bán'),('CSC','https://onkoi.vn/wp-content/uploads/2022/04/thuc-an-ca-koi-nhat-sakura-growth-color-38-prorein-tang-truong-tang-mau-CA24-600x600.jpg','Cám cá Koi Sakura- Growth & Color tăng trưởng, tăng màu hạt nổi 38% protein','Protein: min 38%, Chất Béo: min 5%, Chất sơ: max 5%, Độ ẩm: max 10%, Tro thô: max 12%','2120000','OnKoi Quang Minh','Sakura','Hạt nổi','Thái Lan','1,25 kg',' Đang bán'),('CSGC','https://onkoi.vn/wp-content/uploads/2022/05/thuc-an-koi-gan-40-protein-sakura-boost-koi-growth-color-600x600.jpg','Thức ăn Koi gần 40% protein Sakura-Boost Koi Growth & Color','Sakura-Boost Koi Growth & Color với công thức đặc biệt từ mật ong tự nhiên nên có chứa rất nhiều dinh dưỡng, vitamin, khoáng chất và các chất chống oxi hóa thiết yếu nên cá koi phát triển tăng trưởng nhanh và bên màu.','720000','OnKoi Quang Minh','Sakura','Hạt nổi','Thái Lan','1,5 kg',' Đang bán'),('CSGM','https://onkoi.vn/wp-content/uploads/2022/06/sakura-boost-koi-growth-muscle-protein-38-tang-truong-co-bap-1-5-6-kg-600x600.jpg','Sakura – Boost Koi Growth & Muscle protein 38% tăng trưởng cơ bắp','Protein thô tối thiểu 38%, Chất béo thô tối thiểu 4%, Xơ thô tối đa 5%, Độ ẩm Crie tối đa 10%., Tro thô lên đến 12%','720000','OnKoi Quang Minh','Sakura','Hạt nổi','Thái Lan','1,5 kg',' Đã bán'),('CSH','https://onkoi.vn/wp-content/uploads/2022/04/thuc-an-ca-koi-nhat-sakura-high-growth-CA25-600x600.jpg','Thức ăn cá koi Nhật Sakura-High Growth siêu tăng trưởng 42% protein hạt nổi','Protein: min 42%, Chất Béo: min 4%, Chất sơ: max 5%, Độ ẩm: max 10%, Tro thô: max 12%','2417000','OnKoi Quang Minh','Sakura','Hạt nổi','Thái Lan','1,25 kg',' Đang bán');
/*!40000 ALTER TABLE `thuc_an_cho_ca` ENABLE KEYS */;
UNLOCK TABLES;

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
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `fk_order_id` (`order_id`),
  CONSTRAINT `fk_order_id` FOREIGN KEY (`order_id`) REFERENCES `donhang` (`order_id`),
  CONSTRAINT `tinh_trang_don_hang_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `donhang` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tinh_trang_don_hang`
--

LOCK TABLES `tinh_trang_don_hang` WRITE;
/*!40000 ALTER TABLE `tinh_trang_don_hang` DISABLE KEYS */;
INSERT INTO `tinh_trang_don_hang` VALUES (1,'Đang xử lý','Đơn hàng đang được xử lý','2024-10-14 10:00:00',1),(2,'Đã giao hàng','Đơn hàng đã được giao thành công','2024-10-15 12:30:00',2),(3,'Đang vận chuyển','Đơn hàng đang trên đường vận chuyển','2024-10-16 14:45:00',3),(4,'Đã hủy','Đơn hàng đã bị hủy bởi khách hàng','2024-10-17 16:00:00',4),(1,'Đang xử lý','Chuẩn bị nhận đơn hàng','2024-10-18 11:00:00',5),(3,'Đã giao hàng','Đơn hàng đã được giao thành công','2024-10-18 13:30:00',6),(1,'Đã giao hàng','kaka','2024-10-19 16:00:00',7),(1,'Đã giao hàng','ok','2024-10-30 16:00:00',8),(4,'Đang xử lý','kaka','2024-10-19 16:00:00',9),(4,'Đã hủy','fdsaf','2024-10-20 20:00:00',10),(5,'Đang xử lý','Đơn hàng đang được xử lý','2024-11-12 20:52:22',11),(5,'Đang vận chuyển','Shipper sẽ giao sớm cho bạn sớm thôi','',12);
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

-- Dump completed on 2024-11-14 18:27:33
