<?php<?php
error_reporting(0);
require('conexion.php');

if(isset($_POST['nombre'])) {          
  $add_id = $_POST['id'];
  $add_nom = $_POST['nombre'];
  $add_fecha = $_POST['fecha'];
  $add_cuenca = $_POST['cuenca'];
  $add_complejo = $_POST['complejo'];
  $add_latitud = $_POST['latitud'];
  $add_longitud = $_POST['longitud'];
  $add_ancho = $_POST['ancho'];
  $add_largo = $_POST['largo'];
  $add_fuente = $_POST['fuente'];
  $add_tiempo =  $_POST['tiempo'];
  $add_calidad_agua = $_POST['calidad_agua'];  
  $add_conductividad =  $_POST['conductividad'];
  $add_pH =  $_POST['pH'];
  $add_o2disuelto =  $_POST['o2disuelto'];
  $add_turbidez=  $_POST['turbidez'];
  $add_color =  $_POST['color'];
  $add_temperatrura =  $_POST['temperatura'];
  $add_regimen_hidrologico = $_POST['regimen_hidrologico'];
  $add_diversidad_vegetal =  $_POST['diversidad_vegetal'];
  $add_observaciones = $_POST['obs'];
  
 
  //---------------------
  $cont_pre = $_POST['cont_pre'];
  $cont_fau = $_POST['cont_fau'];
  $cont_flo = $_POST['cont_flo'];
  //---------------------
  
//Falta consulta id_cuenca y id_complejo!!!! (Proximamente ID_humedal incremental)
$q_id_cue = mysqli_query($connect,"SELECT Id_cuenca FROM cuenca where Nombre = '$add_cuenca'");
$q_id_comp = mysqli_query($connect,"SELECT Id_complejo FROM complejo where  Nombre = '$add_complejo'");

$id_cuenca = array();
$id_complejo = array();

while($row = mysqli_fetch_array($q_id_cue)) {
  $id_cuenca = ($row['Id_cuenca']);
};

while($row = mysqli_fetch_array($q_id_comp)) {
  $id_complejo = ($row['Id_complejo']);
};

$query1 = "UPDATE humedal SET Id_cuenca ='$id_cuenca' , Id_complejo = '$id_complejo' , Nombre = '$add_nom', Largo = '$add_largo', Ancho = '$add_ancho', Fuente = '$add_fuente', Tiempo ='$add_tiempo' , Diversidad vegetal = '$add_diversidad_vegetal', Regimen hidrológico = '$add_regimen_hidrologico', Calidad de H2O = '$add_calidad_agua', observaciones = '$add_obs',
fecha_rel='$add_fecha' , Conductividad=' $add_conductividad ' , O2 disuelto='$add_o2disuelto ' , Turbidez='$add_turbidez' , pH='$add_pH' ,  Color=' $add_color' , Temperatura H2O='$add_temperatrura'  where id_humedal = '$add_id'";

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
/* $a = array();
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
} */

//////////////////////////////////////////////

  ///////////////////////////////////////////////
  $b = array();
  $del2 = mysqli_query($connect,"DELETE from fauna where id_humedal = '$add_id'");
while ($cont_fau >= 0) {
  $fauna = $_POST["fauna{$cont_fau}"];
  $q_id = mysqli_query($connect,"SELECT Id_fauna FROM fauna WHERE Nombre coloquial = '$fauna'");

  if (!$q_id) {
    die('Query Error'.mysqli_error($connect));
  }

  while($row = mysqli_fetch_array($q_id)) {
    $b = ($row['id_fauna']);
  };

  //echo ("???".$b."???");
  $qp = mysqli_query($connect,"INSERT into fauna (Id_humedal, Id_fauna) VALUES ('$add_id','$b')");
  

  if (!$qp) {
    die('Query Error'.mysqli_error($connect));
  }else{
  $cont_fau = $cont_fau-1;
  }
}

//////////////////////////////////////////////

///////////////////////////////////////////////
    $c = array();
    $del3 = mysqli_query($connect,"DELETE from flora where Id_humedal = '$add_id'");
    while ($cont_flo >= 0) {
      $flora = $_POST["flora{$cont_flo}"];
      $q_id = mysqli_query($connect,"SELECT Id_flora FROM flora WHERE Nombre coloquial = '$flora'");
  
      if (!$q_id) {
        die('Query Error'.mysqli_error($connect));
      }
  
      while($row = mysqli_fetch_array($q_id)) {
        $c = ($row['Id_flora']);
      };
  
      //echo ("???".$c."???");
      $qp = mysqli_query($connect,"INSERT into flora (Id_humedal, Id_flora) VALUES ('$add_id','$c')");
      
  
      if (!$qp) {
        die('Query Error'.mysqli_error($connect));
      }else{
      $cont_flo = $cont_flo-1;
      }
    }
  
//////////////////////////////////////////////

}



 ?> 
