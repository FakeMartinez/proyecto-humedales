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
                <td style='width:50px; min-width: 50px;'></td> 
                  <td style='width:70px; min-width: 70px;'>ID</td> 
                  <td style='width:225px; min-width: 225px;'>Nombre</td>
                  <td style='width:225px; min-width: 225px;'>Tipo</td>
                  <td style='width:225px; min-width: 225px;'>Descripcion</td>
                  <!--<td style='width:225px; min-width: 225px;'>objeto_geo</td>-->
                  <td style='width:225px; min-width: 225px;'>id_complejo</td>
                  <td style='width:225px; min-width: 225px;'>Id_cuenca</td>
                </tr>";
$C= 0;
$F= 0;
  foreach($resulta as $Fil){
    $cosa = $cosa."<tr style='height:40px'>";
    $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button style='background: orange;position: relative;float: right;'>||</button></td>";
      foreach($Fil as $Col){
            if ($C == 0){ //ID
                  $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
            }else{
                  if ($C == 1){ //Nombre
                        //$cosa = $cosa."<td style='width:225px; min-width: 225px;'><input value=$Col></input></td>";
                        $cosa = $cosa."<td style='width:225px; min-width: 225px;'>$Col</td>";
                  }else{
                        if ($C == 2){ //Tipo
                              //$cosa = $cosa."<td style='width:225px; min-width: 225px;'><input value=$Col></input></td>";
                              $cosa = $cosa."<td style='width:225px; min-width: 225px;'>$Col</td>";
                        }else{
                              if ($C == 3){ //Descripcion
                                    //$cosa = $cosa."<td style='width:225px; min-width: 225px;'><input value=$Col></input></td>";
                                    $cosa = $cosa."<td style='width:225px; min-width: 225px;'>$Col</td>";
                              }else{
                                    if ($C == 4){ //Objeto geometrico
                                          //Nada, es el objeto geometrico y no se escribe
                                    }else{
                                          if ($C == 5){ //Id_complejo
                                                if ($Col!=null){ // Si es distinto de NULL el id de complejo, entonces busca el nombre del complejo para escribirlo en lugar de la id
                                                     //echo ("COl". $Col);
                                                      $nomcomple=mysqli_query($connect, "SELECT Nombre_complejo FROM complejo WHERE Id_complejo=$Col");
                                                      foreach ($nomcomple as $NCom){
                                                            foreach($NCom as $NC){
                                                                  //echo ("nomcomple:". $NC);
                                                                  $cosa = $cosa."<td id='IDCom$F' style='width:225px; min-width: 225px;'>$NC</td>";
                                                            }
                                                      }
                                                }
                                                else{
                                                      $cosa = $cosa."<td id='IDCom$F' style='width:225px; min-width: 225px;'>-</td>";
                                                }
                                                
                                          }else{
                                                if ($C == 6){//Id_cuenca
                                                      if ($Col!=null){ // Si es distinto de NULL el id de complejo, entonces busca el nombre del complejo para escribirlo en lugar de la id
                                                            //echo ("COl". $Col);
                                                             $nomcomple=mysqli_query($connect, "SELECT Nombre_cuenca FROM cuenca WHERE Id_cuenca=$Col");
                                                             foreach ($nomcomple as $NCom){
                                                                   foreach($NCom as $NC){
                                                                         //echo ("nomcomple:". $NC);
                                                                         $cosa = $cosa."<td id='IDCom$F' style='width:225px; min-width: 225px;'>$NC</td>";
                                                                   }
                                                             }
                                                       }
                                                       else{
                                                             $cosa = $cosa."<td id='IDCom$F' style='width:225px; min-width: 225px;'>-</td>";
                                                       }
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
                      <td style='width:50px; min-width: 50px;'></td> 
                      <td style='width:70px; min-width: 70px;'>ID</td> 
                      <td style='width:300px; min-width: 300px;'>Nombre</td>
                      <td style='width:300px; min-width: 300px;'>Propietario</td>
                    </tr>";
    $C= 0;
    $F= 0;
      foreach($resulta as $Fil){
        $cosa = $cosa."<tr style='height:40px'>";
        $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button style='background: orange;position: relative;float: right;'>||</button></td>";
          foreach($Fil as $Col){
                if ($C == 0){//ID
                      $cosa = $cosa."<td>$Col</td>";
                }else{
                      if ($C == 1){ //Nombre
                            $cosa = $cosa."<td id='IDCom$F' style='width:70px; min-width: 70px;'>'$Col'</td>";
                            //echo("hace cosas1");
                            $PersonaRes = mysqli_query($connect, "SELECT Id_persona FROM propietario WHERE Id_complejo='$Col';");
                            //echo("hace cosas2");
                            $cosa = $cosa."<td id='IDPropCom$F' style='width:70px; min-width: 70px;'>";
                            echo("hace cosas3");
                            
                            foreach($PersonaRes as $PerRes){
                              echo("hace cosas4");
                                  foreach($PerRes as $PR){
                                        echo("PR:".$PR);
                                    $cosa = $cosa."<a>'$PR'<a><br>";
                                  }
                            }
                            $cosa = $cosa."</td>";
                            
                      }else{
                        //$cosa = $cosa."<td style='width:300px; min-width: 300px;'><input value='$Col' style='width:275px; min-width: 275px;'></input></td>";
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


    


