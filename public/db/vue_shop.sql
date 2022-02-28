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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `goods_cart` */

insert  into `goods_cart`(`id`,`uid`,`goods_id`,`goods_name`,`goods_price`,`goods_num`,`goods_imgUrl`) values (1,6,3,'黄山太平猴魁绿茶1号',99,1,'/images/goods3.jpeg'),(2,6,7,'金油滴建盏',298,1,'/images/goods7.jpeg'),(3,6,1,'浅尝-金牡丹（武夷岩茶）',14.6,1,'/images/goods1.jpeg'),(4,6,9,'2016白毫银针巧克力茶砖',98,1,'/images/goods9.jpeg'),(5,8,9,'2016白毫银针巧克力茶砖',98,1,'/images/goods9.jpeg');

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

/*Data for the table `goods_list` */

insert  into `goods_list`(`id`,`name`,`content`,`price`,`num`,`imgUrl`,`complete`) values (1,'浅尝-金牡丹（武夷岩茶）',NULL,14.6,1,'/images/goods1.jpeg',NULL),(2,'2016南糯山古树普洱生茶',NULL,98,2,'/images/goods2.jpeg',NULL),(3,'黄山太平猴魁绿茶1号',NULL,99,3,'/images/goods3.jpeg',NULL),(4,'绿茶-无瑕黄金芽礼盒',NULL,188,4,'/images/goods4.jpeg',NULL),(5,'黑金茶具套装',NULL,458,5,'/images/goods5.jpeg',NULL),(6,'高山流水陶瓷旅行茶具',NULL,168,6,'/images/goods6.jpeg',NULL),(7,'金油滴建盏',NULL,298,7,'/images/goods7.jpeg',NULL),(8,'浅尝-白牡丹',NULL,6.6,8,'/images/goods8.jpeg',NULL),(9,'2016白毫银针巧克力茶砖',NULL,98,9,'/images/goods9.jpeg',NULL);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tel` varchar(50) NOT NULL,
  `pwd` varchar(200) NOT NULL,
  `imgUrl` varchar(200) DEFAULT NULL,
  `nickName` varchar(200) DEFAULT NULL,
  `token` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`tel`,`pwd`,`imgUrl`,`nickName`,`token`) values (2,'12345678901','888888','/images/headerImg/header.jpeg','张三',NULL),(3,'13166981478','666666','/images/headerImg/header.jpeg','李四',NULL),(4,'13144112259','999999','/images/headerImg/header.jpeg','王五',NULL),(5,'17345698789','666666','/images/headerImg/header.jpeg','赵六',''),(6,'13144274877','666666','/images/headerImg/header.jpeg','孙七','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMzE0NDI3NDg3NyIsImlhdCI6MTY0NjAzNTUzMn0.SBcn8kcsSfJQIZD7aDNnpgCsaN29ht6AcEJHTsdcCrI'),(7,'12345678999','666666','/images/headerImg/header.jpeg','12345678999','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODk5OSIsImlhdCI6MTY0NjA0NTY0NX0.no5zXsIsie5jXTE-SlxPF96yPnrJg8i718RpnD70df8'),(8,'13144274876','666666','/images/headerImg/header.jpeg','13144274876','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMzE0NDI3NDg3NiIsImlhdCI6MTY0NjA1MzM3Mn0.jzO2m4exthzFXo5ZnLP_hx3O0Rt87SGoReNBEfPEtec');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
