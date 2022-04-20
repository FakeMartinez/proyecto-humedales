<?php

  require('conexion.php');

  $q_cuenca = mysqli_query($connect,"SELECT Nombre_cuenca FROM cuenca");
  $q_comp = mysqli_query($connect,"SELECT Nombre_complejo FROM complejo");
  $q_pre = mysqli_query($connect,"SELECT Tipo_presiones FROM presiones");
  $q_fauna = mysqli_query($connect,"SELECT Nombre_coloquial FROM fauna");
  $q_flora =  mysqli_query($connect,"SELECT Nombre_coloquial FROM flora");
  $q_pers =  mysqli_query($connect,"SELECT Nombre_persona FROM persona");

  $json1 = array();
  $json2 = array();
  $json3 = array();
  $json4 = array();
  $json5 = array();
  $json6 = array();


  while($row = mysqli_fetch_array($q_cuenca)) {
    array_push($json1, [
      'nombre_cuenca' => $row['Nombre_cuenca']
    ]);
  };

    while($row = mysqli_fetch_array($q_comp)) {
      array_push($json2, [
        'nombre_complejo' => $row['Nombre_complejo']
      ]);
    };

    while($row = mysqli_fetch_array($q_pre)) {
      array_push($json3, [
        'tipo_presion' => $row['Tipo_presiones']
      ]);
    };

    while($row = mysqli_fetch_array($q_fauna)) {
      array_push($json4, [
        'nom_fauna' => $row['Nombre_coloquial']
      ]);
    };

    while($row = mysqli_fetch_array($q_flora)) {
      array_push($json5, [
        'nom_flora' => $row['Nombre_coloquial']
      ]);
    };


    while($row = mysqli_fetch_array($q_pers)) {
      array_push($json6, [
        'nom_pers' => $row['Nombre_persona']
      ]);
    };
    //echo($json);
  

    $jsons = [
      "cuencas"=> $json1,
      "complejos"=> $json2,
      "presiones"=> $json3,
      "faunas"=>$json4,
      "floras"=>$json5,
      "persona"=>$json6
    ];

    //array_push($jsons, $json1, $json2);

    $jsonstring = json_encode($jsons);

    echo $jsonstring;




    if(isset($_POST['nombre'])) {          
      $add_id = $_POST['id'];
      $add_nom = $_POST['nombre'];
      $add_fecha = $_POST['fecha'];
      $add_cuenca = $_POST['cuenca'];
      $add_complejo = $_POST['complejo'];
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
      $cont_pre = $_POST['cont_pre'];
      $cont_fau = $_POST['cont_fau'];
      $cont_flo = $_POST['cont_flo'];
      $cont_pers = $_POST['cont_pers'];
      //---------------------
  
//Falta consulta id_cuenca y id_complejo!!!! (Proximamente ID_humedal incremental)
//Falta consulta id_cuenca y id_complejo!!!! (Proximamente ID_humedal incremental)
$q_id_cue = mysqli_query($connect,"SELECT Id_cuenca FROM cuenca where Nombre_cuenca = '$add_cuenca'");
$q_id_comp = mysqli_query($connect,"SELECT Id_complejo FROM complejo where  Nombre_complejo = '$add_complejo'");

$id_cuenca = array();
$id_complejo = array();

while($row = mysqli_fetch_array($q_id_cue)) {
  $id_cuenca = ($row['Id_cuenca']);
};

while($row = mysqli_fetch_array($q_id_comp)) {
  $id_complejo = ($row['Id_complejo']);
};

///////////////////////////////

  $query1 = "INSERT into humedal (Id_humedal, fecha_rel,Id_cuenca, Id_complejo, Nombre, Conductividad , Ancho , O2_disuelto , Calidad_de_H2O , Diversidad_Vegetal , Observaciones , 
Regimen_hidrológico , turbidez , Largo , ph , Color , Fuente  , Tiempo , Temperatura_H2O) VALUES 
  ('$add_id','$add_fecha','$id_cuenca' ,'$id_complejo ' , '$add_nom',' $add_conductividad ','$add_ancho','$add_o2disuelto ','$add_calidad_agua', '$add_diversidad_vegetal', '$add_obs',
  '$add_regimen_hidrologico','$add_turbidez','$add_largo', '$add_pH' , ' $add_color' ,'$add_fuente', '$add_tiempo',  '$add_temperatrura'   )";

    


 /* $query2 = "INSERT into carac_humedal (id_humedal, fuente, tiempo, diversidad_vegetal, regimen_hidrologico, calidad_agua, carac_inclusion, observaciones) VALUES 
  ('$add_id', '$add_fuente', '$add_tiempo', '$add_diversidad_vegetal', '$add_regimen_hidrologico', '$add_calidad_agua', '$add_carac', '$add_obs')";*/

  $result = mysqli_query($connect, $query1);

  if (!$result) {
    die('Query Error'.mysqli_error($connect));
  }
  
  /*$result2 = mysqli_query($connect, $query2);

  if (!$result2) {
    die('Query Error'.mysqli_error($connect));
  }*/

  ///////////////////////////////////////////////
    $a = array();
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
    $qp = mysqli_query($connect,"INSERT into contiene_presiones(Id_humedal, Id_presiones) VALUES ('$add_id','$a')");
    

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
    $q_id = mysqli_query($connect,"SELECT Id_fauna FROM fauna WHERE Nombre_coloquial= '$fauna'");

    if (!$q_id) {
      die('Query Error'.mysqli_error($connect));
    }

    while($row = mysqli_fetch_array($q_id)) {
      $b = ($row['Id_fauna']);
    };

    //echo ("???".$b."???");
    $qp = mysqli_query($connect,"INSERT into contiene_fauna (Id_humedal, Id_fauna) VALUES ('$add_id','$b')");
    

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
        $q_id = mysqli_query($connect,"SELECT Id_flora FROM flora WHERE Nombre_coloquial = '$flora'");
    
        if (!$q_id) {
          die('Query Error'.mysqli_error($connect));
        }
    
        while($row = mysqli_fetch_array($q_id)) {
          $c = ($row['Id_flora']);
        };
    
        //echo ("???".$c."???");
        $qp = mysqli_query($connect,"INSERT into contiene_flora (Id_humedal, Id_flora) VALUES ('$add_id','$c')");
        
    
        if (!$qp) {
          die('Query Error'.mysqli_error($connect));
        }else{
        $cont_flo = $cont_flo-1;
        }
      }
    
  //////////////////////////////////////////////
  ///////////////////////////////////////////////
  $d = array();
  while ($cont_pers >= 0) {
   $persona = $_POST["persona{$cont_pers}"];
   
   $q_id = mysqli_query($connect,"SELECT Id_persona FROM persona where Nombre_persona = '$persona'");
   

   if (!$q_id) {
    die('Query Error'.mysqli_error($connect));
  }

  while($row = mysqli_fetch_array($q_id)) {
    $d = ($row['Id_persona']);
  };
 
  $q_id_miembro = mysqli_query($connect,"SELECT Id_miembro FROM miembro where Id_persona = $d");

   $qp = mysqli_query($connect,"INSERT into investiga (Id_humedal, Id_miembro) VALUES ('$add_id','$q_id_miembro')");
   

   if (!$qp) {
     die('Query Error'.mysqli_error($connect));
   }else{
   $cont_pers = $cont_pers-1;
   }
 }

}

  




?>
