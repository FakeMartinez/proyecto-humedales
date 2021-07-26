<?php

error_reporting(0);
require('conexion.php');

$q = mysqli_query($connect,"SELECT humedal.id_humedal,humedal.nombre,humedal.largo,humedal.ancho,humedal.coorx,humedal.coory,cuenca.nombre_cuenca,complejo.nombre_complejo,carac_humedal.* FROM humedal JOIN cuenca ON humedal.id_cuenca=cuenca.id_cuenca JOIN complejo ON humedal.id_complejo=complejo.id_complejo JOIN carac_humedal ON humedal.id_humedal=carac_humedal.id_humedal");

$con_completa = "SELECT humedal.id_humedal,humedal.nombre,humedal.largo,humedal.ancho,humedal.coorx,humedal.coory,cuenca.nombre_cuenca,complejo.nombre_complejo,carac_humedal.*, presion_humedal.id_presion, presion.tipo_presion, fauna_humedal.id_fauna, fauna.nom_coloquial_fauna,flora_humedal.id_flora, flora.nom_coloquial_flora FROM humedal JOIN cuenca ON humedal.id_cuenca=cuenca.id_cuenca JOIN complejo ON humedal.id_complejo=complejo.id_complejo JOIN carac_humedal ON 
humedal.id_humedal=carac_humedal.id_humedal JOIN presion_humedal ON humedal.id_humedal=presion_humedal.id_humedal JOIN presion ON presion_humedal.id_presion=presion.id_presion JOIN fauna_humedal ON humedal.id_humedal=fauna_humedal.id_humedal JOIN 
fauna ON fauna_humedal.id_fauna=fauna.id_fauna JOIN flora_humedal ON humedal.id_humedal=flora_humedal.id_humedal JOIN flora ON flora_humedal.id_flora=flora.id_flora GROUP BY humedal.id_humedal, presion_humedal.id_presion, fauna_humedal.id_fauna, flora_humedal.id_flora";

$q2 = mysqli_query($connect,$con_completa);

$q_pre="SELECT presion_humedal.id_humedal,presion.tipo_presion FROM presion JOIN presion_humedal ON presion_humedal.id_presion=presion.id_presion WHERE presion_humedal.id_humedal=5";
$q_fau="SELECT fauna_humedal.id_humedal,fauna.nom_coloquial_fauna FROM fauna JOIN fauna_humedal ON fauna_humedal.id_fauna=fauna.id_fauna WHERE fauna_humedal.id_humedal=5";
$q_flo="SELECT flora_humedal.id_humedal,flora.nom_coloquial_flora FROM flora JOIN flora_humedal ON flora_humedal.id_flora=flora.id_flora WHERE flora_humedal.id_humedal=5";
  //mostrar_tabla_auto($q2);
/*function mostrar_tabla_auto($query){
$reg=mysqli_fetch_all($query,MYSQLI_ASSOC);
 echo json_encode($reg);		*/
$json = array();
$ant = array();
$c = -1;

//echo("dad".$ant."das");
 while($row = mysqli_fetch_array($q2)){
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
      'tipo_presion'=>array(),
      'nom_coloquial_fauna'=>array(),
      'nom_coloquial_flora'=>array()
    ];
    $x1 = 0;
    $x2 = 0;
    $x3 = 0;
    $ant['id_humedal']=$row['id_humedal'];

  };
//////////////////////////////////////
$ad1=true;
foreach ($json[$c]['tipo_presion'] as $i){
  if ($i == $row['tipo_presion']){
    $ad1=false;
  }
};

if ($ad1!=false){
  $json[$c]['tipo_presion'][$x1]=$row['tipo_presion'];
    $x1=$x1+1;
  };


////////////////////////////////////
$ad2=true;
foreach ($json[$c]['nom_coloquial_fauna'] as $i){
  if ($i == $row['nom_coloquial_fauna']){
    $ad2=false;
  }
};

if ($ad2!=false){
  $json[$c]['nom_coloquial_fauna'][$x2]=$row['nom_coloquial_fauna'];
    $x2=$x2+1;
  };

/////////////////////////////////////
  $ad3=true;
  foreach ($json[$c]['nom_coloquial_flora'] as $i){
    if ($i == $row['nom_coloquial_flora']){
      $ad3=false;
  }
};

if ($ad3!=false){
  $json[$c]['nom_coloquial_flora'][$x3]=$row['nom_coloquial_flora'];
    $x3=$x3+1;
  };
//////////////////////////////////////

};
echo json_encode($json);
?>