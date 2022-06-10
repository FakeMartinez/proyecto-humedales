<?php

include('conexion.php');

//Cargar Selects Accidente
if (isset($_POST['CargarSelects'])){
   $q_cuenca = mysqli_query($connect,"SELECT Nombre_cuenca FROM cuenca");
   $q_comp = mysqli_query($connect,"SELECT Nombre_complejo FROM complejo");
   $q_presion = mysqli_query($connect,"SELECT Tipo_presiones FROM presiones");
   $q_propie = mysqli_query($connect,"SELECT Nombre_persona FROM persona");
   $q_rol = mysqli_query($connect,"SELECT descripcion FROM rol");
   $q_fauna = mysqli_query($connect,"SELECT Nombre_coloquial FROM fauna");
   $q_flora =  mysqli_query($connect,"SELECT Nombre_coloquial FROM flora");
   $q_miembro =  mysqli_query($connect,"SELECT Id_Persona FROM miembro");


   $cue = array();
   $com = array();
   $pre = array();
   $per = array();
   $rol = array();
   $fau = array();
   $flo = array();
   $miem = array();

   while($row = mysqli_fetch_array($q_cuenca)) {
      array_push($cue, ['nombre_cuenca' => $row['Nombre_cuenca']]);
      //pone en el siguiente elemento del array $cue, con la clave nombre_cuenca, el dato Nombre_cuenca del $q_cuenca
    };
   while($row = mysqli_fetch_array($q_comp)) {
      array_push($com , ['nombre_complejo' => $row['Nombre_complejo']]);
    };
   while($row = mysqli_fetch_array($q_presion)) {
      array_push($pre, ['tipo_presion' => $row['Tipo_presiones']]);
    };
   while($row = mysqli_fetch_array($q_propie)) {
      array_push($per, ['nom_prop' => $row['Nombre_persona']]);
    };
   while($row = mysqli_fetch_array($q_rol)) {
      array_push($rol, ['tipo' => $row['descripcion']]);
    };
   while($row = mysqli_fetch_array($q_fauna)) {
      array_push($fau, ['fauna' => $row['Nombre_coloquial']]);
   };
   while($row = mysqli_fetch_array($q_flora)) {
      array_push($flo, ['flora' => $row['Nombre_coloquial']]);
   };

   foreach($q_miembro as $q_miem){
      foreach($q_miem as $m){
         $personaMiem =  mysqli_query($connect,"SELECT Nombre_persona FROM persona WHERE Id_persona= $m");
         while($row = mysqli_fetch_array($personaMiem)) {
            array_push($miem, ['miembro' => $row['Nombre_persona']]);
         };
      } 
   }
  


    $cosa = [
      "cuencas"=> $cue,
      "complejos"=> $com,
      "presiones"=> $pre,
      "personas"=> $per,
      "roles"=> $rol,
      "fauna"=> $fau,
      "flora"=> $flo,
      "miembros" => $miem,
    ];

    $jsoncosa = json_encode($cosa);
   echo ($jsoncosa);
}



//Modificar datos en BD
if (isset($_POST['ModiAcc'])){
   $IdAcc=$_POST['IdAccidente'];
   $NomAcc=$_POST['NombreAccidente'];
   $TipoAcc=$_POST['TipoAccidente'];
   $CuenAcc=$_POST['CuencaAccidente'];
   $CompAcc=$_POST['ComplejaAccidente'];
   $PresAcc=$_POST['PresionAccidente'];
   $DescAcc=$_POST['DescripcionAccidente'];
     
   $ResIDCuen=mysqli_query($connect,"SELECT Id_cuenca FROM cuenca WHERE Nombre_cuenca='$CuenAcc'");
   $ResIDComp=mysqli_query($connect,"SELECT Id_complejo FROM complejo WHERE Nombre_complejo='$CompAcc'");

   foreach($ResIDCuen as $IDCue){
      foreach($IDCue as $IC){
         $IDCuen = $IC;
      }
   }
   foreach($ResIDComp as $IDCom){
      foreach($IDCom as $IC){
         $IDComp = $IC;
      }
   }

   $ConsulUpdate = "UPDATE accidente_geografico SET Nombre='$NomAcc', Tipo='$TipoAcc', Id_cuenca='$IDCuen', Id_complejo='$IDComp', Descripcion='$DescAcc' WHERE Id_acc = $IdAcc";

   mysqli_query($connect, $ConsulUpdate);
   
   //Consulta para obtener todas las IDs de las relaciones de presiones y cuencas pertenecientes a esta cuenca
   $Contiene_presiones = mysqli_query($connect,"SELECT Id_presiones FROM contiene_presiones WHERE Id_acc=$IdAcc");

 //=======================================================================================
   // Se borran todas las relaciones presion cuenca de la cuenca a modificar
   $CondDelet = true;
   foreach($Contiene_presiones as $Cont_Pres){
      foreach($Cont_Pres as $CoPr){ //Obtiene las IDs de las presiones de contiene_presiones del accidente a modificar
         $Nom_Presion = mysqli_query($connect,"SELECT Tipo_presiones FROM presiones WHERE Id_presiones=$CoPr");
         foreach($Nom_Presion as $Nom_Pres){
            foreach($Nom_Pres as $NoPr){ //Obtengo el Nombre de la presion
               $CondDelet = true;
               for($i=0; $i<count($PresAcc);$i++){ //Se pasan por cada uno de las presiones asignadas en los selects
                  if($PresAcc[$i] == $NoPr){ //se comprueba que la presion del select en [i] no coinsida con el apuntado en la BD. Si coincide entonces no lo va a borrar de la BD 
                     //Desconfirma el DELETE
                     $CondDelet=false;
                  }
               }
               if ($CondDelet){ //si $CondDelet es verdadero, borra
                  //Borra el dato de la BD
                  $Id_presion = mysqli_query($connect,"SELECT Id_presiones FROM presiones WHERE Tipo_presiones='$NoPr'");
                  foreach($Id_presion as $Id_pres){
                     foreach($Id_pres as $IdPr){
                        mysqli_query($connect,"DELETE FROM contiene_presiones WHERE Id_acc = $IdAcc and Id_presiones=$IdPr");
                     }
                  }
               }else{
                  //no borra datos
               }
            }
         }
         
      }
   }
   //=======================================================================================
   //Se crean todas las nuevas relaciones de propietario de este complejo a modificar.
   //Se buscan las IDs de las personas
   $CondInsert = true;
   for($i=0; $i<count($PresAcc);$i++){
      $CondInsert = true;
      foreach($Contiene_presiones as $Cont_pres){
         foreach($Cont_pres as $CoPr){ //Apunta a cada una de las IDs de las presiones encontradas en Contiene_presiones
            //Obtiene el nombre(tipo) de cada una de las IDs de $Cont_pres
            $Tipo_Presion = mysqli_query($connect,"SELECT Tipo_presiones FROM presiones WHERE Id_presiones=$CoPr");
            foreach($Tipo_Presion as $Tipo_Pres){
               foreach($Tipo_Pres as $TiPr){ // Aputa a cada tipo obtenido con la consulta
                  if($PresAcc[$i] == $TiPr){ // Si el tipo en $TiPr coinside con el tipo en $PresAcc en [i] entonces asigna false al Insert. Lo que indica que no se debe cargar esta presion a la BD porque ya está cargada
                     //desconfirma la insercion
                     $CondInsert = false;
                  }else{
                  }
               }
            }
         }
      }
      if ($CondInsert){
         //inserta
         $Suport = $PresAcc[$i];
         $Id_Presion = mysqli_query($connect,"SELECT Id_presiones FROM presiones WHERE Tipo_presiones='$Suport'");

         foreach($Id_Presion as $Id_Pre){
            foreach($Id_Pre as $IdPr){
               mysqli_query($connect,"INSERT into contiene_presiones (Id_acc, Id_presiones) VALUES ($IdAcc, $IdPr)");
            }
         }
      }else{
         //No inserta
      }
   }

// FIN MODIFICACION DE ACCIDENTES GEOGRAFICOS
}

if (isset($_POST['ModiComp'])){
   
   $IdCom=$_POST['IdComplejo'];
   $NomCom=$_POST['NombreComplejo'];
   $PropCom=$_POST['PropietariosComplejo'];


   $ConsulUpdate = "UPDATE complejo SET Nombre_complejo='$NomCom' WHERE Id_complejo = $IdCom";
   mysqli_query($connect, $ConsulUpdate);

   //Consulta para obtener todas las IDs de las relaciones de persona y complejo para definir los propietarios de este complejo
   $Contiene_propietarios = mysqli_query($connect,"SELECT Id_persona FROM propietario WHERE Id_complejo=$IdCom");

   //=======================================================================================
   // Se borran todas las relaciones presion cuenca de la cuenca a modificar
   $CondDelet = true;
   foreach($Contiene_propietarios as $Cont_Prop){
      foreach($Cont_Prop as $CoPr){
         $Nom_propie = mysqli_query($connect,"SELECT Nombre_persona FROM persona WHERE Id_persona=$CoPr");
         foreach($Nom_propie as $Nom_prop){
            foreach($Nom_prop as $NoPr){
               $CondDelet = true;
               for($i=0; $i<count($PropCom);$i++){
                  if($PropCom[$i] == $NoPr){
                     //Confirma el DELETE
                     $CondDelet=false;
                  }
               }
               if ($CondDelet){
                  //Borra el dato de la BD
                  $Id_persona = mysqli_query($connect,"SELECT Id_persona FROM persona WHERE Nombre_persona='$NoPr'");
                  foreach($Id_persona as $Id_per){
                     foreach($Id_per as $IdPe){
                        mysqli_query($connect,"DELETE FROM propietario WHERE Id_persona = $IdPe and Id_complejo=$IdCom");
                     }
                  }
               }else{
                  //no borra datos
               }
            }
         }
         
      }
   }
   //=======================================================================================
   //Se crean todas las nuevas relaciones de propietario de este complejo a modificar.
   //Se buscan las IDs de las personas
   $CondInsert = true;
   for($i=0; $i<count($PropCom);$i++){
      $CondInsert = true;
      foreach($Contiene_propietarios as $Cont_Prop){
         foreach($Cont_Prop as $CoPr){
            $Nom_propie = mysqli_query($connect,"SELECT Nombre_persona FROM persona WHERE Id_persona=$CoPr");
            foreach($Nom_propie as $Nom_prop){
               foreach($Nom_prop as $NoPr){
                  if($PropCom[$i] == $NoPr){
                     //desconfirma la insercion
                     $CondInsert = false;
                  }
               }
            }
         }
      }
      if ($CondInsert){
         //inserta
         $Suport = $PropCom[$i];
         $Id_persona = mysqli_query($connect,"SELECT Id_persona FROM persona WHERE Nombre_persona='$Suport'");
         foreach($Id_persona as $Id_per){
            foreach($Id_per as $IdPe){
               mysqli_query($connect,"INSERT into propietario (Id_persona, Id_complejo) VALUES ($IdPe, $IdCom)");
            }
         }
      }else{
         //No inserta
      }
   }
// FIN MODIFICACION DE COMPLEJOS
}

if (isset($_POST['ModiCue'])){
   $IdCue=$_POST['IdCuenca'];
   $NomCue=$_POST['NombreCuenca'];
   $SuperCue=$_POST['SuperficieCuenca'];
   $TipoCue=$_POST['TipoCuenca'];

   $ConsulUpdate = "UPDATE cuenca SET Nombre_cuenca='$NomCue', Superficie='$SuperCue', Tipo_cuenca='$TipoCue' WHERE Id_cuenca = $IdCue";

   mysqli_query($connect, $ConsulUpdate);
 
// FIN MODIFICACION DE CUENCAS
}

if (isset($_POST['ModiRele'])){
   $IdRel=$_POST['IdRel'];
   $FechaRel=$_POST['FechaRel'];
   $ConducRel=$_POST['ConductividadRel'];
   $AnchoRel=$_POST['AnchoRel'];
   $LargoRel=$_POST['LargoRel'];
   $SuperRel=$_POST['SuperficieRel'];
   $OxDisRel=$_POST['OxigenoDisueltoRel'];
   $TurAguaRel=$_POST['TurvidesAguaRel'];
   $PHRel=$_POST['PHRel'];
   $ColAgRel=$_POST['ColorAguaRel'];
   $TempAgRel=$_POST['TemperaturaAguaRel'];
   $ObsRel=$_POST['ObservacionRel'];

   $CaliAgua=$_POST['CalidadAgua'];
   $DivVeg=$_POST['DiversidadVegetal'];
   $RegHid=$_POST['RegimenHidro'];
   $TiemPerm=$_POST['TiempoPermanencia'];
   $Fuente=$_POST['Fuente'];

   //Arrays
   $Rels=$_POST['Relevadores']; //investiga
   $Fauna=$_POST['Fauna']; //contiene fauna
   $Flora=$_POST['Flora']; //contiene flora
     

   //UPDATE Tabla Relevamiento
   $ConsulUpdate = "UPDATE relevamiento 
                           SET Fecha = '$FechaRel',
                               Conductividad = $ConducRel, 
                               Ancho = $AnchoRel, 
                               O2_disuelto = $OxDisRel, 
                               Calidad_de_H2O = '$CaliAgua',
                               Diversidad_vegetal = '$DivVeg', 
                               Regimen_hidrológico = '$RegHid',
                               Turbidez = '$TurAguaRel',
                               Largo = $LargoRel,
                               pH = $PHRel,
                               Color = '$ColAgRel',
                               Fuente = '$Fuente',
                               Tiempo = '$TiemPerm',
                               Superficie = $SuperRel,
                               Temperatura_H2O = $TempAgRel,
                               Observaciones = '$ObsRel'
                           WHERE Id_rel = $IdRel";


   mysqli_query($connect, $ConsulUpdate);
   // DELETE e INSERT de la tabla investiga
   //Consulta para obtener todas las IDs de los miembros en las relaciones investiga pertenecientes a este relevamiento
   $Investiga = mysqli_query($connect,"SELECT Id_miembro FROM investiga WHERE Id_rel=$IdRel");
   //=======================================================================================
   // Se borran todas las relaciones miembro relevamiento del relevamiento a modificar
   $CondDeletRels = true;
   foreach($Investiga as $Investi){
      foreach($Investi as $Inv){ //Obtiene las IDs de los miembros de investiga
         $Id_Personas = mysqli_query($connect,"SELECT Id_persona FROM miembro WHERE Id_miembro=$Inv");
         foreach($Id_Personas as $IdPersona){
            foreach($IdPersona as $IdP){ //Obtengo la Id de la persona de la tabla miembro
               $Nombre_Personas = mysqli_query($connect,"SELECT Nombre_persona FROM persona WHERE Id_persona=$IdP");
               foreach($Nombre_Personas as $NombrePersona){
                  foreach($NombrePersona as $NoPe){
                     $CondDeletRels = true;
                     if (!empty($Rels)){ // Comprueba si se le está asignando algún rol
                        for($i=0; $i<count($Rels);$i++){ //Se pasan por cada uno de los relevadores asignados en los selects
                           if($Rels[$i] == $NoPe){ //se comprueba que el nombre del relevador del select en [i] no coinsida con el apuntado en la BD. Si coincide entonces no lo va a borrar de la BD 
                              //Desconfirma el DELETE
                              $CondDeletRels=false;
                           }
                        }
                     }
                     if ($CondDeletRels){ //si $CondDeletRels es verdadero, borra
                        //Borra el dato de la BD
                        $Id_Persona = mysqli_query($connect,"SELECT Id_persona FROM persona WHERE Nombre_persona='$NoPe'");
                        foreach($Id_Persona as $IdPers){
                           foreach($IdPers as $IdPe){
                              $Id_miembro = mysqli_query($connect,"SELECT Id_miembro FROM miembro WHERE Id_persona=$IdPe");
                              foreach($Id_miembro as $Idmiem){
                                 foreach($Idmiem as $IdMi){
                                    mysqli_query($connect,"DELETE FROM investiga WHERE Id_rel=$IdRel and Id_miembro=$IdMi");
                                 }
                              }
                           }
                        }
                     }else{
                        //no borra datos
                     }
                  } 
               }
            }
         }
      }
   }
   //=======================================================================================
   //Se crean todas las nuevas relaciones de propietario de este complejo a modificar.
   //Se buscan las IDs de las personas
   $CondInsertRels = true;
   for($i=0; $i<count($Rels);$i++){
      $CondInsertRels = true;
      foreach($Investiga as $Inves){
         foreach($Inves as $Inv){ //Apunta a cada una de las IDs de los miembros encontrados en la tabla investiga
            //Obtiene la id de la persona de cada una de las IDs de de miembros
            $Id_Personas = mysqli_query($connect,"SELECT Id_persona FROM miembro WHERE Id_miembro=$Inv");
            foreach($Id_Personas as $IdPersona){
               foreach($IdPersona as $IdPers){ // Aputa a cada Id de persona obtenido con la consulta
                  $Nombre_Personas = mysqli_query($connect,"SELECT Nombre_persona FROM persona WHERE Id_persona=$IdPers");
                  foreach($Nombre_Personas as $NomPer){
                     foreach($NomPer as $NP){
                        if($Rels[$i] == $NP){ // Si el nombre en $NP coinside con el tipo en $Rels en [i] entonces asigna false al Insert. Lo que indica que no se debe cargar este relevador a la BD porque ya está cargada
                           //desconfirma la insercion
                           $CondInsertRels = false;
                        }else{
                        }
                     }
                  }
               }
            }
         }
      }
      if ($CondInsertRels){
         //inserta
         $Suport = $Rels[$i];
         $Id_Persona = mysqli_query($connect,"SELECT Id_persona FROM persona WHERE Nombre_persona='$Suport'");
         foreach($Id_Persona as $Id_Per){
            foreach($Id_Per as $IdPe){
               $Id_miembro = mysqli_query($connect,"SELECT Id_miembro FROM miembro WHERE Id_persona=$IdPe");
               foreach($Id_miembro as $Idmiem){
                  foreach($Idmiem as $IdM){
                     mysqli_query($connect,"INSERT into investiga (Id_miembro, Id_rel) VALUES ($IdM, $IdRel)");
                  }
               }
            }
         }
      }else{
         //No inserta
      }
   }

   // DELETE e INSERT de la tabla contiene fauna
   //Consulta para obtener todas las IDs de la fauna en las relaciones contiene_fauna pertenecientes a este relevamiento
   $Cont_fauna = mysqli_query($connect,"SELECT Id_fauna FROM contiene_fauna WHERE Id_rel=$IdRel");
   //=======================================================================================
   // Se borran todas las relaciones miembro relevamiento del relevamiento a modificar
   $CondDeletFau = true;
   foreach($Cont_fauna as $Confau){
      foreach($Confau as $Cf){ //Obtiene las IDs de las faunas de contiene fauna
         $Nombre_Faunas = mysqli_query($connect,"SELECT Nombre_coloquial FROM fauna WHERE Id_fauna=$Cf");
         foreach($Nombre_Faunas as $NombreFauna){
            foreach($NombreFauna as $NoFa){ //Obtengo los nombres de la fauna de la tabla fauna
               $CondDeletFau = true;
               if (!empty($Fauna)){ // Comprueba si se le está vacío
                  for($i=0; $i<count($Fauna);$i++){ //Se pasan por cada uno de los animales asignados en los selects
                     if($Fauna[$i] == $NoFa){ //se comprueba que el nombre del animal del select en [i] no coinsida con el apuntado en la BD. Si coincide entonces no lo va a borrar de la BD 
                        //Desconfirma el DELETE
                        $CondDeletFau=false;
                     }
                  }
               }
               if ($CondDeletFau){ //si $CondDeletFau es verdadero, borra
                  //Borra el dato de la BD
                  $Id_Faunas = mysqli_query($connect,"SELECT Id_fauna FROM fauna WHERE Nombre_coloquial='$NoFa'");
                     foreach($Id_Faunas as $IdFauna){
                        foreach($IdFauna as $IdFa){
                           mysqli_query($connect,"DELETE FROM contiene_fauna WHERE Id_rel=$IdRel and Id_fauna=$IdFa");
                        }
                     }
               }else{
                  //no borra datos
               }
            }
         }
      }
   }
   //=======================================================================================
   //Se crean todas las nuevas relaciones de propietario de este complejo a modificar.
   //Se buscan las IDs de las personas
   $CondInsertFau = true;         
   for($i=0; $i<count($Fauna);$i++){
      $CondInsertFau = true;         
      foreach($Cont_fauna as $ContFau){      
         foreach($ContFau as $CF){ //Apunta a cada una de las IDs de los miembros encontrados en la tabla investiga
            //Obtiene la id de la persona de cada una de las IDs de de miembros
            $Nombre_Fauna = mysqli_query($connect,"SELECT Nombre_coloquial FROM fauna WHERE Id_fauna=$CF");
            foreach($Nombre_Fauna as $NomFauna){
               foreach($NomFauna as $NF){ // Aputa a cada Id de persona obtenido con la consulta
                  if($Fauna[$i] ==  $NF){ // Si el nombre en $NP coinside con el tipo en $Rels en [i] entonces asigna false al Insert. Lo que indica que no se debe cargar este relevador a la BD porque ya está cargada
                     //desconfirma la insercion
                     $CondInsertFau = false;
                  }else{
                  }
               }
            }
         }
      }
      if ($CondInsertFau){
         //inserta
         $Suport = $Fauna[$i];
         $Id_fauna = mysqli_query($connect,"SELECT Id_fauna FROM fauna WHERE Nombre_coloquial='$Suport'");
         foreach($Id_fauna as $Idfau){
            foreach($Idfau as $IdF){
               mysqli_query($connect,"INSERT into contiene_fauna (Id_fauna, Id_rel) VALUES ($IdF, $IdRel)");
            }
         }
      }else{
         //No inserta
      }
   }

    // DELETE e INSERT de la tabla contiene flora
   //Consulta para obtener todas las IDs de la fauna en las relaciones contiene_fauna pertenecientes a este relevamiento
   $Cont_flora = mysqli_query($connect,"SELECT Id_flora FROM contiene_flora WHERE Id_rel=$IdRel");

   //=======================================================================================
   // Se borran todas las relaciones miembro relevamiento del relevamiento a modificar
   $CondDeletFlo = true;
   foreach($Cont_flora as $Conflo){
      foreach($Conflo as $Cf){ //Obtiene las IDs de las floras de contiene fauna
         $Nombre_Floras = mysqli_query($connect,"SELECT Nombre_coloquial FROM flora WHERE Id_flora=$Cf");
         foreach($Nombre_Floras as $NombreFlora){
            foreach($NombreFlora as $NoFl){ //Obtengo los nombres de la fauna de la tabla fauna
               $CondDeletFlo = true;
               if (!empty($Flora)){ // Comprueba si se le está vacío
                  for($i=0; $i<count($Flora);$i++){ //Se pasan por cada uno de los animales asignados en los selects
                     if($$Flora[$i] == $NoFl){ //se comprueba que el nombre del animal del select en [i] no coinsida con el apuntado en la BD. Si coincide entonces no lo va a borrar de la BD 
                        //Desconfirma el DELETE
                        $CondDeletFlo=false;
                     }
                  }
               }
               if ($CondDeletFlo){ //si $CondDeletFau es verdadero, borra
                  //Borra el dato de la BD
                  $Id_Floras = mysqli_query($connect,"SELECT Id_flora FROM flora WHERE Nombre_coloquial='$NoFl'");
                     foreach($Id_Floras as $IdFlora){
                        foreach($IdFlora as $IdFl){
                           mysqli_query($connect,"DELETE FROM contiene_flora WHERE Id_rel=$IdRel and Id_flora=$IdFl");
                        }
                     }
               }else{
                  //no borra datos
               }
            }
         }
      }
   }
   //=======================================================================================
   //Se crean todas las nuevas relaciones de propietario de este complejo a modificar.
   //Se buscan las IDs de las personas
   $CondInsertFlo = true;
   for($i=0; $i<count($Flora);$i++){
      $CondInsertFlo = true;
      foreach($Cont_flora as $ContFlo){
         foreach($ContFlo as $CF){ //Apunta a cada una de las IDs de los miembros encontrados en la tabla investiga
            //Obtiene la id de la persona de cada una de las IDs de de miembros
            $Nombre_Flora = mysqli_query($connect,"SELECT Nombre_coloquial FROM flora WHERE Id_flora=$CF");
            foreach($Nombre_Flora as $NomFlora){
               foreach($NomFlora as $NF){ // Aputa a cada Id de persona obtenido con la consulta
                  if($Flora[$i] ==  $NF){ // Si el nombre en $NP coinside con el tipo en $Rels en [i] entonces asigna false al Insert. Lo que indica que no se debe cargar este relevador a la BD porque ya está cargada
                     //desconfirma la insercion
                     $CondInsertFlo = false;
                  }else{
                  }
               }
            }
         }
      }
      if ($CondInsertFlo){
         //inserta
         $Suport = $Flora[$i];
         $Id_flora = mysqli_query($connect,"SELECT Id_flora FROM flora WHERE Nombre_coloquial='$Suport'");
         foreach($Id_flora as $Idflo){
            foreach($Idflo as $IdF){
               mysqli_query($connect,"INSERT into contiene_flora (Id_flora, Id_rel) VALUES ($IdF, $IdRel)");
            }
         }
      }else{
         //No inserta
      }
   }

// FIN MODIFICACION DE RELEVAMIENTO
}

if (isset($_POST['ModiFau'])){
   $IdFau=$_POST['IdFau'];
   $NomColFau=$_POST['NombreColFau'];
   $NomCienFau=$_POST['NombreCienFau'];
   $DescripFau=$_POST['DescripcionFau'];

   $ConsulUpdate = "UPDATE fauna SET Nombre_coloquial='$NomColFau', Nombre_científico='$NomCienFau', Descripción='$DescripFau' WHERE Id_fauna = $IdFau";

   mysqli_query($connect, $ConsulUpdate);
 
// FIN MODIFICACION DE FAUNA
}

if (isset($_POST['ModiFlo'])){
   $IdFlo=$_POST['IdFlo'];
   $NomColFlo=$_POST['NombreColFlo'];
   $NomCienFlo=$_POST['NombreCienFlo'];
   $DescripFlo=$_POST['DescripcionFlo'];

   $ConsulUpdate = "UPDATE flora SET Nombre_coloquial='$NomColFlo', Nombre_científico='$NomCienFlo', Descripcion='$DescripFlo' WHERE Id_flora = $IdFlo";

   mysqli_query($connect, $ConsulUpdate);
 
// FIN MODIFICACION DE FLORA
}

if (isset($_POST['ModiPres'])){
   $IdPre=$_POST['IdPres'];
   $TipPre=$_POST['TipoPres'];
   $ObsPre=$_POST['ObservacionPres'];

   $ConsulUpdate = "UPDATE presiones SET Tipo_presiones='$TipPre', Observacion='$ObsPre' WHERE Id_presiones = $IdPre";
 //echo ($ConsulUpdate);
   mysqli_query($connect, $ConsulUpdate);
 
// FIN MODIFICACION DE FLORA
}

if (isset($_POST['ModiPers'])){
   $IdPersona=$_POST['IdPersona'];
   $NombrePers=$_POST['NombrePersona'];
   $CorreoPers=$_POST['CorreoPersona'];
   $telPers=$_POST['telefonoPersona'];
   $direPers=$_POST['direccionPersona'];

   //$RolesPers=$_POST['RolesPersona'];
   //$PropiPers=$_POST['PropiedadesPersona'];

   

   $ConsulUpdate = "UPDATE persona SET Nombre_persona='$NombrePers', Correo='$CorreoPers', Teléfono=$telPers, Dirección='$direPers' WHERE Id_persona = $IdPersona";
   //echo ($ConsulUpdate);
   mysqli_query($connect, $ConsulUpdate);
   echo("hecha consulta");
   /*
   $IdsPersMiembro = mysqli_query($connect,"SELECT Id_Persona FROM miembro");
   foreach($IdsPersMiembro as $IdPeMi){
      foreach($IdPeMi as $IdPM){
         if ($IdPM == $IdPersona){
            $IdMiem=mysqli_query($connect,"SELECT Id_miembro FROM miembro WHERE Id_Persona=$IdPM");
            foreach($IdMiem as $IdMi){
               foreach ($IdMi as $IM){
                  if (!empty($RolesPers)){ // Comprueba si se le está asignando algún rol
                     echo("RolesPers tiene almenos un dato");
                  }else{
                     mysqli_query($connect,"DELETE FROM tiene_rol WHERE Id_miembro=$IM");
                  }
                  mysqli_query($connect,"SELECT Id_rol FROM tiene_rol WHERE Id_miembro=$IM");
               }
            }

         }
      }
   }*/
  
   //se comprueba que la pesona es miembro
/*
   //desasignacion de roles
   $q_rol = mysqli_query($connect,"SELECT descripcion FROM rol"); //Obtengo todos los roles disponibles
   foreach($q_rol as $rol) {
      foreach($rol as $r){

      }
   }*/

// FIN MODIFICACION DE FLORA
}





//===========================================================================================
//Para Accidentes 
if (isset($_POST['accidente'])){
   $Consulta = "SELECT * FROM accidente_geografico;";
   $resulta = mysqli_query($connect, $Consulta);
   $cosa = "
      <table>
         <tr style='height:40px'>
            <td style='width:50px; min-width: 50px;'></td> 
            <td style='width:70px; min-width: 70px;'>ID</td> 
            <td style='width:225px; min-width: 225px;'>Nombre</td>
            <td style='width:225px; min-width: 225px;'>Tipo</td>
            <!--<td style='width:225px; min-width: 225px;'>objeto_geo</td>-->
            <td style='width:225px; min-width: 225px;'>id_complejo</td>
            <td style='width:225px; min-width: 225px;'>Id_cuenca</td>
            <td style='width:225px; min-width: 225px;'>Presiones</td>
            <td style='width:225px; min-width: 225px;'>Descripcion</td>
         </tr>";
   $C= 0;
   $F= 0;
   foreach($resulta as $Fil){
      $cosa = $cosa."<tr id='tr$F' style='height: 80px;'>";
      $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button id='Macc$F' onclick='ModifData($F, IDAcc$F, tr$F);' type='button' style='background: orange;position: relative;float: right;'><i class='fa-solid fa-pen'></i></button></td>";
      $suport = '';
      $suportPres = '';
      foreach($Fil as $Col){
         if ($C == 0){ //ID
            $cosa = $cosa."<td id='IDAcc$F' style='width:70px; min-width: 70px;'>$Col</td>";

            //buscar presiones
            $IdsPres=mysqli_query($connect, "SELECT Id_presiones FROM contiene_presiones WHERE Id_acc=$Col");
            $suportPres = $suportPres."<td style='width:70px; min-width: 70px;'>";
            foreach ($IdsPres as $IdPre){
               foreach ($IdPre as $IDP){
                  $NomPres=mysqli_query($connect, "SELECT Tipo_presiones FROM presiones WHERE Id_presiones=$IDP");
                  foreach ($NomPres as $NoPre){
                     foreach ($NoPre as $NP){
                        
                        $suportPres = $suportPres."► $NP<br>";
                     }
                  }
               }
            }
            $suportPres = $suportPres."</td>";
         }else{
            if ($C == 1){ //Nombre
               //$cosa = $cosa."<td style='width:225px; min-width: 225px;'><input value=$Col></input></td>";
               $cosa = $cosa."<td style='width:225px; min-width: 225px;'>$Col</td>";
            }else{
               if ($C == 2){ //Tipo
                  //$cosa = $cosa."<td style='width:225px; min-width: 225px;'><input value=$Col></input></td>";
                  $cosa = $cosa."<td style='width:225px; min-width: 225px;'>$Col</td>";
               }else{
                  if ($C == 3){ //Descripcion
                     //$cosa = $cosa."<td style='width:225px; min-width: 225px;'><input value=$Col></input></td>";
                     $suport = "<td style='height: inherit; overflow: auto; width:425px; min-width: 425px;'><div style='height: inherit;'>$Col</div></td>";
                  }else{
                     if ($C == 4){ //Objeto geometrico
                        //Nada, es el objeto geometrico y no se escribe
                     }else{
                        if ($C == 5){ //Id_complejo
                           if ($Col!=null){ // Si es distinto de NULL el id de complejo, entonces busca el nombre del complejo para escribirlo en lugar de la id
                              //echo ("COl". $Col);
                              $nomcomple=mysqli_query($connect, "SELECT Nombre_complejo FROM complejo WHERE Id_complejo=$Col");
                              foreach ($nomcomple as $NCom){
                                 foreach($NCom as $NC){
                                    //echo ("nomcomple:". $NC);
                                    $cosa = $cosa."<td style='width:225px; min-width: 225px;'>$NC</td>";
                                 }
                              }
                           }else{
                              $cosa = $cosa."<td style='width:225px; min-width: 225px;'>-</td>";
                           }
                        }else{
                           if ($C == 6){//Id_cuenca
                              if ($Col!=null){ // Si es distinto de NULL el id de complejo, entonces busca el nombre del complejo para escribirlo en lugar de la id
                                 //echo ("COl". $Col);
                                 $nomcomple=mysqli_query($connect, "SELECT Nombre_cuenca FROM cuenca WHERE Id_cuenca=$Col");
                                 foreach ($nomcomple as $NCom){
                                    foreach($NCom as $NC){
                                       //echo ("nomcomple:". $NC);
                                       $cosa = $cosa."<td style='width:225px; min-width: 225px;'>$NC</td>";
                                    }
                                 }
                              }else{
                                 $cosa = $cosa."<td style='width:225px; min-width: 225px;'>-</td>";
                              }
                           }                                                
                        }
                     }
                  }
               }
            }
         }
         $C++;
      }
      $cosa = $cosa.$suportPres;
      $cosa = $cosa.$suport;
      $cosa = $cosa."</tr>";
      $C=0;
      $F=$F+1;
   }
   $cosa = $cosa."</table>";
   echo $cosa;
}else
{}

//===========================================================================================
//Para Complejos
if (isset($_POST['complejo'])){
   $Consulta = "SELECT * FROM complejo;";
   $resulta = mysqli_query($connect, $Consulta);
   $cosa = "
      <table>
         <tr style='height:40px'>
            <td style='width:50px; min-width: 50px;'></td> 
            <td style='width:70px; min-width: 70px;'>ID</td> 
            <td style='width:300px; min-width: 300px;'>Nombre</td>
            <td style='width:300px; min-width: 300px;'>Propietario</td>
         </tr>";
   $C= 0;
   $F= 0;
   foreach($resulta as $Fil){
      $cosa = $cosa."<tr id='tr$F' style='height:40px'>";
      $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button id='Mcom$F' onclick='ModifData($F, IDCom$F, tr$F);' type='button' style='background: orange;position: relative;float: right;'><i class='fa-solid fa-pen'></button></td>";
      foreach($Fil as $Col){
         if ($C == 0){//ID
            $cosa = $cosa."<td id='IDCom$F'>$Col</td>";
         }else
         {
            if ($C == 1){ //Nombre
               $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";

               $IdComp = mysqli_query($connect, "SELECT Id_complejo FROM complejo WHERE Nombre_complejo='$Col'");

               foreach($IdComp as $IdCom){
                  foreach($IdCom as $IC){
                     $IdProp = mysqli_query($connect,"SELECT Id_persona FROM propietario WHERE Id_complejo='$IC'");
                  }
               }
              
               $cosa = $cosa."<td id='IDPropCom$F' style='width:70px; min-width: 70px;'>";

               foreach($IdProp as $IPr){
                  foreach($IPr as $PR){
                     $NomProp = mysqli_query($connect,"SELECT Nombre_persona FROM persona WHERE Id_persona='$PR'");
                     foreach($NomProp as $NPr){
                        foreach($NPr as $NP){
                           $cosa = $cosa."<a>► $NP</a><br>";
                        }
                     }
                     
                  }
               }
               $cosa = $cosa."</td>";
            }else
            {
               //$cosa = $cosa."<td style='width:300px; min-width: 300px;'><input value='$Col' style='width:275px; min-width: 275px;'></input></td>";
            }
         }
         $C++;
      }
      $cosa = $cosa."</tr>";
      $C=0;
      $F=$F+1;
   }
   $cosa = $cosa."</table>";
   echo $cosa;
}else
{}

//===========================================================================================
//Para Cuencas
if (isset($_POST['cuenca'])){
   $Consulta = "SELECT * FROM cuenca";
   $resulta = mysqli_query($connect, $Consulta);
   $cosa = "
      <table>
         <tr style='height:40px'>
            <td style='width:50px; min-width: 50px;'></td> 
            <td style='width:70px; min-width: 70px;'>ID</td> 
            <td style='width:300px; min-width: 300px;'>Nombre</td>
            <td style='width:300px; min-width: 300px;'>Superficie</td>
            <td style='width:300px; min-width: 300px;'>Tipo</td>
         </tr>";
   $C= 0;
   $F= 0;
   foreach($resulta as $Fil){
      $cosa = $cosa."<tr id='tr$F' style='height:40px'>";
      $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button id='Mcue$F' onclick='ModifData($F, IDCue$F, tr$F);' type='button' style='background: orange;position: relative;float: right;'><i class='fa-solid fa-pen'></button></td>";

      foreach($Fil as $Col){
         if ($C == 0){//ID
            $cosa = $cosa."<td id='IDCue$F'>$Col</td>";
         }else
         {
            if ($C == 1){ //Nombre
               $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
            }else
            {
               if ($C == 2){ //Superficie
                  $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
               }else{
                  if ($C == 3){ //Tipo
                     $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
                  }
               }
            }
         }
         $C++;
      }
      $cosa = $cosa."</tr>";
      $C=0;
      $F=$F+1;
   }
   $cosa = $cosa."</table>";
   echo $cosa;
}else
{}

//===========================================================================================
//Para Relevamiento
if (isset($_POST['relevamiento'])){
   $Consulta = "SELECT * FROM relevamiento";
   $resulta = mysqli_query($connect, $Consulta);
   $cosa = "
      <table>
         <tr style='height:40px'>
            <td style='width:50px; min-width: 50px;'></td> 
            <td style='width:70px; min-width: 70px;'>ID</td> <!---->
            <td style='width:300px; min-width: 300px;'>Accidente geográfico</td>  <!--id-->
            <td style='width:300px; min-width: 300px;'>Fecha</td> <!---->

            <td style='width:300px; min-width: 300px;'>Conductividad</td> <!---->
            <td style='width:300px; min-width: 300px;'>Ancho</td> <!---->
            <td style='width:300px; min-width: 300px;'>Oxigeno Disuelto</td> <!---->
            <td style='width:300px; min-width: 300px;'>Calidad de agua</td> <!---->
            <td style='width:300px; min-width: 300px;'>Diversidad vegetal</td> <!---->
            <td style='width:300px; min-width: 300px;'>Régimen hidrológico</td> <!---->
            <td style='width:300px; min-width: 300px;'>Turbidez del agua</td> <!---->
            <td style='width:300px; min-width: 300px;'>Largo</td> <!---->
            <td style='width:300px; min-width: 300px;'>PH</td> <!---->
            <td style='width:300px; min-width: 300px;'>Color</td> <!---->
            <td style='width:300px; min-width: 300px;'>Fuente</td> <!---->
            <td style='width:300px; min-width: 300px;'>Tiempo de permanencia</td> <!---->
            <td style='width:300px; min-width: 300px;'>Superficie</td> <!---->
            <td style='width:300px; min-width: 300px;'>Temperatura de agua</td> <!---->

            <td style='width:300px; min-width: 300px;'>Relevadores</td>  <!--bus-->
            <td style='width:300px; min-width: 300px;'>Observaciones</td>  <!---->
            <td style='width:300px; min-width: 300px;'>Fauna</td> <!--bus-->
            <td style='width:300px; min-width: 300px;'>Flora</td> <!--bus-->
         </tr>";
   $C= 0;
   $F= 0;
   foreach($resulta as $Fil){
      $cosa = $cosa."<tr id='tr$F' style='height:80px'>";
      $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button id='Mrele$F' onclick='ModifData($F, IDRel$F, tr$F);' type='button' style='background: orange;position: relative;float: right;'><i class='fa-solid fa-pen'></button></td>";
      $suportNomRel ="<td>";
      $suportObserv ="";
      $suportFauna ="<td>";
      $suportFlora ="<td>";
      foreach($Fil as $Col){
         if ($C == 0){//ID
            $cosa = $cosa."<td id='IDRel$F'>$Col</td>";

            // Relevadores
            $IDsReleva = mysqli_query($connect, "SELECT Id_miembro FROM investiga WHERE Id_rel = $Col");
            foreach ($IDsReleva as $IDsRel){
               foreach ($IDsRel as $IDsR){
                  $IDPers = mysqli_query($connect, "SELECT Id_persona FROM miembro WHERE Id_miembro = $IDsR");
                  foreach ($IDPers as $IDPe){
                     foreach ($IDPe as $IDP){
                        $NomRelev= mysqli_query($connect, "SELECT Nombre_persona FROM persona WHERE Id_persona = $IDP");
                        foreach ($NomRelev as $NomRel){
                           foreach ($NomRel as $NR){
                              $suportNomRel = $suportNomRel."► $NR<br>";
                           }
                        }
                     }
                  }
               }
            }
            $suportNomRel = $suportNomRel."</td>";
           // Fauna
           $IDsFauna = mysqli_query($connect, "SELECT Id_fauna FROM contiene_fauna WHERE Id_rel = $Col");
           foreach ($IDsFauna as $IDsFau){
              foreach ($IDsFau as $IDF){
                  $NomFauna = mysqli_query($connect, "SELECT Nombre_coloquial FROM fauna WHERE Id_fauna = $IDF");
                  foreach($NomFauna as $NomFau){
                     foreach ($NomFau as $NF){
                        $suportFauna = $suportFauna."► $NF<br>";
                     }
                  }
              }
           }
           $suportFauna  = $suportFauna ."</td>";
           // Flora
           $IDsFlora = mysqli_query($connect, "SELECT Id_flora FROM contiene_flora WHERE Id_rel = $Col");
           foreach ($IDsFlora as $IDsFlo){
              foreach ($IDsFlo as $IDFl){
                  $NomFlora = mysqli_query($connect, "SELECT Nombre_coloquial FROM flora WHERE Id_flora = $IDFl");
                  foreach($NomFlora as $NomFlo){
                     foreach ($NomFlo as $NFl){
                        $suportFlora = $suportFlora."► $NFl<br>";
                     }
                  }
              }
           }
           $suportFlora  = $suportFlora ."</td>";


         }else
         {
            if ($C == 1){ //Accidente geográfico
               $nomAcc = mysqli_query($connect, "SELECT Nombre FROM accidente_geografico WHERE Id_acc = $Col");
               foreach ($nomAcc as $noAc){
                  foreach ($noAc as $nA){
                     $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$nA</td>";
                  }
               }
            }else
            {
               if ($C == 2){ //Fecha
                  $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
               }else{
                  if ($C == 3){ //Conductividad
                     $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
                  }else{
                     if ($C == 4){ //Ancho
                        $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
                     }else{
                        if ($C == 5){ //Oxigeno disuelto
                           $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
                        }else{
                           if ($C == 6){ //Calidad de agua
                              $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
                           }else{
                              if ($C == 7){ //Diversidad vegetal
                                 $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
                              }else{
                                 if ($C == 8){ //Régimen hidrologico
                                    $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
                                 }else{
                                    if ($C == 9){ //Turbidez del agua
                                       $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
                                    }else{
                                       if ($C == 10){ //Largo
                                          $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
                                       }else{
                                          if ($C == 11){ //PH
                                             $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
                                          }else{
                                             if ($C == 12){ //Color
                                                $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
                                             }else{
                                                if ($C == 13){ //Fuente
                                                   $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
                                                }else{
                                                   if ($C == 14){ //Tiempo de permanencia
                                                      $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
                                                   }else{
                                                      if ($C == 15){ //Superficie
                                                         $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
                                                      }else{
                                                         if ($C == 16){ //Temperatura del agua
                                                            $cosa = $cosa."<td style='width:70px; min-width: 70px;'>$Col</td>";
                                                         }else{
                                                            if ($C == 17){ //Observaciones
                                                               $suportObserv = $suportObserv."<td style='height: inherit; overflow: auto; width:425px; min-width: 425px;'><div style='height: inherit;'>$Col</div></td>";
                                                            }else{}
                                                         }
                                                      }
                                                   }
                                                }
                                             }
                                          }
                                       }
                                    }
                                 }
                              }
                           }
                        }
                     }
                  }
               }
            }
         }

         $C++;
      }
      $cosa = $cosa.$suportNomRel;
      $cosa = $cosa.$suportObserv;
      $cosa = $cosa.$suportFauna;
      $cosa = $cosa.$suportFlora;
      $cosa = $cosa."</tr>";
      $C=0;
      $F=$F+1;
   }
   $cosa = $cosa."</table>";
   echo $cosa;
}else
{}

//===========================================================================================
//Para Fauna
if (isset($_POST['fauna'])){
   $Consulta = "SELECT * FROM fauna";
   $resulta = mysqli_query($connect, $Consulta);
   $cosa = "
      <table>
         <tr style='height:40px'>
            <td style='width:50px; min-width: 50px;'></td> 
            <td style='width:70px; min-width: 70px;'>ID</td> 
            <td style='width:300px; min-width: 300px;'>Nombre Coloquial</td>
            <td style='width:300px; min-width: 300px;'>Nombre Científico</td>
            <td style='width:300px; min-width: 300px;'>Descripción</td>
            <td style='width:300px; min-width: 300px;'>Imágenes</td>
         </tr>";
   $C= 0;
   $F= 0;
   foreach($resulta as $Fil){
      $cosa = $cosa."<tr id='tr$F' style='height:80px'>";
      $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button id='Mfau$F' onclick='ModifData($F, IDFau$F, tr$F);' type='button' style='background: orange;position: relative;float: right;'><i class='fa-solid fa-pen'></button></td>";

      foreach($Fil as $Col){
         if ($C == 0){//ID
            $cosa = $cosa."<td id='IDFau$F'>$Col</td>";
         }else
         {
            if ($C == 1){ //Nombre coloquial
               $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
            }else
            {
               if ($C == 2){ //Nombre científico
                  $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
               }else{
                  if ($C == 3){ //Descripcion
                     $cosa = $cosa."<td style='height: inherit; overflow: auto; width:425px; min-width: 425px;'><div style='height: inherit;'>$Col</div></td>";
                  }
               }
            }
         }
         $C++;
      }
      $cosa = $cosa."</tr>";
      $C=0;
      $F=$F+1;
   }
   $cosa = $cosa."</table>";
   echo $cosa;
}else
{}

//===========================================================================================
//Para Flora
if (isset($_POST['flora'])){
   $Consulta = "SELECT * FROM flora";
   $resulta = mysqli_query($connect, $Consulta);
   $cosa = "
      <table>
         <tr style='height:40px'>
            <td style='width:50px; min-width: 50px;'></td> 
            <td style='width:70px; min-width: 70px;'>ID</td> 
            <td style='width:300px; min-width: 300px;'>Nombre Coloquial</td>
            <td style='width:300px; min-width: 300px;'>Nombre Científico</td>
            <td style='width:300px; min-width: 300px;'>Descripción</td>
            <td style='width:300px; min-width: 300px;'>Imágenes</td>
         </tr>";
   $C= 0;
   $F= 0;
   foreach($resulta as $Fil){
      $cosa = $cosa."<tr id='tr$F' style='height:80px'>";
      $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button id='Mflo$F' onclick='ModifData($F, IDFlo$F, tr$F);' type='button' style='background: orange;position: relative;float: right;'><i class='fa-solid fa-pen'></button></td>";

      foreach($Fil as $Col){
         if ($C == 0){//ID
            $cosa = $cosa."<td id='IDFlo$F'>$Col</td>";
         }else
         {
            if ($C == 1){ //Nombre coloquial
               $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
            }else
            {
               if ($C == 2){ //Nombre científico
                  $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
               }else{
                  if ($C == 3){ //Descripcion
                     $cosa = $cosa."<td style='height: inherit; overflow: auto; width:425px; min-width: 425px;'><div style='height: inherit;'>$Col</div></td>";
                  }
               }
            }
         }
         $C++;
      }
      $cosa = $cosa."</tr>";
      $C=0;
      $F=$F+1;
   }
   $cosa = $cosa."</table>";
   echo $cosa;
}else
{}

//===========================================================================================
//Para Presiones
if (isset($_POST['presion'])){
   $Consulta = "SELECT * FROM presiones";
   $resulta = mysqli_query($connect, $Consulta);
   $cosa = "
      <table>
         <tr style='height:40px'>
            <td style='width:50px; min-width: 50px;'></td> 
            <td style='width:70px; min-width: 70px;'>ID</td> 
            <td style='width:300px; min-width: 300px;'>Tipo</td>
            <td style='width:300px; min-width: 300px;'>Observaciones</td>
         </tr>";
   $C= 0;
   $F= 0;
   foreach($resulta as $Fil){
      $cosa = $cosa."<tr id='tr$F' style='height:80px'>";
      $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button id='Mpre$F' onclick='ModifData($F, IDPre$F, tr$F);' type='button' style='background: orange;position: relative;float: right;'><i class='fa-solid fa-pen'></button></td>";

      foreach($Fil as $Col){
         if ($C == 0){//ID
            $cosa = $cosa."<td id='IDPre$F'>$Col</td>";
         }else
         {
            if ($C == 1){ //Tipo (o nombre)
               $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
            }else
            {
               if ($C == 2){ //Observaciones
                  $cosa = $cosa."<td style='height: inherit; overflow: auto; width:425px; min-width: 425px;'><div style='height: inherit;'>$Col</div></td>";
               }
            }
         }
         $C++;
      }
      $cosa = $cosa."</tr>";
      $C=0;
      $F=$F+1;
   }
   $cosa = $cosa."</table>";
   echo $cosa;
}else
{}

//===========================================================================================
//Para personas
if (isset($_POST['persona'])){
   $Consulta = "SELECT * FROM persona";
   $resulta = mysqli_query($connect, $Consulta);
   $cosa = "
      <table>
         <tr style='height:40px'>
            <td style='width:50px; min-width: 50px;'></td> 
            <td style='width:70px; min-width: 70px;'>DNI/CUIT/CUIL</td> 
            <td style='width:300px; min-width: 300px;'>Nombre</td>
            <td style='width:300px; min-width: 300px;'>Correo</td>
            <td style='width:300px; min-width: 300px;'>Teléfono</td>
            <td style='width:300px; min-width: 300px;'>Dirección</td>
            <td style='width:300px; min-width: 300px;'>Actuación</td>
         </tr>";
   $C= 0;
   $F= 0;
   foreach($resulta as $Fil){
      $cosa = $cosa."<tr id='tr$F' style='height:80px'>";
      $cosa = $cosa."<td style='width:25px; min-width: 25px;'><button id='Mper$F' onclick='ModifData($F, IDPer$F, tr$F);' type='button' style='background: orange;position: relative;float: right;'><i class='fa-solid fa-pen'></button></td>";
      $suport='<td>';
      $EsProp = false;
      $EsMiem = false;
      foreach($Fil as $Col){
         if ($C == 0){//ID-DNI-CUIL-CUIT
            $cosa = $cosa."<td id='IDPer$F'>$Col</td>";

           //Comprobar si es Miembro de proyecto
           $IdMiembro = mysqli_query($connect, "SELECT Id_miembro FROM miembro WHERE Id_Persona = $Col");
           //echo("escribe1");
           foreach ($IdMiembro as $IdMiem){
              foreach ($IdMiem as $IM){$EsMiem=true;}
           }
           if ($EsMiem){
              $suport= $suport."<div style='text-decoration-line: underline;'>Miembro del proyecto</div>";
           }
            // echo("escribe2");
           foreach ($IdMiembro as $IdMiem){
              foreach ($IdMiem as $IM){    
                 //echo("escribe3");     
                 $cons1 = "SELECT Id_rol FROM tiene_rol WHERE Id_miembro = $IM";        
                 //echo($cons1);    
                 $IdRol = mysqli_query($connect,$cons1 );
                 //echo("escribe4");
                 foreach ($IdRol as $IdRo){
                    foreach ($IdRo as $IR){
                       $cons2 = "SELECT descripcion FROM rol WHERE Id_rol = $IR";
                       //echo($cons2);
                       $Rol = mysqli_query($connect, $cons2);
                       foreach ($Rol as $Ro){
                          foreach ($Ro as $R){
                             $suport=$suport."► $R<br>";
                          }
                       }
                    }
                 }
              }
           }

            //Comprobar si es propietario
            $IdComplejo = mysqli_query($connect, "SELECT Id_complejo FROM propietario WHERE Id_persona = $Col");
            foreach ($IdComplejo as $IdCom){
               foreach ($IdCom as $IC){$EsProp = true;}
            }
            if ($EsProp){
               if($EsMiem){
                  $suport= $suport."<br>";
               }
               $suport= $suport."<div style='text-decoration-line: underline;'>Propietario</div>";
            }
            foreach ($IdComplejo as $IdCom){
               foreach ($IdCom as $IC){                  
                  $NomCom = mysqli_query($connect, "SELECT Nombre_complejo FROM complejo WHERE Id_complejo = $IC");
                  foreach ($NomCom as $NoCo){
                     foreach ($NoCo as $NC){
                        $suport=$suport."► $NC <br>";
                     }
                  }
               }
            }

            
            
            $suport = $suport."</td>";
         }else
         {
            if ($C == 1){ //Nombre
               $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
            }else
            {
               if ($C == 2){ //Correo
                  $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
               }else{
                  if ($C == 3){ //Teléfono
                     $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
                  }else{
                     if ($C == 4){ //Dirección
                        $cosa = $cosa."<td style='width:70px; min-width: 70px;'>'$Col'</td>";
                     }else{
                     }
                  }
               }
            }
         }

         $C++;
         
      }
      $cosa = $cosa.$suport;
      $cosa = $cosa."</tr>";
      $C=0;
      $F=$F+1;
   }
   $cosa = $cosa."</table>";
   echo $cosa;
}else
{}


?>


    


