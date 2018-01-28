DROP DATABASE IF EXISTS fauxmazonDB;
CREATE DATABASE fauxmazonDB;

USE fauxmazonDB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2),
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);