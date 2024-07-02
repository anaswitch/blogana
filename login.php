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

    if (isset($data['email']) && isset($data['senha'])) {
        $email = $mysqli->real_escape_string($data['email']);
        $senha = $mysqli->real_escape_string($data['senha']);

        // Verificando as credenciais do usuário
        $sql = "SELECT * FROM cadastro WHERE emailcad = '$email' AND senhacad = '$senha'";
        $result = $mysqli->query($sql);

        if ($result->num_rows > 0) {
            // Obtendo a primeira linha de resultado como um array associativo
            $row = $result->fetch_assoc();
            
            // Extraindo o nome completo do usuário
            $nomeCompleto = $row['nomecompletocad'];
            
            echo json_encode(["message" => "Login realizado com sucesso!", "nome" => $nomeCompleto]);

        } else {
            echo json_encode(["message" => "E-mail ou senha incorretos"]);
        }
    } else {
        echo json_encode(["message" => "Dados incompletos"]);
    }
} else {
    echo json_encode(["message" => "Método não suportado"]);
}
?>
