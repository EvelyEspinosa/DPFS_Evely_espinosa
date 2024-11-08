--Base de datos
CREATE DATABASE IF NOT EXISTS ely_db;
USE ely_db;

-- Tabla de usuarios
CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
firstName VARCHAR (100) NOT NULL,
lastName VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(225) NOT NULL,
role ENUM('Admin', 'Registrado') NOT NULL DEFAULT 'Registrado'
);

-- Tabla de productos
CREATE TABLE product(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(150) NOT NULL,
description TEXT,
price DECIMAL(10, 2) NOT NULL,
category_id INT,
stock INT NOT NULL DEFAULT 0,
image_url VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_category
FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tabla de categorías
CREATE TABLE categories(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL
);

-- Tabla de carrito
CREATE TABLE cart (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
fecha_de_creacion DATE NOT NULL,
CONSTRAINT fk_user
FOREIGN KEY (user_id) REFERENCES users(id)
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

-- Tabla de detalle del carrito
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_cart
      FOREIGN KEY (cart_id) REFERENCES cart(id),
    CONSTRAINT fk_product
      FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'completed', 'cancelled') DEFAULT 'pending',
    CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE colors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
    );
    
    CREATE TABLE product_variants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    color_id INT,
    size VARCHAR(10),
    stock INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_product_variant FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT fk_color FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE SET NULL
);
INSERT INTO categories (name) VALUES ('Ropa Deportiva'), ('Camisas'), ('Vestidos');

INSERT INTO product (name, description, price, category_id, stock) 
VALUES ('gabardina', 'DOUBLE BREASTED - Color: khaki', 69.99, 1, 50),
       ('Vestido Estampado Floral', 'Disponibles: Azul Royal.', 100.00, 3, 30),
       ('Camiseta estampada', 'TROPICAL TRIAN - Color: peach sky', 23.75, 2, 20);

INSERT INTO users (firstName, lastName, email, password, role) 
VALUES ('Juan', 'Pérez', 'juan@example.com', 'hashed_password_1', 'Customer'),
       ('Evely','Espinosa', 'evelyespinosa9914@gmail.com', '1524', 'admin');