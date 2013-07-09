
 CREATE TABLE  `demos`.`Messages` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	`content` TEXT NOT NULL ,
	`type` TINYINT NOT NULL COMMENT  'base64/text',
	`created_at` TIMESTAMP NOT NULL
	) ENGINE = MYISAM COMMENT =  'This table manages the messages module.';
