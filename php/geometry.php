<?php

  include('conexion.php');

  $add_coors = $_POST['coors'];
  $add_type = $_POST['type'];

  /*foreach($add_coors as $key){
    $add = $add." ".$key." "; 
  }*/
  foreach($add_coors as $key){
    //$ult = $key[0];
    foreach($key as $k){
    $add = $add."".$k[0]." ".$k[1].","; 
    }
    $add = substr($add, 0, -1);
  }
  echo $add;
 // $objeto = 
if($add_type =='Polygon'){

  //$query1 = "INSERT into objeto_geometry (SRID, Etiquetas, Tipo) VALUES (22, 'Objeto', ST_GeomFromText('POINT({$add_coors[0]} {$add_coors[1]})', 4326))";
  $query1 = "INSERT into objeto_geometry (SRID, Etiquetas, Tipo) VALUES (24, 'Objeto', ST_GeomFromText('POLYGON(({$add}))', 4326))";
  echo($query1);

  $result = mysqli_query($connect, $query1);
    if (!$result) {
      echo "Task NO Added Successfully"; 
        die('Query Error'.mysqli_error($connect));
      }
       
      echo "Task Added Successfully";  


}

?>