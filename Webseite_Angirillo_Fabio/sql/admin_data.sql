-- Benutzer Table für Logins
CREATE TABLE admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO admin_users (name, password) VALUES
('Fabio', '123456'),
('Angirillo', 'password');