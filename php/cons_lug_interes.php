<?php

//error_reporting(0);
require('conexion.php');

//$q = 'SELECT /*lugar_de_interés.*,*/ objeto_geometry.Tipo FROM objeto_geometry JOIN lugar_de_interés ON lugar_de_interés.Id_lugar=objeto_geometry.Id_lugar';

//$q = 'SELECT objeto_geometry.Tipo, ST_X(Tipo) AS "latitude", ST_Y(Tipo) AS "longitude" FROM objeto_geometry JOIN lugar_de_interés ON lugar_de_interés.Id_lugar=objeto_geometry.Id_lugar';
 //$q = 'SELECT SRID, ST_GeometryType(Tipo) as "tipo", ST_X(Tipo) AS "latitud", ST_Y(Tipo) AS "longitud" FROM objeto_geometry JOIN lugar_de_interés ON lugar_de_interés.Id_lugar=objeto_geometry.Id_lugar WHERE SRID = 2';
// $q = 'SELECT ST_AsGeoJSON(Tipo) as "tipo", lugar_de_interés.Id_lugar, lugar_de_interés.descripción FROM objeto_geometry JOIN lugar_de_interés ON lugar_de_interés.Id_lugar=objeto_geometry.Id_lugar';
$q = 'SELECT `Id_acc`,`Nombre`,`Tipo`,`Descripcion`,ST_AsGeoJSON(objeto_geo) as objeto, ST_GeometryType(objeto_geo) as "type",`Id_complejo`,`Id_cuenca` FROM `accidente_geografico`';
$query = mysqli_query($connect,$q);


$json = array();

$c = 0;
/*
while($row = mysqli_fetch_array($query)){
    $json[$c] = array(
        'id' => $row['Id_acc'],
        'nombre'=>$row['Nombre'],
        'tipo'=>$row['Tipo'],
        'descripcion' => $row['Descripcion'],
        'objeto'=>$row['objeto_geo'],
        
    );
    $c=$c+1;

 
};
*/

foreach ($query as $row){
    
    /*$json[$c] = [
        'id' =>$row['Id_acc'],
        'nombre'=>$row['Nombre'],
        'tipo'=>$row['Tipo'],
        'descripcion'=>$row['Descripcion'],
        'objeto'=>$row['objeto_geo']
    ];*/
    $json[$c] = [
        'id' =>$row['Id_acc'],
        'nombre'=>$row['Nombre'],
        'tipo'=>$row['Tipo'],
        'descripcion'=>$row['Descripcion'],
        'objeto'=>$row['objeto'],
        'type'=>$row['type']
    ];
    

    //echo ($json[$c]['id']);
   // foreach($i as $key){
     //   echo ($key['tipo']);
   // };
   
   $c = $c+1;
  
};

//$q2 = 'SELECT Centroid(objeto_geo) as centro FROM accidente_geografico';

//$query2 = mysqli_query($connect,$q2);


echo json_encode($json);








?>