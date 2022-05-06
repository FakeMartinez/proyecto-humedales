<?php

error_reporting(0);
require('conexion.php');

$id = $_GET['Id_lugar'];

$q1 = "SELECT objeto_geometry.SRID FROM objeto_geometry JOIN lugar_de_interés ON objeto_geometry.Id_lugar = lugar_de_interés.Id_lugar WHERE lugar_de_interés.Id_lugar = $id";

$query = mysqli_query($connect, $q1);



if (!$query) {
    die('Query Error'.mysqli_error($connect));
  }else{
    $row = mysqli_fetch_array($query);
    echo ($row['SRID']);
    $SRID = $row['SRID'];
  };

$q2 = "DELETE FROM objeto_geometry WHERE SRID = $SRID";

$query = mysqli_query($connect, $q2);

if (!$query) {
    die('Query Error'.mysqli_error($connect));
  }else{
    $q3 = "DELETE FROM lugar_de_interés WHERE Id_lugar = $id";
    $query2 = mysqli_query($connect, $q3);
    if (!$query) {
        die('Query Error'.mysqli_error($connect));
    }else{
        echo('lugar de interes eliminado');
    }

  };





?>