<?php

  include('conexion.php');

  $add_coors = $_POST['coors'];
  $add_type = $_POST['type'];



  //==================== LINEAS ========================

 if($add_type == 'LineString'){
  foreach($add_coors as $key){
    //$ult = $key[0];
    foreach($key as $k){
    $add = $add."".$k.",";//" ".$k[1].","; 
    }
    $add = substr($add, 0, -1);
  }
  echo $add;
  $query1 = "INSERT into objeto_geometry (Tipo) VALUES (ST_GeomFromText('LINESTRING(({$add}))', 4326))";
  echo($query1);

  $result = mysqli_query($connect, $query1);
    if (!$result) {
      echo "Task NO Added Successfully"; 
        die('Query Error'.mysqli_error($connect));
      }
       
      echo "Task Added Successfully";  
 }
 //==================== POLIGONOS ========================
if($add_type =='Polygon'){
  foreach($add_coors as $key){
    //$ult = $key[0];
    foreach($key as $k){
    $add = $add."".$k[0]." ".$k[1].","; 
    }
    $add = substr($add, 0, -1);
  }
  echo $add;
  $query1 = "INSERT into objeto_geometry (Tipo) VALUES (ST_GeomFromText('POLYGON(({$add}))', 4326))";
  echo($query1);

  $result = mysqli_query($connect, $query1);
 //echo"Hecho la consulta de agregacion";
    if (!$result) {
      echo "Task NO Added Successfully"; 
        die('Query Error'.mysqli_error($connect));
      }
       
      echo "Task Added Successfully";  
}
//==================== PUNTOS (Y CIRCULOS) ========================
if($add_type == 'Point'){
  foreach($add_coors as $key){
    $add = $add." ".$key." "; 
  }
  $query1 = "INSERT into objeto_geometry (Tipo) VALUES (ST_GeomFromText('POINT({$add})', 4326))";
  $result = mysqli_query($connect, $query1);
  //echo"Hecho la consulta de agregacion";
     if (!$result) {
       echo "Task NO Added Successfully"; 
         die('Query Error'.mysqli_error($connect));
       }
        
       echo "Task Added Successfully";  
 }


?>