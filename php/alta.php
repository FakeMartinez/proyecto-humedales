<?php

  require('conexion.php');

  $q_cuenca = mysqli_query($connect,"SELECT Nombre_cuenca FROM cuenca");
  $q_comp = mysqli_query($connect,"SELECT Nombre_complejo FROM complejo");
  $q_presion = mysqli_query($connect,"SELECT Tipo_presiones FROM presiones");
  $q_propie = mysqli_query($connect,"SELECT Nombre_persona FROM persona");
  $q_fauna = mysqli_query($connect,"SELECT Nombre_coloquial FROM fauna");
  $q_flora =  mysqli_query($connect,"SELECT Nombre_coloquial FROM flora");
  $q_pers =  mysqli_query($connect,"SELECT Nombre_persona FROM persona join miembro on persona.Id_persona = miembro.Id_persona");    // solo los miembros del proyecto de la tabla persona


  $json1 = array();
  $json2 = array();
  $json3 = array();
  $json4 = array();
  $json5 = array();
  $json6 = array();
  $json7 = array();

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

  while($row = mysqli_fetch_array($q_presion)) {
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

  while($row = mysqli_fetch_array($q_propie)) {
    array_push($json7, [
      'nom_prop' => $row['Nombre_persona']
    ]);
  };

  //echo($json);

  $jsons = [
    "cuencas"=> $json1,
    "complejos"=> $json2,
    "presiones"=> $json3,
    "faunas"=>$json4,
    "floras"=>$json5,
    "persona"=>$json6,
    "propietarios"=>$json7
  ];

  //array_push($jsons, $json1, $json2);

  $jsonstring = json_encode($jsons);

  echo $jsonstring;
//Carga de Accidente_Geografico
    if(isset($_POST['nombre'])) {  
      echo "Entra a la carga de accidente";   
      //$add_id = $_POST['id'];
      $add_nom = $_POST['nombre'];
      $add_tipo = $_POST['tipo'];
      $add_cuenca = $_POST['cuenca'];
      $add_complejo = $_POST['complejo'];
      $add_descripcion = $_POST['descripcion'];
     
      //---------------------
      $cont_pre = $_POST['cont_pre'];
      
      //---------------------
     
      $q_id_cue = mysqli_query($connect,"SELECT Id_cuenca FROM cuenca where Nombre_cuenca = '$add_cuenca'");
      
      

      $id_cuenca = array();
      

      while($row = mysqli_fetch_array($q_id_cue)) {
        $id_cuenca = ($row['Id_cuenca']);
      };

      if ($add_complejo != '... Seleccione un complejo ...'){
        $q_id_comp = mysqli_query($connect,"SELECT Id_complejo FROM complejo where  Nombre_complejo = '$add_complejo'");
        foreach ($q_id_comp as $q_idComp){
          foreach ($q_idComp as $qIdComp){
            $id_complejo = $qIdComp;
          }
        }
        $query0= "INSERT into accidente_geografico (Nombre,Tipo,Descripcion,Id_complejo,Id_cuenca) values ('$add_nom', '$add_tipo', '$add_descripcion', '$id_complejo', '$id_cuenca')";
      }else{
        $id_complejo = '';
        $query0= "INSERT into accidente_geografico (Nombre,Tipo,Descripcion,Id_cuenca) values ('$add_nom', '$add_tipo', '$add_descripcion', '$id_cuenca')";
      }
      
      echo('Carga de accidente
      ');
      
      echo($query0);
      echo "
      ";
      $c_humedal =mysqli_query($connect, $query0);
      echo('llego2
      ');
      if (!$c_humedal) {
        die('Query Error'.mysqli_error($connect));
      }
      ///////////////////////////////////////////////////////////////////   
      
      $add_id= mysqli_query($connect,"SELECT Id_acc from accidente_geografico where Nombre = '$add_nom'"); 
      foreach ($add_id as $i){
        $id = $i["Id_acc"];
      }

      $a = array();
          
      while ($cont_pre >= 0) {
        $presion = $_POST["presiones{$cont_pre}"];
        echo('Carga de Presiones-Accidente
        ');
        if ($presion != '... Seleccione una presión ...'){
          echo('Hay una presion cargada
          ');
          $q_id = mysqli_query($connect,"SELECT Id_presiones FROM presiones where Tipo_presiones = '$presion'");

          if (!$q_id) {
            die('Query Error'.mysqli_error($connect));
          }
  
          while($row = mysqli_fetch_array($q_id)) {
            $a = ($row['Id_presiones']);
          };
  
          $qp = mysqli_query($connect,"INSERT into contiene_presiones(Id_acc, Id_presiones ) VALUES ('$id','$a')");
          
          if (!$qp) {
            die('Query Error'.mysqli_error($connect));
          }else{
          $cont_pre = $cont_pre-1;
          }
        }else{
          echo('No hay una presion cargada
          ');
          $cont_pre = $cont_pre-1;
        }
      }
    }
  
  // Carga de las imagenes
/*
  foreach ($Dir_img as $valor){
    mysqli_query($connect,"INSERT into imagen (Id_humedal,PATH) VALUES ('$add_id','$valor')") //Para cargar la imagen
  }
}*/
////////////////Relevamiento///////////////


if(isset($_POST['fecha'])) 
{          
//  echo ("entra al cargar relevamiento");
  $nomb=$_POST['nom'];
//  echo "busca el nombre $nomb en la base de datos
//  ";
  $Id_acc = -10;
  $aux =  mysqli_query($connect,"SELECT Id_acc FROM accidente_geografico where accidente_geografico.Nombre=  '$nomb'");
  foreach ($aux as $au){
    foreach($au as $A){
      echo $A;
      $Id_acc = $A;
    }
  }
//  echo $Id_acc;
//  echo "Mostra la fecha obtenida ";
//  echo ($_POST['fecha']);
//  echo "
//  ";


  $add_fecha = $_POST['fecha'];
  $add_conductividad = $_POST['conductividad'];
  $add_ancho = $_POST['ancho'];
  $add_o2disuelto = $_POST['o2disuelto'];
  $add_calidad_agua = $_POST['calidad_agua'];
  $add_diversidad_vegetal = $_POST['diversidad_vegetal'];
  $add_obs = $_POST['obs'];
  $add_regimen_hidrologico = $_POST['regimen_hidrologico'];
  $add_turbidez = $_POST['turbidez'];
  $add_largo = $_POST['largo'];
  $add_pH = $_POST['pH'];
  $add_color = $_POST['color'];
  $add_fuente = $_POST['fuente'];
  $add_tiempo = $_POST['tiempo'];
  $add_temperatrura = $_POST['temperatura'];
  $cont_fau = $_POST['cont_fau'];
  $cont_flo = $_POST['cont_flo'];
  $cont_pers = $_POST['cont_pers'];

  $query1 = "INSERT into relevamiento (Id_acc, Fecha, Conductividad, Ancho, O2_disuelto, Calidad_de_H2O, Diversidad_Vegetal, Observaciones, Regimen_hidrológico, turbidez, Largo, ph, Color, Fuente, Tiempo, Temperatura_H2O) 
  VALUES 
  ('$Id_acc', '$add_fecha', '$add_conductividad', '$add_ancho', '$add_o2disuelto', '$add_calidad_agua', '$add_diversidad_vegetal', '$add_obs', '$add_regimen_hidrologico', '$add_turbidez', '$add_largo', '$add_pH', '$add_color', '$add_fuente', '$add_tiempo', '$add_temperatrura')"; 
/*  echo "
  =====CONSULTA=====
  $query1 
  ";*/

  $result = mysqli_query($connect, $query1);

  if (!$result) {
    die('Query Error'.mysqli_error($connect));
  }
  
  //////////////////////////////////////////////

  //////////////////////Relevamiento_fauna/////////////////////////

  
  // Se obtiene la consulta para obtener el Id del relevamiento
  $ConsIdRele = "SELECT Id_rel FROM relevamiento where Id_acc= '$Id_acc' and Fecha = '$add_fecha'";
/*  echo "
=====Consulta Id_Rel=====
$ConsIdRele
  ";*/

  // Se obtiene el Id del relevamiento
  $Id_Rel =  mysqli_query($connect, $ConsIdRele);

  foreach($Id_Rel as $IdRel){
    foreach($IdRel as $IDR){
/*
      echo "
====== ID_Rel =====
$IDR
      ";*/
      $IDRe =$IDR;
    }
  }
/*  echo "
====== ID_Rel =====
$IDRe
  "; 
*/  
  //Se obtienen las IDs de las faunas 
  while ($cont_fau >= 0) {
    $fauna = $_POST["fauna$cont_fau"];
/*    echo "  
      $fauna
    ";*/
    $queryFau = "SELECT Id_fauna FROM fauna WHERE Nombre_coloquial= '$fauna'";
/*    echo "
=====Consulta Id_faunas=====
$query022222
    ";*/

    $IdFau = mysqli_query($connect,$queryFau);
    /*
    foreach ($q_id as $ID){
      foreach ($ID as $I){
        echo "
        =====Id_faunas=====
        $I
        ";
      }
    }*/
      
    if (!$IdFau) {
      echo "HA SURGIDO UN ERROR EN LA CONSULTA";
      die('Query Error'.mysqli_error($connect));
    }
/*    echo "
===___===___===___===___===___===___===___===___
    ";*/
    /* Esto devuelve un array, por eso no puede realizar una consulta luego, $b contiene un array al finalizar.
    * Una consulta siempre devuelve un array que contiene otro array, por ende se necesita realizar 2 bucles para obtener el dato
    while($row = mysqli_fetch_array($q_id)) {
      echo $b;
      $b = ($row['Id_fauna']);
    };*/
    foreach ($IdFau as $ID){
      foreach ($ID as $I){
/*        echo "
=====Id_faunas=====
$I
        ";*/
        //echo ("???".$I."???");
        $ConsFaRe = "INSERT into contiene_fauna (Id_rel, Id_fauna) VALUES ('$IDRe','$I')";
/*        echo "
=====Consulta Fauna relevamiento=====
$Cons
        ";*/
        $qp = mysqli_query($connect,$ConsFaRe);

        if (!$qp) 
        {
          echo "HA SURGIDO UN ERROR EN LA CONSULTA";
          die('Query Error'.mysqli_error($connect));
        } else
        {
/*          echo "
se descuenta 1 de cont_fau| ahora cont_fau contiene: ". $cont_fau;*/
          $cont_fau = $cont_fau-1;
        }
      }
    }   
  }
 //////////////////////////////////////////////

  /////////////////////Relevamiento_flora//////////////////////////
  while ($cont_flo >= 0) {
   // echo "Entra al contiene flora";
    $flora = $_POST["flora$cont_flo"];

    // Crea consulta de id de flora
    $queryFlo = "SELECT Id_flora FROM flora WHERE Nombre_coloquial = '$flora'";
/*    echo "
==== Consulta ID_Flora
$queryFlo
";*/

    // obtiene id de flora
    $IdFlo = mysqli_query($connect,$queryFlo);
    //echo "Hace la consulta";
    foreach ($IdFlo as $ID){
      foreach ($ID as $I){
/*        echo "
=====Id_flora=====
$I
        ";*/
      }
    }


    if (!$IdFlo) {
      echo "ERROR";
      die('Query Error'.mysqli_error($connect));
    }

    foreach ($IdFlo as $ID){
      foreach ($ID as $I){
        $ConsFlRe = "INSERT into contiene_flora (Id_rel, Id_flora) VALUES ('$IDRe','$I')";
/*        echo "
==== Consulta Flora relevamiento ===
$ConsFlRe
        ";        */
        $qp = mysqli_query($connect, $ConsFlRe);
        if (!$qp) 
        {
          die('Query Error'.mysqli_error($connect));
        }else
        {
          $cont_flo = $cont_flo-1;
        }
      }
    }
  }

///////////////////////////////////////////////////////////////////
  //////////////////////Relevamiento_miembro/////////////////////////
  $d = array();
  $e = array();
  while ($cont_pers >= 0) {
    $persona = $_POST["persona$cont_pers"];
   
    $q_id = mysqli_query($connect,"SELECT Id_persona FROM persona where Nombre_persona = '$persona'");
   

    if (!$q_id) {
      die('Query Error'.mysqli_error($connect));
    }

    while($row = mysqli_fetch_array($q_id)) {
      $d = ($row['Id_persona']);
    };
 
    $q_id_miembro = mysqli_query($connect,"SELECT Id_miembro FROM miembro where Id_persona = $d");

    if (!$q_id_miembro) {
      die('Query Error'.mysqli_error($connect));
    }

    while($row = mysqli_fetch_array($q_id_miembro)) {
      $e = ($row['Id_miembro']);
    };
    $qp = mysqli_query($connect,"INSERT into investiga (Id_rel, Id_miembro) VALUES ('$IDRe','$e')");
   
    if (!$qp) {
      die('Query Error'.mysqli_error($connect));
    }else{
      $cont_pers = $cont_pers-1;
    }
  }





}

  

 
      
    
  
?>