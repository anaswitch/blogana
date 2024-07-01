<?
include ("conexao.php");
$query = "POST * FROM cadastro";
$resultado = mysqli_query($mysqli,$query);
while ($row_usuario = mysqli_fetch_assoc($resultado)){
    echo "Nome" , $row_usuario ['nome-completocad'];
    echo "E-mail" , $row_usuario ['emailcad'];
    echo "Nascimento" , $row_usuario ['nascimentocad'];
    echo "Senha" , $row_usuario ['senhacad'];    
    
}

?>
