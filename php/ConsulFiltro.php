<?php

include('conexion.php');

function act($connect,$q){
  echo"dentro del act||||||";
    $result = mysqli_query($connect, $q);
    echo"hecha la consulta|||||||";
    if (!$result) {
      echo "ERROR EN LA CARGA";
      die('Query Error'.mysqli_error($connect));
    }
    echo "Task Added Successfully";   
};
function rec($connect,$q)
{
  $result = mysqli_query($connect, $q);
 
    if (!$result) {
      echo "ERROR EN LA CARGA";
      die('Query Error'.mysqli_error($connect));
    }
    $dato=mysqli_fetch_array($result);
    //echo "Info Obtenida $dato[0]";
    return $dato[0];  
}


$Cuenca = $_POST['OBCuenca'];
$Complejo = $_POST['OBComplejo'];
$Fuente = $_POST['OBFuente'];
$CalidadAgua = $_POST['OBCalidadAgua'];
$DivVegetal = $_POST['OBDivVegetal'];
$RegiHidro = $_POST['OBRegiHidro'];
$TiempoPerma = $_POST['OBTiempoPerma'];
$Presiones = $_POST['OBPresiones'];
$Faunas = $_POST['OBFaunas'];
$Floras = $_POST['OBFloras'];


//========================================================================
//========================================================================
//========================================================================

//Consultas relacionadas a accidentes geográficos


//____________________________________________
//Para seleccionar cuenca
if ($Cuenca){
  //echo "cuenca con algo";
  $IDCuenca = rec($connect,"SELECT Id_cuenca FROM cuenca WHERE Nombre_cuenca='$Cuenca'");
  //echo "Cuenca: ", $IDCuenca, " ||| ";
  $ConsultB = " and Id_cuenca=$IDCuenca";
  //echo $ConsultB;
}

//____________________________________________
// Para seleccionar complejo
if ($Complejo){
  /*if ($Cuenca)
  { $ConsultB= $ConsultB." and"; }*/
  //echo"complejo con algo";
  $IDComplejo = rec($connect,"SELECT Id_complejo FROM complejo WHERE Nombre_complejo='$Complejo'");
  //echo "Complejo: ", $IDComplejo, " ||| ";
  $ConsultB = $ConsultB." and Id_complejo=$IDComplejo";
}
/*
// Construccion de la consulta completa y Obtencion del humedal
if ($Complejo || $Cuenca){
  echo "    
  ====================================
  ";

  $ConsultB = $ConsultB.";";
  $Consult = $Consult.$ConsultB;
  echo $Consult;
  //Se realiza la consulta
  $Result= mysqli_query($connect, $Consult);
  echo "    
  ====================================
  ";

  //Se guardan las IDs de los humedales que coinciden con los datos filtrados de cuenca y complejo
  $Ix =0;
  foreach ($Result as $dat){
    foreach ($dat as $datt){
      $IDhume[$Ix] = $datt;
      $Ix = $Ix + 1;
    }
  }
  foreach ($IDhume as $datoss){
    echo $datoss;
    echo "
  ";
  }
}else{
  echo "    
====================================
  ";
  echo "no se filtró por cuenca ni complejo";
  echo "    
====================================
  ";
}
*/
//========================================================================
//========================================================================
//========================================================================

//Consultas relacionadas a relevamientos


//$ConsultA = "SELECT * FROM relevamiento inner join accidente_geografico on relevamiento.Id_acc = accidente_geografico.Id_acc  WHERE ";
$ConsultA= "SELECT R1.Id_acc, R1.Id_rel
            from relevamiento as R1 INNER join accidente_geografico on R1.Id_acc = accidente_geografico.Id_acc
            where not exists (select *
                              from relevamiento as R2
                              where R1.Id_acc = R2.Id_acc and R1.Fecha < R2.Fecha)";

if ($Fuente){
 /* if ($Cuenca || $Complejo) {$ConsultB = $ConsultB." and";}*/
  //echo"fuente con algo";
  //echo "Fuente: ", $Fuente, " ||| ";
  $ConsultB = $ConsultB." and Fuente='$Fuente'";
}

if ($CalidadAgua){
  /*if ($Cuenca || $Complejo || $Fuente) {$ConsultB = $ConsultB." and";}*/
  //echo"CalidadAgua con algo";
  //echo "Calidad de agua: ", $CalidadAgua, " ||| ";
  $ConsultB = $ConsultB. " and Calidad_de_H2O='$CalidadAgua'";
}

if ($DivVegetal){
/*  if ($Cuenca || $Complejo || $Fuente || $CalidadAgua) {$ConsultB = $ConsultB." and";}*/
  //echo"Diversidad vegetal con algo";
  //echo "Diversidad Vegetal: ", $DivVegetal, " ||| ";
  $ConsultB = $ConsultB. " and Diversidad_vegetal='$DivVegetal'";
}
if ($RegiHidro){
/*  if ($Cuenca || $Complejo || $Fuente || $CalidadAgua || $DivVegetal) {$ConsultB = $ConsultB." and";}*/
  //echo"RegiHidro con algo";
  //echo "Regimen Hidrológico: ", $RegiHidro, " ||| ";
  $ConsultB = $ConsultB. " and Regimen_hidrológico='$RegiHidro'";
}
if ($TiempoPerma){
/*  if ($Cuenca || $Complejo || $Fuente || $CalidadAgua || $DivVegetal || $RegiHidro) {$ConsultB = $ConsultB." and";}*/
  //echo"TiempoPerma con algo";
  //echo "Tiempo de permanencia: ", $TiempoPerma, " ||| ";
  $ConsultB = $ConsultB. " and Tiempo='$TiempoPerma'";
}


if ($Cuenca || $Complejo || $Fuente || $CalidadAgua || $DivVegetal || $RegiHidro || $TiempoPerma){
  /*echo "    
  ====================================
  ";*/
 
  //$ConsultB = $ConsultB.";";
  $ConsultA = $ConsultA.$ConsultB;
  //echo $ConsultA;
  //Se realiza la consulta
  $ResultB= mysqli_query($connect, $ConsultA);
  /*echo "    
  ====================================
  ";*/
  
  //Se guardan las IDs de los relevamientos que coinciden con los datos filtrados 
  /*$Iy =0;
  $IDrele_acc=array();
  foreach ($ResultB as $dat){
    foreach ($dat as $datt){
      $IDrele_acc[$Iy] = $datt;
      $Iy = $Iy + 1;
      echo $datt," ";
    }
    echo "
  ";
  }
*/
}else{/*
  echo "    
====================================
";
  echo "no se filtró por 'Fuente' ni 'Calidad de agua' ni 'DiversidadVegetal' ni 'Regimen Hidrológico' ni 'Tiempo de permanencia'";
  echo "    
====================================
  ";*/
}

//========================================================================
//========================================================================
//========================================================================

//Consultas relacionadas a presiones

$Ip = 0;
$consulP ="SELECT T0.Id_acc from ";
if ($Presiones){
  //echo"Presiones con algo";
  foreach ($Presiones as $pre)
  {
    $ID = rec($connect,"SELECT Id_presiones FROM presiones WHERE Tipo_presiones='$pre'");
    $IDPre[$Ip] = $ID; 
    $consulP = $consulP."(SELECT Id_acc FROM contiene_presiones WHERE Id_presiones=$ID) as T$Ip";
    
    if ($Ip>0){
      $consulP = $consulP." on T".($Ip-1).".Id_acc=T".($Ip).".Id_acc";
    }
    if (array_key_exists($Ip+1, $Presiones)){
      $consulP = $consulP." INNER join ";
    }
    $Ip = $Ip + 1;
  }
  /*echo "
  =================================
  ";
  echo $consulP;
  echo "
  =================================
    ";
  $ResultP=mysqli_query($connect,$consulP);
  $Ip_acc = 0;
  foreach ($ResultP as $RP){
    foreach ($RP as $rp){
      echo $rp;
      $IDpre_acc[$Ip_acc] = $rp;
      $Ip_acc++;
    }
    echo"
    ";
  }
*/


}

//===========================================================================
//===========================================================================
//===========================================================================


$Ifa = 0;
$consulFa ="SELECT Tfa0.Id_rel from ";
if ($Faunas){
  //echo"Faunas con algo";
  foreach ($Faunas as $fau)
  {
    $IDFa = rec($connect,"SELECT Id_fauna FROM fauna WHERE Nombre_coloquial='$fau'");
    $IDFau[$Ifa] = $IDFa; 
    $consulFa = $consulFa."(SELECT Id_rel FROM contiene_fauna WHERE Id_fauna=$IDFa) as Tfa$Ifa";
    
    if ($Ifa>0){
      $consulFa = $consulFa." on Tfa".($Ifa-1).".Id_rel=Tfa".($Ifa).".Id_rel";
    }
    if (array_key_exists($Ifa+1, $Faunas)){
      $consulFa = $consulFa." INNER join ";
    }
    $Ifa = $Ifa + 1;
  }
  /*echo "
  =================================
  ";
  echo $consulFa;
  echo "
  =================================
    ";
  $ResultFa=mysqli_query($connect,$consulFa);
  $Ifa_acc = 0;
  foreach ($ResultFa as $RFa){
    foreach ($RFa as $rfa){
      echo $rfa;
      $IDfau_acc[$Ifa_acc] = $rfa;
      $Ifa_acc++;
    }
    echo"
    ";
  }*/
}

//===========================================================================
//===========================================================================
//===========================================================================

$Ifl = 0;
$consulFl ="SELECT Tfl0.Id_rel from ";
if ($Floras){
  //echo"Floras con algo";
  foreach ($Floras as $flo)
  {
    $IDFl = rec($connect,"SELECT Id_flora FROM flora WHERE Nombre_coloquial='$flo'");
    $IDFlo[$Ifl] = $IDFl; 
    $consulFl = $consulFl."(SELECT Id_rel FROM contiene_flora WHERE Id_flora=$IDFl) as Tfl$Ifl";
    
    if ($Ifl>0){
      $consulFl = $consulFl." on Tfl".($Ifl-1).".Id_rel=Tfl".($Ifl).".Id_rel";
    }
    if (array_key_exists($Ifl+1, $Floras)){
      $consulFl = $consulFl." INNER join ";
    }
    $Ifl = $Ifl + 1;
  }/*
  echo "
  =================================
  ";
  echo $consulFl;
  echo "
  =================================
    ";
  $ResultFl=mysqli_query($connect,$consulFl);
  $Ifl_acc = 0;
  foreach ($ResultFl as $RFl){
    foreach ($RFl as $rfl){
      echo $rfl;
      $IDfl_acc[$Ifl_acc] = $rfl;
      $Ifl_acc++;
    }
    echo"
    ";
  }*/
}



if ($Cuenca || $Complejo || $Fuente || $CalidadAgua || $DivVegetal || $RegiHidro || $TiempoPerma){
  $Consult = "SELECT ConRel.Id_acc FROM (";
  $Consult = $Consult.$ConsultA.") as ConRel";
  if ($Presiones){
    $Consult = $Consult." INNER JOIN (";
    $Consult = $Consult.$consulP.") as ConPre on ConRel.Id_acc=ConPre.Id_acc";
  }
  if ($Faunas){
    $Consult = $Consult." INNER JOIN (";
    $Consult = $Consult.$consulFa.") as ConFau on ConRel.Id_rel=ConFau.Id_rel";
  }
  if ($Floras){
    $Consult = $Consult." INNER JOIN (";
    $Consult = $Consult.$consulFl.") as ConFlo on ConRel.Id_rel=ConFlo.Id_rel";
  }
}else{
  if ($Presiones){
    $Consult = "SELECT R1.Id_acc from relevamiento as R1 INNER join (";
            
    $Consult = $Consult.$consulP.") as ConPre on R1.Id_acc = ConPre.Id_acc";

    if ($Faunas){
      $Consult = $Consult." INNER JOIN (";
      $Consult = $Consult.$consulFa.") as ConFau on R1.Id_rel=ConFau.Id_rel";
    }
    if ($Floras){
      $Consult = $Consult." INNER JOIN (";
      $Consult = $Consult.$consulFl.") as ConFlo on R1.Id_rel=ConFlo.Id_rel";
    }
    $Consult = $Consult."where not exists (select * from relevamiento as R2 where R1.Id_acc = R2.Id_acc and R1.Fecha < R2.Fecha)";
  }else{
    if ($Faunas){
      $Consult = "SELECT R1.Id_rel from relevamiento as R1 INNER join (";

      $Consult = $Consult.$consulFa.") as ConFau on R1.Id_rel=ConFau.Id_rel";
      if ($Floras){
        $Consult = $Consult." INNER JOIN (";
        $Consult = $Consult.$consulFl.") as ConFlo on ConFau.Id_rel=ConFlo.Id_rel";
      }
      $Consult = $Consult."where not exists (select * from relevamiento as R2 where R1.Id_acc = R2.Id_acc and R1.Fecha < R2.Fecha)";
    }else{
      if ($Floras){
        $Consult = "SELECT R1.Id_rel from relevamiento as R1 INNER join (";
  
        $Consult = $Consult.$consulFl.") as ConFlo on R1.Id_rel=ConFlo.Id_rel";
      
        $Consult = $Consult."where not exists (select * from relevamiento as R2 where R1.Id_acc = R2.Id_acc and R1.Fecha < R2.Fecha)";  
      }
    }
  }
}

echo $Consult;
echo "
========================================
";
$resultadoFinal = mysqli_query($connect,$Consult);

foreach($resultadoFinal as $ResFi){
  foreach($ResFi as $RF){
    echo $RF, "
";
  }
}


/*
Obtine la fecha más alta
SELECT max(Fecha) from relevamiento group BY relevamiento.Id_acc

Obtiene todos los relevamientos que cumplen con las condiciones de where
SELECT ALL * 
FROM relevamiento inner join accidente_geografico on relevamiento.Id_acc = accidente_geografico.Id_acc  
WHERE Id_cuenca=5 and
		Id_complejo=53 




    SELECT T1.Id_acc
from (SELECT Id_acc 
      FROM contiene_presiones 
      WHERE Id_presiones=(SELECT Id_presiones 
                          FROM presiones 
                          WHERE Tipo_presiones='Civilización')) as T1 INNER join
	 (SELECT Id_acc 
      FROM contiene_presiones 
      WHERE Id_presiones=(SELECT Id_presiones 
                          FROM presiones 
                          WHERE Tipo_presiones='Actividad  agrícola')) as T2 on T1.Id_acc = T2.Id_acc INNER JOIN 
      (SELECT Id_acc 
       FROM contiene_presiones 
       WHERE Id_presiones=(SELECT Id_presiones 
                          FROM presiones 
                          WHERE Tipo_presiones='Ganadería')) as T3 on T2.Id_acc = T3.Id_acc




Select ConRel.Id_acc
from (SELECT R1.Id_acc
            from relevamiento as R1 INNER join accidente_geografico on R1.Id_acc = accidente_geografico.Id_acc
            where not exists (select *
                              from relevamiento as R2
                              where R1.Id_acc = R2.Id_acc and R1.Fecha < R2.Fecha) and Id_cuenca=4565) as ConRel INNER join
     (SELECT T0.Id_acc from (SELECT Id_acc FROM contiene_presiones WHERE Id_presiones=10) as T0 INNER join (SELECT Id_acc FROM contiene_presiones WHERE Id_presiones=11) as T1 on T0.Id_acc=T1.Id_acc INNER join (SELECT Id_acc FROM contiene_presiones WHERE Id_presiones=12) as T2 on T1.Id_acc=T2.Id_acc) as ConPre on ConRel.Id_acc = ConPre.Id_acc;




SELECT ConRel.Id_acc
from (SELECT R1.Id_acc, R1.Id_rel
      from relevamiento as R1 INNER join accidente_geografico on R1.Id_acc = accidente_geografico.Id_acc
      where not exists (select *
                        from relevamiento as R2
                         where R1.Id_acc = R2.Id_acc and R1.Fecha < R2.Fecha) and Id_cuenca=4565) as ConRel INNER JOIN
      (SELECT Tfl0.Id_rel 
       from (SELECT Id_rel 
             FROM contiene_flora 
             WHERE Id_flora=1) as Tfl0 INNER join 
       		(SELECT Id_rel 
             FROM contiene_flora 
             WHERE Id_flora=2) as Tfl1 on Tfl0.Id_rel=Tfl1.Id_rel) as ConFlo on ConRel.Id_rel=ConFlo.Id_rel INNER JOIN
        (SELECT Tfa0.Id_rel 
         from (SELECT Id_rel 
               FROM contiene_fauna
               WHERE Id_fauna=7) as Tfa0 INNER join 
             (SELECT Id_rel 
              FROM contiene_fauna 
              WHERE Id_fauna=8) as Tfa1 on Tfa0.Id_rel=Tfa1.Id_rel) as ConFau on ConRel.Id_rel=ConFau.Id_rel


     */
?>

