<?php

  include('conexion.php');

  $add_coors = $_POST['coors'];
  $add_type = $_POST['type'];
  $add_nom = $_POST['nom'];

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
  //echo $add;

  foreach($add_coors as $key){
    //$ult = $key[0];
    $add2 = $add2."".$key[0]." ".$key[1].",";
  }
  $add2 = substr($add2, 0, -1);
  echo $add2;



 // $objeto = 
if($add_type =='Polygon'){

  $query2 = "UPDATE accidente_geografico SET objeto_geo = ST_GeomFromText('POLYGON(({$add}))', 4326) WHERE accidente_geografico.Nombre='$add_nom'";
 
  echo($query2);

  $result = mysqli_query($connect, $query2);
    if (!$result) {
      echo "TaskNO Added Successfully"; 
        die('Query Error'.mysqli_error($connect));
      }
       
      echo "Task Added Successfully";  


}

if($add_type =='LineString'){

  $query2 = "UPDATE accidente_geografico SET objeto_geo = ST_GeomFromText('LINESTRING({$add2})', 4326) WHERE accidente_geografico.Nombre='$add_nom'";
 
  echo($query2);

  $result = mysqli_query($connect, $query2);
    if (!$result) {
      echo "TaskNO Added Successfully"; 
        die('Query Error'.mysqli_error($connect));
      }
       
      echo "Task Added Successfully";  


}

if($add_type =='Point'){

  $query1 = "SELECT Id_acc FROM accidente_geografico WHERE Nombre ='$add_nom'";
  $res = mysqli_query($connect, $query1);
  $id_acc = array();

  while($row = mysqli_fetch_array($res)) {
    $id_acc = ($row['Id_acc']);
  };

  echo($id_acc);

  $query2 = "UPDATE accidente_geografico SET objeto_geo = ST_GeomFromText('POINT({$add_coors[0]}' '{$add_coors[1]})', 4326) WHERE accidente_geografico.Id_acc=$id_acc";
 
  echo($query2);

  $result = mysqli_query($connect, $query2);
    if (!$result) {
      echo "TaskNO Added Successfully"; 
        die('Query Error'.mysqli_error($connect));
      }
       
      echo "Task Added Successfully";  


}

?>