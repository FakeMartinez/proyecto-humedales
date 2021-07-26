<?php

error_reporting(0);
require('conexion.php');
$id = $_GET["id"];
$q = mysqli_query($connect,"SELECT humedal.id_humedal,humedal.nombre,humedal.largo,humedal.ancho,humedal.coorx,humedal.coory,cuenca.nombre_cuenca,complejo.nombre_complejo,carac_humedal.* FROM humedal JOIN cuenca ON humedal.id_cuenca=cuenca.id_cuenca JOIN complejo ON humedal.id_complejo=complejo.id_complejo JOIN carac_humedal ON humedal.id_humedal=carac_humedal.id_humedal where carac_humedal.fuente = "."'".$id."'"."");
  mostrar_tabla_auto($q);
function mostrar_tabla_auto($query){
$reg=mysqli_fetch_all($query,MYSQLI_ASSOC);
 echo json_encode($reg);		
}
?>