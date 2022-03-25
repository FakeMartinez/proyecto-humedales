<?php
error_reporting(0);
require('conexion.php');

if(isset($_POST['nombre'])) {
  $add_id = $_POST['id'];
  $add_nom = $_POST['nombre'];
  $add_cuenca = $_POST['cuenca'];
  $add_complejo = $_POST['complejo'];
  $add_latitud = $_POST['latitud'];
  $add_longitud = $_POST['longitud'];
  $add_ancho = $_POST['ancho'];
  $add_largo = $_POST['largo'];
  $add_carac= $_POST['carac'];
  $add_obs = $_POST['obs'];
  $add_fuente = $_POST['fuente'];
  $add_tiempo =  $_POST['tiempo'];
  $add_diversidad_vegetal =  $_POST['diversidad_vegetal'];
  $add_regimen_hidrologico = $_POST['regimen_hidrologico'];
  $add_calidad_agua = $_POST['calidad_agua'];
  $Dir_img = $_POST['Dir'];

  //---------------------
  $cont_pre = $_POST['cont_pre'];
  $cont_fau = $_POST['cont_fau'];
  $cont_flo = $_POST['cont_flo'];
  //---------------------
  
//Falta consulta id_cuenca y id_complejo!!!! (Proximamente ID_humedal incremental)
$q_id_cue = mysqli_query($connect,"SELECT id_cuenca FROM cuenca where nombre_cuenca = '$add_cuenca'");
$q_id_comp = mysqli_query($connect,"SELECT id_complejo FROM complejo where nombre_complejo = '$add_complejo'");

$id_cuenca = array();
$id_complejo = array();

while($row = mysqli_fetch_array($q_id_cue)) {
  $id_cuenca = ($row['id_cuenca']);
};

while($row = mysqli_fetch_array($q_id_comp)) {
  $id_complejo = ($row['id_complejo']);
};

$query1 = "UPDATE humedal SET id_cuenca ='$id_cuenca' , id_complejo = '$id_complejo' , nombre = '$add_nom', largo = '$add_largo', ancho = '$add_ancho', coorx = '$add_latitud', coory = '$add_longitud',
 fuente = '$add_fuente', tiempo ='$add_tiempo' , diversidad_vegetal = '$add_diversidad_vegetal', regimen_hidrologico = '$add_regimen_hidrologico', calidad_agua = '$add_calidad_agua', carac_inclusion = '$add_carac', observaciones = '$add_obs' where id_humedal = '$add_id'";

  /*$query2 = "UPDATE carac_humedal SET fuente = '$add_fuente', tiempo ='$add_tiempo' , diversidad_vegetal = '$add_diversidad_vegetal', regimen_hidrologico = '$add_regimen_hidrologico', calidad_agua = '$add_calidad_agua', carac_inclusion = '$add_carac', observaciones = '$add_obs'
  where id_humedal = '$add_id'";*/

$result = mysqli_query($connect, $query1);

  if (!$result) {
    die('Query Error'.mysqli_error($connect));
  }
  
 /* $result2 = mysqli_query($connect, $query2);

  if (!$result2) {
    die('Query Error'.mysqli_error($connect));
  }*/

///////////////////////////////////////////////
$a = array();
$del1 = mysqli_query($connect,"DELETE from presion_humedal where id_humedal = '$add_id'");
while ($cont_pre >= 0) {
  $presion = $_POST["presion{$cont_pre}"];
  $q_id = mysqli_query($connect,"SELECT id_presion FROM presion where tipo_presion = '$presion'");

  if (!$q_id) {
    die('Query Error'.mysqli_error($connect));
  }

  while($row = mysqli_fetch_array($q_id)) {
    $a = ($row['id_presion']);
  };

  //echo ("???".$a."???");
  $qp = mysqli_query($connect,"INSERT into presion_humedal (id_humedal, id_presion) VALUES ('$add_id','$a')");
  

  if (!$qp) {
    die('Query Error'.mysqli_error($connect));
  }else{
  $cont_pre = $cont_pre-1;
  }
}

//////////////////////////////////////////////

  ///////////////////////////////////////////////
  $b = array();
  $del2 = mysqli_query($connect,"DELETE from fauna_humedal where id_humedal = '$add_id'");
while ($cont_fau >= 0) {
  $fauna = $_POST["fauna{$cont_fau}"];
  $q_id = mysqli_query($connect,"SELECT id_fauna FROM fauna WHERE nom_coloquial_fauna = '$fauna'");

  if (!$q_id) {
    die('Query Error'.mysqli_error($connect));
  }

  while($row = mysqli_fetch_array($q_id)) {
    $b = ($row['id_fauna']);
  };

  //echo ("???".$b."???");
  $qp = mysqli_query($connect,"INSERT into fauna_humedal (id_humedal, id_fauna) VALUES ('$add_id','$b')");
  

  if (!$qp) {
    die('Query Error'.mysqli_error($connect));
  }else{
  $cont_fau = $cont_fau-1;
  }
}

//////////////////////////////////////////////

///////////////////////////////////////////////
    $c = array();
    $del3 = mysqli_query($connect,"DELETE from flora_humedal where id_humedal = '$add_id'");
    while ($cont_flo >= 0) {
      $flora = $_POST["flora{$cont_flo}"];
      $q_id = mysqli_query($connect,"SELECT id_flora FROM flora WHERE nom_coloquial_flora = '$flora'");
  
      if (!$q_id) {
        die('Query Error'.mysqli_error($connect));
      }
  
      while($row = mysqli_fetch_array($q_id)) {
        $c = ($row['id_flora']);
      };
  
      //echo ("???".$c."???");
      $qp = mysqli_query($connect,"INSERT into flora_humedal (id_humedal, id_flora) VALUES ('$add_id','$c')");
      
  
      if (!$qp) {
        die('Query Error'.mysqli_error($connect));
      }else{
      $cont_flo = $cont_flo-1;
      }
    }
  
//////////////////////////////////////////////
// Carga de las imagenes
  foreach ($Dir_img as $valor){
    mysqli_query($connect,"INSERT into imagen (Id_humedal,PATH) VALUES ('$add_id','$valor')") //Para cargar la imagen
  }
}



 ?> 