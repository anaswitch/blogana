<?php
include("conexao.php");

// Definindo o cabeçalho para JSON
header('Content-Type: application/json');

// Habilitando exibição de erros para fins de depuração (não recomendado para produção)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recebendo os dados do formulário
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['nome']) && isset($data['email']) && isset($data['nascimento']) && isset($data['senha'])) {
        $nome = $mysqli->real_escape_string($data['nome']);
        $email = $mysqli->real_escape_string($data['email']);
        $nascimento = $mysqli->real_escape_string($data['nascimento']);
        $senha = $mysqli->real_escape_string($data['senha']);
        
        // Corrigindo a query de inserção
        $sql = "INSERT INTO cadastro (nomecompletocad, emailcad, nascimentocad, senhacad) VALUES ('$nome', '$email', '$nascimento', '$senha')";

        if ($mysqli->query($sql) === TRUE) {
            echo json_encode(["message" => "Cadastro realizado com sucesso!"]);
        } else {
            echo json_encode(["message" => "Erro ao realizar o cadastro: " . $mysqli->error]);
        }
    } else {
        echo json_encode(["message" => "Dados incompletos"]);
    }
} else {
    echo json_encode(["message" => "Método não suportado"]);
}
?>
