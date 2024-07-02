<?php
include("conexao.php");
// Habilitando exibição de erros para fins de depuração (não recomendado para produção)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Função para validar usuário e senha e retornar o ID do usuário se válidos

// Adicionar novo tópico e mensagem
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validar e escapar os dados recebidos
    $topico = $mysqli->real_escape_string($data['topico']);
    $usuario = $mysqli->real_escape_string($data['email']);
    $senha = $mysqli->real_escape_string($data['senha']);
    $mensagem = $mysqli->real_escape_string($data['mensagem']);

    // Validar usuário e senha e obter o ID do OP
    $op_id = validarUsuario($mysqli, $usuario, $senha);

    if ($op_id !== null) {
        // Inserir o novo tópico na tabela de tópicos
        $sql_topico = "INSERT INTO topicos (topico, op) VALUES ('$topico', $op_id)";
        
        if ($mysqli->query($sql_topico) === TRUE) {
            $topico_id = $mysqli->insert_id;

            // Inserir a mensagem na tabela de mensagens com datahora automática
            $sql_mensagem = "INSERT INTO mensagens (datahora, idUser, mensagem, idTopico) VALUES (NOW(), $op_id, '$mensagem', $topico_id)";

            if ($mysqli->query($sql_mensagem) === TRUE) {
                echo json_encode(["message" => "Novo tópico e mensagem criados com sucesso"]);
            } else {
                echo json_encode(["message" => "Erro ao inserir mensagem: " . $mysqli->error]);
            }
        } else {
            echo json_encode(["message" => "Erro ao criar novo tópico: " . $mysqli->error]);
        }
    } else {
        echo json_encode(["message" => "Usuário ou senha inválidos"]);
    }
}

// Listar todos os tópicos
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $sql = "SELECT * FROM topicos";
    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) {
        $topicos = [];
        while ($row = $result->fetch_assoc()) {
            $topicos[] = $row;
        }
        echo json_encode($topicos);
    } else {
        echo json_encode(["message" => "Nenhum tópico encontrado"]);
    }
}

?>

