<?php

  require('conexion.php');

  $q_cuenca = mysqli_query($connect,"SELECT nombre_cuenca FROM cuenca");
  $q_comp = mysqli_query($connect,"SELECT nombre_complejo FROM complejo");
  $q_presion = mysqli_query($connect,"SELECT tipo_presion FROM presion");
  $q_fauna = mysqli_query($connect,"SELECT nom_coloquial_fauna FROM fauna");
  $q_flora =  mysqli_query($connect,"SELECT nom_coloquial_flora FROM flora");

  $json1 = array();
  $json2 = array();
  $json3 = array();
  $json4 = array();
  $json5 = array();

  while($row = mysqli_fetch_array($q_cuenca)) {
    array_push($json1, [
      'nombre_cuenca' => $row['nombre_cuenca']
    ]);
  };

    while($row = mysqli_fetch_array($q_comp)) {
      array_push($json2, [
        'nombre_complejo' => $row['nombre_complejo']
      ]);
    };

    while($row = mysqli_fetch_array($q_presion)) {
      array_push($json3, [
        'tipo_presion' => $row['tipo_presion']
      ]);
    };

    while($row = mysqli_fetch_array($q_fauna)) {
      array_push($json4, [
        'nom_fauna' => $row['nom_coloquial_fauna']
      ]);
    };

    while($row = mysqli_fetch_array($q_flora)) {
      array_push($json5, [
        'nom_flora' => $row['nom_coloquial_flora']
      ]);
    };

    //echo($json);
  

    $jsons = [
      "cuencas"=> $json1,
      "complejos"=> $json2,
      "presiones"=> $json3,
      "faunas"=>$json4,
      "floras"=>$json5
    ];

    //array_push($jsons, $json1, $json2);

    $jsonstring = json_encode($jsons);

    echo $jsonstring;




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

///////////////////////////////

  $query1 = "INSERT into humedal (id_humedal, id_cuenca, id_complejo, nombre, largo, ancho, coorx, coory) VALUES 
  ('$add_id', '$id_cuenca', '$id_complejo', '$add_nom', '$add_largo', '$add_ancho', '$add_latitud','$add_longitud')";

  $query2 = "INSERT into carac_humedal (id_humedal, fuente, tiempo, diversidad_vegetal, regimen_hidrologico, calidad_agua, carac_inclusion, observaciones) VALUES 
  ('$add_id', '$add_fuente', '$add_tiempo', '$add_diversidad_vegetal', '$add_regimen_hidrologico', '$add_calidad_agua', '$add_carac', '$add_obs')";

  $result = mysqli_query($connect, $query1);

  if (!$result) {
    die('Query Error'.mysqli_error($connect));
  }
  
  $result2 = mysqli_query($connect, $query2);

  if (!$result2) {
    die('Query Error'.mysqli_error($connect));
  }

  ///////////////////////////////////////////////
    $a = array();
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

}



?>
