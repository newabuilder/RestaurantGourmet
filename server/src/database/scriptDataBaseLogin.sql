-- Crear la base de datos login
CREATE DATABASE login;

-- Usar la base de datos login
USE login;

-- Crear la tabla usuarios
CREATE TABLE login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos en la tabla usuarios
INSERT INTO login (nombre, email, contraseña) 
VALUES ('Juan Perez', 'juan.perez@example.com', 'contraseñaCifrada123');

INSERT INTO usuarios (nombre, email, contraseña) 
VALUES ('Maria Garcia', 'maria.garcia@example.com', 'contraseñaCifrada456');

INSERT INTO usuarios (nombre, email, contraseña) 
VALUES ('Carlos Lopez', 'carlos.lopez@example.com', 'contraseñaCifrada789');
