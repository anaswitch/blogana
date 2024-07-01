<?php
include("conexao.php");

$nome = $_POST['nome-completocad'];
$email = $_POST['emailcad'];
$nascimentocad = $_POST['nascimentocad'];
$senha = $_POST['senhacad'];


$sql = "INSERT INTO relicariodb (nome, emailcad, nascimentocad, senhacad) VALUES ('$nome', '$email', '$nascimentocad' ,'$senha')";

if (mysqli_query($mysqli, $sql)) {
    echo "Usuário cadastrado com sucesso";
} else {
    echo "Erro: " . mysqli_error($conexao);
}

mysqli_close($mysqli);
?>


<meta http-equiv="refresh" content="1; URL='index.html'"/> <!-Define o redirecionamento, tempo e URL->
