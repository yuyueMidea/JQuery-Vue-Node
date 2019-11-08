/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80011
Source Host           : localhost:3306
Source Database       : seckill

Target Server Type    : MYSQL
Target Server Version : 80011
File Encoding         : 65001

Date: 2019-11-08 16:43:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for code_dict
-- ----------------------------
DROP TABLE IF EXISTS `code_dict`;
CREATE TABLE `code_dict` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '字典编码',
  `catalog` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类别',
  `value` varchar(255) NOT NULL COMMENT '字典值',
  `name` varchar(255) NOT NULL COMMENT '字典名',
  `memo` varchar(255) NOT NULL COMMENT '备注',
  `state` tinyint(4) NOT NULL COMMENT '有效标识',
  PRIMARY KEY (`id`,`catalog`,`value`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of code_dict
-- ----------------------------
INSERT INTO `code_dict` VALUES ('1', 'STATE', '0', '失效', '状态', '1');
INSERT INTO `code_dict` VALUES ('2', 'STATE', '1', '生效', '状态', '1');
INSERT INTO `code_dict` VALUES ('3', 'GENDER', '1', '男', '性别', '1');
INSERT INTO `code_dict` VALUES ('4', 'GENDER', '2', '女', '性别', '1');

-- ----------------------------
-- Table structure for item
-- ----------------------------
DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT '商品标题',
  `price` double(11,2) NOT NULL DEFAULT '0.00' COMMENT '商品价格',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '商品描述',
  `sales` int(11) NOT NULL DEFAULT '0' COMMENT '商品销量',
  `imgUrl` varchar(255) NOT NULL DEFAULT '' COMMENT '图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of item
-- ----------------------------
INSERT INTO `item` VALUES ('1', 'MateBook D', '4988.00', '华为(HUAWEI) MateBook D15.6英寸轻薄金属窄边框笔记本电脑(i5-8250U 8G 512G MX150 2G独显 IPS office)银', '0', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=565312626,1182757974&fm=15&gp=0.jpg');
INSERT INTO `item` VALUES ('2', 'MateBook 14', '6699.00', '华为(HUAWEI)MateBook14 第三方Linux版 全面屏轻薄性能笔记本电脑 英特尔酷睿(i7 8+512GB 2k 独显)银', '0', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1903105067,3856303727&fm=11&gp=0.jpg');
INSERT INTO `item` VALUES ('3', 'MateBook 13', '5399.00', '华为(HUAWEI)MateBook 13 第三方Linux版 全面屏轻薄性能笔记本电脑 (i5-8265U 8G 512G 2K 独显)银', '0', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1109342238,759360145&fm=26&gp=0.jpg');
INSERT INTO `item` VALUES ('4', 'HUAWEI Mate 30 Pro 5G', '6899.00', '华为 HUAWEI Mate 30 Pro 5G 麒麟990 OLED环幕屏双4000万徕卡电影四摄8GB+256GB亮黑色5G全网通版', '0', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2984155721,2384899536&fm=11&gp=0.jpg');
INSERT INTO `item` VALUES ('5', 'HUAWEI WATCH/GT2', '1388.00', '华为WATCH/GT2手表多功能支付蓝牙通话多媒体音乐播放血氧心率检测运动防水时尚款商务男女智能手环 GT2 运动款幻夜黑 (42mm)', '0', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1611999209,2653486175&fm=11&gp=0.jpg');

-- ----------------------------
-- Table structure for item_stock
-- ----------------------------
DROP TABLE IF EXISTS `item_stock`;
CREATE TABLE `item_stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品库存编码',
  `stock` int(11) NOT NULL DEFAULT '0' COMMENT '商品库存',
  `item_id` int(11) NOT NULL COMMENT '商品编码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of item_stock
-- ----------------------------
INSERT INTO `item_stock` VALUES ('1', '100', '1');
INSERT INTO `item_stock` VALUES ('2', '800', '2');
INSERT INTO `item_stock` VALUES ('3', '600', '3');
INSERT INTO `item_stock` VALUES ('4', '500', '4');
INSERT INTO `item_stock` VALUES ('5', '200', '5');

-- ----------------------------
-- Table structure for order_info
-- ----------------------------
DROP TABLE IF EXISTS `order_info`;
CREATE TABLE `order_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单编号',
  `user_id` int(11) NOT NULL COMMENT '用户编号',
  `item_id` int(11) NOT NULL COMMENT '商品编号',
  `item_price` double(11,2) NOT NULL COMMENT '商品价格',
  `amount` int(11) NOT NULL COMMENT '购买数量',
  `order_price` double(11,2) NOT NULL COMMENT '活动价格',
  `promo_id` int(11) NOT NULL COMMENT '活动编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_info
-- ----------------------------

-- ----------------------------
-- Table structure for promo
-- ----------------------------
DROP TABLE IF EXISTS `promo`;
CREATE TABLE `promo` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '活动编号',
  `promo_name` varchar(255) NOT NULL COMMENT '活动名称',
  `start_date` datetime NOT NULL COMMENT '开始时间',
  `end_date` datetime NOT NULL COMMENT '结束时间',
  `item_id` int(11) NOT NULL COMMENT '商品编号',
  `promo_item_price` double(11,2) NOT NULL COMMENT '商品活动价格',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of promo
-- ----------------------------
INSERT INTO `promo` VALUES ('1', '双十一秒杀', '2019-11-01 00:00:00', '2019-11-12 00:00:00', '1', '4699.00');
INSERT INTO `promo` VALUES ('2', '双十一秒杀', '2019-11-01 00:00:00', '2019-11-12 00:00:00', '2', '6599.00');
INSERT INTO `promo` VALUES ('3', '双十一秒杀', '2019-11-07 00:00:00', '2019-11-12 00:00:00', '5', '1288.00');

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(32) NOT NULL AUTO_INCREMENT COMMENT '用户编码',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名',
  `gender` tinyint(4) NOT NULL DEFAULT '1' COMMENT '性别 1：男 2：女',
  `age` int(3) NOT NULL COMMENT '年龄',
  `telphone` varchar(32) NOT NULL COMMENT '电话号码',
  `register_mode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '注册方式 byphone、bywechat',
  `third_party_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '第三方编码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', '余', '1', '25', '18216182304', 'byphone', '');

-- ----------------------------
-- Table structure for user_password
-- ----------------------------
DROP TABLE IF EXISTS `user_password`;
CREATE TABLE `user_password` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '密码编码',
  `encrpt_password` varchar(255) NOT NULL DEFAULT '' COMMENT '加密密码',
  `user_id` int(11) NOT NULL COMMENT '用户编码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_password
-- ----------------------------
INSERT INTO `user_password` VALUES ('1', 'ICy5YqxZB1uWSwcVLSNLcA==', '1');
