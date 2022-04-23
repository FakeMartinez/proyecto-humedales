<?php

include('conexion.php');

//===========================================================================================
//Para Accidentes 
if (isset($_POST['accidente'])){
  $Consulta = "SELECT * FROM accidente_geografico;";
  $resulta = mysqli_query($connect, $Consulta);
  $cosa = "
          <table>
                <tr style='height:40px'>
                  <td style='width:70px; min-width: 70px;'>ID</td> 
                  <td style='width:225px; min-width: 225px;'>Nombre</td>
                  <td style='width:225px; min-width: 225px;'>Tipo</td>
                  <td style='width:225px; min-width: 225px;'>Descripcion</td>
                  <!--<td style='width:225px; min-width: 225px;'>objeto_geo</td>-->
                  <td style='width:225px; min-width: 225px;'>id_complejo</td>
                  <td style='width:225px; min-width: 225px;'>Id_cuenca</td>
                  <td style='width:225px; min-width: 225px;'>Cosa1</td>
                  <td style='width:225px; min-width: 225px;'>Cosa2</td>
                  <td style='width:225px; min-width: 225px;'>Cosa3</td>
                  <td style='width:225px; min-width: 225px;'>Cosa4</td>
                  <td style='width:225px; min-width: 225px;'>Cosa5</td>
                  <td style='width:225px; min-width: 225px;'>Cosa6</td>
                  <td style='width:225px; min-width: 225px;'>Cosa7</td>
                  <td style='width:225px; min-width: 225px;'>Cosa8</td>
                  <td style='width:225px; min-width: 225px;'>Cosa9</td>
                </tr>";
$C= 0;
$F= 0;
  foreach($resulta as $Fil){
    $cosa = $cosa."<tr style='height:40px'>";
      foreach($Fil as $Col){
            if ($C == 0){
                  $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
            }else{
                  if ($C == 1){
                        $cosa = $cosa."<td style='width:225px; min-width: 225px;'><input value=$Col></input></td>";
                  }else{
                        if ($C == 2){
                              $cosa = $cosa."<td style='width:225px; min-width: 225px;'><input value=$Col></input></td>";
                        }else{
                              if ($C == 3){
                                    $cosa = $cosa."<td style='width:225px; min-width: 225px;'><input value=$Col></input></td>";
                              }else{
                                    if ($C == 4){
                                          //Nada, es el objeto geometrico y no se escribe
                                    }else{
                                          if ($C == 5){
                                                $cosa = $cosa."<td id='IDCom$F' style='width:225px; min-width: 225px;'>$Col</td>";
                                          }else{
                                                if ($C == 6){
                                                      $cosa = $cosa."<td id='IDCue$F' style='width:225px; min-width: 225px;'>$Col</td>";
                                                }                                                
                                          }
                                    }
                              }
                        }
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
      
}


//===========================================================================================
//Para Complejos
if (isset($_POST['complejo'])){
      $Consulta = "SELECT * FROM complejo;";
      $resulta = mysqli_query($connect, $Consulta);
      $cosa = "
              <table>
                    <tr style='height:40px'>
                      <td style='width:70px; min-width: 70px;'>ID</td> 
                      <td style='width:300px; min-width: 300px;'>Nombre</td>
                    </tr>";
    $C= 0;
    $F= 0;
      foreach($resulta as $Fil){
        $cosa = $cosa."<tr style='height:40px'>";
          foreach($Fil as $Col){
                if ($C == 0){
                      $cosa = $cosa."<td>$Col</td>";
                }else{
                      if ($C == 5){
                            $cosa = $cosa."<td id='IDCom$F' style='width:70px; min-width: 70px;'>'$Col'</td>";
                      }else{
                            $cosa = $cosa."<td style='width:300px; min-width: 300px;'><input value='$Col' style='width:275px; min-width: 275px;'></input></td>";
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


    


