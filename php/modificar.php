<?php

include('conexion.php');
$acc = $_POST['accidente'];

if ($acc == true){
  $Consulta = "SELECT * FROM accidente_geografico;";
  $resulta = mysqli_query($connect, $Consulta);
  $cosa = "
          <table>
                <tr>
                  <td>ID</td> <td>Nombre</td><td>Tipo</td><td>Descripcion</td><td>objeto_geo</td><td>id_complejo</td><td>Id_cuenca</td>
                </tr>";
$C= 0;
$F= 0;
  foreach($resulta as $Fil){
    $cosa = $cosa."<tr>";
      foreach($Fil as $Col){
            if ($C == 0){
                  $cosa = $cosa."<td>$Col</td>";
            }else{
                  if ($C == 5){
                        $cosa = $cosa."<td id='IDCom$F'>$Col</td>";
                  }else{
                        $cosa = $cosa."<td><input value=$Col></input></td>";
                  }
            }
        $C++;
      }
      $cosa = $cosa."</tr>";
      $C=0;
      $F= 1;
    }
    $cosa = $cosa."</table>";
    echo $cosa;
}else{
      echo"no entró";
}







/*
 require('conexion.php');
function mostrar_tabla_auto($query){
$reg=mysqli_fetch_all($query,MYSQLI_ASSOC);
list(,$datos) = $reg; //obtiene el par [clave->valor] pero dejando de lado la clave ya que es el indice del array (0,1,2...)  foreach ($add_img as $valor)
?>  
<table border="1" width="700" cellspacing="0" cellpadding="0">	
 <tr>
 <?php
 while(list($col,$fila) = each($datos)){ //mientras existen valores para obtener el par, ya que $datos posee un valor asociativo con en nombre de la columna [$col->$fila]
 echo '<th>'.$col.'</th>';}?>
  <td class="table_item">      
       </tr>
 </tr>
 <tr>
 <?php 
 foreach($reg as $key){ //se puede utilizar un foreach anidado para mostrar las filas, $key sigue siendo un array por lo tanto se vuelve a definir para obtener los otros valores
  foreach($key as $k=>$value){echo '<td>'.$value.'</td>';}?>
 </tr>
 <?php			
}}*/
?>


    


