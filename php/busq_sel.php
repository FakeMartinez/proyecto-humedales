<?php
require('conexion.php');

$id = $_GET['Id_acc'];

$q = "SELECT relevamiento.*, accidente_geografico.Nombre FROM relevamiento JOIN accidente_geografico ON relevamiento.Id_acc=accidente_geografico.Id_acc WHERE accidente_geografico.Id_acc = $id";


$query = mysqli_query($connect,$q);
$json = array();
$ant = array();
$c = -1;
foreach ($query as $row){
    //if($row['Id_acc'] != $ant['Id_acc']){
        $c=$c+1;
        $json[$c]=[
            'id_rel'=>$row['Id_rel'],
          'id_acc'=>$row['Id_acc'],
          'nombre'=>$row['Nombre'],
          'fecha'=>$row['Fecha'],
          'largo'=>$row['Largo'],
          'ancho'=>$row['Ancho'],
          '02_disuelto'=>$row['O2_disuelto'],
          'fuente'=>$row['Fuente'],
          'tiempo'=>$row['Tiempo'],
          'diversidad_vegetal'=>$row['Diversidad_vegetal'],
          'regimen_hidrologico'=>$row['Regimen_hidrologico'],
          'turbidez'=>$row['Turbidez'],
          'color'=>$row['Color'],
          'pH'=>$row['pH'],
          'superficie'=>$row['Superficie'],
          'calidad_agua'=>$row['Calidad_de_H2O'],
          'temp_agua'=>$row['Temperatura_H2O'], 
          'observaciones'=>$row['Observaciones']
          //'presion'=>array(),
          //'fauna'=>array(),
          //'flora'=>array(),
          //'img'=>array()
        ];
        //$x1 = 0;
        //$x2 = 0;
        //$x3 = 0;
        //$x4 = 0;
       //$ant['Id_acc']=$row['Id_acc'];
    
     // };

     
   

};

echo json_encode($json);

?>