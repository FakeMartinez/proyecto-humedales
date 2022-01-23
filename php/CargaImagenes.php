<?php
/*
$nombre_imagen=$_FILES['img']['name'];
$tipo_imagen=$_FILES['img']['type'];
$tamaño_imagen=$_FILES['imagen']['size'];


move_uploaded_file($_FILES['imagen']["tmp_name"],"$carpeta_destino/$nombre_imagen");
*/
$carpeta_destino=$_SERVER['DOCUMENT_ROOT'] . '/proyecto-humedales/proyecto-humedales/images/';
if (($_FILES["file"]["type"] == "image/pjpeg")
    || ($_FILES["file"]["type"] == "image/jpeg")
    || ($_FILES["file"]["type"] == "image/png")
    || ($_FILES["file"]["type"] == "image/gif")) {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], "$carpeta_destino".$_FILES['file']['name'])) {
        echo ($_FILES['file']['name']);
    } else {
        //echo 0;
    }
} else {
    //echo 0;
}

?>

