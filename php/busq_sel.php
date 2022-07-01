<?php
require('conexion.php');

$id = $_GET['Id_acc'];

$query = "SELECT relevamiento.*, 
                  accidente_geografico.Nombre, accidente_geografico.Tipo, accidente_geografico.Descripcion,
                 complejo.Nombre_complejo,
                 cuenca.Nombre_cuenca,
                 presiones.Id_presiones, presiones.Tipo_presiones,
                 fauna.Id_fauna,fauna.Nombre_coloquial, fauna.Nombre_científico,fauna.Descripción as DFauna, imgFauna.PATH as Img_fauna,
                 flora.Id_flora, flora.Nombre_científico as nomCienFlora,flora.Descripcion as DFlora, imgFlora.PATH as Img_flora, flora.Nombre_coloquial as nomCoqFlora,
                 imagen.Id_imagen,f.descripción, imagen.PATH 
FROM relevamiento JOIN accidente_geografico ON relevamiento.Id_acc=accidente_geografico.Id_acc 
                  LEFT JOIN complejo ON complejo.Id_complejo=accidente_geografico.Id_complejo 
                  LEFT JOIN cuenca ON cuenca.Id_cuenca=accidente_geografico.Id_cuenca 
                  LEFT JOIN contiene_presiones ON contiene_presiones.Id_acc=accidente_geografico.Id_acc 
                  LEFT JOIN presiones ON presiones.Id_presiones=contiene_presiones.Id_presiones 
                  LEFT JOIN contiene_fauna ON contiene_fauna.Id_rel=relevamiento.Id_rel 
                  LEFT JOIN fauna ON fauna.Id_fauna=contiene_fauna.Id_fauna 
                  LEFT JOIN fotográfica as fotoFauna ON fotoFauna.Id_fauna=contiene_fauna.Id_fauna 
                  LEFT JOIN imagen as imgFauna ON imgFauna.Id_imagen=fotoFauna.Id_imagen 
                  LEFT JOIN contiene_flora ON contiene_flora.Id_rel=relevamiento.Id_rel 
                  LEFT JOIN flora ON flora.Id_flora=contiene_flora.Id_flora 
                  LEFT JOIN fotográfica as fotoFlora ON fotoFlora.Id_flora=contiene_flora.Id_flora 
                  LEFT JOIN imagen as imgFlora ON imgFlora.Id_imagen=fotoFlora.Id_imagen 
                  LEFT JOIN imagen ON imagen.Id_rel=relevamiento.Id_rel 
                  LEFT JOIN fotográfica as f ON f.Id_imagen=imagen.Id_imagen 
WHERE accidente_geografico.Id_acc = $id";


/*
  "SELECT RelAcc.*, -- Referente al relevamiento
          RelAcc.Nombre, RelAcc.Tipo, RelAcc.Descripcion, -- Referente al accidente
          AccCom.Nombre_complejo,
          AccCue.Nombre_cuenca,
          AccPres.Id_presiones, AccPres.Tipo_presiones,
          RelFau.Id_fauna, RelFau.Nombre_coloquial, RelFau.Nombre_científico, RelFau.Descripción as DFauna, RelFau.PATH as Img_fauna,
          RelFlo.Id_flora, RelFlo.Nombre_científico as nomCienFlora, RelFlo.Descripcion as DFlora, RelFlo.PATH as Img_flora, RelFlo.Nombre_coloquial as nomCoqFlora,
          RelImg.Id_imagen, RelImg.PATH 
  FROM (SELECT relevamiento.*, accidente_geografico.Nombre, accidente_geografico.Tipo, accidente_geografico.Descripcion
        FROM relevamiento inner JOIN accidente_geografico 
                            ON relevamiento.Id_acc = accidente_geografico.Id_acc
        ) as RelAcc,
      (SELECT accidente_geografico.Id_acc, complejo.Nombre_complejo 
        FROM accidente_geografico LEFT JOIN complejo 
                                    ON complejo.Id_complejo = accidente_geografico.Id_complejo
        ) as AccCom,
      (SELECT accidente_geografico.Id_acc, cuenca.Nombre_cuenca
        FROM accidente_geografico LEFT JOIN cuenca 
                                    ON cuenca.Id_cuenca = accidente_geografico.Id_cuenca
        ) as AccCue,
      (SELECT presion.Id_presiones, presion.Tipo_presiones, presion.Id_acc
        FROM accidente_geografico LEFT JOIN (SELECT Id_acc, presiones.Id_presiones, Tipo_presiones 
                                          FROM presiones inner join contiene_presiones 
                                                          ON presiones.Id_presiones = contiene_presiones.Id_presiones
                                          ) as presion 
                                    ON presion.Id_acc = accidente_geografico.Id_acc
        ) as AccPres,
      -- Devuelve todas las faunas asignadas a este relevamiento junto con las imagenes respectivas a cada fauna
      (SELECT relevamiento.Id_rel, FaunaIMG.Id_fauna, FaunaIMG.Nombre_coloquial, FaunaIMG.Nombre_científico, FaunaIMG.Descripción, FaunaIMG.PATH
        FROM relevamiento LEFT join (SELECT contiene_fauna.Id_rel, faunas.Id_fauna, Nombre_coloquial, Nombre_científico, Descripción, PATH 
                                  FROM (SELECT fauna.*, fotosFauna.PATH  -- Proporciona TODAS las faunas con sus respectivas imagenes, si no tiene imagen, entonces le asigna null a la imagen, pero la fauna la devuelve
                                        FROM fauna LEFT JOIN (SELECT fotográfica.Id_fotografia, fotográfica.Id_fauna, imagen.PATH 
                                                              FROM imagen inner join fotográfica 
                                                                            ON imagen.Id_imagen=fotográfica.Id_imagen
                                                              ) as fotosFauna 
                                                    on fauna.Id_fauna = fotosFauna.Id_fauna
                                        ) as faunas 
                                        inner join contiene_fauna 
                                          on faunas.Id_fauna=contiene_fauna.Id_fauna
                                  ) as FaunaIMG 
                          ON FaunaIMG.Id_rel=relevamiento.Id_rel
        ) as RelFau,
      -- Devuelve todas las floras asignadas a este relevamiento junto con las imagenes respectivas a cada flora                           
      (SELECT relevamiento.Id_rel, FloraIMG.Id_flora, FloraIMG.Nombre_coloquial, FloraIMG.Nombre_científico, FloraIMG.Descripcion, FloraIMG.PATH
        FROM relevamiento LEFT join (SELECT contiene_flora.Id_rel, floras.Id_flora, Nombre_coloquial, Nombre_científico, Descripcion, PATH 
                                      FROM (SELECT flora.*, fotosFlora.PATH  -- Proporciona TODAS las floras con sus respectivas imagenes, si no tiene imagen, entonces le asigna null a la imagen, pero la flora la devuelve
                                            FROM flora LEFT JOIN (SELECT fotográfica.Id_fotografia, fotográfica.Id_flora, imagen.PATH 
                                                                  FROM imagen inner join fotográfica 
                                                                                ON imagen.Id_imagen=fotográfica.Id_imagen
                                                                  ) as fotosFlora 
                                                        ON flora.Id_flora = fotosFlora.Id_flora
                                            ) as floras 
                                            inner join contiene_flora ON floras.Id_flora=contiene_flora.Id_flora
                                      ) as FloraIMG 
                            ON FloraIMG.Id_rel=relevamiento.Id_rel 
        ) as RelFlo,
      (SELECT relevamiento.Id_rel, imagen.Id_imagen, imagen.PATH 
        FROM relevamiento LEFT JOIN imagen 
                            ON imagen.Id_rel=relevamiento.Id_rel 
        ) as RelImg
  WHERE RelAcc = 281 
        and RelAcc.Id_rel = RelFau.Id_rel 
        and RelAcc.Id_rel = RelFlo.Id_rel 
        and RelAcc.Id_rel = RelImg.Id_rel 
        and RelAcc.Id_acc = AccCom.Id_acc
        and RelAcc.Id_acc = AccCue.Id_acc
        and RelAcc.Id_acc = AccPres.Id_acc;
  "
*/




$q = "SELECT relevamiento.*, accidente_geografico.Nombre FROM relevamiento JOIN accidente_geografico ON relevamiento.Id_acc=accidente_geografico.Id_acc WHERE accidente_geografico.Id_acc = $id";

//echo "1";
$query = mysqli_query($connect,$query);
$json = array();
$ant = array();
$c = -1;
//echo $id;
//echo "_______________1________________";
foreach ($query as $row){
  $idacc = $row['Id_acc'];
  $idrel = $row['Id_rel'];
  $query2 = mysqli_query($connect,"SELECT * FROM accidente_geografico WHERE Id_acc = $idacc");
  foreach ($query2 as $row2){  
    $idacc = $row2['Id_acc'];
    //echo
    $nomacc = $row2['Nombre'];
    //echo
    $tipacc = $row2['Tipo'];
    //echo
    $desacc = $row2['Descripcion'];
    //echo
    $idcom = $row2['Id_complejo'];
    //echo "row2['Id_complejo']:".$row2['Id_complejo'];
    $idcuen = $row2['Id_cuenca'];
    //echo
  }
  
  /*echo "idacc: $idacc
  nomacc: $nomacc
  tipacc: $tipacc
  desacc: $desacc
  idcom: $idcom
  idcuen: $idcuen
  ";*/
  //echo "2";
  //echo "SELECT Nombre_complejo FROM complejo WHERE Id_complejo = $idcom";
  //echo "_______________2________________";
  //echo"SELECT Nombre_complejo FROM complejo WHERE Id_complejo = $idcom";
  if (!$idcom==''){
    $nomcomplejo = mysqli_query($connect,"SELECT Nombre_complejo FROM complejo WHERE Id_complejo = $idcom");
    //echo "2.1";
    foreach($nomcomplejo as $NomCom){
      //echo "2.2";
      $NComplej = $NomCom['Nombre_complejo'];
      //echo "2.3";
    }
  //echo "3";
  }
  //echo "_______________3_______________";
  $nomcuenca = mysqli_query($connect,"SELECT Nombre_cuenca FROM cuenca WHERE Id_cuenca = $idcuen");
  foreach($nomcuenca as $NomCue){
    $NCuenca = $NomCue['Nombre_cuenca'];
  }
  //echo "4";
  //echo "_______________4_______________ ";
    if($row['Id_rel'] != $ant['Id_rel']){
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
          'conductividad'=>$row['Conductividad'],
          'diversidad_vegetal'=>$row['Diversidad_vegetal'],
          'regimen_hidrologico'=>$row['Regimen_hidrológico'],
          'turbidez'=>$row['Turbidez'],
          'color'=>$row['Color'],
          'pH'=>$row['pH'],
          'superficie'=>$row['Superficie'],
          'calidad_agua'=>$row['Calidad_de_H2O'],
          'temp_agua'=>$row['Temperatura_H2O'], 
          'observaciones'=>$row['Observaciones'],
          
          //Accidente
          'Tipoacc' => $tipacc,
          'Descripcion' => $desacc,
          'Complejo' => $NComplej,
          'Cuenca' => $NCuenca,
          
          'presion'=>array(),
          'fauna'=>array(),
          'flora'=>array(),
          'img'=>array(),
          'persona'=>array(),


        ];
        $x1 = 0;
        $x2 = 0;
        $x3 = 0;
        $x4 = 0;
        $x0 = 0;
       $ant['Id_rel']=$row['Id_rel'];
    
    };
    //echo "5";
    //echo "_______________5_______________";
    $query3 = mysqli_query($connect,"SELECT Nombre_persona 
                                    FROM persona inner join (SELECT Id_Persona 
                                                              FROM miembro inner join (SELECT Id_miembro 
                                                                                       FROM investiga 
                                                                                       WHERE Id_rel = $idrel
                                                                                      ) as MiemInves on MiemInves.Id_miembro = miembro.Id_miembro
                                                            ) as IdPersMiem on IdPersMiem.Id_Persona = persona.Id_Persona" 
  );
  foreach ($query3 as $row3){  
    $ad0=true;
    foreach ($json[$c]['persona'] as $i){
      if ($i['nombre_persona'] == $row3['Nombre_persona']){
        $ad0=false;
      }
    };

    if ($ad0!=false){
      $json[$c]['persona'][$x0]=array(
        'nombre_persona' => $row3['Nombre_persona']
      );
      $x0=$x0+1;
    };
  }
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
  //echo "_______________6________________";
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
//echo $json['id_rel'];
if (json_encode($json) == "[]"){
  $qs = "SELECT Nombre, Tipo FROM accidente_geografico WHERE Id_acc = $id";
  $res = mysqli_query($connect,$qs);
  foreach ($res as $r){
    $json=[
      'id_acc'=>$id,
      'nombre'=>$r['Nombre'],
      'tipo'=>$r['Tipo'],
      'cond'=>true,
    ];
  }
}

echo json_encode($json);



//echo $json;
?>
