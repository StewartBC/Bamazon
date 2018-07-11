DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Shampoo", "Home", 35, 4.50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Laptop", "Electronics", 6, 750.99);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Keyboard", "Electronics", 13, 32.50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Rug", "Home", 19, 25.00);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Shovel", "Outdoors", 9, 17.50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Basketball", "Outdoors", 29, 19.99);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Dish Soap", "Home", 40, 6.75);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Hat", "Clothing", 21, 15.99);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Sneakers", "Clothing", 13, 39.99);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Phone Charger", "Electronics", 25, 9.99);