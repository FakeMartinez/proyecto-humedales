<?php
require('conexion.php');

$id = $_GET['Id_acc'];

$query = "SELECT relevamiento.*, accidente_geografico.Nombre, accidente_geografico.Tipo, 
accidente_geografico.Descripcion, complejo.Nombre_complejo,cuenca.Nombre_cuenca,presiones.Id_presiones, 
presiones.Tipo_presiones,fauna.Id_fauna,fauna.Nombre_coloquial, fauna.Nombre_científico,fauna.Descripción as DFauna,imgFauna.PATH as Img_fauna,flora.Id_flora, 
flora.Nombre_científico as nomCienFlora,flora.Descripcion as DFlora, imgFlora.PATH as Img_flora, flora.Nombre_coloquial as nomCoqFlora,imagen.Id_imagen,f.descripción, imagen.PATH FROM relevamiento JOIN 
accidente_geografico ON relevamiento.Id_acc=accidente_geografico.Id_acc LEFT JOIN complejo ON 
complejo.Id_complejo=accidente_geografico.Id_complejo LEFT JOIN cuenca ON 
cuenca.Id_cuenca=accidente_geografico.Id_cuenca LEFT JOIN contiene_presiones ON 
contiene_presiones.Id_acc=accidente_geografico.Id_acc LEFT JOIN presiones ON 
presiones.Id_presiones=contiene_presiones.Id_presiones LEFT JOIN contiene_fauna ON 
contiene_fauna.Id_rel=relevamiento.Id_rel LEFT JOIN fauna ON 
fauna.Id_fauna=contiene_fauna.Id_fauna LEFT JOIN fotográfica as fotoFauna ON fotoFauna.Id_fauna=contiene_fauna.Id_fauna LEFT JOIN imagen as imgFauna ON imgFauna.Id_imagen=fotoFauna.Id_imagen LEFT JOIN contiene_flora ON 
contiene_flora.Id_rel=relevamiento.Id_rel LEFT JOIN flora ON 
flora.Id_flora=contiene_flora.Id_flora LEFT JOIN fotográfica as fotoFlora ON 
fotoFlora.Id_flora=contiene_flora.Id_flora LEFT JOIN imagen as imgFlora ON 
imgFlora.Id_imagen=fotoFlora.Id_imagen LEFT JOIN imagen ON imagen.Id_rel=relevamiento.Id_rel LEFT JOIN fotográfica as f ON f.Id_imagen=imagen.Id_imagen WHERE accidente_geografico.Id_acc = $id";

$q = "SELECT relevamiento.*, accidente_geografico.Nombre FROM relevamiento JOIN accidente_geografico ON relevamiento.Id_acc=accidente_geografico.Id_acc WHERE accidente_geografico.Id_acc = $id";


$query = mysqli_query($connect,$query);
$json = array();
$ant = array();
$c = -1;
foreach ($query as $row){
    if($row['Id_acc'] != $ant['Id_acc']){
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
          'observaciones'=>$row['Observaciones'],
          'presion'=>array(),
          'fauna'=>array(),
          'flora'=>array(),
          'img'=>array()
        ];
        $x1 = 0;
        $x2 = 0;
        $x3 = 0;
        $x4 = 0;
       $ant['Id_acc']=$row['Id_acc'];
    
     };

     
   



//////////////////////////////////////
$ad1=true;
foreach ($json[$c]['presion'] as $i){
  if ($i['id_presion'] == $row['Id_presiones']){
    $ad1=false;
  }
};

if ($ad1!=false){
  $json[$c]['presion'][$x1] = array(
                'id_presion' => $row['Id_presiones'],
                'tipo_presion' => $row['Tipo_presiones']
  );


    $x1=$x1+1;
  };


////////////////////////////////////
$ad2=true;
foreach ($json[$c]['fauna'] as $i){
  if ($i['id_fauna'] == $row['Id_fauna']){
    $ad2=false;
  }
};

if ($ad2!=false){
  $json[$c]['fauna'][$x2]=array(
    'id_fauna' => $row['Id_fauna'],
    'Nombre_coloquial' => $row['Nombre_coloquial'],
    'Nombre_cientifico' => $row['Nombre_científico'],
    'Descripcion' => $row['DFauna'],
    'img_fauna' => $row['Img_fauna']
  );

    $x2=$x2+1;
  };

/////////////////////////////////////
  $ad3=true;
  foreach ($json[$c]['flora'] as $i){
    if ($i['id_flora'] == $row['Id_flora']){
      $ad3=false;
  }
};

if ($ad3!=false){
  $json[$c]['flora'][$x3]=array(
    'id_flora' => $row['Id_flora'],
    'Nombre_coloquial' => $row['nomCoqFlora'],
    'Nombre_cientifico' => $row['nomCienFlora'],
    'Descripcion' => $row['DFlora'],
    'img_flora' => $row['Img_flora']
  );

    $x3=$x3+1;
  };
//////////////////////////////////////
$ad4=true;
foreach ($json[$c]['img'] as $i){
  if ($i['id_imagen'] == $row['Id_imagen']){
    $ad4=false;
}
};

if ($ad4!=false){
$json[$c]['img'][$x4]=array(
  'id_imagen' => $row['Id_imagen'],
  'img_rel' => $row['PATH'],
  'Descripcion' => $row['descripción']
);

  $x4=$x4+1;
};
/////////////////////////////////////
};
echo json_encode($json);

?>
