<?php


/* Login-Prozess für die Admin-Oberfläche */


/* Verbindungsaufbau zur Datenbank*/
$host= "localhost";
$user= "root";
$pass= "";
$db = "admin_data";

$connection_DB = new mysqli($host, $user, $pass, $db);

/* Überprüfen der Verbindung */
if ($connection_DB->connect_error) die("Verbindungsaufbau fehlgeschlagen.");

/* Überprüfen der übermittelten Daten */

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $admin     = htmlspecialchars($_POST["Admin-Username-Textfeld"]?? '');
    $password = htmlspecialchars($_POST["Admin-Password-Textfeld"]?? '');
    $check_admin=false;
 
 
    $stmt = $connection_DB->prepare(
        "SELECT password FROM admin_users WHERE name = ?"
    );
    $stmt->bind_param("s", $admin);
    $stmt->execute();
    $stmt->bind_result($hashed_password);

    if ($stmt->fetch()) {
        if ($password === $hashed_password) {
         header("Location: ../pages/adminpage.html");
         exit();
        } else {
            echo "Login fehlgeschlagen.";
        }
    } else {
        echo "Benutzer nicht gefunden.";
    }

    $stmt->close();
}
?>


