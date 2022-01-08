<?php

  include('conexion.php');

  function act($connect,$q)
{
    $result = mysqli_query($connect, $q);
    if (!$result) {
        die('Query Error'.mysqli_error($connect));
      }
       
      echo "Task Added Successfully";  
};

/////////////////Cuenca/////////////////////////

if(isset($_POST['id_cuenca'])) {
    $add_id = $_POST['id_cuenca'];
  $add_nom = $_POST['nombre_cuenca'];
  $add_sup = $_POST['sup_cuenca'];
  $add_exp = $_POST['ext_cuenca'];
  $add_tipo = $_POST['tipo_cuenca'];

  $query1 = "INSERT into cuenca (id_cuenca, nombre_cuenca, sup_cuenca, ext_cuenca, tipo_cuenca) VALUES ( 
    '$add_id', '$add_nom' , '$add_sup', '$add_exp', '$add_tipo')";
  
  act($connect,$query1);

};




/////////////////Complejo////////////////////////

if(isset($_POST['id_complejo'])) {
    $add_id = $_POST['id_complejo'];
  $add_nom = $_POST['nombre_complejo'];
  $add_prop = $_POST['prop_complejo'];

  $query2 = "INSERT into complejo (id_complejo, nombre_complejo, prop_complejo) VALUES ('$add_id','$add_nom','$add_prop')";

  act($connect,$query2);
};


  

/////////////////Tipo de Presion///////////////////

  if(isset($_POST['tipo_presion'])) {   //$_POST es la variable pasada al llamar el documento desde forms.js (¿$_POST es universal?)
    $add_tipo= $_POST['tipo_presion'];  // agrega el valor de $_POST.tipo_presion a $add_tipo
    $add_obs = $_POST['obs_presion'];   // agrega el valor de $_POST.obs_presion a $add_obs

    $query3 = "INSERT into presion (tipo_presion, obs_presion) VALUES ('$add_tipo','$add_obs')";  //crea la insercion en SQL de la nueva informacion en la tabla presiones
    act($connect,$query3);  // ¿act() ejecuta la consulta de $query3 en la base de datos $connect? act(base de datos, consulta)
  };



//////////////////Fauna///////////////////////////

if(isset($_POST['nom_cq_fauna'])) {
    $add_nomcq= $_POST['nom_cq_fauna'];
    $add_nomci= $_POST['nom_cf_fauna'];
    $add_carac= $_POST['carac_fauna'];
    $add_img = $_POST['img_fauna'];

    $query4 = "INSERT into fauna (nom_coloquial_fauna, nom_cientifico_fauna,carac_fauna,img_fauna) VALUES 
    ('$add_nomcq','$add_nomci','$add_carac','$add_img')";


    act($connect,$query4);
};



//////////////////Flora///////////////////////////
if(isset($_POST['nom_cq_flora'])) {
    $add_nomcq= $_POST['nom_cq_flora'];
    $add_nomci= $_POST['nom_cq_flora'];
    $add_carac= $_POST['carac_flora'];
    $add_img = $_POST['img_flora'];
    
    $query5 = "INSERT into flora (nom_coloquial_flora, nom_cientifico_flora,carac_flora,img_flora) VALUES 
    ('$add_nomcq','$add_nomci','$add_carac','$add_img')";
    
    act($connect,$query5);
};

//////////////////////////////////////////////////

