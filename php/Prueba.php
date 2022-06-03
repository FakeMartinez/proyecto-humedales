<?php
include('conexion.php');


if ($_POST['accidente']){
  $Consulta = "SELECT * FROM accidente_geografico;";

  $resulta = mysqli_query($connect, $Consulta);
  $cosa = "
          <table>
                <tr>
                  <td>ID</td> <td>Nombre</td><td>Tipo</td><td>Descripcion</td><td>objeto_geo</td><td>id_complejo</td><td>Id_cuenca</td>
                </tr>";
  foreach($resulta as $Fil){
    $cosa = $cosa."<tr>";
      foreach($Fil as $Col){
        $cosa = $cosa."<td>$Col</td>";
      }
      $cosa = $cosa."</tr>";
    }
    $cosa = $cosa."</table>";
}
echo $cosa;


/*
<table>
  <tr>
    <td> </td> <td>ID</td> <td>Nombre</td> <td>Tipo</td> <td>Descripcion</td> <td>objeto_geo</td> <td>id_complejo</td> <td>Id_cuenca</td>
  </tr>
  <tr>
    <td>15</td> <td>Humedin</td> <td>Humedal</td> <td></td> <td></td> <td>53</td> <td>4565</td> 
  </tr>
  <tr>  
    <td>16</td> <td>humedon</td> <td>humedal</td> <td></td> <td></td> <td>53</td> <td>4565</td> 
  </tr>
  <tr>  
    <td>17</td> <td>humedoso</td> <td>humedal</td> <td></td> <td></td> <td>53</td> <td>5</td> 
  </tr>
  <tr>  
    <td>20</td> <td>Desconocido</td> <td>Interes</td> <td>Cosas</td> <td></td> <td></td> <td></td> 
  </tr>
</table>


*/

?>

