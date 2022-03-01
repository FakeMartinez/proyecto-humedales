<?php

  include('conexion.php');

  function act($connect,$q)
{
    $result = mysqli_query($connect, $q);
    
    if (!$result) {
      echo "ERROR EN LA CARGA";
      die('Query Error'.mysqli_error($connect));
    }
    echo "Task Added Successfully";   
    
};

function rec($connect,$q)
{
  $result = mysqli_query($connect, $q);
    
    if (!$result) {
      echo "ERROR EN LA CARGA";
      die('Query Error'.mysqli_error($connect));
    }
    $dato=mysqli_fetch_array($result);
    echo "Info Obtenida $dato[0]";
    return $dato[0];  
}

/////////////////Cuenca/////////////////////////

if(isset($_POST['id_cuenca'])) {
  $add_id = $_POST['id_cuenca'];
  $add_nom = $_POST['nombre_cuenca'];
  $add_sup = $_POST['sup_cuenca'];
  $add_tipo = $_POST['tipo_cuenca'];
   
  $query1 = "INSERT into cuenca (Nombre, Superficie, Tipo) VALUES ('$add_nom','$add_sup','$add_tipo')";
  act($connect,$query1);

};




/////////////////Complejo////////////////////////

if(isset($_POST['id_complejo'])) {
  $add_id = $_POST['id_complejo'];
  $add_nom = $_POST['nombre_complejo'];
  $add_prop = $_POST['prop_complejo'];

  
  $query2 = "INSERT into complejo (Nombre) VALUES ('$add_nom')";
  //echo "Consulta query2 preparada: $query2 <br>";
  act($connect,$query2);

  //echo "Nombre del comlejo : $add_nom |||||";
  $query2_2 = "SELECT Id_complejo FROM complejo WHERE Nombre='$add_nom'";
  $IDComplejo = rec($connect, $query2_2);
  //echo "ID del comlejo obtenido: $IDComplejo |||||";
  //echo "===================================";
  //echo "Nombre de propietario : $add_prop |||||";
  $query2_3 = "SELECT Id_persona FROM persona WHERE Nombre='$add_prop'";
  $IDPersona  = rec($connect, $query2_3);
  //echo "ID de propietario obtenido: $IDPersona |||||";


  $query2_2 = "INSERT into propietario (Id_persona, Id_complejo) VALUE ('$IDPersona','$IDComplejo')";
  act($connect,$query2_2);

};

/////////////////Persona////////////////////////

if(isset($_POST['id_propie'])) {
  $add_id = $_POST['id_propie'];
  $add_nom = $_POST['nom_prop'];
  $add_correo = $_POST['corre_prop'];
  $add_tel = $_POST['tel_propi'];
  $add_dire = $_POST['dir_prop'];

  $query2 = "INSERT into persona (Id_persona, Nombre, Correo, Teléfono, Dirección) VALUES ('$add_id','$add_nom','$add_correo','$add_tel','$add_dire')";

  act($connect,$query2);
};
 

/////////////////Tipo de Presion///////////////////  | 🗸 FUNCIONA 🗸 |

  if(isset($_POST['tipo_presion'])) {   //$_POST es la variable pasada al llamar el documento desde forms.js (¿$_POST es universal?)
    $add_tipo= $_POST['tipo_presion'];  // agrega el valor de $_POST.tipo_presion a $add_tipo
    $add_obs = $_POST['obs_presion'];   // agrega el valor de $_POST.obs_presion a $add_obs
    $add_ID = $_POST['ID_presion'];
    $query3 = "INSERT into presiones (Tipo,Observacion) VALUES ('$add_tipo','$add_obs')";  //crea la insercion en SQL de la nueva informacion en la tabla presiones
    act($connect,$query3);  // ¿act() ejecuta la consulta de $query3 en la base de datos $connect? act(base de datos, consulta)
  };



//////////////////Fauna///////////////////////////

if(isset($_POST['nom_cq_fauna'])) {
    $add_ID = $_POST['id_fauna'];
    $add_nomcq= $_POST['nom_cq_fauna'];
    $add_nomci= $_POST['nom_cf_fauna'];
    $add_carac= $_POST['carac_fauna'];
    $add_img = $_POST['Dir'];

    $query4 = "INSERT into fauna (NombreColoquial, NombreCientífico, Descripción) VALUES 
    ('$add_nomcq','$add_nomci','$add_carac')";

    act($connect,$query4);

    $query4_1 = "SELECT Id_fauna FROM fauna WHERE NombreColoquial = '$add_nomcq'"; // and NombreCientífico = '$add_nomci'
    $ID_Fauna = rec($connect,$query4_1);
    //echo"$ID_Fauna |||||";
    //mostrar el contenido del array
    /*
    foreach ($add_img as $valor){
      echo" $valor";
    }
    */
   
    foreach ($add_img as $valor){
      //echo" entra al foreach |||||";

      $query4_2 = "INSERT into imagen (PATH) VALUES  ('$valor') "; //Preparacion para cargar la imagen
      act($connect,$query4_2);  //Para cargar la imagen
     
      //echo" images/$valor";
      //echo"Busca id de la imagen |||||";
      $ID_Imag = rec($connect, "SELECT Id_imagen FROM imagen where PATH = '$valor'");
      // mysqli_query($connect,"SELECT Id_imagen FROM imagen WHERE PATH = 'images/$valor'");
      //echo" ID_Imag: $ID_Imag |||||";
      //echo" Guarda en gotográfica la relacion imagen fauna |||||"; 
      $query4_3 = "INSERT into fotográfica (id_imagen, id_fauna) values ('$ID_Imag', '$ID_Fauna')";
      act($connect,$query4_3);
    
    }   
    
};
 


//////////////////Flora///////////////////////////

if(isset($_POST['nom_cq_flora'])) {
    $add_ID= $_POST['id_flora'];
    $add_nomcq= $_POST['nom_cq_flora'];
    $add_nomci= $_POST['nom_cf_flora'];
    $add_carac= $_POST['carac_flora'];
    $add_img = $_POST['Dir'];   //array con cada nombre de la imagen
    
    $query5 = "INSERT into flora (NombreColoquial, NombreCientífico, Descripcion) VALUES ('$add_nomcq','$add_nomci','$add_carac')"; // inserte flora
    act($connect,$query5);

    $query5_1 = "SELECT Id_flora FROM flora WHERE NombreColoquial = '$add_nomcq' and NombreCientífico = '$add_nomci'";
    $ID_Flora = rec($connect,$query5_1);

    foreach ($add_img as $valor){
      //  echo" entra al foreach ";
      $query5_2 = "INSERT into imagen (PATH) VALUES  ('$valor')";  //Preparacion para cargar la imagen
       act($connect,$query5_2); //Para cargar la imagen
        
     
      //  echo" images/$valor";
        $query5_31 = "SELECT Id_imagen FROM imagen WHERE PATH = '$valor'";
        $ID_Imag = rec($connect,$query5_31);
       
      //  echo"$ID_Imag";
  
        $query5_3 = "INSERT into fotográfica (id_imagen, id_flora) values ('$ID_Imag', '$ID_Flora')";
        act($connect,$query5_3);
        
      }
      
};

//////////////////////////////////////////////////

?>