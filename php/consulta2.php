<?php

//error_reporting(0);
require('conexion.php');

$name = $_POST["search"];
$con_completa3 = "SELECT humedal.Id_humedal,humedal.Nombre,cuenca.Nombre_cuenca,complejo.Nombre_complejo,ST_AsGeoJSON(Tipo) as 'tipo'
FROM humedal JOIN cuenca ON humedal.Id_cuenca=cuenca.Id_cuenca JOIN complejo ON humedal.Id_complejo=complejo.Id_complejo JOIN 
objeto_geometry ON humedal.Id_humedal=objeto_geometry.Id_humedal where humedal.Nombre Like '$name%'";

$con_completa4 = "SELECT humedal.Id_humedal,humedal.Nombre,cuenca.Nombre_cuenca,complejo.Nombre_complejo,ST_AsGeoJSON(Tipo) as 'tipo',relevamiento.Fecha
FROM humedal JOIN cuenca ON humedal.Id_cuenca=cuenca.Id_cuenca JOIN complejo ON humedal.Id_complejo=complejo.Id_complejo JOIN 
objeto_geometry ON humedal.Id_humedal=objeto_geometry.Id_humedal JOIN relevamiento ON humedal.Id_humedal=relevamiento.Id_humedal where humedal.Nombre Like '$name%'";

//$q = 'SELECT ST_AsGeoJSON(Tipo) as "tipo" FROM objeto_geometry JOIN humedal ON humedal.Id_humedal=objeto_geometry.Id_humedal WHERE humedal.Id_humedal = ';
//$query_obj = "SELECT ST_AsGeoJSON(Tipo) as 'tipo' FROM objeto_geometry JOIN humedal ON humedal.Id_humedal = objeto_geometry.Id_humedal WHERE humedal.Id_humedal = 1";
$query = "SELECT Id_acc,Nombre,Tipo,Descripcion,ST_AsGeoJSON(objeto_geo) as objeto, ST_GeometryType(objeto_geo) as 'tipo',Id_complejo,Id_cuenca FROM accidente_geografico WHERE accidente_geografico.Nombre Like '$name%'";

if(!empty($name)) {
    $q_name = mysqli_query($connect,$query);
 
    datos ($q_name);
    
};
$json = array();






function datos($qe){


    $c = 0;
    
    foreach ($qe as $i){


        $json[$c]=[
            'id' =>$i['Id_acc'],
            'nombre'=>$i['Nombre'],
            'tipo'=>$i['Tipo'],
            'descripcion'=>$i['Descripcion'],
            'objeto'=>$i['objeto'],
            'type'=>$i['tipo']
          
        ];
        
        $c=$c+1;
       
    
    };
    echo json_encode($json);
    
};

/*
obj($id)

function obj($id){
    $q = "SELECT ST_AsGeoJSON(Tipo) as 'tipo' FROM objeto_geometry JOIN humedal ON humedal.Id_humedal = objeto_geometry.Id_humedal WHERE humedal.Id_humedal = $id";
    foreach ($qe as $i){
        if (!$qe) {
            die('Query Error'.mysqli_error($connect));
        }else{
        echo json_encode($i['tipo']);
        }
    }

};
*/
//echo json_encode($json);

?>