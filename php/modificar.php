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
            <!--<td style='width:225px; min-width: 225px;'>objeto_geo</td>-->
            <td style='width:225px; min-width: 225px;'>id_complejo</td>
            <td style='width:225px; min-width: 225px;'>Id_cuenca</td>
            <td style='width:225px; min-width: 225px;'>Descripcion</td>
         </tr>";
   $C= 0;
   $F= 0;
   foreach($resulta as $Fil){
      $cosa = $cosa."<tr style='height: 80px;'>";
      $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button style='background: orange;position: relative;float: right;'>||</button></td>";
      $suport = '';
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
                     $suport = "<td style='height: inherit; overflow: auto; width:425px; min-width: 425px;'><div style='height: inherit;'>$Col</div></td>";
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
                           }else{
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
                              }else{
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
      $cosa = $cosa.$suport;
      $cosa = $cosa."</tr>";
      $C=0;
      $F= 1;
   }
   $cosa = $cosa."</table>";
   echo $cosa;
}else
{}


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
         }else
         {
            if ($C == 1){ //Nombre
               $cosa = $cosa."<td id='IDCom$F' style='width:70px; min-width: 70px;'>'$Col'</td>";

               $IdComp = mysqli_query($connect, "SELECT Id_complejo FROM complejo WHERE Nombre_complejo='$Col'");

               foreach($IdComp as $IdCom){
                  foreach($IdCom as $IC){
                     $IdProp = mysqli_query($connect,"SELECT Id_persona FROM propietario WHERE Id_complejo='$IC'");
                  }
               }
              
               $cosa = $cosa."<td id='IDPropCom$F' style='width:70px; min-width: 70px;'>";
               //echo("hace cosas3");
               foreach($IdProp as $IPr){
                  //echo("hace cosas4");
                  foreach($IPr as $PR){
                     // echo("PR:".$PR);
                     $NomProp = mysqli_query($connect,"SELECT Nombre_persona FROM persona WHERE Id_persona='$PR'");
                     foreach($NomProp as $NPr){
                        foreach($NPr as $NP){
                           $cosa = $cosa."<a>► $NP</a><br>";
                        }
                     }
                     
                  }
               }
               $cosa = $cosa."</td>";
            }else
            {
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
}else
{}

//===========================================================================================
//Para Cuencas
if (isset($_POST['cuenca'])){
   $Consulta = "SELECT * FROM cuenca";
   $resulta = mysqli_query($connect, $Consulta);
   $cosa = "
      <table>
         <tr style='height:40px'>
            <td style='width:50px; min-width: 50px;'></td> 
            <td style='width:70px; min-width: 70px;'>ID</td> 
            <td style='width:300px; min-width: 300px;'>Nombre</td>
            <td style='width:300px; min-width: 300px;'>Superficie</td>
            <td style='width:300px; min-width: 300px;'>Tipo</td>
         </tr>";
   $C= 0;
   $F= 0;
   foreach($resulta as $Fil){
      $cosa = $cosa."<tr style='height:40px'>";
      $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button style='background: orange;position: relative;float: right;'>||</button></td>";

      foreach($Fil as $Col){
         if ($C == 0){//ID
            $cosa = $cosa."<td id='IDCue$F'>$Col</td>";
         }else
         {
            if ($C == 1){ //Nombre
               $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
            }else
            {
               if ($C == 2){ //Superficie
                  $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
               }else{
                  if ($C == 3){ //Tipo
                     $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
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
}else
{}


//===========================================================================================
//Para Fauna
if (isset($_POST['fauna'])){
   $Consulta = "SELECT * FROM fauna";
   $resulta = mysqli_query($connect, $Consulta);
   $cosa = "
      <table>
         <tr style='height:40px'>
            <td style='width:50px; min-width: 50px;'></td> 
            <td style='width:70px; min-width: 70px;'>ID</td> 
            <td style='width:300px; min-width: 300px;'>Nombre Coloquial</td>
            <td style='width:300px; min-width: 300px;'>Nombre Científico</td>
            <td style='width:300px; min-width: 300px;'>Descripción</td>
            <td style='width:300px; min-width: 300px;'>Imágenes</td>
         </tr>";
   $C= 0;
   $F= 0;
   foreach($resulta as $Fil){
      $cosa = $cosa."<tr style='height:80px'>";
      $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button style='background: orange;position: relative;float: right;'>||</button></td>";

      foreach($Fil as $Col){
         if ($C == 0){//ID
            $cosa = $cosa."<td id='IDCue$F'>$Col</td>";
         }else
         {
            if ($C == 1){ //Nombre coloquial
               $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
            }else
            {
               if ($C == 2){ //Nombre científico
                  $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
               }else{
                  if ($C == 3){ //Descripcion
                     $cosa = $cosa."<td style='height: inherit; overflow: auto; width:425px; min-width: 425px;'><div style='height: inherit;'>$Col</div></td>";
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
}else
{}

//===========================================================================================
//Para Flora
if (isset($_POST['flora'])){
   $Consulta = "SELECT * FROM flora";
   $resulta = mysqli_query($connect, $Consulta);
   $cosa = "
      <table>
         <tr style='height:40px'>
            <td style='width:50px; min-width: 50px;'></td> 
            <td style='width:70px; min-width: 70px;'>ID</td> 
            <td style='width:300px; min-width: 300px;'>Nombre Coloquial</td>
            <td style='width:300px; min-width: 300px;'>Nombre Científico</td>
            <td style='width:300px; min-width: 300px;'>Descripción</td>
            <td style='width:300px; min-width: 300px;'>Imágenes</td>
         </tr>";
   $C= 0;
   $F= 0;
   foreach($resulta as $Fil){
      $cosa = $cosa."<tr style='height:80px'>";
      $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button style='background: orange;position: relative;float: right;'>||</button></td>";

      foreach($Fil as $Col){
         if ($C == 0){//ID
            $cosa = $cosa."<td id='IDCue$F'>$Col</td>";
         }else
         {
            if ($C == 1){ //Nombre coloquial
               $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
            }else
            {
               if ($C == 2){ //Nombre científico
                  $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
               }else{
                  if ($C == 3){ //Descripcion
                     $cosa = $cosa."<td style='height: inherit; overflow: auto; width:425px; min-width: 425px;'><div style='height: inherit;'>$Col</div></td>";
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
}else
{}

//===========================================================================================
//Para Presiones
if (isset($_POST['presion'])){
   $Consulta = "SELECT * FROM presiones";
   $resulta = mysqli_query($connect, $Consulta);
   $cosa = "
      <table>
         <tr style='height:40px'>
            <td style='width:50px; min-width: 50px;'></td> 
            <td style='width:70px; min-width: 70px;'>ID</td> 
            <td style='width:300px; min-width: 300px;'>Tipo</td>
            <td style='width:300px; min-width: 300px;'>Observaciones</td>
         </tr>";
   $C= 0;
   $F= 0;
   foreach($resulta as $Fil){
      $cosa = $cosa."<tr style='height:80px'>";
      $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button style='background: orange;position: relative;float: right;'>||</button></td>";

      foreach($Fil as $Col){
         if ($C == 0){//ID
            $cosa = $cosa."<td id='IDCue$F'>$Col</td>";
         }else
         {
            if ($C == 1){ //Tipo (o nombre)
               $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
            }else
            {
               if ($C == 2){ //Observaciones
                  $cosa = $cosa."<td style='height: inherit; overflow: auto; width:425px; min-width: 425px;'><div style='height: inherit;'>$Col</div></td>";
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
}else
{}

//===========================================================================================
//Para personas
if (isset($_POST['persona'])){
   $Consulta = "SELECT * FROM persona";
   $resulta = mysqli_query($connect, $Consulta);
   $cosa = "
      <table>
         <tr style='height:40px'>
            <td style='width:50px; min-width: 50px;'></td> 
            <td style='width:70px; min-width: 70px;'>DNI/CUIT/CUIL</td> 
            <td style='width:300px; min-width: 300px;'>Nombre</td>
            <td style='width:300px; min-width: 300px;'>Correo</td>
            <td style='width:300px; min-width: 300px;'>Teléfono</td>
            <td style='width:300px; min-width: 300px;'>Dirección</td>
            <td style='width:300px; min-width: 300px;'>Actuación</td>
         </tr>";
   $C= 0;
   $F= 0;
   foreach($resulta as $Fil){
      $cosa = $cosa."<tr style='height:80px'>";
      $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button style='background: orange;position: relative;float: right;'>||</button></td>";
      $suport;
      foreach($Fil as $Col){
         if ($C == 0){//ID-DNI-CUIL-CUIT
            $cosa = $cosa."<td id='IDCue$F'>$Col</td>";

           
            //Comprobar si es propietario
            $IdComplejo = mysqli_query($connect, "SELECT Id_complejo FROM propietario WHERE Id_persona = $Col");
            foreach ($IdComplejo as $IdCom){
               foreach ($IdCom as $IC){$suport= "<td><div style='text-decoration-line: underline;'>Propietario</div>";}
            }
            foreach ($IdComplejo as $IdCom){
               foreach ($IdCom as $IC){                  
                  $NomCom = mysqli_query($connect, "SELECT Nombre_complejo FROM complejo WHERE Id_complejo = $IC");
                  foreach ($NomCom as $NoCo){
                     foreach ($NoCo as $NC){
                        $suport=$suport."► $NC <br>";
                     }
                  }
               }
            }

            //Comprobar si es Miembro de proyecto
            $IdMiembro = mysqli_query($connect, "SELECT Id_miembro FROM miembro WHERE Id_Persona = $Col");
            //echo("escribe1");
            foreach ($IdMiembro as $IdMiem){
               foreach ($IdMiem as $IM){$suport= "<td><div style='text-decoration-line: underline;'>Miembro del proyecto</div>";}
            }
           // echo("escribe2");
            foreach ($IdMiembro as $IdMiem){
               foreach ($IdMiem as $IM){    
                  //echo("escribe3");     
                  $cons1 = "SELECT Id_rol FROM tiene_rol WHERE Id_miembro = $IM";        
                  //echo($cons1);    
                  $IdRol = mysqli_query($connect,$cons1 );
                  //echo("escribe4");
                  foreach ($IdRol as $IdRo){
                     foreach ($IdRo as $IR){
                        $cons2 = "SELECT descripcion FROM rol WHERE Id_rol = $IR";
                        //echo($cons2);
                        $Rol = mysqli_query($connect, $cons2);
                        foreach ($Rol as $Ro){
                           foreach ($Ro as $R){
                              $suport=$suport."► $R<br>";
                           }
                        }
                     }
                  }
               }
            }
            
            $suport = $suport."</td>";
         }else
         {
            if ($C == 1){ //Nombre
               $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
            }else
            {
               if ($C == 2){ //Correo
                  $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
               }else{
                  if ($C == 3){ //Teléfono
                     $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
                  }else{
                     if ($C == 4){ //Dirección
                        $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
                     }else{
                     }
                  }
               }
            }
         }

         $C++;
         
      }
      $cosa = $cosa.$suport;
      $cosa = $cosa."</tr>";
      $C=0;
      $F= 1;
   }
   $cosa = $cosa."</table>";
   echo $cosa;
}else
{}

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


    


