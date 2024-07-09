<?php
include("conexao.php");

// Listar mensagens de um tópico específico
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['idTopico'])) {
    $idTopico = $mysqli->real_escape_string($_GET['idTopico']);
    $sql = "SELECT * FROM mensagens M INNER join cadastro C on C.id=idUser  WHERE idTopico = $idTopico";
    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) {
        $mensagens = [];
        while ($row = $result->fetch_assoc()) {
            $mensagens[] = $row;
        }
        echo json_encode($mensagens);
    } else {
        echo json_encode(["message" => "Nenhuma mensagem encontrada para este tópico"]);
    }
}

// Adicionar nova mensagem a um tópico
if ($_SERVER["REQUEST_METHOD"] == "POST") {
   $data = json_decode(file_get_contents('php://input'), true);
    
    // Validar e escapar os dados recebidos
    $usuario = $mysqli->real_escape_string($data['email']);
    $senha = $mysqli->real_escape_string($data['senha']);
    $mensagem = $mysqli->real_escape_string($data['mensagem']);
    $idTopico = $mysqli->real_escape_string($data['idTopico']);

    // Validar usuário e senha e obter o ID do usuário
    $idUser = validarUsuario($mysqli, $usuario, $senha);

    if ($idUser !== null) {
        // Inserir a mensagem na tabela de mensagens com datahora automática
        $sql = "INSERT INTO mensagens (datahora, idUser, mensagem, idTopico) VALUES (NOW(), $idUser, '$mensagem', $idTopico)";

        if ($mysqli->query($sql) === TRUE) {
            echo json_encode(["message" => "Nova mensagem adicionada ao tópico"]);
        } else {
            echo json_encode(["message" => "Erro ao adicionar mensagem: " . $mysqli->error]);
        }
    } else {
        echo json_encode(["message" => "Usuário ou senha inválidos"]);
    }
}
?>
