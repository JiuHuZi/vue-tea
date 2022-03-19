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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

/*Data for the table `address` */

insert  into `address`(`id`,`uid`,`name`,`tel`,`province`,`city`,`county`,`addressDetail`,`isDefault`,`areaCode`) values (6,8,'李四','13144274876','北京市','北京市','西城区','测试地址3','0','110102'),(7,8,'九狐123','13144274876','北京市','北京市','东城区','测试地址2','1','110101'),(9,6,'孙七','13144274877','天津市','天津市','塘沽区','测试地址1','1','120101'),(10,6,'孙七','13144274877','北京市','北京市','东城区','测试地址2','0','110101');

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
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4;

/*Data for the table `goods_cart` */

insert  into `goods_cart`(`id`,`uid`,`goods_id`,`goods_name`,`goods_price`,`goods_num`,`goods_imgUrl`) values (51,6,6,'高山流水陶瓷旅行茶具',168,1,'/images/goods6.jpeg'),(61,9,2,'2016南糯山古树普洱生茶',98,1,'/images/goods2.jpeg'),(76,8,1,'浅尝-金牡丹（武夷岩茶）',14.6,1,'/images/goods/goods1.jpeg'),(81,8,2,'2016南糯山古树普洱生茶',98,1,'/images/goods/goods2.jpeg');

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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

/*Data for the table `goods_list` */

insert  into `goods_list`(`id`,`name`,`content`,`price`,`num`,`imgUrl`,`complete`) values (1,'浅尝-金牡丹（武夷岩茶）',NULL,14.6,1,'/images/goods/goods1.jpeg',NULL),(2,'2016南糯山古树普洱生茶',NULL,98,2,'/images/goods/goods2.jpeg',NULL),(3,'黄山太平猴魁绿茶1号',NULL,99,3,'/images/goods/goods3.jpeg',NULL),(4,'绿茶-无瑕黄金芽礼盒',NULL,188,4,'/images/goods/goods4.jpeg',NULL),(5,'黑金茶具套装',NULL,458,5,'/images/goods/goods5.jpeg',NULL),(6,'高山流水陶瓷旅行茶具',NULL,168,6,'/images/goods/goods6.jpeg',NULL),(7,'金油滴建盏',NULL,298,7,'/images/goods/goods7.jpeg',NULL),(8,'浅尝-白牡丹',NULL,6.6,8,'/images/goods/goods8.jpeg',NULL),(9,'2016白毫银针巧克力茶砖',NULL,98,9,'/images/goods/goods9.jpeg',NULL),(10,'云南凤庆经典蜜香滇红','外形讨喜  甘甜可口',88,10,'/images/goods/goods10.jpeg',NULL),(11,'传统工艺茉莉花茶-春毫',NULL,68,11,'/images/goods/goods11.jpeg',NULL),(12,'笔花堂桐木关金骏眉',NULL,794,12,'/images/goods/goods12.jpeg',NULL),(13,'林沧淇白水兰香铁观音',NULL,118,13,'/images/goods/goods13.jpeg',NULL),(14,'【品种】白茶习茶系列 · 入门（三）',NULL,39,14,'/images/goods/goods14.jpeg',NULL),(15,'【年份】白茶习茶系列 · 入门（二）',NULL,39,15,'/images/goods/goods15.jpeg',NULL),(16,'制茶师大赛获奖大红袍',NULL,178,16,'/images/goods/goods16.jpeg',NULL),(17,'华态五虎奇茗岩茶组合礼',NULL,1666.5,17,'/images/goods/goods17.jpeg',NULL),(18,'莫等闲壹罐茶武夷大红袍',NULL,96,18,'/images/goods/goods18.jpeg',NULL),(19,'竹制茶勺',NULL,15,19,'/images/goods/goods19.jpeg',NULL),(20,'锡合金铜制茶则茶勺',NULL,25,20,'/images/goods/goods20.jpeg',NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

/*Data for the table `start_list` */

insert  into `start_list`(`id`,`uid`,`goods_id`,`goods_name`,`goods_price`,`imgUrl`) values (3,8,6,'高山流水陶瓷旅行茶具',168,'/images/goods/goods6.jpeg'),(4,8,8,'浅尝-白牡丹',6.6,'/images/goods/goods8.jpeg'),(5,8,5,'黑金茶具套装',458,'/images/goods/goods5.jpeg'),(6,8,13,'林沧淇白水兰香铁观音',118,'/images/goods/goods13.jpeg'),(8,8,10,'云南凤庆经典蜜香滇红',88,'/images/goods/goods10.jpeg'),(9,8,3,'黄山太平猴魁绿茶1号',99,'/images/goods/goods3.jpeg');

/*Table structure for table `store_order` */

DROP TABLE IF EXISTS `store_order`;

CREATE TABLE `store_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(200) NOT NULL,
  `goods_name` varchar(200) NOT NULL,
  `goods_price` varchar(200) NOT NULL,
  `goods_num` int(11) NOT NULL,
  `order_status` varchar(200) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4;

/*Data for the table `store_order` */

insert  into `store_order`(`id`,`order_id`,`goods_name`,`goods_price`,`goods_num`,`order_status`,`uid`) values (1,'20220305163351739857','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','390.4',7,'1',8),(2,'20220305213435205192','2016白毫银针巧克力茶砖,高山流水陶瓷旅行茶具','266',2,'1',8),(3,'20220305213854760564','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','292.4',6,'1',8),(4,'2022030521430070948','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','292.4',6,'1',8),(5,'20220305214316409180','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','292.4',6,'1',8),(6,'20220305215146681176','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','292.4',6,'1',8),(7,'2022030522000683789','2016白毫银针巧克力茶砖,浅尝-白牡丹','124.4',5,'1',8),(8,'2022030522003457478','高山流水陶瓷旅行茶具','168',1,'1',8),(9,'20220305220042468935','浅尝-白牡丹,高山流水陶瓷旅行茶具','194.4',5,'1',8),(10,'20220305220427984226','2016白毫银针巧克力茶砖','98',1,'1',8),(11,'20220305220433166525','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','292.4',6,'1',8),(12,'20220305220548174341','2016白毫银针巧克力茶砖,高山流水陶瓷旅行茶具','266',2,'1',8),(13,'20220305220756770088','浅尝-白牡丹','26.4',4,'1',8),(14,'20220305220810536279','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','292.4',6,'1',8),(15,'20220305220826564001','浅尝-白牡丹,高山流水陶瓷旅行茶具','517.2',5,'1',8),(16,'20220305223940355898','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','615.2',6,'1',8),(17,'20220305224042801331','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','615.2',6,'1',8),(18,'20220305224136230640','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','615.2',6,'1',8),(19,'20220305224311626361','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','615.2',6,'1',8),(20,'20220306142627248804','浅尝-白牡丹,高山流水陶瓷旅行茶具','517.2',5,'1',8),(21,'20220306143203652320','2016白毫银针巧克力茶砖,浅尝-白牡丹','111.2',3,'1',8),(22,'20220306143502664425','2016白毫银针巧克力茶砖,高山流水陶瓷旅行茶具','602',4,'1',8),(23,'20220306143539104029','2016白毫银针巧克力茶砖,浅尝-白牡丹,高山流水陶瓷旅行茶具','615.2',6,'1',8),(24,'20220306144308197912','2016白毫银针巧克力茶砖,浅尝-白牡丹','111.2',3,'2',8),(25,'20220306145323483620','黄山太平猴魁绿茶1号','99',1,'2',8),(26,'20220306155158101374','高山流水陶瓷旅行茶具','504',3,'2',8),(27,'20220306155343807058','浅尝-金牡丹（武夷岩茶）,高山流水陶瓷旅行茶具','197.2',3,'2',8),(28,'20220306205100888482','浅尝-金牡丹（武夷岩茶）,金油滴建盏','312.6',2,'2',8),(29,'20220306205235647077','高山流水陶瓷旅行茶具,黑金茶具套装','626',2,'3',8),(30,'20220307161622791206','绿茶-无瑕黄金芽礼盒,高山流水陶瓷旅行茶具,黄山太平猴魁绿茶1号,浅尝-金牡丹（武夷岩茶）','469.6',4,'1',8),(31,'20220309170635940484','绿茶-无瑕黄金芽礼盒,高山流水陶瓷旅行茶具,浅尝-金牡丹（武夷岩茶）','370.6',3,'2',8),(32,'2022030917073768901','2016白毫银针巧克力茶砖,黑金茶具套装','1014',3,'3',8),(33,'20220309171123129663','黄山太平猴魁绿茶1号','99',1,'3',8),(34,'20220309171709387094','充值￥100 赠送￥10','100',1,'1',8),(35,'20220309172135387152','充值￥100 赠送￥10','100',1,'1',8),(36,'20220309172147582511','充值￥1000 赠送￥100','1000',1,'1',8),(37,'20220309172220280154','充值￥1000 赠送￥100','1000',1,'1',8),(38,'20220309172711849793','充值￥100 赠送￥10','100',1,'1',8),(39,'20220309173014393257','充值￥100 赠送￥10','100',1,'1',8),(40,'20220309173233200402','充值￥100 赠送￥10','100',1,'1',8),(41,'20220309173355189674','充值￥1000 赠送￥100','1000',1,'1',8),(42,'2022030917365053224','充值￥100 赠送￥10','100',1,'3',8),(43,'20220309174026621359','充值￥100 赠送￥10','100',1,'2',8),(44,'20220309174041864270','充值￥100 赠送￥10','100',1,'2',8),(45,'20220309175130129647','充值￥100 赠送￥10','100',1,'2',8),(46,'20220309175140714587','充值￥100 赠送￥10','100',1,'3',8),(47,'20220309180111615252','充值￥100 赠送￥10','100',1,'3',8),(48,'20220309181918738606','充值￥100 赠送￥10','100',1,'3',8),(49,'20220309182128227033','充值￥100 赠送￥10','100',1,'3',8),(50,'2022030918225275038','充值￥100 赠送￥10','100',1,'3',8),(51,'20220309182414633695','充值￥100 赠送￥10','100',1,'3',8),(52,'20220309182546453261','充值￥1000 赠送￥100','1000',1,'3',8),(53,'20220309182710178007','充值￥100 赠送￥10','100',1,'3',8),(54,'20220309182747526679','充值￥1000 赠送￥100','1000',1,'3',8),(55,'20220309182956930494','充值￥100 赠送￥10','100',1,'3',8),(56,'20220309221220527341','充值￥100 赠送￥10','100',1,'3',8),(57,'20220309221533539130','充值￥100 赠送￥10','100',1,'3',8),(58,'20220309221626727340','充值￥1000 赠送￥100','1000',1,'3',8),(59,'20220309222224535982','充值￥100 赠送￥10','100',1,'3',8),(60,'20220313170748423414','高山流水陶瓷旅行茶具','168',1,'2',8),(61,'20220314213501922563','林沧淇白水兰香铁观音,黄山太平猴魁绿茶1号','415',4,'1',8);

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`tel`,`pwd`,`imgUrl`,`nickName`,`token`) values (2,'12345678901','888888','/images/headerImg/header.jpeg','张三','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODkwMSIsImlhdCI6MTY0NzYxNjMyMiwiZXhwIjoxNjQ3NjE2MzgyfQ.WWTP4yHnhR3-TcG0O7YafmOCemTX7-WufzN--ppLrlg'),(3,'13166981478','666666','/images/headerImg/header.jpeg','李四',NULL),(4,'13144112259','999999','/images/headerImg/header.jpeg','王五',NULL),(5,'17345698789','666666','/images/headerImg/header.jpeg','赵六',''),(6,'13144274877','666666','/images/headerImg/header.jpeg','孙七','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMzE0NDI3NDg3NyIsImlhdCI6MTY0NjAzNTUzMn0.SBcn8kcsSfJQIZD7aDNnpgCsaN29ht6AcEJHTsdcCrI'),(7,'12345678999','666666','/images/headerImg/header.jpeg','12345678999','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3ODk5OSIsImlhdCI6MTY0NzY3NzMwNSwiZXhwIjoxNjQ3Njc3MzY1fQ.wdiWP4bUVpx63Gqtt5fhS1p4y9ElL8e25Ux2XgpCCiU'),(8,'13144274876','123456','/images/headerImg/九狐子-1647697732783.jpg','九狐','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMzE0NDI3NDg3NiIsImlhdCI6MTY0NzY4OTg1OSwiZXhwIjoxNjQ3Njg5OTE5fQ.yVPxocHPhDlRIfQXK-m2EUR_RZsTEWWqsRNBfUsJuCc'),(9,'17166589988','666666','/images/headerImg/header.jpeg','17166589988','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxNzE2NjU4OTk4OCIsImlhdCI6MTY0NjYzOTQxNCwiZXhwIjoxNjQ2NjM5NDc0fQ.4vSxaNjHTkXDi1m_iMGp6Mt2PHtWzeYY7oPKN6BHJm8');

/*Table structure for table `wallet` */

DROP TABLE IF EXISTS `wallet`;

CREATE TABLE `wallet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `total_money` varchar(200) NOT NULL COMMENT '总资产',
  `Total_top_up` varchar(200) NOT NULL COMMENT '总充值金额',
  `total_consumption` varchar(200) NOT NULL COMMENT '总消费金额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `wallet` */

insert  into `wallet`(`id`,`uid`,`total_money`,`Total_top_up`,`total_consumption`) values (1,8,'2420','2420','0');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
