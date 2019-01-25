#设置编码
SET NAMES UTF8;

#如果存在数据库huoniu，则移除
DROP DATABASE IF EXISTS huoniu;

#创建数据库huoniu
CREATE DATABASE huoniu CHARSET=UTF8;

#使用数据库
USE huoniu;

#创建数据表-管理员hn_admin
CREATE TABLE hn_admin(
    aid INT PRIMARY KEY AUTO_INCREMENT,	        #管理员编号
    aname VARCHAR(32),			                #管理员用户名
    apwd VARCHAR(64),			                #管理员密码，加密储存
    role VARCHAR(32)			                #管理员角色
);

#插入数据
INSERT INTO hn_admin VALUES(NULL,'admin',PASSWORD('123456'),'1');
INSERT INTO hn_admin VALUES(NULL,'boss',PASSWORD('999999'),'1');

#创建数据表-项目全局设置hn_settings
CREATE TABLE hn_settings(
    sid INT PRIMARY KEY AUTO_INCREMENT,	        #编号
    appName VARCHAR(32),                        #应用/店家名称
    apiUrl VARCHAR(64),                         #数据API系统地址
    adminUrl VARCHAR(64),                       #管理后台子系统地址
    appUrl VARCHAR(64),                         #顾客App子系统地址
    icp VARCHAR(64),                            #系统备案号
    copyright VARCHAR(128)                      #系统版权声明
)