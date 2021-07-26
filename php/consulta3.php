<?php

error_reporting(0);
require('conexion.php');
$name = $_POST["search"];
if(!empty($name)) {
$query = "SELECT humedal.id_humedal,humedal.nombre,humedal.largo,humedal.ancho,humedal.coorx,humedal.coory,cuenca.nombre_cuenca,complejo.nombre_complejo,carac_humedal.* FROM humedal JOIN cuenca ON humedal.id_cuenca=cuenca.id_cuenca JOIN complejo ON humedal.id_complejo=complejo.id_complejo JOIN carac_humedal ON humedal.id_humedal=carac_humedal.id_humedal where humedal.nombre Like '$name%'";
$result = mysqli_query($connect,$query);
if(!$result) {
    die('Query Error'.mysqli_error($connection));
  }
  if(!$result) {
    die('Query Error' . mysqli_error($connection));
  }
  
  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(
      'nombre' => $row['nombre'],
      'coorx'=>$row ['coorx'], 
      'coory'=> $row['coory'], 
      'id'=>['id_humedal'],
      'largo'=>$row['largo'],
      'ancho'=>$row['ancho'],
      'nombre_cuenca'=>$row['nombre_cuenca'],
      'nombre_complejo'=>$row['nombre_complejo'],
      'fuente'=>$row['fuente'],
      'tiempo'=>$row['tiempo'],
      'diversidad_vegetal'=>$row['diversidad_vegetal'],
      'regimen_hidrologico'=>$row['regimen_hidrologico'],
      'calidad_agua'=>$row['calidad_agua'],
      'presion_humedal'=>$row['presion_humedal'],
      'carac_inclusion'=>$row['carac_inclusion'], 
      'observaciones'=>$row['observaciones'],
      'fauna'=>$row['fauna'],
      'flora'=>$row['flora']
    );
  }
  $jsonstring = json_encode($json);
  echo $jsonstring;
}


?>