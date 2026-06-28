<?php

/* Speicherung auf einer SQL-Datenbank */

/* Verbindungsaufbau zur Datenbank*/
$host= "localhost";
$user= "root";
$pass= "";
$db = "Nachrichten";

$connection_DB = new mysqli($host, $user, $pass, $db);

if ($connection_DB->connect_error) die("Verbindungsaufbau fehlgeschlagen.");

/* */

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email     = htmlspecialchars($_POST["E-Mail-Textfeld"]);
    $nachricht = htmlspecialchars($_POST["Nachricht-Textfeld"]);
    $betreff = htmlspecialchars($_POST["Betreff-Textfeld"]);

    /*Preperation_Statement*/
    $stmt = $connection_DB->prepare(
        "INSERT INTO nachrichten
        (email, betreff, nachricht)
        VALUES (?, ?, ?)"
    );

    /*Einsatz der Werte (String, String, String)*/
     $stmt->bind_param(
        "sss",
        $email,
        $betreff,
        $nachricht
     );
     /*Speicherung der Einträge*/
     if ($stmt->execute()) { 
        echo "Nachricht gespeichert!";
    } else {
        echo "Fehler beim Speichern.";}

    $stmt->close();
};

$connection_DB->close();
?>