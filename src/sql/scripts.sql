CREATE DATABASE electrondb;

USE electrondb;

CREATE TABLE producto (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(7,3) NOT NULL
);

DESCRIBE product;