<?php
error_reporting(0);
require('conexion.php');

if(isset($_POST['nombre'])) {          
  //$add_id = $_POST['id'];
 // $add_nom = $_POST['nombre'];
  $add_fecha = $_POST['fecha'];
  //$add_cuenca = $_POST['cuenca'];
  //$add_complejo = $_POST['complejo'];
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
  $add_obs = $_POST['obs'];
  
 
  //---------------------
  //$cont_pre = $_POST['cont_pre'];
  $cont_fau = $_POST['cont_fau'];
  $cont_flo = $_POST['cont_flo'];
  $cont_pers = $_POST['cont_pers'];
  //---------------------
  
//$q_id_cue = mysqli_query($connect,"SELECT Id_cuenca FROM cuenca where Nombre_cuenca = '$add_cuenca'");
//$q_id_comp = mysqli_query($connect,"SELECT Id_complejo FROM complejo where  Nombre_complejo = '$add_complejo'");

$id_cuenca = array();
$id_complejo = array();

while($row = mysqli_fetch_array($q_id_cue)) {
  $id_cuenca = ($row['Id_cuenca']);
};

while($row = mysqli_fetch_array($q_id_comp)) {
  $id_complejo = ($row['Id_complejo']);
};

$query1 = "UPDATE relevamiento SET  Largo = '$add_largo', Ancho = '$add_ancho', Fuente = '$add_fuente', Tiempo ='$add_tiempo' , Diversidad_vegetal = '$add_diversidad_vegetal', Regimen_hidrológico = '$add_regimen_hidrologico', Calidad_de_H2O = '$add_calidad_agua', observaciones = '$add_obs',
fecha_rel='$add_fecha' , Conductividad=' $add_conductividad ' , O2_disuelto='$add_o2disuelto ' , Turbidez='$add_turbidez' , pH='$add_pH' ,  Color=' $add_color' , Temperatura_H2O='$add_temperatrura'  where Id_humedal = '$add_id'";
//miembro funa y flora
 

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
$del1 = mysqli_query($connect,"DELETE from contiene_presiones where Id_humedal = '$add_id'");
while ($cont_pre >= 0) {
  $presion = $_POST["presiones{$cont_pre}"];
  $q_id = mysqli_query($connect,"SELECT Id_presiones FROM presiones where Tipo_presiones = '$presion'");

  if (!$q_id) {
    die('Query Error'.mysqli_error($connect));
  }

  while($row = mysqli_fetch_array($q_id)) {
    $a = ($row['Id_presiones']);
  };

  //echo ("???".$a."???");
  $qp = mysqli_query($connect,"INSERT into contiene_presiones (Id_humedal,fecha_rel,Id_presiones) VALUES ('$add_id','$add_fecha','$a')");
  

  if (!$qp) {
    die('Query Error'.mysqli_error($connect));
  }else{
  $cont_pre = $cont_pre-1;
  }
} 


//////////////////////////////////////////////

  ///////////////////////////////////////////////
  $b = array();
  $del2 = mysqli_query($connect,"DELETE from contiene_fauna where Id_humedal = '$add_id'");
while ($cont_fau >= 0) {
  $fauna = $_POST["fauna{$cont_fau}"];
  $q_id = mysqli_query($connect,"SELECT Id_fauna FROM fauna WHERE Nombre_coloquial = '$fauna'");

  if (!$q_id) {
    die('Query Error'.mysqli_error($connect));
  }

  while($row = mysqli_fetch_array($q_id)) {
    $b = ($row['Id_fauna']);
  };

  //echo ("???".$b."???");
  $qp = mysqli_query($connect,"INSERT into contiene_fauna (Id_humedal, fecha_rel, Id_fauna) VALUES ('$add_id','$add_fecha','$b')");
  

  if (!$qp) {
    die('Query Error'.mysqli_error($connect));
  }else{
  $cont_fau = $cont_fau-1;
  }
}

//////////////////////////////////////////////

///////////////////////////////////////////////
    $c = array();
    $del3 = mysqli_query($connect,"DELETE from contiene_flora where Id_humedal = '$add_id'");
    while ($cont_flo >= 0) {
      $flora = $_POST["flora{$cont_flo}"];
      $q_id = mysqli_query($connect,"SELECT Id_flora FROM flora WHERE Nombre_coloquial = '$flora'");
  
      if (!$q_id) {
        die('Query Error'.mysqli_error($connect));
      }
  
      while($row = mysqli_fetch_array($q_id)) {
        $c = ($row['Id_flora']);
      };
  
      //echo ("???".$c."???");
      $qp = mysqli_query($connect,"INSERT into contiene_flora (Id_humedal, Id_flora) VALUES ('$add_id','$add_fecha','$c')");
      
  
      if (!$qp) {
        die('Query Error'.mysqli_error($connect));
      }else{
      $cont_flo = $cont_flo-1;
      }
    }
  
//////////////////////////////////////////////

$d = array();
$del4 = mysqli_query($connect,"DELETE from investiga where Id_humedal = '$add_id'");

while ($cont_pers >= 0) {
  $persona = $_POST["persona{$cont_pers}"];
  $q_id = mysqli_query($connect,"SELECT Id_persona FROM persona where Nombre_persona = '$persona'");
  if (!$q_id) {
    die('Query Error'.mysqli_error($connect));
  }

  while($row = mysqli_fetch_array($q_id)) {
    $d = ($row['Id_persona']);
  };
  
  $q_id_miembro = mysqli_query($connect,"SELECT Id_miembro FROM miembro where Id_persona = '$d'");
  //echo ("???".$a."???");
  $qp = mysqli_query($connect,"INSERT into investiga (Id_humedal, Id_miembro) VALUES ('$add_id','$add_fecha','$q_id_miembro')");
  

  if (!$qp) {
    die('Query Error'.mysqli_error($connect));
  }else{
  $cont_pers = $cont_pers-1;
  }
} 


}



 ?> 
