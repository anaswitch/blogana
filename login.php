<?php
include("conexao.php");

$email = $_POST['email'];
$senha = $_POST['senha'];


$sql = "SELECT count(*) as linhas FROM relicariodb WHERE emailcad='$email' AND senhacad='$senha' ";

$result = $mysqli->query($sql);


if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row["linhas"]>0) {
        echo "Acesso Concedido!";
        header('Location: index.html');
    } else {
        echo "Usuário e/ou senha inválida";
    }
} else {
    echo "Nenhum resultado encontrado";
}

mysqli_close($mysqli);
?>

