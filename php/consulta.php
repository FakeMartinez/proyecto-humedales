<?php

error_reporting(0);
require('conexion.php');

$id = $_GET["id"];
$name = $_POST["search"];

$con_ant = "SELECT humedal.*, cuenca.*,complejo.*, presion.*, presion_humedal.*, fauna_humedal.id_fauna, fauna.*,flora_humedal.id_flora, flora.*,img_humedal FROM humedal JOIN cuenca ON humedal.id_cuenca=cuenca.id_cuenca JOIN complejo ON humedal.id_complejo=complejo.id_complejo JOIN presion_humedal ON humedal.id_humedal=presion_humedal.id_humedal JOIN presion ON presion_humedal.id_presion=presion.id_presion JOIN fauna_humedal ON humedal.id_humedal=fauna_humedal.id_humedal JOIN 
fauna ON fauna_humedal.id_fauna=fauna.id_fauna JOIN flora_humedal ON humedal.id_humedal=flora_humedal.id_humedal JOIN flora ON flora_humedal.id_flora=flora.id_flora LEFT JOIN img_humedal ON img_humedal.id_humedal=humedal.id_humedal GROUP BY humedal.id_humedal, presion_humedal.id_presion, fauna_humedal.id_fauna, flora_humedal.id_flora, img_humedal";

/*$con_completa = "SELECT humedal.*, presion.*, complejo.*, cuenca.*,presion_humedal.* ,fauna_humedal.id_fauna, fauna.*,flora_humedal.id_flora, flora.*,img_humedal.* FROM humedal JOIN cuenca ON humedal.id_cuenca=cuenca.id_cuenca JOIN complejo ON humedal.id_complejo=complejo.id_complejo  JOIN presion_humedal ON humedal.id_humedal=presion_humedal.id_humedal JOIN presion ON presion_humedal.id_presion=presion.id_presion JOIN fauna_humedal ON humedal.id_humedal=fauna_humedal.id_humedal JOIN 
fauna ON fauna_humedal.id_fauna=fauna.id_fauna JOIN flora_humedal ON humedal.id_humedal=flora_humedal.id_humedal JOIN flora ON flora_humedal.id_flora=flora.id_flora LEFT JOIN img_humedal ON img_humedal.id_humedal=humedal.id_humedal GROUP BY humedal.id_humedal, presion_humedal.id_presion, fauna_humedal.id_fauna, flora_humedal.id_flora, img_humedal.img_humedal";*/

$con_completa2 = "SELECT humedal.*, presion.*, complejo.*, cuenca.*, fauna_humedal.id_fauna, fauna.*,flora_humedal.id_flora, flora.*,img_humedal FROM humedal JOIN cuenca ON humedal.id_cuenca=cuenca.id_cuenca JOIN complejo ON humedal.id_complejo=complejo.id_complejo JOIN presion_humedal ON humedal.id_humedal=presion_humedal.id_humedal JOIN presion ON presion_humedal.id_presion=presion.id_presion JOIN fauna_humedal ON humedal.id_humedal=fauna_humedal.id_humedal JOIN 
fauna ON fauna_humedal.id_fauna=fauna.id_fauna JOIN flora_humedal ON humedal.id_humedal=flora_humedal.id_humedal JOIN flora ON flora_humedal.id_flora=flora.id_flora LEFT JOIN img_humedal ON img_humedal.id_humedal=humedal.id_humedal where humedal.fuente = '$id' GROUP BY humedal.id_humedal, presion_humedal.id_presion, fauna_humedal.id_fauna, flora_humedal.id_flora, img_humedal";

$con_completa3 = "SELECT humedal.*, presion.*, complejo.*, cuenca.*, fauna_humedal.id_fauna, fauna.*,flora_humedal.id_flora, flora.*,img_humedal FROM humedal JOIN cuenca ON humedal.id_cuenca=cuenca.id_cuenca JOIN complejo ON humedal.id_complejo=complejo.id_complejo JOIN presion_humedal ON humedal.id_humedal=presion_humedal.id_humedal JOIN presion ON presion_humedal.id_presion=presion.id_presion JOIN fauna_humedal ON humedal.id_humedal=fauna_humedal.id_humedal JOIN 
fauna ON fauna_humedal.id_fauna=fauna.id_fauna JOIN flora_humedal ON humedal.id_humedal=flora_humedal.id_humedal JOIN flora ON flora_humedal.id_flora=flora.id_flora LEFT JOIN img_humedal ON img_humedal.id_humedal=humedal.id_humedal where humedal.nombre Like '$name%' GROUP BY humedal.id_humedal, presion_humedal.id_presion, fauna_humedal.id_fauna, flora_humedal.id_flora, img_humedal";

$q = mysqli_query($connect,$con_ant);

if(!empty($id)) {
$q_id = mysqli_query($connect,$con_completa2);
datos ($q_id);
}else if(!empty($name)) {
$q_name = mysqli_query($connect,$con_completa3);
datos ($q_name);
}else{
  datos($q);
}

function datos($qe){

$json = array();
$ant = array();
$c = -1;

 while($row = mysqli_fetch_array($qe)){
  if($row['id_humedal'] != $ant['id_humedal']){
    $c=$c+1;
    $json[$c]=[
      'nombre' => $row['nombre'],
      'coorx'=>$row ['coorx'], 
      'coory'=> $row['coory'], 
      'id_humedal'=>$row['id_humedal'],
      'largo'=>$row['largo'],
      'ancho'=>$row['ancho'],
      'nombre_cuenca'=>$row['nombre_cuenca'],
      'nombre_complejo'=>$row['nombre_complejo'],
      'fuente'=>$row['fuente'],
      'tiempo'=>$row['tiempo'],
      'diversidad_vegetal'=>$row['diversidad_vegetal'],
      'regimen_hidrologico'=>$row['regimen_hidrologico'],
      'calidad_agua'=>$row['calidad_agua'],
      'carac_inclusion'=>$row['carac_inclusion'], 
      'observaciones'=>$row['observaciones'],
      'presion'=>array(),
      'fauna'=>array(),
      'flora'=>array(),
      'img'=>array()
    ];
    $x1 = 0;
    $x2 = 0;
    $x3 = 0;
    $x4 = 0;
    $ant['id_humedal']=$row['id_humedal'];

  };
//////////////////////////////////////
$ad1=true;
foreach ($json[$c]['presion'] as $i){
  if ($i['id_presion'] == $row['id_presion']){
    $ad1=false;
  }
};

if ($ad1!=false){
  $json[$c]['presion'][$x1] = array(
                'id_presion' => $row['id_presion'],
                'tipo_presion' => $row['tipo_presion'],
                'obs_presion' => $row['obs_presion']
  );


    $x1=$x1+1;
  };


////////////////////////////////////
$ad2=true;
foreach ($json[$c]['fauna'] as $i){
  if ($i['id_fauna'] == $row['id_fauna']){
    $ad2=false;
  }
};

if ($ad2!=false){
  $json[$c]['fauna'][$x2]=array(
    'id_fauna' => $row['id_fauna'],
    'nom_coloquial_fauna' => $row['nom_coloquial_fauna'],
    'nom_cientifico_fauna' => $row['nom_cientifico_fauna'],
    'carac_fauna' => $row['carac_fauna'],
    'img_fauna'=> $row['img_fauna']
  );

    $x2=$x2+1;
  };

/////////////////////////////////////
  $ad3=true;
  foreach ($json[$c]['flora'] as $i){
    if ($i['id_flora'] == $row['id_flora']){
      $ad3=false;
  }
};

if ($ad3!=false){
  $json[$c]['flora'][$x3]=array(
    'id_flora' => $row['id_flora'],
    'nom_coloquial_flora' => $row['nom_coloquial_flora'],
    'nom_cientifico_flora' => $row['nom_cientifico_flora'],
    'carac_flora' => $row['carac_flora'],
    'img_flora'=> $row['img_flora']
  );

    $x3=$x3+1;
  };
//////////////////////////////////////

  

  $ad4=true;
  foreach ($json[$c]['img'] as $i){
    if ($i == $row['img_humedal']){
      $ad4=false;
  }
};

if ($ad4!=false){
  $json[$c]['img'][$x4] = ($row['img_humedal']);

    $x4=$x4+1;
  };



/////////////////////////////////////
};
echo json_encode($json);
};


?>