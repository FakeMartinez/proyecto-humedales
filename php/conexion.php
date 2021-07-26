<?php
error_reporting(0);
$connect = mysqli_connect('127.0.0.1','root','','humedales',3306);
if (!$connect) {
   echo 'no Conexión con éxito<br />';
}
?>
