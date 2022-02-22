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

/*Table structure for table `goods_list` */

DROP TABLE IF EXISTS `goods_list`;

CREATE TABLE `goods_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  `price` varchar(200) DEFAULT NULL,
  `num` varchar(200) DEFAULT NULL,
  `imgUrl` varchar(200) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `goods_list` */

insert  into `goods_list`(`id`,`name`,`content`,`price`,`num`,`imgUrl`) values (1,'浅尝-金牡丹（武夷岩茶）',NULL,'14.60',NULL,'/images/goods1.jpeg'),(2,'2016南糯山古树普洱生茶',NULL,'98',NULL,'/images/goods2.jpeg'),(3,'黄山太平猴魁绿茶1号',NULL,'99',NULL,'/images/goods3.jpeg'),(4,'绿茶-无瑕黄金芽礼盒',NULL,'188',NULL,'/images/goods4.jpeg');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
