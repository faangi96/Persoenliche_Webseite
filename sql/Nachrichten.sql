-- Datenbank erstellen
CREATE DATABASE IF NOT EXISTS Nachrichten;

CREATE TABLE nachrichten(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(30)  NOT NULL,
    betreff VARCHAR (100) NOT NULL,
    nachricht VARCHAR(500) NOT NULL
);