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
  $add_tipo = $_POST['tipo_cuenca'];

  $query1 = "INSERT into cuenca (Id_cuenca, Nombre, Superficie, Tipo) VALUES ( 
    '$add_id', '$add_nom' , '$add_sup', '$add_tipo')";
  
  act($connect,$query1);
    //El ID de las cuencas no sería autonumérico?
};




/////////////////Complejo////////////////////////

if(isset($_POST['id_complejo'])) {
  $add_id = $_POST['id_complejo'];
  $add_nom = $_POST['nombre_complejo'];
  $add_prop = $_POST['prop_complejo'];

  $query2 = "INSERT into complejo (Id_complejo, Nombre) VALUES ('$add_id','$add_nom')";

  //El propietario tendría que ser un desplegable para seleccionarlo? y en ese caso, tendría que haber la posibilidad de crear una nueva persona que sea propietario?

  act($connect,$query2);
};


  

/////////////////Tipo de Presion///////////////////  | 🗸 FUNCIONA 🗸 |

  if(isset($_POST['tipo_presion'])) {   //$_POST es la variable pasada al llamar el documento desde forms.js (¿$_POST es universal?)
    $add_tipo= $_POST['tipo_presion'];  // agrega el valor de $_POST.tipo_presion a $add_tipo
    $add_obs = $_POST['obs_presion'];   // agrega el valor de $_POST.obs_presion a $add_obs
    $add_ID = $_POST['ID_presion'];
    $query3 = "INSERT into presiones (Id_presiones, Tipo, Observacion) VALUES ('$add_ID', $add_tipo','$add_obs')";  //crea la insercion en SQL de la nueva informacion en la tabla presiones
    act($connect,$query3);  // ¿act() ejecuta la consulta de $query3 en la base de datos $connect? act(base de datos, consulta)
  };



//////////////////Fauna///////////////////////////

if(isset($_POST['nom_cq_fauna'])) {
    $add_ID = $_POST['id_fauna'];
    $add_nomcq= $_POST['nom_cq_fauna'];
    $add_nomci= $_POST['nom_cf_fauna'];
    $add_carac= $_POST['carac_fauna'];
    $add_img = $_POST['Dir'];

    $query4 = "INSERT into fauna (Id_fauna, NombreColoquial, NombreCientífico, Descripción) VALUES 
    ('$add_ID' , '$add_nomcq','$add_nomci','$add_carac')";

    act($connect,$query4);

    //mostrar el contenido del array
    /*
    foreach ($add_img as $valor){
      echo" $valor";
    }
    */
    
    foreach ($add_img as $valor){
    //  echo" entra al foreach ";
      $query4_2 = "INSERT into imagen (PATH) VALUES  ('$valor') "; //Preparacion para cargar la imagen
      act($connect,$query4_2);  //Para cargar la imagen
      
      
    //  echo" images/$valor";
      $query4_31 = "SELECT Id_imagen FROM imagen WHERE PATH = '$valor'";
      $ID_Imag = act($connect,$query4_31);
      // mysqli_query($connect,"SELECT Id_imagen FROM imagen WHERE PATH = 'images/$valor'");
    //  echo"$ID_Imag";

      $query4_3 = "INSERT into fotográfica (Id_fotografia, id_imagen, id_fauna) values (0, '$ID_Imag', '$add_ID')";
      act($connect,$query4_3);
    }
     
   
    
    

    
};



//////////////////Flora///////////////////////////
if(isset($_POST['nom_cq_flora'])) {
    $add_ID= $_POST['id_flora'];
    $add_nomcq= $_POST['nom_cq_flora'];
    $add_nomci= $_POST['nom_cf_flora'];
    $add_carac= $_POST['carac_flora'];
    //$add_img = $_FILES['img_flora'];
    $add_img = $_POST['Dir'];   
    
    $query5 = "INSERT into flora (Id_flora, NombreColoquial, NombreCientífico, Descripcion) VALUES 
    ('$add_ID', '$add_nomcq','$add_nomci','$add_carac')"; // inserte flora
    act($connect,$query5);

    foreach ($add_img as $valor){
      //  echo" entra al foreach ";
      $query5_2 = "INSERT into imagen (PATH) VALUES  ('$valor') ";  //Preparacion para cargar la imagen
       act($connect,$query5_2); //Para cargar la imagen
        
        
      //  echo" images/$valor";
        $query5_31 = "SELECT Id_imagen FROM imagen WHERE PATH = '$valor'";
        $ID_Imag = act($connect,$query5_31);
        // mysqli_query($connect,"SELECT Id_imagen FROM imagen WHERE PATH = 'images/$valor'");
      //  echo"$ID_Imag";
  
        $query5_3 = "INSERT into fotográfica (id_imagen, id_fauna) values ('$ID_Imag', '$add_ID')";
        act($connect,$query5_3);
      }
   
   
   

    //$ID_Imag= mysqli_query($connect,"SELECT Id_imagen FROM imagen WHERE PATH= '$add_img'");
    
    //$query5_3  = "INSERT into fotográfica (id_imagen, id_flora) VALUES ('$ID_Imag','$add_ID')";
    //act($connect,$query5_3);

    //faltaría la union en la tabla fotográfica
};

//////////////////////////////////////////////////

