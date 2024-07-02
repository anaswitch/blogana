<?php
$hostname = "localhost";
$database = "relicariodb";
$username = "root";
$password = "";

$mysqli = new mysqli($hostname, $username, $password, $database);

if ($mysqli->connect_error) {
    die("Erro de conexão: " . $mysqli->connect_error);
}

function validarUsuario($mysqli, $usuario, $senha) {
    $usuario = $mysqli->real_escape_string($usuario);
    $senha = $mysqli->real_escape_string($senha);

    $sql = "SELECT id FROM cadastro WHERE emailcad='$usuario' AND senhacad='$senha'";

    //echo $sql;

    $result = $mysqli->query($sql);

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        return $row['id'];
    } else {
        return null;
    }
}


?>