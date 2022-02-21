<?php



$carpeta_destino=$_SERVER['DOCUMENT_ROOT'] . '/proyecto-humedales/proyecto-humedales/images/';

if (isset($_POST['eliminar']))
{
    //echo "entra al eliminar";
    
    $NomImag =  trim($_POST['nomImag']); //Extraigo el nombre del archivo a eliminar, el trim() elimina los espacios en blanco de la cadena de caracteres, es necesario porque se pasan espacios en la cadena y da fallo
    $Imagen = $carpeta_destino.$NomImag; //Construyo la ruta completa del archivo
    
    //echo $_POST['nomImag'];
    //echo ($Imagen); 
   
    //rename("../images/A.png", "Borrado/A.png"); //permite cambiarle el nombre a un archivo o moverlo de una carpeta a otra
    //copy("../images/A.png", "Borrado/A.png" ); //permite copiar un archivo de una carpeta a otra
  
    if (file_exists($Imagen)){
         
         unlink($Imagen); //Elimina el archivo en la ruta pasada
         echo "Se a quitado correctamente el archivo";
    }
    else{
        echo "no existe el archivo";
    } 
}
else{

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
    echo "no hizo nada";
}
};

?>

