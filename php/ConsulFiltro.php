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


Select *
from accidente_geografico
where 

//Para seleccionar cuenca
Select Id_cuenca
from cuenca
where Nombre_cuenca = $Cuenca;


// Para seleccionar complejo
Select Id_complejo
from complejo
where Nombre_complejo = $Complejo;






?>