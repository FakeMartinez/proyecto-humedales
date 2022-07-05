<?php

include('conexion.php');

$PuntInt = array();
$Accid = array();
$Hume = array();

function act($connect,$q){
  //echo"dentro del act||||||";
    $result = mysqli_query($connect, $q);
    //echo"hecha la consulta|||||||";
    if (!$result) {
      //echo "ERROR EN LA CARGA";
      die('Query Error'.mysqli_error($connect));
    }
    //echo "Task Added Successfully";   
};
function rec($connect,$q)
{
  $result = mysqli_query($connect, $q);
 
    if (!$result) {
      //echo "ERROR EN LA CARGA";
      die('Query Error'.mysqli_error($connect));
    }
    $dato=mysqli_fetch_array($result);
    //echo "Info Obtenida $dato[0]";
    return $dato[0];  
}


$Interes = $_POST['OBInteres'];
$Acc = $_POST['OBAccidente'];
$Humedal = $_POST['OBHumedal'];
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

$TipAcc = $_POST['OBTipAcc'];


//========================================================================
//========================================================================
//========================================================================

//Consultas relacionadas a accidentes geográficos





//____________________________________________
//Para seleccionar cuenca
if ($Acc || $Humedal){
  if ($Cuenca){
    //echo "entra 1";
    //echo "cuenca con algo";
    $IDCuenca = rec($connect,"SELECT Id_cuenca FROM cuenca WHERE Nombre_cuenca='$Cuenca'");
    //echo "Cuenca: ", $IDCuenca, " ||| ";
    $ConsultB = " and Id_cuenca=$IDCuenca";
    $ConsultAc = "SELECT * FROM accidente_geografico WHERE Id_cuenca=$IDCuenca";
    //echo $ConsultB;
    //echo "entra 2";
  }
  
  //____________________________________________
  // Para seleccionar complejo
  if (!$Complejo){
//echo "no hay complejo";
  }else{
    if ($Complejo && !$Cuenca){
    
      /*if ($Cuenca)
      { $ConsultB= $ConsultB." and"; }*/
      //echo"complejo con algo";
      $IDComplejo = rec($connect,"SELECT Id_complejo FROM complejo WHERE Nombre_complejo='$Complejo'");
      //echo "Complejo: ", $IDComplejo, " ||| ";
      $ConsultB = $ConsultB." and Id_complejo=$IDComplejo";
      $ConsultAc = "SELECT * FROM accidente_geografico WHERE Id_complejo=$IDComplejo";
    }else{
      $IDComplejo = rec($connect,"SELECT Id_complejo FROM complejo WHERE Nombre_complejo='$Complejo'");
      //echo "Complejo: ", $IDComplejo, " ||| ";
      $ConsultB = $ConsultB." and Id_complejo=$IDComplejo";
      $ConsultAc = $ConsultAc." and Id_complejo=$IDComplejo";
    }
  }
  

  
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
  }
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
  //echo "entra 1";
  //echo $ConsultA;
  $ResultB= mysqli_query($connect, $ConsultA);
  //echo "entra 2";
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

if ($Interes){
  $ConsultInte = "SELECT Id_acc FROM accidente_geografico WHERE tipo='Punto de Interés'";
  /*echo "
  ========================================
  ";
  echo "Puntos de Interes";
  echo "
  ========================================
  ";
  echo $ConsultInte;
  echo "
  ========================================
  ";
  echo "Resultados:
  ";*/
    // PONE EN UN ARRAY TODOS LOS RESULTADOS DE PUNTOS DE INTERES COINCIDENTES
  $resultadoFinal = mysqli_query($connect,$ConsultInte);
  $i=0;
  foreach($resultadoFinal as $ResFi){
    foreach($ResFi as $RF){
      //$PuntInt[$i] = $RF;
      //echo "Id_acc:", $RF, "
  //";
      $ConsGeo=mysqli_query($connect,"SELECT Id_acc, Nombre, Tipo, ST_AsGeoJSON(objeto_geo) as objeto FROM accidente_geografico WHERE Id_acc = $RF");
      foreach($ConsGeo as $CG){
        $PuntInt[$i]=[
          'id' =>$CG['Id_acc'],
          'objeto'=>$CG['objeto'],
          'tipo'=>$CG['Tipo'],
          'nombre'=>$CG['Nombre'],
        ];        
      }
    }
    $i++;
  }
}


if ($Acc){

  if ($Cuenca || $Complejo){
    $ConsultAcc = "SELECT ConRel.Id_acc FROM (";
    $ConsultAcc = $ConsultAcc.$ConsultAc.") as ConRel";
    if ($Presiones){
      $ConsultAcc = $ConsultAcc." INNER JOIN (";
      $ConsultAcc = $ConsultAcc.$consulP.") as ConPre on ConRel.Id_acc=ConPre.Id_acc";
    }
    /*
SELECT ConRel.Id_acc 
FROM (SELECT * 
      FROM accidente_geografico 
      WHERE Id_cuenca=4565 and Id_complejo=53
     ) as ConRel INNER JOIN 
     (SELECT T0.Id_acc 
      from (SELECT Id_acc 
            FROM contiene_presiones 
            WHERE Id_presiones=10
           ) as T0 INNER join 
      		(SELECT Id_acc 
             FROM contiene_presiones
             WHERE Id_presiones=11
            ) as T1 on T0.Id_acc=T1.Id_acc INNER join 
      (SELECT Id_acc 
       FROM contiene_presiones 
       WHERE Id_presiones=12
      ) as T2 on T1.Id_acc=T2.Id_acc
     ) as ConPre on ConRel.Id_acc=ConPre.Id_acc
WHERE Tipo <> 'Punto de Interés'
*/
  }else{
    if ($Presiones){
      
      $ConsultAcc = "SELECT AC.Id_acc FROM accidente_geografico as AC INNER JOIN (";
 
      $ConsultAcc = $ConsultAcc.$consulP.") as R1 on AC.Id_acc=R1.Id_acc";   
    }else{
      $ConsultAcc = "SELECT Id_acc FROM accidente_geografico";
    }
/*
SELECT ConRel.Id_acc 
FROM accidente_geografico as AC INNER JOIN (SELECT T0.Id_acc 
                                            from (SELECT Id_acc 
                                                  FROM contiene_presiones 
                                                  WHERE Id_presiones=10) as T0
                                           ) as R1 on AC.Id_acc=R1.Id_acc
WHERE AC.Tipo <> 'Punto de Interés'
*/
  }
  $ConsultAcc = $ConsultAcc." WHERE Tipo <> 'Punto de Interés'";
  $comp = $_POST['OBTipAccChecado'];
 // echo  $comp."
 // ";
  if($comp=='true'){
    $ExTip=0;
    if ($TipAcc){
      $ConsultAcc = $ConsultAcc." and ";
      foreach ($TipAcc as $TA){
        $ConsultAcc = $ConsultAcc."Tipo = '$TA'";
        if (array_key_exists($ExTip+1, $TipAcc)){
          $ConsultAcc = $ConsultAcc." or ";
        }
        $ExTip++;
      }
    }else{
      $ConsultAcc = $ConsultAcc." and Tipo = '' ";
    }
  }

 /* 
 echo $_POST['OBTipAccChecado']."
 ";
  echo "
  ========================================
  ";
  echo "Accidentes Geográficos";
  echo "
  ========================================
  ";
  echo $ConsultAcc;
  echo "
  ========================================
  ";
  echo "Resultados:
  ";*/
  // PONE EN UN ARRAY TODOS LOS RESULTADOS DE ACCIDENTES COINCIDENTES
  //echo "llega 2";
  $resultadoFinal = mysqli_query($connect,$ConsultAcc);
  //echo $ConsultAcc;
  $i = 0;
  /*echo "
  ========================================
  ";
  echo $ConsultAcc;
  echo "
  ========================================
  ";*/
  foreach($resultadoFinal as $ResFi){
    foreach($ResFi as $RF){
      //$Accid[$i] = $RF; 
//echo$RF;
  
      $ConsGeo=mysqli_query($connect,"SELECT Id_acc, Nombre, Tipo, ST_AsGeoJSON(objeto_geo) as objeto FROM accidente_geografico WHERE Id_acc = $RF");
      foreach($ConsGeo as $CG){
        $Accid[$i]=[
          'id' =>$CG['Id_acc'],
          'objeto'=>$CG['objeto'],
          'tipo'=>$CG['Tipo'],
          'nombre'=>$CG['Nombre'],

        ];        
      }
    }
    $i++;
  }
  
}



if ($Humedal){
  if ($Cuenca || $Complejo || $Fuente || $CalidadAgua || $DivVegetal || $RegiHidro || $TiempoPerma){
    $ConsultH = "SELECT ConRel.Id_acc FROM (";
    $ConsultH = $ConsultH.$ConsultA.") as ConRel";
    if ($Presiones){
      $ConsultH = $ConsultH." INNER JOIN (";
      $ConsultH = $ConsultH.$consulP.") as ConPre on ConRel.Id_acc=ConPre.Id_acc";
    }
    if ($Faunas){
      $ConsultH = $ConsultH." INNER JOIN (";
      $ConsultH = $ConsultH.$consulFa.") as ConFau on ConRel.Id_rel=ConFau.Id_rel";
    }
    if ($Floras){
      $ConsultH = $ConsultH." INNER JOIN (";
      $ConsultH = $ConsultH.$consulFl.") as ConFlo on ConRel.Id_rel=ConFlo.Id_rel";
    }
  }else{
    if ($Presiones){
      $ConsultH = "SELECT R1.Id_acc from relevamiento as R1 INNER join (";
              
      $ConsultH = $ConsultH.$consulP.") as ConPre on R1.Id_acc = ConPre.Id_acc";
  
      if ($Faunas){
        $ConsultH = $ConsultH." INNER JOIN (";
        $ConsultH = $ConsultH.$consulFa.") as ConFau on R1.Id_rel=ConFau.Id_rel";
      }
      if ($Floras){
        $ConsultH = $ConsultH." INNER JOIN (";
        $ConsultH = $ConsultH.$consulFl.") as ConFlo on R1.Id_rel=ConFlo.Id_rel";
      }
      $ConsultH = $ConsultH." where not exists (select * from relevamiento as R2 where R1.Id_acc = R2.Id_acc and R1.Fecha < R2.Fecha)";
    }else{
      if ($Faunas){
        $ConsultH = "SELECT R1.Id_rel from relevamiento as R1 INNER join (";
  
        $ConsultH = $ConsultH.$consulFa.") as ConFau on R1.Id_rel=ConFau.Id_rel";
        if ($Floras){
          $ConsultH = $ConsultH." INNER JOIN (";
          $ConsultH = $ConsultH.$consulFl.") as ConFlo on ConFau.Id_rel=ConFlo.Id_rel";
        }
        $ConsultH = $ConsultH."where not exists (select * from relevamiento as R2 where R1.Id_acc = R2.Id_acc and R1.Fecha < R2.Fecha)";
      }else{
        if ($Floras){
          $ConsultH = "SELECT R1.Id_rel from relevamiento as R1 INNER join (";
    
          $ConsultH = $ConsultH.$consulFl.") as ConFlo on R1.Id_rel=ConFlo.Id_rel";
        
          $ConsultH = $ConsultH."where not exists (select * from relevamiento as R2 where R1.Id_acc = R2.Id_acc and R1.Fecha < R2.Fecha)";  
        }else{
          $ConsultH = 
"SELECT R2.Id_acc 
  from relevamiento as R1 RIGHT outer join (SELECT Id_acc 
                                      from accidente_geografico 
                                      where Tipo='Humedal') as R2 on R1.Id_acc=R2.Id_acc 
  WHERE not exists (select * from relevamiento as R2 where R1.Id_acc = R2.Id_acc and R1.Fecha < R2.Fecha)";
          
        }
      }
    }
  }
  $ConsultH = "SELECT accidente_geografico.Id_acc FROM accidente_geografico inner join (". $ConsultH.") as accrel on accidente_geografico.Id_acc= accrel.Id_acc WHERE accidente_geografico.Tipo='Humedal'";
 //echo ($ConsultH);
  /* echo "
  ========================================
  ";
  echo "Humedal";
  echo "
  ========================================
  ";
  echo $ConsultH;
  echo "
  ========================================
  ";
  echo "Resultados:
  ";*/
  // PONE EN UN ARRAY TODOS LOS RESULTADOS DE HUMEDALES COINCIDENTES
  $resultadoFinal = mysqli_query($connect,$ConsultH);
  $i=0;
  foreach($resultadoFinal as $ResFi){
    foreach($ResFi as $RF){
      //$Hume[$i] = $RF;
      //echo "SELECT Id_acc, objeto_geo as objeto FROM accidente_geografico WHERE Id_acc = $RF";
      $IdObje= mysqli_query($connect,"SELECT Id_acc, Nombre, Tipo, ST_AsGeoJSON(objeto_geo) as objeto FROM accidente_geografico WHERE Id_acc = $RF");
      foreach ($IdObje as $IdOb){
        $Hume[$i] =[
          'id'=>$IdOb['Id_acc'],
          'objeto'=>$IdOb['objeto'],
          'tipo'=>$IdOb['Tipo'],
          'nombre'=>$IdOb['Nombre'],
        ];
        /*
        echo "===============";
        echo $IdOb['Id_acc'];
        echo $IdOb['objeto'];
        echo "===============";*/
      }
     
      //echo "Id_acc: ",$RF, "
//";
    }
    $i++;
  }
  //echo $Hume;
  //echo json_encode($Hume);
}
$datas =[
  'Interes'=>$PuntInt,
  'Accidente' =>$Accid,
  'Humedal'=>$Hume,
];


echo json_encode($datas);


//echo "PuntInt:". $PuntInt."
//";
//echo "Accid:". $Accid."
//";
//echo "Hume:". $Hume."
//";


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


