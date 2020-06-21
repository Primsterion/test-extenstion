<?php 
header('Content-Type: application/json');
$mysql = new mysqli("localhost", "root", "", "crm_sto");
$response = array();
if($mysql->connection_errno){
    $response['error'] = "Ошибка соединения с БД";
}

if(isset($_POST) && !empty($_POST['name'])){
    $result = $mysql->query("SELECT * FROM clients WHERE fio LIKE '%" . $_POST["name"] . "%'");
    while($row = $result->fetch_assoc()){
        $response['clients'][] = $row;
    }
}

echo json_encode( $response );