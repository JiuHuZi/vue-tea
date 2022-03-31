/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 10.4.11-MariaDB : Database - vue_shop
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`vue_shop` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `vue_shop`;

/*Table structure for table `address` */

DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `tel` varchar(200) NOT NULL,
  `province` varchar(200) NOT NULL,
  `city` varchar(200) NOT NULL,
  `county` varchar(200) NOT NULL,
  `addressDetail` varchar(200) NOT NULL,
  `isDefault` varchar(50) NOT NULL,
  `areaCode` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;

/*Data for the table `address` */

insert  into `address`(`id`,`uid`,`name`,`tel`,`province`,`city`,`county`,`addressDetail`,`isDefault`,`areaCode`) values (6,8,'李四','13144274876','北京市','北京市','西城区','测试地址3','0','110102'),(7,8,'九狐123','13144274876','北京市','北京市','东城区','测试地址2','1','110101'),(9,6,'孙七','13144274877','天津市','天津市','塘沽区','测试地址1','1','120101'),(10,6,'孙七','13144274877','北京市','北京市','东城区','测试地址2','0','110101'),(13,11,'也是','13344454512','北京市','北京市','东城区','与','1','110101'),(14,12,'今生今世','13695727874','北京市','北京市','东城区','1','0','110101'),(15,12,'对的','13451245124','北京市','北京市','东城区',' 1','1','110101'),(22,7,'123','13144274876','北京市','北京市','东城区','123123','0','110101'),(24,7,'12312','13144274876','北京市','北京市','东城区','123123','1','110101'),(25,13,'测试1','13144274876','北京市','北京市','西城区','123','1','110102');

/*Table structure for table `goods_cart` */

DROP TABLE IF EXISTS `goods_cart`;

CREATE TABLE `goods_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `goods_name` varchar(200) NOT NULL,
  `goods_price` double NOT NULL,
  `goods_num` int(11) NOT NULL,
  `goods_imgUrl` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4;

/*Data for the table `goods_cart` */

insert  into `goods_cart`(`id`,`uid`,`goods_id`,`goods_name`,`goods_price`,`goods_num`,`goods_imgUrl`) values (51,6,6,'高山流水陶瓷旅行茶具',168,1,'/images/goods6.jpeg'),(93,8,4,'绿茶-无瑕黄金芽礼盒',188,2,'/images/goods/goods4.jpeg'),(95,9,3,'黄山太平猴魁绿茶1号',99,1,'/images/goods/goods3.jpeg'),(98,8,9,'2016白毫银针巧克力茶砖',98,1,'/images/goods/goods9.jpeg'),(99,8,13,'林沧淇白水兰香铁观音',118,1,'/images/goods/goods13.jpeg'),(100,7,15,'【年份】白茶习茶系列 · 入门（二）',39,1,'/images/goods/goods15.jpeg'),(101,7,1,'浅尝-金牡丹（武夷岩茶）',14.6,1,'/images/goods/goods1.jpeg'),(102,7,5,'黑金茶具套装',458,1,'/images/goods/goods5.jpeg'),(103,7,14,'【品种】白茶习茶系列 · 入门（三）',39,1,'/images/goods/goods14.jpeg'),(104,7,9,'2016白毫银针巧克力茶砖',98,1,'/images/goods/goods9.jpeg'),(105,7,22,'正宗明前芽头鲜嫩雀舌',108,1,'/images/goods/goods22.jpeg'),(106,7,3,'黄山太平猴魁绿茶1号',99,1,'/images/goods/goods3.jpeg'),(108,11,19,'竹制茶勺',15,9,'/images/goods/goods19.jpeg'),(114,15,16,'制茶师大赛获奖大红袍',178,2147483647,'/images/goods/goods16.jpeg'),(115,13,1,'浅尝-金牡丹（武夷岩茶）',14.6,1,'/images/goods/goods1.jpeg');

/*Table structure for table `goods_list` */

DROP TABLE IF EXISTS `goods_list`;

CREATE TABLE `goods_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `imgUrl` varchar(200) DEFAULT NULL,
  `complete` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

/*Data for the table `goods_list` */

insert  into `goods_list`(`id`,`name`,`content`,`price`,`num`,`imgUrl`,`complete`) values (1,'浅尝-金牡丹（武夷岩茶）',NULL,14.6,1,'/images/goods/goods1.jpeg',NULL),(2,'2016南糯山古树普洱生茶',NULL,98,2,'/images/goods/goods2.jpeg',NULL),(3,'黄山太平猴魁绿茶1号',NULL,99,3,'/images/goods/goods3.jpeg',NULL),(4,'绿茶-无瑕黄金芽礼盒',NULL,188,4,'/images/goods/goods4.jpeg',NULL),(5,'黑金茶具套装',NULL,458,5,'/images/goods/goods5.jpeg',NULL),(6,'高山流水陶瓷旅行茶具',NULL,168,6,'/images/goods/goods6.jpeg',NULL),(7,'金油滴建盏',NULL,298,7,'/images/goods/goods7.jpeg',NULL),(8,'浅尝-白牡丹',NULL,6.6,8,'/images/goods/goods8.jpeg',NULL),(9,'2016白毫银针巧克力茶砖',NULL,98,9,'/images/goods/goods9.jpeg',NULL),(10,'云南凤庆经典蜜香滇红','外形讨喜  甘甜可口',88,10,'/images/goods/goods10.jpeg',NULL),(11,'传统工艺茉莉花茶-春毫',NULL,68,11,'/images/goods/goods11.jpeg',NULL),(12,'笔花堂桐木关金骏眉',NULL,794,12,'/images/goods/goods12.jpeg',NULL),(13,'林沧淇白水兰香铁观音',NULL,118,13,'/images/goods/goods13.jpeg',NULL),(14,'【品种】白茶习茶系列 · 入门（三）',NULL,39,14,'/images/goods/goods14.jpeg',NULL),(15,'【年份】白茶习茶系列 · 入门（二）',NULL,39,15,'/images/goods/goods15.jpeg',NULL),(16,'制茶师大赛获奖大红袍',NULL,178,16,'/images/goods/goods16.jpeg',NULL),(17,'华态五虎奇茗岩茶组合礼',NULL,1666.5,17,'/images/goods/goods17.jpeg',NULL),(18,'莫等闲壹罐茶武夷大红袍',NULL,96,18,'/images/goods/goods18.jpeg',NULL),(19,'竹制茶勺',NULL,15,19,'/images/goods/goods19.jpeg',NULL),(20,'锡合金铜制茶则茶勺',NULL,25,20,'/images/goods/goods20.jpeg',NULL),(21,'黄山谷雨前六安瓜片',NULL,58,21,'/images/goods/goods21.jpeg',NULL),(22,'正宗明前芽头鲜嫩雀舌',NULL,108,22,'/images/goods/goods22.jpeg',NULL),(23,'四川雅安初采青针雀舌',NULL,198,23,'/images/goods/goods23.jpeg',NULL);

/*Table structure for table `history` */

DROP TABLE IF EXISTS `history`;

CREATE TABLE `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `goods_name` varchar(255) NOT NULL,
  `goods_price` double NOT NULL,
  `imgUrl` varchar(255) NOT NULL,
  `history_time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4;

/*Data for the table `history` */

insert  into `history`(`id`,`uid`,`goods_id`,`goods_name`,`goods_price`,`imgUrl`,`history_time`) values (1,8,1,'浅尝-金牡丹（武夷岩茶）',14.6,'/images/goods/goods1.jpeg','2022-03-27'),(2,8,2,'2016南糯山古树普洱生茶',98,'/images/goods/goods2.jpeg','2022-03-27'),(4,8,4,'绿茶-无瑕黄金芽礼盒',188,'/images/goods/goods4.jpeg','2022-03-27'),(5,8,5,'黑金茶具套装',456,'/images/goods/goods5.jpeg','2022-03-27'),(8,8,22,'正宗明前芽头鲜嫩雀舌',108,'/images/goods/goods22.jpeg','2022-03-27'),(10,8,18,'莫等闲壹罐茶武夷大红袍',96,'/images/goods/goods18.jpeg','2022-03-27'),(11,8,3,'黄山太平猴魁绿茶1号',99,'/images/goods/goods3.jpeg','2022-03-27'),(12,8,1,'浅尝-金牡丹（武夷岩茶）',14.6,'/images/goods/goods1.jpeg','2022-03-27'),(13,8,4,'绿茶-无瑕黄金芽礼盒',188,'/images/goods/goods4.jpeg','2022-03-27'),(14,8,20,'锡合金铜制茶则茶勺',25,'/images/goods/goods20.jpeg','2022-03-27'),(15,8,22,'正宗明前芽头鲜嫩雀舌',108,'/images/goods/goods22.jpeg','2022-03-27'),(16,8,21,'黄山谷雨前六安瓜片',58,'/images/goods/goods21.jpeg','2022-03-28'),(17,8,1,'浅尝-金牡丹（武夷岩茶）',14.6,'/images/goods/goods1.jpeg','2022-03-28'),(18,8,16,'制茶师大赛获奖大红袍',178,'/images/goods/goods16.jpeg','2022-03-28'),(19,8,14,'【品种】白茶习茶系列 · 入门（三）',39,'/images/goods/goods14.jpeg','2022-03-29'),(20,7,16,'制茶师大赛获奖大红袍',178,'/images/goods/goods16.jpeg','2022-03-29'),(21,7,15,'【年份】白茶习茶系列 · 入门（二）',39,'/images/goods/goods15.jpeg','2022-03-29'),(22,7,1,'浅尝-金牡丹（武夷岩茶）',14.6,'/images/goods/goods1.jpeg','2022-03-29'),(23,7,5,'黑金茶具套装',458,'/images/goods/goods5.jpeg','2022-03-29'),(24,7,14,'【品种】白茶习茶系列 · 入门（三）',39,'/images/goods/goods14.jpeg','2022-03-29'),(25,7,9,'2016白毫银针巧克力茶砖',98,'/images/goods/goods9.jpeg','2022-03-29'),(26,7,22,'正宗明前芽头鲜嫩雀舌',108,'/images/goods/goods22.jpeg','2022-03-29'),(27,7,3,'黄山太平猴魁绿茶1号',99,'/images/goods/goods3.jpeg','2022-03-29'),(28,11,7,'金油滴建盏',298,'/images/goods/goods7.jpeg','2022-03-30'),(29,11,1,'浅尝-金牡丹（武夷岩茶）',14.6,'/images/goods/goods1.jpeg','2022-03-30'),(30,11,18,'莫等闲壹罐茶武夷大红袍',96,'/images/goods/goods18.jpeg','2022-03-30'),(31,11,17,'华态五虎奇茗岩茶组合礼',1666.5,'/images/goods/goods17.jpeg','2022-03-30'),(32,11,9,'2016白毫银针巧克力茶砖',98,'/images/goods/goods9.jpeg','2022-03-30'),(33,11,23,'四川雅安初采青针雀舌',198,'/images/goods/goods23.jpeg','2022-03-30'),(34,11,19,'竹制茶勺',15,'/images/goods/goods19.jpeg','2022-03-30'),(35,11,11,'传统工艺茉莉花茶-春毫',68,'/images/goods/goods11.jpeg','2022-03-30'),(36,11,19,'竹制茶勺',15,'/images/goods/goods19.jpeg','2022-03-30'),(37,11,11,'传统工艺茉莉花茶-春毫',68,'/images/goods/goods11.jpeg','2022-03-30'),(38,8,6,'高山流水陶瓷旅行茶具',168,'/images/goods/goods6.jpeg','2022-03-30'),(39,8,8,'浅尝-白牡丹',6.6,'/images/goods/goods8.jpeg','2022-03-30'),(40,11,11,'传统工艺茉莉花茶-春毫',68,'/images/goods/goods11.jpeg','2022-03-30'),(41,11,14,'【品种】白茶习茶系列 · 入门（三）',39,'/images/goods/goods14.jpeg','2022-03-30'),(42,8,8,'浅尝-白牡丹',6.6,'/images/goods/goods8.jpeg','2022-03-30'),(43,9,6,'高山流水陶瓷旅行茶具',168,'/images/goods/goods6.jpeg','2022-03-30'),(44,12,22,'正宗明前芽头鲜嫩雀舌',108,'/images/goods/goods22.jpeg','2022-03-30'),(45,12,13,'林沧淇白水兰香铁观音',118,'/images/goods/goods13.jpeg','2022-03-30'),(46,12,7,'金油滴建盏',298,'/images/goods/goods7.jpeg','2022-03-30'),(47,12,17,'华态五虎奇茗岩茶组合礼',1666.5,'/images/goods/goods17.jpeg','2022-03-30'),(48,12,4,'绿茶-无瑕黄金芽礼盒',188,'/images/goods/goods4.jpeg','2022-03-30'),(49,12,1,'浅尝-金牡丹（武夷岩茶）',14.6,'/images/goods/goods1.jpeg','2022-03-30'),(50,12,17,'华态五虎奇茗岩茶组合礼',1666.5,'/images/goods/goods17.jpeg','2022-03-30'),(51,12,7,'金油滴建盏',298,'/images/goods/goods7.jpeg','2022-03-30'),(52,12,2,'2016南糯山古树普洱生茶',98,'/images/goods/goods2.jpeg','2022-03-30'),(53,9,6,'高山流水陶瓷旅行茶具',168,'/images/goods/goods6.jpeg','2022-03-31'),(54,9,6,'高山流水陶瓷旅行茶具',168,'/images/goods/goods6.jpeg','2022-03-31'),(55,8,8,'浅尝-白牡丹',6.6,'/images/goods/goods8.jpeg','2022-03-31'),(56,7,7,'金油滴建盏',298,'/images/goods/goods7.jpeg','2022-03-31'),(57,7,10,'云南凤庆经典蜜香滇红',88,'/images/goods/goods10.jpeg','2022-03-31'),(58,7,17,'华态五虎奇茗岩茶组合礼',1666.5,'/images/goods/goods17.jpeg','2022-03-31'),(59,7,10,'云南凤庆经典蜜香滇红',88,'/images/goods/goods10.jpeg','2022-03-31'),(60,7,7,'金油滴建盏',298,'/images/goods/goods7.jpeg','2022-03-31'),(61,7,10,'云南凤庆经典蜜香滇红',88,'/images/goods/goods10.jpeg','2022-03-31'),(62,7,10,'云南凤庆经典蜜香滇红',88,'/images/goods/goods10.jpeg','2022-03-31'),(63,7,7,'金油滴建盏',298,'/images/goods/goods7.jpeg','2022-03-31'),(64,8,13,'林沧淇白水兰香铁观音',118,'/images/goods/goods13.jpeg','2022-03-31'),(65,15,19,'竹制茶勺',15,'/images/goods/goods19.jpeg','2022-03-31'),(66,15,16,'制茶师大赛获奖大红袍',178,'/images/goods/goods16.jpeg','2022-03-31'),(67,13,8,'浅尝-白牡丹',6.6,'/images/goods/goods8.jpeg','2022-03-31'),(68,7,6,'高山流水陶瓷旅行茶具',168,'/images/goods/goods6.jpeg','2022-03-31'),(69,7,6,'高山流水陶瓷旅行茶具',168,'/images/goods/goods6.jpeg','2022-03-31'),(70,7,6,'高山流水陶瓷旅行茶具',168,'/images/goods/goods6.jpeg','2022-03-31'),(71,7,14,'【品种】白茶习茶系列 · 入门（三）',39,'/images/goods/goods14.jpeg','2022-03-31'),(72,7,9,'2016白毫银针巧克力茶砖',98,'/images/goods/goods9.jpeg','2022-03-31'),(73,7,9,'2016白毫银针巧克力茶砖',98,'/images/goods/goods9.jpeg','2022-03-31'),(74,7,11,'传统工艺茉莉花茶-春毫',68,'/images/goods/goods11.jpeg','2022-03-31'),(75,7,6,'高山流水陶瓷旅行茶具',168,'/images/goods/goods6.jpeg','2022-03-31'),(76,7,21,'黄山谷雨前六安瓜片',58,'/images/goods/goods21.jpeg','2022-03-31'),(77,7,22,'正宗明前芽头鲜嫩雀舌',108,'/images/goods/goods22.jpeg','2022-03-31'),(78,7,22,'正宗明前芽头鲜嫩雀舌',108,'/images/goods/goods22.jpeg','2022-03-31'),(79,13,8,'浅尝-白牡丹',6.6,'/images/goods/goods8.jpeg','2022-03-31'),(80,13,8,'浅尝-白牡丹',6.6,'/images/goods/goods8.jpeg','2022-03-31'),(81,7,23,'四川雅安初采青针雀舌',198,'/images/goods/goods23.jpeg','2022-03-31'),(82,7,23,'四川雅安初采青针雀舌',198,'/images/goods/goods23.jpeg','2022-03-31'),(83,7,6,'高山流水陶瓷旅行茶具',168,'/images/goods/goods6.jpeg','2022-03-31'),(84,7,15,'【年份】白茶习茶系列 · 入门（二）',39,'/images/goods/goods15.jpeg','2022-03-31'),(85,13,1,'浅尝-金牡丹（武夷岩茶）',14.6,'/images/goods/goods1.jpeg','2022-03-31'),(86,13,1,'浅尝-金牡丹（武夷岩茶）',14.6,'/images/goods/goods1.jpeg','2022-03-31'),(87,13,1,'浅尝-金牡丹（武夷岩茶）',14.6,'/images/goods/goods1.jpeg','2022-03-31'),(88,13,14,'【品种】白茶习茶系列 · 入门（三）',39,'/images/goods/goods14.jpeg','2022-04-1');

/*Table structure for table `sign_in` */

DROP TABLE IF EXISTS `sign_in`;

CREATE TABLE `sign_in` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `sign_time` varchar(255) NOT NULL,
  `reward` varchar(255) NOT NULL,
  `total_time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4;

/*Data for the table `sign_in` */

insert  into `sign_in`(`id`,`uid`,`sign_time`,`reward`,`total_time`) values (19,8,'2022-3-28','3积分',1),(24,8,'2022-3-29','4积分',2),(30,7,'2022-3-29','3积分',1),(31,7,'2022-3-30','4积分',2),(32,11,'2022-3-30','3积分',1),(33,12,'2022-3-30','3积分',1),(34,8,'2022-3-30','5积分',3),(35,7,'2022-3-31','5积分',3),(36,8,'2022-3-31','8积分',4),(37,13,'2022-4-1','3积分',1),(38,8,'2022-4-1','3积分',1);

/*Table structure for table `start_list` */

DROP TABLE IF EXISTS `start_list`;

CREATE TABLE `start_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `goods_name` varchar(255) NOT NULL,
  `goods_price` double NOT NULL,
  `imgUrl` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

/*Data for the table `start_list` */

insert  into `start_list`(`id`,`uid`,`goods_id`,`goods_name`,`goods_price`,`imgUrl`) values (3,8,6,'高山流水陶瓷旅行茶具',168,'/images/goods/goods6.jpeg'),(4,8,8,'浅尝-白牡丹',6.6,'/images/goods/goods8.jpeg'),(5,8,5,'黑金茶具套装',458,'/images/goods/goods5.jpeg'),(6,8,13,'林沧淇白水兰香铁观音',118,'/images/goods/goods13.jpeg'),(8,8,10,'云南凤庆经典蜜香滇红',88,'/images/goods/goods10.jpeg'),(9,8,3,'黄山太平猴魁绿茶1号',99,'/images/goods/goods3.jpeg'),(10,8,1,'浅尝-金牡丹（武夷岩茶）',14.6,'/images/goods/goods1.jpeg'),(12,11,11,'传统工艺茉莉花茶-春毫',68,'/images/goods/goods11.jpeg'),(13,11,1,'浅尝-金牡丹（武夷岩茶）',14.6,'/images/goods/goods1.jpeg'),(14,11,14,'【品种】白茶习茶系列 · 入门（三）',39,'/images/goods/goods14.jpeg'),(16,12,7,'金油滴建盏',298,'/images/goods/goods7.jpeg'),(17,12,17,'华态五虎奇茗岩茶组合礼',1666.5,'/images/goods/goods17.jpeg'),(18,7,7,'金油滴建盏',298,'/images/goods/goods7.jpeg'),(19,7,10,'云南凤庆经典蜜香滇红',88,'/images/goods/goods10.jpeg'),(20,7,17,'华态五虎奇茗岩茶组合礼',1666.5,'/images/goods/goods17.jpeg'),(21,15,16,'制茶师大赛获奖大红袍',178,'/images/goods/goods16.jpeg'),(22,13,14,'【品种】白茶习茶系列 · 入门（三）',39,'/images/goods/goods14.jpeg');

/*Table structure for table `store_order` */

DROP TABLE IF EXISTS `store_order`;

CREATE TABLE `store_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(200) NOT NULL,
  `goods_name` varchar(200) NOT NULL,
  `goods_price` varchar(200) NOT NULL,
  `goods_num` int(11) NOT NULL,
  `order_status` varchar(200) NOT NULL,
  `uid` int(11) NOT NULL,
  `mode` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=244 DEFAULT CHARSET=utf8mb4;

/*Data for the table `store_order` */

insert  into `store_order`(`id`,`order_id`,`goods_name`,`goods_price`,`goods_num`,`order_status`,`uid`,`mode`) values (1,'20220305163351739857','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','390.4',7,'1',8,''),(2,'20220305213435205192','2016白毫银针巧克力茶砖,高山流水陶瓷旅行茶具','266',2,'1',8,''),(3,'20220305213854760564','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','292.4',6,'1',8,''),(4,'2022030521430070948','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','292.4',6,'1',8,''),(5,'20220305214316409180','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','292.4',6,'1',8,''),(6,'20220305215146681176','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','292.4',6,'1',8,''),(7,'2022030522000683789','2016白毫银针巧克力茶砖,浅尝-白牡丹','124.4',5,'1',8,''),(8,'2022030522003457478','高山流水陶瓷旅行茶具','168',1,'1',8,''),(9,'20220305220042468935','浅尝-白牡丹,高山流水陶瓷旅行茶具','194.4',5,'1',8,''),(10,'20220305220427984226','2016白毫银针巧克力茶砖','98',1,'1',8,''),(11,'20220305220433166525','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','292.4',6,'1',8,''),(12,'20220305220548174341','2016白毫银针巧克力茶砖,高山流水陶瓷旅行茶具','266',2,'1',8,''),(13,'20220305220756770088','浅尝-白牡丹','26.4',4,'1',8,''),(14,'20220305220810536279','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','292.4',6,'1',8,''),(15,'20220305220826564001','浅尝-白牡丹,高山流水陶瓷旅行茶具','517.2',5,'1',8,''),(16,'20220305223940355898','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','615.2',6,'1',8,''),(17,'20220305224042801331','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','615.2',6,'1',8,''),(18,'20220305224136230640','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','615.2',6,'1',8,''),(19,'20220305224311626361','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','615.2',6,'1',8,''),(20,'20220306142627248804','浅尝-白牡丹,高山流水陶瓷旅行茶具','517.2',5,'1',8,''),(21,'20220306143203652320','2016白毫银针巧克力茶砖,浅尝-白牡丹','111.2',3,'1',8,''),(22,'20220306143502664425','2016白毫银针巧克力茶砖,高山流水陶瓷旅行茶具','602',4,'1',8,''),(23,'20220306143539104029','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','615.2',6,'1',8,''),(24,'20220306144308197912','2016白毫银针巧克力茶砖,浅尝-白牡丹','111.2',3,'2',8,''),(25,'20220306145323483620','黄山太平猴魁绿茶1号','99',1,'2',8,''),(26,'20220306155158101374','高山流水陶瓷旅行茶具','504',3,'2',8,''),(27,'20220306155343807058','浅尝-金牡丹（武夷岩茶）,高山流水陶瓷旅行茶具','197.2',3,'2',8,''),(28,'20220306205100888482','浅尝-金牡丹（武夷岩茶）,金油滴建盏','312.6',2,'2',8,''),(29,'20220306205235647077','高山流水陶瓷旅行茶具,黑金茶具套装','626',2,'3',8,''),(30,'20220307161622791206','绿茶-无瑕黄金芽礼盒,高山流水陶瓷旅行茶具,黄山太平猴魁绿茶1号,浅尝-金牡丹（武夷岩茶）','469.6',4,'1',8,''),(31,'20220309170635940484','绿茶-无瑕黄金芽礼盒,高山流水陶瓷旅行茶具,浅尝-金牡丹（武夷岩茶）','370.6',3,'2',8,''),(32,'2022030917073768901','2016白毫银针巧克力茶砖,黑金茶具套装','1014',3,'3',8,''),(33,'20220309171123129663','黄山太平猴魁绿茶1号','99',1,'3',8,''),(34,'20220309171709387094','充值￥100 赠送￥10','100',1,'1',8,''),(35,'20220309172135387152','充值￥100 赠送￥10','100',1,'1',8,''),(36,'20220309172147582511','充值￥1000 赠送￥100','1000',1,'1',8,''),(37,'20220309172220280154','充值￥1000 赠送￥100','1000',1,'1',8,''),(38,'20220309172711849793','充值￥100 赠送￥10','100',1,'1',8,''),(39,'20220309173014393257','充值￥100 赠送￥10','100',1,'1',8,''),(40,'20220309173233200402','充值￥100 赠送￥10','100',1,'1',8,''),(41,'20220309173355189674','充值￥1000 赠送￥100','1000',1,'1',8,''),(42,'2022030917365053224','充值￥100 赠送￥10','100',1,'3',8,''),(43,'20220309174026621359','充值￥100 赠送￥10','100',1,'2',8,''),(44,'20220309174041864270','充值￥100 赠送￥10','100',1,'2',8,''),(45,'20220309175130129647','充值￥100 赠送￥10','100',1,'2',8,''),(46,'20220309175140714587','充值￥100 赠送￥10','100',1,'3',8,''),(47,'20220309180111615252','充值￥100 赠送￥10','100',1,'3',8,''),(48,'20220309181918738606','充值￥100 赠送￥10','100',1,'3',8,''),(49,'20220309182128227033','充值￥100 赠送￥10','100',1,'3',8,''),(50,'2022030918225275038','充值￥100 赠送￥10','100',1,'3',8,''),(51,'20220309182414633695','充值￥100 赠送￥10','100',1,'3',8,''),(52,'20220309182546453261','充值￥1000 赠送￥100','1000',1,'3',8,''),(53,'20220309182710178007','充值￥100 赠送￥10','100',1,'3',8,''),(54,'20220309182747526679','充值￥1000 赠送￥100','1000',1,'3',8,''),(55,'20220309182956930494','充值￥100 赠送￥10','100',1,'3',8,''),(56,'20220309221220527341','充值￥100 赠送￥10','100',1,'3',8,''),(57,'20220309221533539130','充值￥100 赠送￥10','100',1,'3',8,''),(58,'20220309221626727340','充值￥1000 赠送￥100','1000',1,'3',8,''),(59,'20220309222224535982','充值￥100 赠送￥10','100',1,'3',8,''),(60,'20220313170748423414','高山流水陶瓷旅行茶具','168',1,'2',8,''),(61,'20220314213501922563','林沧淇白水兰香铁观音,黄山太平猴魁绿茶1号','415',4,'1',8,''),(62,'20220319232931968256','浅尝-金牡丹（武夷岩茶）,2016南糯山古树普洱生茶','112.6',2,'2',8,''),(63,'20220320215854653451','云南凤庆经典蜜香滇红','176',2,'1',8,''),(64,'20220320220526848359','云南凤庆经典蜜香滇红','176',2,'3',8,''),(65,'20220321175311432334','黄山太平猴魁绿茶1号','99',1,'2',8,''),(66,'20220322111909367341','充值￥100 赠送 10积分','100',1,'3',8,''),(67,'20220322112030730328','充值￥1000 赠送 100积分','1000',1,'3',8,''),(68,'2022032219492545017','四川雅安初采青针雀舌','198',1,'1',8,''),(69,'20220322200215127295','四川雅安初采青针雀舌','198',1,'1',8,''),(70,'20220322200943795506','四川雅安初采青针雀舌','198',1,'1',8,''),(71,'20220322201340576111','浅尝-金牡丹（武夷岩茶）','14.6',1,'1',8,''),(72,'20220322201443855273','浅尝-金牡丹（武夷岩茶）','14.6',1,'1',8,''),(73,'20220322201453306142','浅尝-金牡丹（武夷岩茶）','14.6',1,'1',8,''),(74,'20220322201742605514','浅尝-金牡丹（武夷岩茶）','14.6',1,'1',8,''),(75,'20220322201813133016','浅尝-金牡丹（武夷岩茶）','14.6',1,'1',8,''),(76,'20220322201900419450','浅尝-金牡丹（武夷岩茶）','14.6',1,'1',8,''),(77,'20220322202052266671','浅尝-金牡丹（武夷岩茶）','14.6',1,'1',8,''),(78,'20220322202201157834','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,''),(79,'20220322202851514785','四川雅安初采青针雀舌','198',1,'1',8,''),(80,'20220322202910461237','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,''),(81,'2022032220314081340','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,''),(82,'20220322203545802604','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,''),(83,'20220322205807278329','四川雅安初采青针雀舌','198',1,'1',8,''),(84,'20220322205911971165','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,''),(85,'20220322210905300156','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,''),(86,'20220322211016869802','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,''),(87,'2022032221111446321','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,''),(88,'20220322211536105615','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,''),(89,'20220322211553382299','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,''),(90,'20220322211656808373','2016南糯山古树普洱生茶','1960',2,'1',8,''),(91,'20220322211724532707','2016南糯山古树普洱生茶','1960',2,'1',8,''),(92,'20220322211815949340','2016南糯山古树普洱生茶','1960',2,'1',8,''),(93,'20220322211819743164','黄山太平猴魁绿茶1号','2970',3,'1',8,''),(94,'20220322212027621158','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,''),(95,'20220322212115403326','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,''),(96,'20220322212932525819','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,''),(97,'20220322213040836299','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,''),(98,'20220322213045210309','2016南糯山古树普洱生茶','1960',2,'1',8,''),(99,'2022032221501447599','四川雅安初采青针雀舌','198',1,'1',8,''),(100,'20220322222126601865','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,'积分'),(101,'20220322222135302399','四川雅安初采青针雀舌','198',1,'2',8,'电子货币'),(102,'20220322224051804001','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,'积分'),(103,'20220322224139355142','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,'积分'),(104,'20220322224524300205','2016南糯山古树普洱生茶','1960',2,'1',7,'积分'),(105,'20220322224553519414','2016南糯山古树普洱生茶','1960',2,'1',7,'积分'),(106,'20220322224602609116','浅尝-金牡丹（武夷岩茶）','146',1,'1',7,'积分'),(107,'20220322224606483518','2016南糯山古树普洱生茶','1960',2,'1',7,'积分'),(108,'20220322224631662953','黄山太平猴魁绿茶1号','2970',3,'1',7,'积分'),(109,'2022032222470230708','2016南糯山古树普洱生茶','980',1,'1',7,'积分'),(110,'20220322224727654080','2016南糯山古树普洱生茶','980',1,'1',7,'积分'),(111,'20220322224816722010','竹制茶勺','15',1,'1',7,'电子货币'),(112,'20220322224906173231','竹制茶勺','15',1,'1',7,'电子货币'),(113,'20220322224941705045','竹制茶勺','15',1,'1',7,'电子货币'),(114,'20220322225100732686','竹制茶勺','15',1,'2',7,'电子货币'),(115,'2022032222515617375','浅尝-金牡丹（武夷岩茶）','146',1,'1',7,'积分'),(116,'2022032222525298605','浅尝-金牡丹（武夷岩茶）','146',1,'1',7,'积分'),(117,'2022032222545374203','浅尝-金牡丹（武夷岩茶）','146',1,'1',7,'积分'),(118,'20220322225545279361','浅尝-金牡丹（武夷岩茶）','146',1,'1',7,'积分'),(119,'20220322225549396691','浅尝-金牡丹（武夷岩茶）','146',1,'1',7,'积分'),(120,'20220322225554917371','2016南糯山古树普洱生茶','980',1,'1',7,'积分'),(121,'20220322225606236489','笔花堂桐木关金骏眉','7940',1,'1',7,'积分'),(122,'20220322225621647701','黄山太平猴魁绿茶1号','990',1,'1',7,'积分'),(123,'20220322225719506693','黄山太平猴魁绿茶1号','990',1,'1',7,'积分'),(124,'20220322230053620699','黄山太平猴魁绿茶1号','990',1,'1',7,'积分'),(125,'2022032223051847076','浅尝-金牡丹（武夷岩茶）','146',1,'1',7,'积分'),(126,'20220322230752932216','浅尝-金牡丹（武夷岩茶）','146',1,'1',7,'积分'),(127,'20220322231002692897','浅尝-金牡丹（武夷岩茶）','146',1,'1',7,'积分'),(128,'2022032223110519495','浅尝-金牡丹（武夷岩茶）','146',1,'2',7,'积分'),(129,'20220322231151558907','浅尝-金牡丹（武夷岩茶）','146',1,'2',7,'积分'),(130,'20220322231228680289','浅尝-金牡丹（武夷岩茶）','146',1,'2',7,'积分'),(131,'20220322231313502428','浅尝-金牡丹（武夷岩茶）','146',1,'2',7,'积分'),(132,'20220322231417962077','黄山太平猴魁绿茶1号','990',1,'3',7,'积分'),(133,'20220322232609359142','2016南糯山古树普洱生茶','980',1,'3',7,'积分'),(134,'20220322232808467165','2016南糯山古树普洱生茶','980',1,'3',7,'积分'),(135,'20220322232856634666','高山流水陶瓷旅行茶具','1680',1,'3',7,'积分'),(136,'20220322232950863106','锡合金铜制茶则茶勺','250',1,'3',7,'积分'),(137,'20220322233014615193','浅尝-金牡丹（武夷岩茶）','146',1,'3',7,'积分'),(138,'20220322233431459237','竹制茶勺','150',1,'3',7,'积分'),(139,'2022032223353295184','竹制茶勺','150',1,'3',7,'积分'),(140,'20220322234010844764','绿茶-无瑕黄金芽礼盒','1880',1,'3',7,'积分'),(141,'20220324200447840485','四川雅安初采青针雀舌','198',1,'1',8,'电子货币'),(142,'202203242004593914','传统工艺茉莉花茶-春毫','680',1,'1',8,'电子货币'),(143,'20220324200524438419','传统工艺茉莉花茶-春毫','680',1,'1',8,'电子货币'),(144,'20220324200554987775','传统工艺茉莉花茶-春毫','680',1,'1',8,'电子货币'),(145,'20220324200738549861','传统工艺茉莉花茶-春毫','68',1,'1',8,'电子货币'),(146,'20220324200829687677','传统工艺茉莉花茶-春毫','68',1,'1',8,'电子货币'),(147,'20220324201058724497','四川雅安初采青针雀舌','198',1,'1',8,'电子货币'),(148,'20220324201107860393','【品种】白茶习茶系列 · 入门（三）','39',1,'1',8,'电子货币'),(149,'20220324201120752230','黑金茶具套装','458',1,'1',8,'电子货币'),(150,'20220324201128641826','四川雅安初采青针雀舌','198',1,'1',8,'电子货币'),(151,'20220324201137798260','四川雅安初采青针雀舌','198',1,'1',8,'电子货币'),(152,'20220324201308515153','四川雅安初采青针雀舌','198',1,'1',8,'电子货币'),(153,'20220324201318508354','金油滴建盏','298',1,'1',8,'电子货币'),(154,'20220324201334644932','四川雅安初采青针雀舌','198',1,'1',8,'电子货币'),(155,'20220324201410124586','四川雅安初采青针雀舌','198',1,'1',8,'电子货币'),(156,'20220324201415129000','锡合金铜制茶则茶勺','25',1,'1',8,'电子货币'),(157,'20220324201429177532','锡合金铜制茶则茶勺','25',1,'1',8,'电子货币'),(158,'20220324201523694611','四川雅安初采青针雀舌','198',1,'1',8,'电子货币'),(159,'20220324201651713821','四川雅安初采青针雀舌','198',1,'1',8,'电子货币'),(160,'20220324201657984323','林沧淇白水兰香铁观音','118',1,'1',8,'电子货币'),(161,'20220324202014433875','林沧淇白水兰香铁观音','118',1,'1',8,'电子货币'),(162,'20220324202049153416','云南凤庆经典蜜香滇红','88',1,'1',8,'电子货币'),(163,'20220324202215230729','云南凤庆经典蜜香滇红','88',1,'1',8,'电子货币'),(164,'20220324202716124946','四川雅安初采青针雀舌','198',1,'1',8,'电子货币'),(165,'20220324202722111640','正宗明前芽头鲜嫩雀舌','108',1,'1',8,'电子货币'),(166,'20220324202727461740','华态五虎奇茗岩茶组合礼','1666.5',1,'2',8,'电子货币'),(167,'2022032420381179816','2016白毫银针巧克力茶砖','98',1,'1',8,'电子货币'),(168,'20220324203816476144','2016白毫银针巧克力茶砖','98',1,'3',8,'电子货币'),(169,'2022032420403890302','浅尝-金牡丹（武夷岩茶）','146',1,'1',8,'积分'),(170,'20220324204234122412','云南凤庆经典蜜香滇红','88',1,'3',8,'电子货币'),(171,'20220324204818320002','浅尝-金牡丹（武夷岩茶）','146',1,'3',7,'积分'),(172,'20220324205015164686','2016白毫银针巧克力茶砖','98',1,'2',7,'电子货币'),(173,'2022032420505422590','锡合金铜制茶则茶勺','25',1,'1',7,'电子货币'),(174,'20220324205546309020','浅尝-白牡丹','6.6',1,'1',8,'电子货币'),(175,'20220324205612737375','制茶师大赛获奖大红袍','178',1,'2',8,'电子货币'),(176,'20220324210119416163','四川雅安初采青针雀舌','198',1,'2',8,'电子货币'),(177,'20220324210249784800','笔花堂桐木关金骏眉','794',1,'1',8,'电子货币'),(178,'20220324210701108091','笔花堂桐木关金骏眉','794',1,'1',8,'电子货币'),(179,'20220324210903665250','林沧淇白水兰香铁观音','118',1,'1',8,'电子货币'),(180,'2022032421125026721','笔花堂桐木关金骏眉','794',1,'1',8,'电子货币'),(181,'20220324211310211434','笔花堂桐木关金骏眉','794',1,'1',8,'电子货币'),(182,'20220324211516709666','四川雅安初采青针雀舌','198',1,'1',8,'电子货币'),(183,'20220324211545294200','莫等闲壹罐茶武夷大红袍','96',1,'1',8,'电子货币'),(184,'20220324211651315233','莫等闲壹罐茶武夷大红袍','96',1,'2',8,'电子货币'),(185,'2022032421181586615','莫等闲壹罐茶武夷大红袍','96',1,'1',8,'电子货币'),(186,'20220324211859788092','浅尝-金牡丹（武夷岩茶）','14.6',1,'2',8,'电子货币'),(187,'20220324212015822931','黄山谷雨前六安瓜片','58',1,'2',8,'电子货币'),(188,'20220324212032201381','【品种】白茶习茶系列 · 入门（三）','39',1,'2',8,'电子货币'),(189,'20220324212058976843','黑金茶具套装','458',1,'2',8,'电子货币'),(190,'20220324212111655830','黑金茶具套装','458',1,'2',8,'电子货币'),(191,'20220324212128829804','黑金茶具套装','458',1,'2',8,'电子货币'),(192,'20220324212157321448','传统工艺茉莉花茶-春毫','68',1,'3',7,'电子货币'),(193,'20220324212355142316','2016白毫银针巧克力茶砖','98',1,'1',7,'电子货币'),(194,'2022032421265773834','2016南糯山古树普洱生茶','98',1,'1',7,'电子货币'),(195,'20220324212726915628','林沧淇白水兰香铁观音','118',1,'2',7,'电子货币'),(196,'20220324212748297747','【年份】白茶习茶系列 · 入门（二）','39',1,'3',7,'电子货币'),(197,'2022032421283869673','正宗明前芽头鲜嫩雀舌','108',1,'3',7,'电子货币'),(198,'20220326140021502448','浅尝-金牡丹（武夷岩茶）','146',1,'1',9,'积分'),(199,'20220327194340115940','华态五虎奇茗岩茶组合礼','1666.5',1,'1',8,'电子货币'),(200,'20220330122308574367','浅尝-金牡丹（武夷岩茶）','14.6',1,'1',11,'电子货币'),(201,'20220330122359192950','莫等闲壹罐茶武夷大红袍','96',1,'2',11,'电子货币'),(202,'20220330122444704386','浅尝-金牡丹（武夷岩茶）','146',1,'2',11,'积分'),(203,'20220330122614686185','2016南糯山古树普洱生茶','980',1,'2',8,'积分'),(204,'20220330122647947402','华态五虎奇茗岩茶组合礼','1666.5',1,'1',11,'电子货币'),(205,'20220330122651191299','绿茶-无瑕黄金芽礼盒','1880',1,'2',11,'积分'),(206,'20220330122956879396','竹制茶勺','75',5,'1',11,'电子货币'),(207,'20220330123008230165','绿茶-无瑕黄金芽礼盒,2016白毫银针巧克力茶砖,林沧淇白水兰香铁观音','592',4,'1',8,'电子货币'),(208,'20220330123012132532','竹制茶勺','75',5,'1',11,'电子货币'),(209,'20220330124823292877','竹制茶勺','1.3333333333333333e+23',2147483647,'1',11,'电子货币'),(210,'20220330125928695902','浅尝-金牡丹（武夷岩茶）','146',1,'2',11,'积分'),(211,'2022033013003476093','充值￥100 赠送 10积分','100',1,'2',12,''),(212,'20220330130245641841','浅尝-金牡丹（武夷岩茶）','146',1,'2',12,'积分'),(213,'20220330222129490927','正宗明前芽头鲜嫩雀舌','108',1,'1',12,'电子货币'),(214,'20220330222239618572','正宗明前芽头鲜嫩雀舌,金油滴建盏','1624',8,'1',12,'电子货币'),(215,'20220330222313567941','正宗明前芽头鲜嫩雀舌,金油滴建盏','1624',8,'2',12,'电子货币'),(216,'2022033022244522043','充值￥100 赠送 10积分','100',1,'2',12,''),(217,'20220330222833649250','华态五虎奇茗岩茶组合礼','1666.5',1,'1',12,'电子货币'),(218,'20220330222849946289','华态五虎奇茗岩茶组合礼','8332.5',5,'1',12,'电子货币'),(219,'20220330223045715178','金油滴建盏','298',1,'1',12,'电子货币'),(220,'20220330223109729115','高山流水陶瓷旅行茶具','1680',1,'2',12,'积分'),(221,'20220330223125768856','2016南糯山古树普洱生茶','98',1,'2',12,'电子货币'),(222,'20220330223224605229','华态五虎奇茗岩茶组合礼,金油滴建盏','8630.5',6,'2',12,'电子货币'),(223,'20220331194029915780','制茶师大赛获奖大红袍','178',1,'1',15,'电子货币'),(224,'20220331194104465379','制茶师大赛获奖大红袍','176220',990,'1',15,'电子货币'),(225,'20220331210105395087','浅尝-白牡丹','6.6',1,'1',13,'电子货币'),(226,'20220331210138714300','高山流水陶瓷旅行茶具','168',1,'1',7,'电子货币'),(227,'20220331210541749868','高山流水陶瓷旅行茶具','168',1,'1',7,'电子货币'),(228,'20220331210559159766','【品种】白茶习茶系列 · 入门（三）','39',1,'1',7,'电子货币'),(229,'20220331210651199582','2016白毫银针巧克力茶砖','98',1,'1',7,'电子货币'),(230,'20220331212734756484','传统工艺茉莉花茶-春毫','68',1,'1',7,'电子货币'),(231,'20220331212758639498','高山流水陶瓷旅行茶具','168',1,'1',7,'电子货币'),(232,'20220331232119662435','黄山谷雨前六安瓜片','58',1,'1',7,'电子货币'),(233,'20220331232157778438','正宗明前芽头鲜嫩雀舌','108',1,'1',7,'电子货币'),(234,'20220331232309281815','正宗明前芽头鲜嫩雀舌','108',1,'1',7,'电子货币'),(235,'20220331233322236103','浅尝-白牡丹','6.6',1,'1',13,'电子货币'),(236,'20220331233819580198','四川雅安初采青针雀舌','198',1,'1',7,'电子货币'),(237,'20220331234100811786','高山流水陶瓷旅行茶具','168',1,'1',7,'电子货币'),(238,'20220331234330561699','浅尝-金牡丹（武夷岩茶）','14.6',1,'1',13,'电子货币'),(239,'20220331234433216786','2016南糯山古树普洱生茶','980',1,'1',13,'积分'),(240,'20220331234444769331','2016南糯山古树普洱生茶','980',1,'1',7,'积分'),(241,'20220331234815605370','2016南糯山古树普洱生茶','980',1,'1',7,'积分'),(242,'20220331235002712023','莫等闲壹罐茶武夷大红袍','960',1,'1',13,'积分'),(243,'20220401000035531825','浅尝-金牡丹（武夷岩茶）','14.6',1,'1',13,'电子货币');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tel` varchar(50) NOT NULL,
  `pwd` varchar(200) NOT NULL,
  `imgUrl` varchar(200) NOT NULL,
  `nickName` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `member` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`tel`,`pwd`,`imgUrl`,`nickName`,`token`,`member`) values (2,'12345678901','888888','/images/headerImg/header.jpeg','张三','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODkwMSIsImlhdCI6MTY0ODY0ODgyMywiZXhwIjoxNjQ4NjQ4ODgzfQ.VsUF8J4_kG_HmspcYEn7furs_UEtYbBLmnVQRedSoiw','0'),(3,'13166981478','666666','/images/headerImg/header.jpeg','李四','','0'),(4,'13144112259','999999','/images/headerImg/header.jpeg','王五','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMzE0NDExMjI1OSIsImlhdCI6MTY0ODY0OTE2MSwiZXhwIjoxNjQ4NjQ5MjIxfQ.6YLuQ6JX7Lev6WsuVM1y3TeuAU730xaDzJZpJkl1kE0','0'),(5,'17345698789','666666','/images/headerImg/header.jpeg','赵六','','0'),(6,'13144274877','666666','/images/headerImg/header.jpeg','孙七','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMzE0NDI3NDg3NyIsImlhdCI6MTY0NjAzNTUzMn0.SBcn8kcsSfJQIZD7aDNnpgCsaN29ht6AcEJHTsdcCrI','0'),(7,'12345678999','666666','/images/headerImg/测试用户_1-1648615862498.jpg','测试用户_1','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODk5OSIsImlhdCI6MTY0ODUyMzkxNSwiZXhwIjoxNjQ4NTIzOTc1fQ.b2g3LRldXaOVHhW3w555CCUpZ2_i4BLcDcQ6caXUMAs','0'),(8,'13144274876','123456','/images/headerImg/九狐子-1648650395804.jpg','九狐子','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMzE0NDI3NDg3NiIsImlhdCI6MTY0ODU2NjkxOCwiZXhwIjoxNjQ4NTY2OTc4fQ.XJ3X7N5_7n35Do7BYmXwYqWJksq6WA6dR7Svp_jpZfY','1'),(9,'17166589988','666666','/images/headerImg/测试用户_3-1648652168799.jpg','测试用户_3','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxNzE2NjU4OTk4OCIsImlhdCI6MTY0ODI3NDQxNiwiZXhwIjoxNjQ4Mjc0NDc2fQ.I8b6vROmSwTo-A_OB1Xf-rvJFUNMaMUB6D4uYVTraGg','0'),(10,'14725836911','666666','/images/headerImg/header.jpeg','14725836911','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxNDcyNTgzNjkxMSIsImlhdCI6MTY0NzkyNTk5NSwiZXhwIjoxNjQ4MDEyMzk1fQ.A4Cf55bcpCUZqE_rC7S7_mTeEBWupaq1r2YfMQwE-FE','0'),(11,'13692509750','666666','/images/headerImg/header.jpeg','测试用户_2','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMzY5MjUwOTc1MCIsImlhdCI6MTY0ODYxNDE0MCwiZXhwIjoxNjQ4NzAwNTQwfQ.tRXN2IQUzSoq6UcVZ0u2GF5tRK1tnSpFfYNrNyztcj8','0'),(12,'13692509758','666666','/images/headerImg/header.jpeg','^_^','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMzY5MjUwOTc1OCIsImlhdCI6MTY0ODYxNjQyMywiZXhwIjoxNjQ4NzAyODIzfQ.YyNgS2AOixPojJVm9D3Zo2d-ZY1Cvs_JQl_IXqljRU8','0'),(13,'15017266946','666666','/images/headerImg/header.jpeg','15017266946','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxNTAxNzI2Njk0NiIsImlhdCI6MTY0ODY0ODQ4MywiZXhwIjoxNjQ4NzM0ODgzfQ.UxunuiITEro9aj1aB5aXG4X4E8nA8X7J755404-1l_A','0'),(14,'14725836900','666666','/images/headerImg/header.jpeg','14725836900','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxNDcyNTgzNjkwMCIsImlhdCI6MTY0ODY0OTIxMiwiZXhwIjoxNjQ4NzM1NjEyfQ.FkAkPReBaYDtwYJLADv467Bd-IhckjVvNp8HZrdBkPI','0'),(15,'12312312312','666666','/images/headerImg/header.jpeg','~！@#SAD{','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjMxMjMxMjMxMiIsImlhdCI6MTY0ODcyNjc4MiwiZXhwIjoxNjQ4ODEzMTgyfQ.Yn7K1stF7LLZ6adtCOeE4CgvSCmUFN5hqLi_HQOwcco','0');

/*Table structure for table `wallet` */

DROP TABLE IF EXISTS `wallet`;

CREATE TABLE `wallet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `total_money` varchar(200) NOT NULL COMMENT '总资产',
  `Total_top_up` varchar(200) NOT NULL COMMENT '总充值金额',
  `total_consumption` varchar(200) NOT NULL COMMENT '总消费金额',
  `integral` varchar(255) NOT NULL COMMENT '积分',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

/*Data for the table `wallet` */

insert  into `wallet`(`id`,`uid`,`total_money`,`Total_top_up`,`total_consumption`,`integral`) values (1,8,'3520','3520','0','8'),(2,7,'0','0','0','10'),(3,11,'0','0','0','0'),(4,12,'0','0','0','0'),(5,2,'0','0','0','0'),(6,13,'0','0','0','0'),(7,3,'0','0','0','0'),(8,4,'0','0','0','0'),(9,14,'0','0','0','0'),(10,9,'0','0','0','0'),(11,15,'0','0','0','0');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
