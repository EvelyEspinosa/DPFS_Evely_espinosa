-- datos para la tabla de categorías
INSERT INTO categories (name, description) VALUES
('Camisetas', 'Prendas superiores básicas, ideales para el uso diario y casual.'),
('Pantalones', 'Prendas inferiores que incluyen estilos como jeans, chinos, y pantalones deportivos.'),
('Vestidos', 'Prendas femeninas elegantes y versátiles para diferentes ocasiones.'),
('Chaquetas', 'Prendas exteriores diseñadas para abrigar y complementar el look.');


INSERT INTO brands (name, description) VALUES
('UrbanWear', 'Moda urbana con un toque moderno y casual.'),
('FashionElite', 'Marca de lujo, enfocada en ofrecer prendas exclusivas y de alta calidad.'),
('CasualStyle', 'Moda casual y relajada para el día a día, con un enfoque en la comodidad.'),
('ElegantEra', 'Marca especializada en ropa elegante y sofisticada, ideal para ocasiones especiales.');

-- datos para la tabla de colores 
INSERT INTO colors (name) VALUES
('Rojo'),
('Azul'),
('Verde'),
('Negro'),
('Blanco');

-- datos para la tabla de usuarios
INSERT INTO users (firstName, lastName, email, password, role) VALUES
 ('Evely','Espinosa', 'evelyespinosa9914@gmail.com', '1524', 'admin');
('María', 'López', 'maria@example.com', 'hashed_password2', 'Customer'),
('Carlos', 'Martínez', 'carlos@example.com', 'hashed_password3', 'Customer'),
('Ana', 'Fernández', 'ana@example.com', 'hashed_password4', 'Customer');

-- datos para la tabla de productos
INSERT INTO product (name, description, price, stock, image_url, category_id) VALUES
('Camiseta Básica', 'Camiseta de algodón, perfecta para el día a día.', 15.99, 150, 'url_imagen_', 1),
('Pantalón Slim Fit', 'Pantalón ajustado, ideal para un look moderno.', 39.99, 80, 'url_imagen', 2),
('Vestido de Verano', 'Vestido ligero y fresco, ideal para días soleados.', 49.99, 60, 'url_imagen_', 3),
('Chaqueta de Cuero', 'Chaqueta de cuero auténtico, estilo biker.', 99.99, 40, 'url_imagen_', 4);

-- datos para tabla de carritos
INSERT INTO carts (user_id, fecha_de_creacion) VALUES
SELECT
    id,
    CURDATE() - INTERVAL FLOOR(RAND() * 30) DAY
FROM
    user
WHERE
    type = 'Registrado';

-- datos para la tabla de detalles del carrito
INSERT INTO cart_items (cart_id, product_id, quantity, unit_price) VALUES
SELECT
    c.id AS cart_id,
    p.id AS product_id,
    FLOOR(RAND() * 3) + 1 AS quantity, -- Cantidad aleatoria entre 1 y 3
    p.price AS unit_price -- Precio unitario del producto
FROM
    cart c
JOIN
    product p ON p.id IS NOT NULL
WHERE
    EXISTS (
        SELECT 1
        FROM user u
        WHERE u.id = c.user_id AND u.type = 'Registrado'
    )
    AND (SELECT COUNT(*) FROM cart_items cd WHERE cd.cart_id = c.id) < 10
ORDER BY
    RAND();
(1, 1, 1),
(1, 2, 2),
(2, 4, 1);


INSERT INTO product_variants (product_id, color_id, size, stock) VALUES
(2, 1, 'M', 80), 
(2, 2, 'L', 80),
(1, 3, NULL, 150); 