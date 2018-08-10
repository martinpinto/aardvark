CREATE TABLE IF NOT EXISTS User (
    u_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    u_firstname VARCHAR(500) NOT NULL,
    u_lastname VARCHAR(500) NOT NULL,
    u_username VARCHAR(500) NOT NULL,
    u_password VARCHAR(500) NOT NULL,
    u_email VARCHAR(500) NOT NULL,
    u_avatar VARCHAR(500) DEFAULT NULL,
    CONSTRAINT u_c_username UNIQUE (u_username),
    PRIMARY KEY(u_id)
);
