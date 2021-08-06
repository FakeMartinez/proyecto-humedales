<?php

  require('conexion.php');
  $id = $_GET["id"];

  $delete = mysqli_query($connect,"DELETE from presion_humedal where id_humedal = '$id'");

  if (!$delete) {
    die('Query Error'.mysqli_error($connect));
  };

  $delete = mysqli_query($connect,"DELETE from fauna_humedal where id_humedal = '$id'");

  if (!$delete) {
    die('Query Error'.mysqli_error($connect));
  };

  $delete = mysqli_query($connect,"DELETE from flora_humedal where id_humedal = '$id'");

  if (!$delete) {
    die('Query Error'.mysqli_error($connect));
  };

  $delete = mysqli_query($connect,"DELETE from humedal where id_humedal = '$id'");

  if (!$delete) {
    die('Query Error'.mysqli_error($connect));
  };
  


?>