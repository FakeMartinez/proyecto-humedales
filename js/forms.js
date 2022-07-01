var x_pre = 0;
var x_fau = 0;
var x_flo = 0;
var x_pers = 0 ;
var x_prop = 0 ;
var update = false;
var max_flora = 0;
var max_fauna = 0;
var max_miembro = 0;
var max_pre = 0;

var NewRelev=false; // comptrobador de que se quiere agregar un nuevo relevamiento. Si está es true es si, si está en false es no.

var DireccionesFA = new Array();
var DireccionesFL = new Array();
var DireccionesHU = new Array();
var BtFau = false;
var BtFlo = false;
var BtHum = false;

//Funcion para cambiar la clase de un objeto
//                    Objeto <======= Es el objeto o elemento HTML al cual se le cambiará el class
//                    ClassActual <== Es el class que se le quitará al objeto/elemento HTML
//                    ClassNueva <=== Es el class nuevo que se le dará al objeto/elemento HTML
// quitar el class actual para que el objeto no tenga la convinación de 2 class. Puede no ser necesario, pero de esta manera se evitan fallos
function CambiarClass(Objeto, ClassActual, ClassNueva){
  $(Objeto).removeClass(ClassActual); //Elimina el Class actual del elemento HTML
  $(Objeto).addClass(ClassNueva);   //agrega el nuevo class al elemento HTML
};


function CloseMensImag (){
  $("#MensErrorImag").remove();
  //getElementById("MensErrorImag").remove();
}


function deletesHTML(ID){ //Se le pasa la ID del elemento para borrarlo
  console.log("Borra el elemento HTML con la ID:"+ID);
  $('#'+ID).hide();
  $('#'+ID).remove();
}



function validacion(postData){
  //console.log('entro a la funcion validacion');
  $('div').remove('#TexErrorIncompleto');
  var b = true;
  if(postData.nombre=='')
  {      
    CambiarClass($('#nombre'), "form-control", "form-control is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
    $('#ContNomAcc').append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
    b = false;
  }  
  if(postData.tipo=='... Seleccione Tipo ...')
  {      
    CambiarClass($('#tipo'), "form-control", "form-control is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
    $('#ContTipAcc').append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
    b = false;
  }  

  //console.log(postData.cuenca);
  if(postData.cuenca=='... Seleccione una cuenca ...')
  {      
    CambiarClass($('#sel_cuenca'), "form-select", "form-select is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
    $('#ContCuenAcc').append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
    b = false;
  }

  return b;
}


function DisCheck(e, cont){
  if(!e.checked){
    document.getElementById(cont).style.visibility = "hidden";
    document.getElementById(cont).style.height = "5px";
  }else{
    document.getElementById(cont).style.visibility = "visible";
    document.getElementById(cont).style.height = "60px";
    if (cont == "FiltroFauna" || cont == "FiltroFlora" || cont == "FiltroInputPresiones")
    {
      document.getElementById(cont).style.height = "90px";
    }
  }
}

$(function(){

  carga_form_alta_cu();
  carga_form_alta_co();
  carga_form_alta_p();
  carga_form_alta_fa();
  carga_form_alta_fl();
  carga_form_alta_pers();
  carga_form_alta_propie();
  
  $('#img_flora').on("change", (e) => {
    console.log(e);
    });

  //Cerrar Formulario Alta y relevamiento 
  $('#close_btn_add').on('click', function(){

    CambiarClass($('#nombre'), "form-control is-invalid", "form-control"); 
    CambiarClass($('#tipo'), "form-control is-invalid", "form-control");
    CambiarClass($('#sel_cuenca'), "form-select is-invalid", "form-select");
    $('div').remove('#TexErrorIncompleto');
    $('#nombre').val('');
    document.getElementById('tipo').options.item(0).selected = 'selected';
    $('#descripcion').val('');
    $('#form_add').hide();
    //$('#form_add2').hide();
  });
  $('#close_btn_add2').on('click', function(){
    //$('#form_add').hide();

    $('#form_add2').hide();
  });
  
  //Añadir Cuenca
  $('#btn_cuenca_add').on('click', function(){
    $('#form_cuenca_add').show();
  });
  
  //Cerrar Formulario Cuenca
  $('#close_btn_cuenca_add').on('click', function(){
    $('div').remove('#TexErrorIncompleto');
    CambiarClass($('#nom_cuenca'), "form-control is-invalid", "form-control");
    CambiarClass($('#sup_cuenca'), "form-control is-invalid", "form-control");
    CambiarClass($('#tipo_cuenca'), "form-control is-invalid", "form-control");
    $('#form_cuenca_add').hide();
  });
  
  //Añadir Complejo
  $('#btn_complejo_add').on('click', function(){
    $('#form_complejo_add').show();
  });
  
  //Cerrar Formulario Complejo
  $('#close_btn_comp_add').on('click', function(){
    $('div').remove('#TexErrorIncompleto');
        CambiarClass($('#nom_comp'), "form-control is-invalid", "form-control");
        for (var i=0; i<=x_prop; i++){
            CambiarClass($('#sel_propietario'+i.toString()), "form-select is-invalid", "form-select");
        }
    $('#form_complejo_add').hide();
  });
  
  //Añadir Presión
  $('#btn_presion_add').on('click', function(){
    $('#form_presion_add').show();
  });
  
  //Cerrar Formulario Presión
  $('#close_btn_presion_add').on('click', function(){
    $('div').remove('#TexErrorIncompleto'); 
        CambiarClass($('#tipo_presion'), "form-control is-invalid", "form-control");
    $('#form_presion_add').hide();
  });
  
  //Añadir Fauna
  $('#btn_fauna_add').on('click', function(){
    $('#form_fauna_add').show();
  });
 
  //Cerrar Formulario Fauna
  $('#close_btn_fauna_add').on('click', function(){
    $('div').remove('#TexErrorIncompleto'); 
    CambiarClass($('#nom_colquial_fauna'), "form-control is-invalid", "form-control");
    CambiarClass($('#nom_ctfico_fauna'), "form-control is-invalid", "form-control");
    $('#form_fauna_add').hide();
  });
  
  //Añadir Flora
  $('#btn_flora_add').on('click', function(){
    $('#form_flora_add').show();
  });
  
  //Cerrar Formulario Flora
  $('#close_btn_flora_add').on('click', function(){
    $('div').remove('#TexErrorIncompleto'); 
        CambiarClass($('#nom_colquial_flora'), "form-control is-invalid", "form-control");
        CambiarClass($('#nom_ctfico_flora'), "form-control is-invalid", "form-control");
    $('#form_flora_add').hide();
  });

  //Añadir Persona
  $('#btn_miembro_add').on('click', function(){
    $('#form_miembro_add').show();
  });
  
  //Cerrar Formulario Persona
  $('#close_btn_miembro_add').on('click', function(){
    $('#form_miembro_add').hide();
  });
    
  //Añadir modif
  $('#close_btn_modif').on('click', function(){
    $('#ContTable').css({'visibility':'hidden'});
    $('#form_modif').hide();
  });

   //agregar imagen fauna
   $('#btn_imagen_add').on('click', function(){
    $('#form_imagen_add').show();
    BtFau = true;
    BtFlo = false;
    BtHum = false;
  });
  //Cerrar Formulario imagen
  $('#close_btn_imagen_add').on('click', function(){
    $('#form_imagen_add').hide();
  });
  //agregar imagen flora
  $('#btn_imagen_addFl').on('click', function(){
    $('#form_imagen_add').show();
    BtFau = false;
    BtFlo = true;
    BtHum = false;
  });
  //agregar imagen humedal
  $('#btn_imagen_addHu').on('click', function(){
    $('#form_imagen_add').show();
    BtFau = false;
    BtFlo = false;
    BtHum = true;
  });
   //Mostrar formulario Propietario
  $('#NuevoPropietario').on('click', function(){
    $('#form_propietario_add').show();
  })
   //Cerrar formulario Propietario
   $('#close_btn_Prop_add').on('click', function(){
    $('div').remove('#TexErrorIncompleto'); //Elimina los mensajes de campo obligatorio
    CambiarClass($('#id_propietario'), "form-control is-invalid", "form-control");
    CambiarClass($('#nom_Prop'), "form-control is-invalid", "form-control");
    CambiarClass($('#correo_Prop'), "form-control is-invalid", "form-control"); 
    CambiarClass($('#tel_Prop'), "form-control is-invalid", "form-control");
    CambiarClass($('#Dire_Prop'), "form-control is-invalid", "form-control");
    $('#form_propietario_add').hide();
  })


  //////////////////////Formulario Alta Acc////////////////////////
  $(document).on('click','#btn_brel', function(){
    NewRelev = true;
  });

  $('#form_add').submit(e => {
    e.preventDefault();
    var postData = {
      nombre: $('#nombre').val(),  
      tipo: $('#tipo').val(),  
      descripcion: $('#descripcion').val(),  
      cuenca: $('#sel_cuenca').val(),
      complejo: $('#sel_complejo').val(),
      cont_pre: x_pre,
    }
    console.log(postData);  
    
    var suport = x_pre;
    while(suport>=0)
    {
      //console.log('sel_presion.form-select '.concat(x_pre.toString()));
      Object.defineProperty(postData, 'presiones'+ suport.toString(),
      {
        value:$('#sel_presion.form-select.'.concat(suport.toString())).val(),
        writable: true,
        enumerable: true,
        configurable: true
      }); 
      //postData.presion.concat(x.toString()) = $('#sel_presion.form-select '.concat(x.toString())).val()
      suport = suport-1;
    }
    e.preventDefault();
    //console.log(update);
        
    if (update != false)
    {
      $.post('php/carga.php', postData, (response) => {
        console.log(response);
        e.preventDefault();
        //$('#form_add').trigger('reset');
      });
    } 
    else{
      if(postData.nombre != '' && postData.tipo != '... Seleccione Tipo ...' && postData.cuenca != "... Seleccione una cuenca ..."){          
        //console.log ("llama al PHP");
        console.log (postData);
        CambiarClass($('#nombre'), "form-control is-invalid", "form-control"); 
        CambiarClass($('#tipo'), "form-control is-invalid", "form-control");
        CambiarClass($('#sel_cuenca'), "form-select is-invalid", "form-select");
        $('div').remove('#TexErrorIncompleto');
        $.post('php/alta.php', postData, (response) => {
          console.log(response);
          //console.log(postData);
          //$('#form_add').trigger('reset');
          e.preventDefault();
          if (response != "existe"){
            if (NewRelev){
              add_geo();
              NewRelev=false;
              from2();
            }else{
              add_geo(); // Llamada a la funcion para guardar geometria 

            }
            CambiarClass($('#nombre'), "form-control is-invalid", "form-control"); 
            CambiarClass($('#tipo'), "form-control is-invalid", "form-control");
            CambiarClass($('#sel_cuenca'), "form-select is-invalid", "form-select");
            $('div').remove('#TexErrorIncompleto');
            $('#form_add').hide();
            //$('#nombre').val('');
            document.getElementById('tipo').options.item(0).selected = 'selected';
            $('#descripcion').val('');
            console.log(" antes de establecer a 0, x_pre "+ x_pre );
            while (x_pre > 0){
              $('#sel_presion.form-select.'+ x_pre.toString()).remove();
              x_pre =  x_pre-1;
            }
            $('#btn_presion_dhum').remove();
            console.log(" despues de establecer a 0, x_pre "+ x_pre );
          }else{
            console.log("ERROR AL CARGAR ====== O: O: NOMBRE YA UTILIZADO O: O: ======");
            CambiarClass($('#nombre'), "form-control", "form-control is-invalid");
            $('#ContNomAcc').append("<div id='TexErrorIncompleto' style='color: red'>Ya existe un accidente geográfico con este nombre</div>"); //Crea el mensaje de advertencia si ya existe el nombre ingresado
          }
        });
      }
      else
      { 

        //console.log ("No entra a la carga del accidente");
        validacion(postData)}        
      }
  });
          
  $('#form_add2').submit(e => {
    //console.log("Comienza el submit del Form2");
    e.preventDefault();    
    deletesHTML('TexErrorIncompleto');
    CambiarClass($('#sel_miembro.form-select.0'), "form-select is-invalid", "form-select"); 
    if (!newRel){
      var postData = {     
        nom: $('#nombre').val(),  
  
        fecha: $('#fecha_rel').val(),
        ancho:$('#ancho').val(),
        largo:$('#largo').val(),
        conductividad:$('#Conductividad').val(),
        pH:$('#pH').val(),
        o2disuelto:$('#O2disuelto').val(),
        turbidez:$('#Turbidez').val(),
        color:$('#Color').val(),
        temperatura:$('#Temperatura').val(),
        obs:$('#obs').val(),
        fuente:$('input:radio[name=optionsFuente]:checked').val(),
        tiempo:$('input:radio[name=optionsTiempo]:checked').val(),
        diversidad_vegetal:$('input:radio[name=optionsDV]:checked').val(),
        regimen_hidrologico:$('input:radio[name=optionsReg]:checked').val(),
        calidad_agua:$('input:radio[name=optionsAgua]:checked').val(),
  
        //Dir : DireccionesHU.slice(),
        cont_pre: x_pre,
  
        cont_fau: x_fau,
        cont_flo: x_flo,
        cont_pers: x_pers
        //
        //
      }
    }else{
      var postData = {     
        nom: NomAcc,  
  
        fecha: $('#fecha_rel').val(),
        ancho:$('#ancho').val(),
        largo:$('#largo').val(),
        conductividad:$('#Conductividad').val(),
        pH:$('#pH').val(),
        o2disuelto:$('#O2disuelto').val(),
        turbidez:$('#Turbidez').val(),
        color:$('#Color').val(),
        temperatura:$('#Temperatura').val(),
        obs:$('#obs').val(),
        fuente:$('input:radio[name=optionsFuente]:checked').val(),
        tiempo:$('input:radio[name=optionsTiempo]:checked').val(),
        diversidad_vegetal:$('input:radio[name=optionsDV]:checked').val(),
        regimen_hidrologico:$('input:radio[name=optionsReg]:checked').val(),
        calidad_agua:$('input:radio[name=optionsAgua]:checked').val(),
  
        //Dir : DireccionesHU.slice(),
        cont_pre: x_pre,
  
        cont_fau: x_fau,
        cont_flo: x_flo,
        cont_pers: x_pers
        //
        //
      }
    }
    
    var suportpre = x_pre;
    while(suportpre>=0){
      console.log('sel_presion.form-select '.concat(suportpre.toString()));
      Object.defineProperty(postData, 'presion'+ suportpre.toString(),{
        value:$('#sel_presion.form-select.'.concat(suportpre.toString())).val(),
        writable: true,
        enumerable: true,
        configurable: true
      }); 
      //postData.presion.concat(x.toString()) = $('#sel_presion.form-select '.concat(x.toString())).val()
      suportpre = suportpre-1;

    }          

    console.log(postData);
       
    var suportfau = x_fau;
    while(suportfau>=0){
      console.log('sel_fauna.form-select '.concat(suportfau.toString()));
      if ($('#sel_fauna.form-select.'.concat(suportfau.toString())).val() != "... Seleccione una fauna ..."){
        Object.defineProperty(postData, 'fauna'+ suportfau.toString(),{
          value:$('#sel_fauna.form-select.'.concat(suportfau.toString())).val(),
          writable: true,
          enumerable: true,
          configurable: true
          
        }); 
      }
      //postData.presion.concat(x.toString()) = $('#sel_presion.form-select '.concat(x.toString())).val()
      suportfau = suportfau-1;
    }
//    console.log("====================================================================");
//    console.log("postData.x_fau");
//    console.log(postData.cont_fau);
//    console.log("====================================================================");
    var suportflo = x_flo;
    while(suportflo>=0){
      console.log('sel_flora.form-select '.concat(suportflo.toString()));
      if ($('#sel_flora.form-select.'.concat(suportflo.toString())).val() != "... Seleccione una flora ..."){
        Object.defineProperty(postData, 'flora'+ suportflo.toString(),{
          value:$('#sel_flora.form-select.'.concat(suportflo.toString())).val(),
          writable: true,
          enumerable: true,
          configurable: true
        }); 
      }
      suportflo = suportflo-1;
    }
    var suportpers = x_pers;
    while(suportpers>=0){
      console.log('sel_miembro.form-select '.concat(suportpers.toString()));
      Object.defineProperty(postData, 'persona'+ suportpers.toString(),{
        value:$('#sel_miembro.form-select.'.concat(suportpers.toString())).val(),
        writable: true,
        enumerable: true,
        configurable: true
      }); 
      suportpers = suportpers-1;
    }
          
    e.preventDefault();
                
   
      if(postData.persona0!='... Seleccione una persona ...'){
        //console.log("Correcto");
        $.post('php/alta.php', postData, (response) => {
          console.log("sale del PHP");
          console.log(postData);
          console.log(response);
          //$('#form_add').trigger('reset');
          e.preventDefault();
          $('#form_add2').hide();
          $('#nombre').val('');
          $('#tipo').val('');
          $('#descripcion').val('');
          console.log(" antes de establecer a 0, x_fau "+ x_fau);
          while (x_fau > 0){
            $('#sel_fauna.form-select.'+ x_fau.toString()).remove();
            x_fau =  x_fau-1;
          }
          $('#btn_fauna_dhum').remove();
          console.log(" despues de establecer a 0, x_fau "+ x_fau);

          console.log(" antes de establecer a 0, x_flo "+ x_flo);
          while (x_flo > 0){
            $('#sel_flora.form-select.'+ x_flo.toString()).remove();
            x_flo =  x_flo-1;
          }
          $('#btn_flora_dhum').remove();
          console.log(" despues de establecer a 0, x_flo "+ x_flo);

          console.log(" antes de establecer a 0, x_pers "+ x_pers);
          while (x_pers > 0){
            $('#sel_miembro.form-select.'+ x_pers.toString()).remove();
            x_pers =  x_pers-1;
          }
          $('#btn_miembro_dhum').remove();
          console.log(" despues de establecer a 0, x_pers "+ x_pers);

        });
      }else{
        CambiarClass($('#sel_miembro.form-select.0'), "form-select", "form-select is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
        $('#contMiems').append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
      }
    }
  );

  ////////////////////////////////////////////////////////////////
  //$(document).on('click','#btn_brel', form2()); 
  function from2(){
    $('#form_add').hide();
    $('#form_add2').show();
    $('#t_form.modal-title').html('Relevamiento');
    $('#form_modal').css({'background':'#DEFEAE' });
    
    $('#ancho').val('');
    $('#largo').val('');
    $('#Conductividad').val('');
    $('#pH').val('');
    $('#O2disuelto').val('');
    $('#Turbidez').val('');
    $('#Color').val('');
    $('#Temperatura').val('');
    $('#obs').val('');   

    carga_form_alta_fa();
    carga_form_alta_fl();
    carga_form_alta_pers();
  }
      
  //////////////////Form cuenca/////////////////////
  $('#form-cuenca').submit(e => {
    e.preventDefault();
    $('div').remove('#TexErrorIncompleto'); //Elimina los mensajes de campo obligatorio

        //Comprueba los campos obligatorios para verificar que no estén vacíos
        if ($('#nom_cuenca').val() === ''){
          CambiarClass($('#nom_cuenca'), "form-control", "form-control is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
          $('#DivNomCuen').append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
        }else{
          CambiarClass($('#nom_cuenca'), "form-control is-invalid", "form-control");
        }

        if ($('#sup_cuenca').val() === ''){
          CambiarClass($('#sup_cuenca'), "form-control", "form-control is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
          $('#DivSupCuen').append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
        }else{
          CambiarClass($('#sup_cuenca'), "form-control is-invalid", "form-control");
        }

        if ($('#tipo_cuenca').val() === ''){
          CambiarClass($('#tipo_cuenca'), "form-control", "form-control is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
          $('#DivTipCuen').append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
        }else{
          CambiarClass($('#tipo_cuenca'), "form-control is-invalid", "form-control");
        }

        //Si ninguno de los campos obligatorios está vacío, hace el submit
        if ($('#nom_cuenca').val() !== '' && $('#sup_cuenca').val() !== '' && $('#tipo_cuenca').val() !== ''){
          console.log('Todos completos');
          const postData = {
            //id_cuenca:$('#id_cuenca').val(),
            nombre_cuenca: $('#nom_cuenca').val(),
            sup_cuenca: $('#sup_cuenca').val(),
            tipo_cuenca:$('#tipo_cuenca').val(),
          };
          console.log(postData);
          $.post('php/sub_forms.php', postData, (response) => {
            console.log(response);        //Si se comenta, no se va a escribir ningún echo del php en la consola de la pagina ¡OJO!
            //$('#form_add').trigger('reset');
            e.preventDefault();
            carga_form_alta_cu();
            $('#form_cuenca_add').hide();
            //$('#id_cuenca').val('');
            $('#nom_cuenca').val('');
            $('#sup_cuenca').val('');
            $('#tipo_cuenca').val('');
           // $('div').remove('#TexErrorIncompleto');
            CambiarClass($('#nom_cuenca'), "form-control is-invalid", "form-control");
            CambiarClass($('#sup_cuenca'), "form-control is-invalid", "form-control");
            CambiarClass($('#tipo_cuenca'), "form-control is-invalid", "form-control");
            }
          );
        }
  });
  ////////////////////////////////////////////////

  //////////////////Form complejo/////////////////////
  $('#form-complejo').submit(e => {
    e.preventDefault();

    $('div').remove('#TexErrorIncompleto'); //Elimina los mensajes de campo obligatorio
    //Comprueba los campos obligatorios para verificar que no estén vacíos
    if ($('#nom_comp').val() === ''){
      CambiarClass($('#nom_comp'), "form-control", "form-control is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
      $('#DivNomComp').append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
    }else{
      CambiarClass($('#nom_comp'), "form-control is-invalid", "form-control");
    }

    for (var i=0; i<=x_prop; i++){
      if ($('#sel_propietario'+i.toString()).val() === '... Seleccione un propietario ...'){
        CambiarClass($('#sel_propietario'+i.toString()), "form-select", "form-select is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
        $('#DivPropComp'+i.toString()).append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
      }else{
        CambiarClass($('#sel_propietario'+i.toString()), "form-select is-invalid", "form-select");
      }
    }
    var arrayProp = new Array();

    if ($('#nom_comp').val() !== '' && $('#sel_propietario').val() !== '... Seleccione un propietario ...'){
      for (var i=0; i<=x_prop; i++){
        if ($('#sel_propietario'+i.toString()).val() !== '... Seleccione un propietario ...'){
          arrayProp.push($("#sel_propietario"+i.toString()+" option:selected").text());
          //console.log($('#sel_propietario'+i.toString()+' option:selected').text());
      }
    }

    const postData = {
       //  id_complejo:$('#id_complejo').val(),
       nombre_complejo: $('#nom_comp').val(),
       //prop_complejo: $('#sel_propietario').val(),
      prop_complejo: arrayProp
    };
    console.log(postData);
    $.post('php/sub_forms.php', postData, (response) => {
      console.log(response);    //Si se comenta, no se va a escribir ningún echo del php en la consola de la pagina ¡OJO!
      //$('#form_add').trigger('reset');
      e.preventDefault();
      carga_form_alta_co();
      $('#form_complejo_add').hide();
      //$('#id_complejo').val('');
      $('#nom_comp').val('');
      $('#sel_propietario0').val('... agregue un propietario ...');
      for (var i=1; i<=x_prop; i++){
        ($('#sel_propietario'+i.toString()).parent()).remove();
      }
      CambiarClass($('#nom_comp'), "form-control is-invalid", "form-control");
      CambiarClass($('#sel_propietario'), "form-select is-invalid", "form-select");
    });
    }
  });

  /////////////////////////////////////////////////////

///////////////Form Propietarios//////////////////////
$('#form_propietario_add').submit(e => {
  e.preventDefault();

  $('div').remove('#TexErrorIncompleto'); //Elimina los mensajes de campo obligatorio

    //Comprueba los campos obligatorios para verificar que no estén vacíos
    if ($('#id_propietario').val() === ''){
      CambiarClass($('#id_propietario'), "form-control", "form-control is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
      $('#DivIDPers').append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
    }

    if ($('#nom_Prop').val() === ''){
      CambiarClass($('#nom_Prop'), "form-control", "form-control is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
      $('#DivNomPers').append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
    }

    if ($('#correo_Prop').val() === '' && $('#tel_Prop').val() === '' && $('#Dire_Prop').val() === ''){
      CambiarClass($('#correo_Prop'), "form-control", "form-control is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
      CambiarClass($('#tel_Prop'), "form-control", "form-control is-invalid");
      CambiarClass($('#Dire_Prop'), "form-control", "form-control is-invalid");
      $('#DivDirPers').append("<div id='TexErrorIncompleto' style='color: red'> Almenos uno de los 3 campos entre Teléfono, Correo o Dirección deben estár completos</div>"); //Crea el mensaje de advertencia de campo incompleto
    }

  if ($('#id_propietario').val() !== '' && $('#nom_Prop').val() !== '' && ($('#correo_Prop').val() !== '' || $('#tel_Prop').val() !== '' || $('#Dire_Prop').val() !== '')){
  const postData = {
    id_propie: $('#id_propietario').val(),
    nom_prop: $('#nom_Prop').val(),
    corre_prop: $('#correo_Prop').val(),
    tel_propi: $('#tel_Prop').val(),
    dir_prop: $('#Dire_Prop').val()

  };
  //DireccionesFA.forEach(dir =>{postData.Dir += dir});
  //console.log(postData);
  $.post('php/sub_forms.php', postData, (response) => {
    console.log(response);     //Si se comenta, no se va a escribir ningún echo del php en la consola de la pagina ¡OJO!
    //$('#form_add').trigger('reset');
    e.preventDefault();
    carga_form_alta_propie();
    $('#form_propietario_add').hide();
    $('#id_propietario').val('');
    $('#nom_Prop').val('');
    $('#correo_Prop').val('');
    $('#tel_Prop').val('');
    $('#Dire_Prop').val('');
    CambiarClass($('#id_propietario'), "form-control is-invalid", "form-control");
    CambiarClass($('#nom_Prop'), "form-control is-invalid", "form-control");
    CambiarClass($('#correo_Prop'), "form-control is-invalid", "form-control"); 
    CambiarClass($('#tel_Prop'), "form-control is-invalid", "form-control");
    CambiarClass($('#Dire_Prop'), "form-control is-invalid", "form-control");
  });
  }
});


  ////////////////////////////////////////////////

  //////////////////Form presion/////////////////////
  $('#form-presion').submit(e => {
    e.preventDefault();                         
    //console.log ("Entra a la carga de presion");
    $('div').remove('#TexErrorIncompleto'); 

    if ($('#tipo_presion').val() === ''){
      CambiarClass($('#tipo_presion'), "form-control", "form-control is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
      $('#DivTipoPre').append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
    }

    if ($('#tipo_presion').val() !== ''){
    const postData = {                          //const crea una variable llamada postData
      tipo_presion: $('#tipo_presion').val(),   //Parametro tipo_presion de la variable postData, toma el valor del objeto con id tipo_presion
      obs_presion: $('#obs_presion').val(), 
      //ID_presion: $('#Id_presion').val()    //Parametro obs_presion de la variable postData, toma el valor del objeto con id  obs_presion
    };
    //console.log(postData);

    $.post('php/sub_forms.php', postData, (response) => {  //post llama al archivo php llamada sub_forms.php, response es lo que devuelve
      console.log(response);                               //Si se comenta, no se va a escribir ningún echo del php en la consola de la pagina ¡OJO!    
      //$('#form_add').trigger('reset');
      e.preventDefault();
      console.log("llama al carga_form_alta_p");
      carga_form_alta_p();   
      $('#form_presion_add').hide();    //oculta eñ formulario add presion
      $('#tipo_presion').val('');
      $('#obs_presion').val('');
      $('#Id_presion').val('');
      CambiarClass($('#tipo_presion'), "form-control is-invalid", "form-control");
    });
    }
  });
  
  ////////////////////////////////////////////////

  //////////////////Form fauna/////////////////////
  $('#form-fauna').submit(e => {
    e.preventDefault();

    $('div').remove('#TexErrorIncompleto'); 

    if ($('#nom_colquial_fauna').val() === ''){
      CambiarClass($('#nom_colquial_fauna'), "form-control", "form-control is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
      $('#DivNombreColFau').append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
    }
    if ($('#nom_ctfico_fauna').val() === ''){
      CambiarClass($('#nom_ctfico_fauna'), "form-control", "form-control is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
      $('#DivNombreCieFau').append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
    }

    if ($('#nom_colquial_fauna').val() !== '' && $('#nom_ctfico_fauna').val() !== ''){   
    DireccionesFA.forEach(function (Dire, Indi, Vect){
      if(Dire==""){
        //console.log("Elimina" + DireccionesFA[Indi]);
        DireccionesFA.splice(Indi,1);
        //console.log("eliminado"+ DireccionesFA[Indi]);
      };
    });

    const postData = {
      //id_fauna: $('#ID_fauna').val(),
      nom_cq_fauna: $('#nom_colquial_fauna').val(),
      nom_cf_fauna: $('#nom_ctfico_fauna').val(),
      carac_fauna: $('#carac_fauna').val(),
      //img_fauna: $('#img_fauna').val(),
      Dir: DireccionesFA.slice()  // Pasa todas los nombres de las imagenes cargadas de esta fauna
    };
    //DireccionesFA.forEach(dir =>{postData.Dir += dir});
    console.log(postData);
    $.post('php/sub_forms.php', postData, (response) => {
      console.log(response);  //Si se comenta, no se va a escribir ningún echo del php en la consola de la pagina ¡OJO!
      //$('#form_add').trigger('reset');
      e.preventDefault();
      carga_form_alta_fa();
      $('#form_fauna_add').hide();
      $('#ID_fauna').val('');
      $('#nom_colquial_fauna').val('');
      $('#nom_ctfico_fauna').val('');
      $('#carac_fauna').val('');
      $('#ContenedorImgFau').empty();
      DireccionesFA.splice(0, DireccionesFA.length);
      //console.log(DireccionesFA);
      CambiarClass($('#nom_colquial_fauna'), "form-control is-invalid", "form-control");
      CambiarClass($('#nom_ctfico_fauna'), "form-control is-invalid", "form-control");
    });
    }
  });
  
  ////////////////////////////////////////////////
  /*
  $('#BI0 .pI2').on('click', function(e){
    //var Nume = e.id;
    //Nume.replace('B','');
    //Nume.replace('I','');
    console.log(e);
  
  });
*/


//=====================================================================================
//=====================================================================================
//=====================================================================================
//                FORM IMAGEN
//______________________________________________________________________________________

$('#form-imagen').submit(e => {
  e.preventDefault();
  var formData = new FormData();
  var files = $('#Newimg')[0].files[0];
  formData.append('file',files);

console.log(files);
    $.ajax({
      url: 'php/CargaImagenes.php',
      type: 'post',
      data: formData,
      contentType: false,
      processData: false,
      success: function(response) {
      console.log(response);  //Si se comenta, no se va a escribir ningún echo del php en la consola de la pagina ¡OJO!
  let templateD = '';
  console.log (response);
  if (response == 0){
    console.log("Ya existe esta imagen en la base de datos");
    MesErrorImag="<div class='alert alert-dismissible alert-danger' id='MensErrorImag'><button type='button' class='btn-close' data-bs-dismiss='alert' id='btnCloseAlertImag' onclick=CloseMensImag();></button><strong style='font-size: larger; font-weight: bold;'>ATENCIÓN!</strong> Está intentando cargar una imagen con el mismo nombre de otra que ya ha sido cargada, cambie el nombre de la imagen que va a cargar por una diferente.</div>"
    
    $("#ContenedorInputImgForm").append(MesErrorImag);
    
  }else{
    if (BtFau){
      DireccionesFA.push(response);
      //  console.log(DireccionesFA);
      DireccionesFA.forEach(function (Dire, Indi, Vect){
        if (Dire!="")
        {
          templateD += `<div class=pI id='CIFa${Indi}'><button type="button" class='pI2' id='BIFa${Indi}'>X</button><img src='images/${Dire}' style="width:200px;height:200px;"></img></div>`;
        }
      })
      $('#ContenedorImgFau').html(templateD);
      DireccionesFA.forEach(function (Dire, Indi, Vect){
      //=============================================================
      // == Boton para quitar la imagen de la carga ==
  
        $('#BIFa' + Indi.toString()).on('click',function(e){
        //  console.log("imagen" + Indi);
        DireccionesFA[Indi] = ""; //Elimina el elemento del array de direcciones de Fauna
        $('#CIFa' + Indi.toString()).remove(); //Elimina el elemento del HTML de la carga de Fauna
        const DataEli ={
          eliminar : true,
          nomImag : Dire
        };
        //console.log(DataEli);
        $.post('php/CargaImagenes.php', DataEli, (response) => { //Llama al PHP para eliminar la imagen cargada en el servidor
        console.log(response);  //Si se comenta, no se va a escribir ningún echo del php en la consola de la pagina ¡OJO!
      })
  
      // == Termina la creacion del evento click del boton eliminar ==
      //============================================================= 
        });
  
       })
  
    }else{
      if (BtFlo)
      {
        DireccionesFL.push(response);
        //console.log(DireccionesFL);
        DireccionesFL.forEach(function (Dire, Indi, Vect){
          if (Dire!="")
          {
            templateD += `<div class=pI id='CIFl${Indi}'><button type="button" class='pI2' id='BIFl${Indi}' >X</button><img src='images/${Dire}' style="width:200px;height:200px;"></img></div>`;
          }
        })
        $('#ContenedorImgFlor').html(templateD);
        DireccionesFL.forEach(function (Dire, Indi, Vect){
        //=============================================================
        // == Boton para quitar la imagen de la carga ==
    
          $('#BIFl' + Indi.toString()).on('click',function(e){
          // console.log("imagen" + Indi);
    
          DireccionesFL[Indi] = ""; //Elimina el elemento del array de direcciones de Flora
          $('#CIFl' + Indi.toString()).remove(); //Elimina el elemento del HTML de la carga de Flora
          const DataEli ={
            eliminar : true,
            nomImag : Dire
          };
          //console.log(DataEli);
          $.post('php/CargaImagenes.php', DataEli, (response) => { //Llama al PHP para eliminar la imagen cargada en el servidor
          console.log(response);
        })
    
        // == Termina la creacion del evento click del boton eliminar ==
        //=============================================================
          });
    
        })
        }else{
          if (BtHum)
          { //Carga de imagenes en el HTML
          DireccionesHU.push(response);
          // console.log("direccionesHU");
          // console.log(DireccionesHU);
            DireccionesHU.forEach(function (Dire, Indi, Vect){
              if (Dire!="")
              {
              templateD += `<div class=pI id='CIH${Indi}'><button type="button" class='pI2' id='BIH${Indi}'>X</button><img src='images/${Dire}' style="width:200px;height:200px;"></img></div>`;
              }
            })
            $('#ContenedorImgHu').html(templateD);
            DireccionesHU.forEach(function (Dire, Indi, Vect){
              //=============================================================
              // == Boton para quitar la imagen de la carga ==
    
              $('#BIH' + Indi.toString()).on('click',function(e){
              //console.log("imagen" + Indi);
    
              DireccionesHU[Indi] = ""; //Elimina el elemento del array de direcciones de Humedales
              $('#CIH' + Indi.toString()).remove(); //Elimina el elemento del HTML de la carga de Humedales
              const DataEli ={
                  eliminar : true,
                  nomImag : Dire
              };
              //console.log(DataEli);
              $.post('php/CargaImagenes.php', DataEli, (response) => { //Llama al PHP para eliminar la imagen cargada en el servidor
                console.log(response); //Si se comenta, no se va a escribir ningún echo del php en la consola de la pagina ¡OJO!
              })
    
              // == Termina la creacion del evento click del boton eliminar ==
              //=============================================================
            });
    
            })
          }
        }
    }
    e.preventDefault();
    $('#form_imagen_add').hide();
  
  }
  
      //Direcciones.forEach(dir => {templateD += `<div class=pI><button class=pI2>X</button><img src='images/${dir}' style="width:200px;height:200px;"></img></div>`});

      //console.log(templateD);



      //$('#form_add').trigger('reset');

      

    }
})});



  //////////////////Form flora/////////////////////
  $('#form-flora').submit(e => {
    e.preventDefault();
    $('div').remove('#TexErrorIncompleto'); 

    if ($('#nom_colquial_flora').val() === ''){
      CambiarClass($('#nom_colquial_flora'), "form-control", "form-control is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
      $('#DivNombreColFlo').append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
    }
    if ($('#nom_ctfico_flora').val() === ''){
      CambiarClass($('#nom_ctfico_flora'), "form-control", "form-control is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
      $('#DivNombreCieFlo').append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
    }

    if ($('#nom_colquial_flora').val() !== '' && $('#nom_ctfico_flora').val() !== ''){

    DireccionesFL.forEach(function (Dire, Indi, Vect){
      if(Dire==""){
        //console.log("Elimina" + DireccionesFL[Indi]);
        DireccionesFL.splice(Indi,1);
        //console.log("eliminado"+ DireccionesFL[Indi]);
      };
    });
    //console.log(DireccionesFL);
    const postData = {
      id_flora: $('#ID_flora').val(),
      nom_cq_flora: $('#nom_colquial_flora').val(),
      nom_cf_flora: $('#nom_ctfico_flora').val(),
      carac_flora: $('#carac_flora').val(),
      // img_flora: $('#img_flora').val(),
      Dir: DireccionesFL.slice()   
    };

    console.log(postData);  //Si se comenta, no se va a escribir ningún echo del php en la consola de la pagina ¡OJO!
    //console.log("antes de llamar al php");
    $.post('php/sub_forms.php', postData, (response) => {
      //console.log("despues de llamar al php");
      //console.log(response);
      //$('#form_add').trigger('reset');
      e.preventDefault();
      carga_form_alta_fl();
      $('#form_flora_add').hide();
      $('#ID_flora').val('');
      $('#nom_colquial_flora').val('');
      $('#nom_ctfico_flora').val('');
      $('#carac_flora').val('');
      $('#ContenedorImgFlor').empty();
      DireccionesFL.splice(0, DireccionesFL.length);
     // console.log(DireccionesFL);
     CambiarClass($('#nom_colquial_flora'), "form-control is-invalid", "form-control");
     CambiarClass($('#nom_ctfico_flora'), "form-control is-invalid", "form-control");
    });
    }
  });

//-----------------------------------------------------------------------

  //-----------------------------------------------------------------------
  //---------------------------- Agregar más propietario ------------------------------
  $('#btn_Otro_Propie').on('click', function(){
    x_prop++;
    var add = '';
    add += `
    <div class="form-group" style="display: flex;" id="DivPropComp`+ x_prop.toString() +`">
      <select class="form-select" id="sel_propietario`+ x_prop.toString() +`">
        <option>Seleccione Propietario ...</option>
      </select>
      <button type="button" class="btn btn-danger" id="btn_Propiet_delet`+ x_prop.toString() +`">-</button>
    </div>
    `;

  //$('#btn_flora_dhum').remove();
  $('#ContePropies').append(add);


  carga_form_alta_propie();


  $('#btn_Propiet_delet'+ x_prop.toString()).on('click', function(){
    var Padre = $(this).parent();
    Padre.remove();
    //$('#sel_propietario'+ x_prop.toString()).remove();
    //$('#btn_Propiet_delet'+ x_prop.toString()).remove();

    //console.log('#sel_propietario'+ x_prop.toString());
    //console.log(x_prop)
  });

  });
  //-----------------------------------------------------------------------

  ///---------------form rel---------
  /*
  $('#form_add2').submit(e => {
    e.preventDefault();
    const postData = {
      $('#ancho').val('');
      $('#largo').val('');
      $('#Conductividad').val('');
      $('#pH').val('');
      $('#o2disuelto').val('');
      $('#Turbidez').val('');
      $('#Color').val('');
      $('#Temperatura').val('');
      $('#obs').val('');
      
    };
    //console.log(postData);
    $.post('php/sub_forms.php', postData, (response) => {
      console.log(response);
      //$('#form_add').trigger('reset');
      e.preventDefault();
      carga_form_alta_p();
      $('#form_add2').hide();
    });
  });*/


///////////////////////Agregar Filas de Elementos/////////////////////////

//---------------------Presion Humedal--------------------------------
  $('#btn_presion_hum').on('click', function(){
    x_pre = x_pre+1;
    var add = '';
    add += `
      <div class="form-group">
      <select class="form-select `+ x_pre.toString() +`" id="sel_presion">
      <option>Tipo de presion...</option>
      </select>
      <button type="button" class="btn btn-danger" id="btn_presion_dhum">-</button>
      </div>
      `;
 
    $('#btn_presion_dhum').remove();
    $('#input_presion').append(add);   
    console.log('x_pre: '+x_pre)
    carga_form_alta_p();
    
    $('#btn_presion_dhum').on('click', function(){
      $('#sel_presion.form-select.'+ x_pre.toString()).remove();
      x_pre = x_pre-1;
      if (max_pre != x_pre){
        $('#btn_presion_hum').show();
      }
      if(x_pre == 0){
        $('#btn_presion_dhum').remove();
      }
    });
    
  });
  //-----------------------------------------------------------------------
  
  //----------------------------Fauna humedal------------------------------
  $('#btn_fauna_hum').on('click', function(){
    x_fau = x_fau+1;
    var add = '';
    add += `
      <div class="form-group">
      <select class="form-select `+ x_fau.toString() +`" id="sel_fauna">
      <option>Seleccione Fauna...</option>
      </select>
      <button type="button" class="btn btn-danger" id="btn_fauna_dhum">-</button>
      </div>
      `;
  
    $('#btn_fauna_dhum').remove();
    $('#input_fauna').append(add);
   
    carga_form_alta_fa();
  
    $('#btn_fauna_dhum').on('click', function(){
      $('#sel_fauna.form-select.'+ x_fau.toString()).remove();
      x_fau = x_fau-1;
      if (max_fauna != x_fau){
        $('#btn_fauna_hum').show();
      }
      if(x_fau <= 0){
        $('#btn_fauna_dhum').remove();
      }
    });
  });
  //-----------------------------------------------------------------------
  
  //----------------------------Flora humedal------------------------------
  $('#btn_flora_hum').on('click', function(){
    x_flo = x_flo+1;
    var add = '';
    add += `
      <div class="form-group">
      <select class="form-select `+ x_flo.toString() +`" id="sel_flora">
      <option>Seleccione Flora...</option>
      </select>
      <button type="button" class="btn btn-danger" id="btn_flora_dhum">-</button>
      </div>
      `;
  
    $('#btn_flora_dhum').remove();
    $('#input_flora').append(add);
  
    carga_form_alta_fl();
  
    $('#btn_flora_dhum').on('click', function(){
      $('#sel_flora.form-select.'+ x_flo.toString()).remove();
      x_flo = x_flo-1;
      if (max_flora !=  x_flo){
        $('#btn_flora_hum').show(); 
      } 
      if( x_flo <= 0){
        $('#btn_flora_dhum').remove();
      }
    });
  });

  //-----------------------------Persona------------------------------------------
  $('#btn_miembro_hum').on('click', function(){
    x_pers = x_pers+1;
    var add = '';
    add += `
      <div class="form-group">
      <select class="form-select `+ x_pers.toString() +`" id="sel_miembro">
      <option>Miembro</option>
      </select>
      <button type="button" class="btn btn-danger" id="btn_miembro_dhum">-</button>
      </div>
      `;
  
    $('#btn_miembro_dhum').remove();
    $('#input_miembro').append(add); 
  
    carga_form_alta_pers();
  
    $('#btn_miembro_dhum').on('click', function(){
      $('#sel_miembro.form-select.'+ x_pers.toString()).remove();
      x_pers = x_pers-1;
      if (max_miembro != x_pers){
        $('#btn_miebro_hum').show(); 
      }
      if(x_pers <= 0){
        $('#btn_miembro_dhum').remove();
      }
    });
  });

  //-----------------------------------------------------------------------
});

$('#btn_add').on('click', function(){
  console.log('x_pre: '+x_pre);
  $('#form_add').show();
  $('#t_form.modal-title').html('Alta Accidente Geografico');
  $('#form_modal').css({'background':'#DEFEAE'});
  $('#ID_humedal').val('');
  $('#nombre').val('');
  document.getElementById('tipo').options.item(0).selected = 'selected';
  update = false;   
  carga_form_alta_cu();
  carga_form_alta_co();
  carga_form_alta_p();
  carga_form_alta_fa();
  carga_form_alta_fl();
  carga_form_alta_pers();
});

 //----------------------------------CARGA DE LOS SELECT-----------------------------------------------------------------------//
 // ----------------PRESIONES-----------------  //
function carga_form_alta_p(){
  var x=x_pre;
  var antpre = new Array();
   
  while(x!=-1){
    antpre[x] = $('#sel_presion.form-select.'+ x.toString()).val();
    x--;
  }

/*
  const VerifData = {
    Cargar: true
  }
*/
  $.ajax({
    url: 'php/alta.php',
    type: 'GET',       
   // data: VerifData,   
   // contentType: false,
   // processData: false,
    success: function (response) {            
      if(!response.error) {
        let datos = JSON.parse(response);
        let template0 = '<option>... Seleccione una presión ...</option>';
        datos['presiones'].forEach(dato => {
          var val= true;
          antpre.forEach(e =>{
            if(e==dato.tipo_presion){
              val = false;                 
            }
          });
          if(val==true){
            template0 += `
            <option>${dato.tipo_presion}</option>
            `
          }
        });  
        $('#sel_presion.form-select.'+ x_pre.toString()).html(template0);        
        if( (datos['presiones'].length-1) == x_pre){
          $('#btn_presion_hum').hide();
          max_pre = (datos['presiones'].length-1);   
        }  

        var conta=0;
        var cond=true;
        while(cond){
          //console.log("entra al while");
          //console.log("SelModPres"+conta.toString());
          console.log(document.getElementById("SelModPres"+conta.toString()));
          //console.log(!!document.getElementById("SelModPres"+conta.toString()));
          if(!!document.getElementById("SelModPres"+conta.toString())){
            //console.log("existe la ID: SelModPres"+conta.toString());
            //console.log("template0: "+template0);
            //document.getElementById("SelModPres"+conta.toString()).innerHTML(template0);
            $('#SelModPres'+conta.toString()).html(template0.slice(49));  
           
            //console.log(contpPr[conta]);
            document.getElementById('SelModPres'+conta.toString()).options.item(contpPr[conta]).selected = 'selected';
            conta++;
            if (conta==1000){
              cond=false;
            }
          }else{
            //console.log(!!document.getElementById("SelModPres"+conta.toString()));
            //console.log("termina la ejecución");
            cond=false;
          }
        }
      }              
    }
  });
}

// ----------------CUENCA-----------------  //

/*
  const VerifData = {
    Cargar: "cargar",
  }
*/
function carga_form_alta_cu(){
/*
  const VerifData = {
    Cargar: "cargar",
  }
*/
  $.ajax({
    url: 'php/alta.php',
    type: 'GET',
  //  data: VerifData,  
   // contentType: false,
    //processData: false,
    success: function (response) {
      if(!response.error) {
        console.log(response);
        let datos = JSON.parse(response);
        //console.log(datos);
        let template1 = '<option>... Seleccione una cuenca ...</option>';
        datos['cuencas'].forEach(dato => {
          template1 += `
          <option>${dato.nombre_cuenca}</option>
          ` 
        });
                  
        $('#sel_cuenca').html(template1);

        console.log(document.getElementById("SelModCuen"));
        if(!!document.getElementById("SelModCuen")){
          $('#SelModCuen').html(template1.slice(46));  
          document.getElementById('SelModCuen').options.item(contpCu).selected = 'selected';
        }
      }            
    }
  });
};

//----------COMPLEJO-----------------------------------//
   
function carga_form_alta_co(){
 /* const VerifData = {
    Cargar: true
  }*/
  $.ajax({
    url: 'php/alta.php',
    type: 'GET',
   // data: VerifData,  
   // contentType: false,
   // processData: false,
    success: function (response) {
        if(!response.error) {
        //  console.log(response);
          let datos = JSON.parse(response);
        //  console.log(datos);
          let template2 = '<option>... Seleccione un complejo ...</option>';
          datos['complejos'].forEach(dato => {template2 += `<option>${dato.nombre_complejo}</option>` });                    
          $('#sel_complejo').html(template2);    
          
          console.log(document.getElementById("SelModComp"));
          if(!!document.getElementById("SelModComp")){
            $('#SelModComp').html(template2.slice(47));  
            document.getElementById('SelModComp').options.item(contpCo).selected = 'selected';
          }
        }
    }
  });
};
      
//----------------MIEMBRO---------------------------------------//      
function carga_form_alta_pers(){
  var x=x_pers;
  var antpers = new Array();
  
  while(x!=-1){
    antpers[x] = $('#sel_miembro.form-select.'+ x.toString()).val();
    x--;
  }
 /*            
  const VerifData = {
    Cargar: true
  }*/
  $.ajax({
    url: 'php/alta.php',
    type: 'GET',
   // data: VerifData,
  //  contentType: false,
  //  processData: false,
    success: function (response) {             
      if(!response.error) {
        let datos = JSON.parse(response);
        let template3 = '<option>... Seleccione una persona ...</option>';          
        datos['persona'].forEach(dato => {
          var val= true;
          antpers.forEach(e =>{
            if(e==dato.nom_pers){
              val = false;
            }
          });
          if(val==true){
            template3 += `
              <option>${dato.nom_pers}</option>
              `
          }
        });  
        $('#sel_miembro.form-select.'+ x_pers.toString()).html(template3);
        if( (datos['persona'].length-1) == x_pers){
          $('#btn_miembro_hum').hide();
          max_miembro = (datos['persona'].length-1);    
        }  
      }               
    }
  });
}

//-------------FAUNA----------------------------------------------------//
function carga_form_alta_fa(){
  var x=x_fau;
  var antfau = new Array();

  while(x!=-1){
    antfau[x] = $('#sel_fauna.form-select.'+ x.toString()).val();
    x--;
  }   

 /* const VerifData = {
    Cargar: true
  }*/
  
  $.ajax({
    url: 'php/alta.php',
    type: 'GET',      
  //  data: VerifData,
//    contentType: false,
 //   processData: false,
    success: function (response) {
      if(!response.error) {
        let datos = JSON.parse(response);
        let template4 = `<option>... Seleccione una fauna ...</option>`;    
        datos['faunas'].forEach(dato => {
          var val= true;
          antfau.forEach(e =>{
            if(e==dato.nom_fauna){
              val = false;
            }
          });
          if(val==true){
            template4 += `
              <option>${dato.nom_fauna}</option>
              `
          }
        });  
        $('#sel_fauna.form-select.'+ x_fau.toString()).html(template4);
        if( (datos['faunas'].length-1) == x_fau){
          $('#btn_fauna_hum').hide();
          max_fauna = (datos['faunas'].length-1); 
        }  

        var conta=0;
        var cond=true;
        while(cond){
          console.log(document.getElementById("SelModFau"+conta.toString()));
          if(!!document.getElementById("SelModFau"+conta.toString())){
            $('#SelModFau'+conta.toString()).html(template4.slice(45));  
      
            document.getElementById('SelModFau'+conta.toString()).options.item(contpFau[conta]).selected = 'selected';
            conta++;
            if (conta==1000){
              cond=false;
            }
          }else{
            cond=false;
          }
        }
      }        
    }
  });
}
          
//---------------------FLORA--------------------------------//
function carga_form_alta_fl(){
  var x=x_flo;  
  var antflo = new Array();
        
  while(x!=-1){
    antflo[x] = $('#sel_flora.form-select.'+ x.toString()).val();
    x--;
  }
/*
  const VerifData = {
    Cargar: true
  }*/
                    
  $.ajax({
    url: 'php/alta.php',
    type: 'GET',  
  //  data: VerifData,           
    //contentType: false,
 //   processData: false,  
    success: function (response) {     
      if(!response.error) {
        let datos = JSON.parse(response);
        let template5 = `<option>... Seleccione una flora ...</option>`;
                       
        datos['floras'].forEach(dato => {
          var val= true;
          antflo.forEach(e =>{
            if(e==dato.nom_flora){
              val = false;
            }
          });
          if(val==true)
          {
            template5 += `
              <option>${dato.nom_flora}</option>
              `
          }
        });  
        $('#sel_flora.form-select.'+ x_flo.toString()).html(template5);
        if( (datos['floras'].length-1) == x_flo)
        {
          $('#btn_flora_hum').hide();
          max_flora = (datos['floras'].length-1);
        }  

        var conta=0;
        var cond=true;
        while(cond){
          console.log(document.getElementById("SelModFlo"+conta.toString()));
          if(!!document.getElementById("SelModFlo"+conta.toString())){
            $('#SelModFlo'+conta.toString()).html(template5.slice(45));  

            document.getElementById('SelModFlo'+conta.toString()).options.item(contpFlo[conta]).selected = 'selected';
            conta++;
            if (conta==1000){
              cond=false;
            }
          }else{

            cond=false;
          }
        }
      }                
    }                       
  });
}
//---------------------PROPIETARIO--------------------------------//
function carga_form_alta_propie(){
/*  const VerifData = {
    Cargar: true
  }*/
  $.ajax({
    url: 'php/alta.php',
    type: 'GET',
  //  data: VerifData,   
  //  contentType: false,
  //  processData: false,
    success: function (response) {
        if(!response.error) {
          //console.log(response);
          let datos = JSON.parse(response);
          //console.log(datos);
          let template6 = `<option>... Seleccione un propietario ...</option>`;
          datos['propietarios'].forEach(dato => {template6 += `<option>${dato.nom_prop}</option>` });  
          //console.log(template6);    
          /*for (var i = 0; i <= x_prop; i++) {
            $('#sel_propietario'+i.toString()).html(template6);
          }*/
          $('#sel_propietario'+x_prop.toString()).html(template6);
        }                    
    }
  });
};

////////////////////////////////

//=========================================================//
//=========================================================//
//----------------------Modificar--------------------------//
//=========================================================//
    
$('#btn_modif').on('click', function(){
  $('#form_modif').show();
  $('#t_form.modal-title').html('Modificar');
  $('#form_modal').css({'background':'#DEFEAE'});
  update = false; 
  
  //- accidentes geograficos -//
  $('#btn_maccidente').on('click',function(){
    var postData= {
      accidente:true,
    }
    $('#ContTable').css({'visibility':'visible'});
    
    $.post('php/modificar.php', postData, (response) => {
      console.log(response);  
      $("#myTable").html(response);
    });
  })

  //- complejos -//
  $('#btn_mcomplejo').on('click',function(){
    var postData= {
      complejo:true,
    }
    $('#ContTable').css({'visibility':'visible'});
    $.post('php/modificar.php', postData, (response) => {
      console.log(response);  
      $("#myTable").html(response);
    });
  })

  //- cuencas -//
  $('#btn_mcuenca').on('click',function(){
    var postData= {
      cuenca:true,
    }
    $('#ContTable').css({'visibility':'visible'});
    $.post('php/modificar.php', postData, (response) => {
      console.log(response);  
      $("#myTable").html(response);
    });
  })

  //- relevamiento -//
  $('#btn_mrelevamiento').on('click',function(){
    var postData= {
      relevamiento:true,
    }
    $('#ContTable').css({'visibility':'visible'});
    $.post('php/modificar.php', postData, (response) => {
      console.log(response);  
      $("#myTable").html(response);
    });
  })

  //- fauna -//
  $('#btn_mfauna').on('click',function(){
    var postData= {
      fauna:true,
    }
    $('#ContTable').css({'visibility':'visible'});
    $.post('php/modificar.php', postData, (response) => {
      console.log(response);  
      $("#myTable").html(response);
    });
  })

  //- flora -//
  $('#btn_mflora').on('click',function(){
    var postData= {
      flora:true,
    }
    $('#ContTable').css({'visibility':'visible'});
    $.post('php/modificar.php', postData, (response) => {
      console.log(response);  
      $("#myTable").html(response);
    });
  })

  //- presiones -//
  $('#btn_mpresiones').on('click',function(){
    var postData= {
      presion:true,
    }
    $('#ContTable').css({'visibility':'visible'});
    $.post('php/modificar.php', postData, (response) => {
      console.log(response);  
      $("#myTable").html(response);
    });
  })

  //- personas -//
  $('#btn_mpersonas').on('click',function(){
    var postData= {
      persona:true,
    }
    $('#ContTable').css({'visibility':'visible'});
    $.post('php/modificar.php', postData, (response) => {
      console.log(response);  
      $("#myTable").html(response);
    });
  })

});           

function AbrirPestañaEarthEngine(){

  console.log("Controla si ya existe la Pestaña");
  if (!!document.getElementById('DivPrincipalEarthEngine')){
    console.log("si existe la Pestaña EarthEngine");
    MinimizarPestañaHTML('DivPrincipalEarthEngine','mapHeartEngine')
  }else{
    console.log("no existe la Pestaña EarthEngine");
    console.log("Abriendo Pestaña EarthEngine");

  PestañaEarthEngine = 
    "<div id='DivPrincipalEarthEngine' style=' height: 90%; width: 100%;position: absolute; padding-top: 0px; padding-left: 5px; padding-right: 5px; padding-bottom: 5px; background: #343a40; border: 2px solid greenyellow;'>"+
      "<div style=' display: flex; flex-direction: row-reverse; border-bottom: 2px solid greenyellow;'>"+
        "<button id='CerrarEarthEngine' onclick='deletesHTML(`DivPrincipalEarthEngine`);' type='button' class='btn btn-danger' style='height: 23px; width: 23px; padding: 0px; margin: 2px; border-radius: 5px; border: 2px solid lightcoral; font-size: 12px;'>"+
          "<i class='fa-solid fa-x' style='color:lightgrey;'></i>"+
        "</button>"+  
        "<button id='ExpandirEarthEngine' onclick='ExpandirPestañaHTML(`DivPrincipalEarthEngine`,`mapHeartEngine`);' type='button' class='btn btn-info' style='height: 23px; width: 23px; padding: 0px; margin: 2px; border-radius: 5px; border: 2px solid lightskyblue; font-size: 12px;'>"+
          "<i class='fa-solid fa-expand'></i>"+
        "</button>"+
        "<button id='MinimizarEarthEngine' onclick='MinimizarPestañaHTML(`DivPrincipalEarthEngine`,`mapHeartEngine`);' type='button' class='btn btn-info' style='height: 23px; width: 23px; padding: 0px; margin: 2px; border-radius: 5px; border: 2px solid lightskyblue; font-size: 12px;'>"+
          "<i class='fa-solid fa-window-minimize'></i>"+
        "</button>"+
      "</div>"+
      "<iframe id='mapHeartEngine' style='height: 96%; margin-top: 3px;"+
                    "width: 100%;'"+
                "src='https://facu52da.users.earthengine.app/view/visualizarmapa'>"+
      "</iframe>"+
    "</div>";
  $('#contenido_principal').append(PestañaEarthEngine);
  console.log("Pestaña EarthEngine Abierta");
  }
  $('#tools_op').hide();
  VisibleTool = false;
}

function MinimizarPestañaHTML(Padre,iframe){
  if(document.getElementById(iframe).style.visibility == 'hidden'){
    document.getElementById(iframe).style.visibility='visible';
    document.getElementById(Padre).style.bottom='0px';
    document.getElementById(Padre).style.height='90%';
    document.getElementById(Padre).style.width='100%';
    document.getElementById(Padre).style.paddingTop='0px';
    document.getElementById(Padre).style.paddingLeft='5px';
    document.getElementById(Padre).style.paddingRight='5px';
    document.getElementById(Padre).style.paddingBottom='5px';
  
    document.getElementById('CerrarEarthEngine').style.margin='2px';
  
    document.getElementById('ExpandirEarthEngine').style.margin='2px';
    document.getElementById('ExpandirEarthEngine').innerHTML="<i class='fa-solid fa-expand'></i>";

    document.getElementById('MinimizarEarthEngine').style.margin='2px';
    document.getElementById('MinimizarEarthEngine').innerHTML="<i class='fa-solid fa-window-minimize'></i>";
  }else{
    document.getElementById(iframe).style.visibility='hidden';
    document.getElementById(Padre).style.bottom='0px';
    document.getElementById(Padre).style.top='';
    document.getElementById(Padre).style.height='3%';
    document.getElementById(Padre).style.width='10%';
    document.getElementById(Padre).style.padding='0px';
  
    document.getElementById('CerrarEarthEngine').style.margin='0px';
    document.getElementById('CerrarEarthEngine').style.marginLeft='2px';
    document.getElementById('CerrarEarthEngine').style.marginRight='2px';

    document.getElementById('ExpandirEarthEngine').style.margin='0px';
    document.getElementById('ExpandirEarthEngine').style.marginLeft='2px';
    document.getElementById('ExpandirEarthEngine').style.marginRight='2px';
    document.getElementById('ExpandirEarthEngine').innerHTML="<i class='fa-solid fa-expand'></i>";
  
    document.getElementById('MinimizarEarthEngine').style.margin='0px';
    document.getElementById('MinimizarEarthEngine').style.marginRight='2px';
    document.getElementById('MinimizarEarthEngine').innerHTML="<i class='fa-regular fa-window-maximize'></i>";
  }
}

function ExpandirPestañaHTML(Padre,iframe){

  if(document.getElementById(Padre).style.height=='100%'){
    document.getElementById(Padre).style.top='';
    document.getElementById(Padre).style.height='90%';
    document.getElementById('ExpandirEarthEngine').innerHTML="<i class='fa-solid fa-expand'></i>";
  }else{
    document.getElementById(Padre).style.top='0px';
    document.getElementById(Padre).style.height='100%';
    document.getElementById(iframe).style.visibility='visible';
    document.getElementById(Padre).style.bottom='0px';
    document.getElementById(Padre).style.width='100%';
    document.getElementById(Padre).style.padding='5px';
  
    document.getElementById('CerrarEarthEngine').style.margin='2px';
  
    document.getElementById('ExpandirEarthEngine').style.margin='2px';
    document.getElementById('ExpandirEarthEngine').innerHTML="<i class='fa-solid fa-compress'></i>";

    document.getElementById('MinimizarEarthEngine').style.margin='2px';
    document.getElementById('MinimizarEarthEngine').innerHTML="<i class='fa-solid fa-window-minimize'></i>";
  }
    

    
}

function AbrirVentana(){
  window.open('https://facu52da.users.earthengine.app/view/visualizarmapa' , 'ventana1' , 'width=2000px,height=2000px,scrollbars=NO');
}




function ModifAccInf(Id,nombre,cuenca,complejo,Tipo,descripcion,presiones){
  CantPres= 0;

  IDp = new Array;
  /* Datas = (Significado)
    Data=1 : Accidentes geograficos
    Data=2 Complejos
    Data=3 Cuencas
    Data=4 Relevamientos
    Data=5 Fauna
    Data=6 Flora
    Data=7 Presiones
    Data=8 Personas
    Data=9 Accidentes fuera de modificar */
  var Data= 9;

  //console.log("Modificar un accidente");
  IdAcc = parseInt(Id);

  //console.log("   ID del accidente:"+IdAcc);
  // _________CREA TODA LA VENTANA DONDE SE MOSTRARAN LOS CAMPOS A MODIFICAR_________
  NewForm = 
    "<div id='formModifData' class='modal' role='document' style='background: rgba(0,0,0,0.8);'>"+
      "<div class='modal-dialog modal-lg' style='display: inline-table;'>"+
        "<div class='modal-content' style='width: 92vmax; left: 3vmax; border: 2px solid #343a40;'>"+
          "<div class='modal-header'  style='background:#343a40; color:lightgrey;'>"+
            "<h5 class='modal-title' style='color:lightgrey;'>Modificar accidente <a id='TitModId'class='modal-title' style='color:lightgrey;'>"+IdAcc+"</a></h5>"+
            "<button type='button' style='color:lightgrey; background: #343a40; border: 0px;' onclick='deletesHTML(`formModifData`);' data-bs-dismiss='modal' aria-label='Close'>"+
              "<i class='fa-solid fa-x' style='color:lightgrey;'></i>"+
            "</button>"+
          "</div>"+
          "<div id='dataModif' class='modal-body'>"+
          "</div>"+
          "<div class='modal-body' style=' align-self: flex-end;'>"+
            "<button id='CargarModif' type='button' class='btn btn-primary' onclick='CargarModificaciones("+Data+");'>Confirmar Modificación</button>"+
          /*  "<button type='button' style='color:lightgrey; background: #343a40; border: 0px;' onclick='deletesHTML(`formModifData`);' data-bs-dismiss='modal' aria-label='Close'>"+
                "Confirmar Modificación"+
              "</button>"+*/
          "</div>"+
        "</div>"+
      "</div>"+
    "</div>";
    $("body").append(NewForm);
    $("#formModifData").show();

     // _________EXTRAE EN VARIABLES LOS DISTINTOS CAMPOS DE DATOS_________

  var IDa = Id;
  var IDn = nombre;
  var IDt = Tipo;
  var IDco = complejo;
  var IDcu = cuenca;
  IDd = descripcion;
  j= 0;
  presiones.forEach(element => {
    IDp[j] = element['tipo_presion'];
    j++;
  });

  

  console.log("IDa: "+Id);
  console.log("IDn: "+nombre);
  console.log("IDt: "+Tipo);
  console.log("IDco: "+IDco);
  console.log("IDcu: "+IDcu);
  console.log("IDp: "+IDp);
  console.log("IDd: "+IDd);
  // ______________ SE CREAN TODOS LSO CAMPOS DE DATOS QUE SE PERMITIRAN MODIFICAR SOBRE ESTE OBJETO A MODIFICAR _____________________
  data =  
  "<section style='display: flex;'>"+
  "<div style=' width: 50%; padding-left: 20px;'>"+
      "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Nombre del Accidente Geográfico: </a>" +
          "<input type='text' id='InpModNombre' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDn+"'><br><br><br>" + 
      "</div>"+
      "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey;'>Tipo de Accidente Geográfico: </a>" +
            "<select id='InpModTipo' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>" +
                "<option>Humedal</option>"+
                "<option>Lago</option>"+
                "<option>Pantano</option>"+
                "<option>Río</option>"+
                "<option>Arroyo</option>"+
                "<option>Cascada</option>"+
                "<option>Laguna</option>"+
                "<option>Manantial</option>"+
            "</select><br><br><br>"+
        "</div>"+
      "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey;'>Cuenca del Accidente Geográfico: <button id='Mper$F' class='btn btn-success' onclick='MostrarFormulario("+1+");' type='button' style=' height: 25px; width: 25px; padding: 0px; font-size: 15px; color: #343a40; border-radius: 25px;'><i class='fa-solid fa-pen'></i></button></a>" +
          "<select id='SelModCuen' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>" +
              "<option>"+IDcu+" 1</option>"+
              "<option>"+IDcu+" 2</option>"+
              "<option>"+IDcu+" 3</option>"+
          "</select><br><br><br>"+
      "</div>"+
      "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey;'>Complejo del Accidente Geográfico: <button id='Mper$F' class='btn btn-success' onclick='MostrarFormulario("+2+");' type='button' style=' height: 25px; width: 25px; padding: 0px; font-size: 15px; color: #343a40; border-radius: 25px;'><i class='fa-solid fa-pen'></i></button></a>"+
          "<select id='SelModComp' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>" +
              "<option>"+IDco+" 1</option>"+
              "<option>"+IDco+" 2</option>"+
              "<option>"+IDco+" 3</option>"+
          "</select><br><br><br>" + 
      "</div>"+
  "</div>"+
      "<div id='ContPadrePres' style=' width: 50%; padding-left: 20px; height: 280px; overflow-x: auto;'>"+
      "<a style='font-weight: bold; color: grey; font-size: 20px;'>Presiones del Accidente Geográfico: <button id='Mper$F' class='btn btn-success' onclick='MostrarFormulario("+3+");' type='button' style=' height: 25px; width: 25px; padding: 0px; font-size: 15px; color: #343a40; border-radius: 25px;'><i class='fa-solid fa-pen'></i></button></a>";

  for (i=0 ; i<IDp.length; i++){
    data = data+"<div id='ContBtnSelPres"+i+"' style='display:flex; margin-bottom: 15px;'>"+
                  "<button id='BtnQuitPres"+i+"' type='button' class='btn btn-danger' style='height: 25px; width: 25px; padding: 0px;' onclick='quitarPresion(SelModPres"+i+",BtnQuitPres"+i+",ContBtnSelPres"+i+","+i+");'> X </button>"+
                  "<select id='SelModPres"+i+"' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>"+
                      "<option>"+IDp[i]+" 1</option>"+
                      "<option>"+IDp[i]+" 2</option>"+
                      "<option>"+IDp[i]+" 3</option>"+
                  "<select>";
               
    if(i == (IDp.length-1)){
      data = data+"<button id='BtnNewRelPresComp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPresion("+(i+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
    }
    data = data+"</div>";
    CantPres++;
  }
  if(IDp.length ==0){
    data = data+"<br><button id='BtnNewRelPresComp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPresion("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>";
  }

  data = data+"</div><br>"+
  "</section>"+
  "<div style=' text-align: -webkit-center; width: 50%; height: 200px;>"+
      "<a style='font-weight: bold; color: grey; font-size: 20px;'>Descripcion del Accidente Geográfico: </a><br>" +
      "<textarea id='TextModDesc' class='form-control' style='background: #e2e2e2; color:black; width: 400px; height: 200px; min-height: 100px; max-height: 225px;''>"+IDd+"</textarea><br><br><br>"+
  "</div>";
  console.log("ahora CantPres:"+CantPres);
  console.log("va a crear el formulario");
  $("#dataModif").html(data);
  console.log("creó el formulario");
  tempCuen = '';
  console.log("tempCuen: "+tempCuen);
  tempComp = '';
  console.log("tempComp: "+tempComp);
  tempPres = '';
  console.log("tempPres: "+tempPres);
  //console.log("creó los temp");
  pCu=0;
  pCo=0;
  pPr=0;
  //console.log("creó los ps");
  contpCu = -10;
  contpCo = -10;
 // console.log("creó contpCu y contpCo");
  console.log("contpCu: "+contpCu);
  console.log("contpCo: "+contpCo);
  contpPr = new Array;
 // console.log("creó contpPr");
  console.log("=============================================================");
  console.log("_____________________________________________________________");
  console.log("=============================================================");
// _____________ SE CARGAN TODAS LAS OPCIONES DE DATOS DESDE LA BASE DE DATOS EN LOS SELECTS DE LA VENTANA DE MODIFICACION _____________________
const postData = {CargarSelects: true,}   
$.post('php/modificar.php', postData, (response) => {
  let datosAcc = JSON.parse(response);
  datosAcc['cuencas'].forEach(dato => {
    tempCuen +=`<option>${dato.nombre_cuenca}</option>` 
    if (dato.nombre_cuenca == IDcu){
      contpCu = pCu;
    }else{
      pCu++;
    }
    //console.log("__________________");
  });
  datosAcc['complejos'].forEach(dato => {
    tempComp +=`<option>${dato.nombre_complejo}</option>` 
    if (dato.nombre_complejo == IDco){
      contpCo = pCo;
    }else{
      pCo++;
    }
  });
  datosAcc['presiones'].forEach(dato => {
    tempPres +=`<option>${dato.tipo_presion}</option>` 

  });
  for (i=0; i<IDp.length;i++){
    pPr=0;
    datosAcc['presiones'].forEach(dato => {
      if (dato.tipo_presion == IDp[i]){
        contpPr[i] = pPr;
      }else{
        pPr++;
      }
    });        
  }

  switch (IDt)
  {
    case "Humedal":
      document.getElementById('InpModTipo').options.item(0).selected = 'selected';
      break;
    case "Lago":
      document.getElementById('InpModTipo').options.item(1).selected = 'selected';
      break;
    case "Pantano":
      document.getElementById('InpModTipo').options.item(2).selected = 'selected';
      break;
    case "Río":
      document.getElementById('InpModTipo').options.item(3).selected = 'selected';
      break;
    case "Arroyo":
      document.getElementById('InpModTipo').options.item(4).selected = 'selected';
      break;
    case "Cascada":
      document.getElementById('InpModTipo').options.item(5).selected = 'selected';
      break;
    case "Laguna":
      document.getElementById('InpModTipo').options.item(6).selected = 'selected';
      break;
    case "Manantial":
      document.getElementById('InpModTipo').options.item(7).selected = 'selected';
      break;
  }

  console.log("contpCu: "+contpCu);
  console.log("contpCo: "+contpCo);
  if (contpCu ==-10){
    tempCuen = "<option>... Seleccione una cuenca ...</option>"+ tempCuen;
    contpCu=0;
  }

    $('#SelModCuen').html(tempCuen);
    document.getElementById('SelModCuen').options.item(contpCu).selected = 'selected';
 
    if (contpCo ==-10){
      tempComp = "<option>... Seleccione un complejo ...</option>"+ tempComp;
      contpCo=0;
    }
  $('#SelModComp').html(tempComp);
  document.getElementById('SelModComp').options.item(contpCo).selected = 'selected';

  for (ii=0; ii<IDp.length; ii++){
    $('#SelModPres'+ii).html(tempPres);
    document.getElementById('SelModPres'+ii).options.item(contpPr[ii]).selected = 'selected';
  }
  
});

//__________ TERMINA LA CREACION DE TODA LA VENTANA DE MODIFICACION DE DATOS DE ESTE OBJETO (Accidentes) _________________
}

function ModifRelInf(IdRel,NombreAcc,FechRel,Conduc,Ancho,Largo,
  Superf,O2d,Turb,Ph,Color,Temp,CalAgua,DiverVeg,RegHidro,Tiempo,Fuente,Person,Fauna,Flora,Obser){
  CantProp= 0;
  CantReles = 0;
  CantFau= 0;
  CantFlo= 0;
  
  /* Datas = (Significado)
    Data=1 : Accidentes geograficos
    Data=2 Complejos
    Data=3 Cuencas
    Data=4 Relevamientos
    Data=5 Fauna
    Data=6 Flora
    Data=7 Presiones
    Data=8 Personas
    Data=9 Accidentes fuera de modificar 
    Data=10 relevamiento fuera de modificar */
  var Data= 10;

  // _________CREA TODA LA VENTANA DONDE SE MOSTRARAN LOS CAMPOS A MODIFICAR_________
 NewForm = 
  "<div id='formModifData' class='modal' role='document' style='background: rgba(0,0,0,0.8);'>"+
      "<div class='modal-dialog modal-lg' style='display: inline-table;'>"+
          "<div class='modal-content' style='width: 92vmax; left: 3vmax; border: 2px solid #343a40;'>"+
              "<div class='modal-header'  style='background:#343a40; color:lightgrey;'>"+
                  "<h5 class='modal-title' style='color:lightgrey;'>Modificar relevamiento <a id='TitModId'class='modal-title' style='color:lightgrey;'>"+IdRel+"</a></h5>"+
                  "<button type='button' style='color:lightgrey; background: #343a40; border: 0px;' onclick='deletesHTML(`formModifData`);' data-bs-dismiss='modal' aria-label='Close'>"+
                      "<i class='fa-solid fa-x' style='color:lightgrey;'></i>"+
                  "</button>"+
              "</div>"+
              "<div id='dataModif' class='modal-body'>"+
              "</div>"+
              "<div class='modal-body' style=' align-self: flex-end;'>"+
                  "<button id='CargarModif' type='button' class='btn btn-primary' onclick='CargarModificaciones("+Data+");'>Confirmar Modificación</button>"+
                /*  "<button type='button' style='color:lightgrey; background: #343a40; border: 0px;' onclick='deletesHTML(`formModifData`);' data-bs-dismiss='modal' aria-label='Close'>"+
                      "Confirmar Modificación"+
                  "</button>"+*/
              "</div>"+
          "</div>"+
      "</div>"+
  "</div>";
  $("body").append(NewForm);
  $("#formModifData").show();

   // _________EXTRAE EN VARIABLES LOS DISTINTOS CAMPOS DE DATOS_________

      var IDr = IdRel;
  
      var NomAcc = NombreAcc;
      var IDFecha = FechRel;
    
      // COnductividad
      if (Conduc == null){
        var IDConduc = '';
      }else{
        var IDConduc = Conduc;
      }
      
      // Ancho
      if (Ancho == null){
        var IDAnch = '';
      }else{
      var IDAnch = Ancho;
      }
              
      // Oxigeno Disuelto
      if (O2d == null){
        var IDOxgD = '';
      }else{
      var IDOxgD = O2d;
      }
              
      // Calidad del Agua
      if (CalAgua == null){
        var IDCalAg = '';
      }else{
      var IDCalAg = CalAgua;
      }
      
      // Diversidad Vegetal
      if (DiverVeg == null){
        var IDDivVeg  = '';
      }else{
      var IDDivVeg = DiverVeg;
      }

      // Regimen hidrologico
      if (RegHidro == null){
        var IDRegHid = '';
      }else{
        var IDRegHid = RegHidro;
      }

      //Turbides del agua
      if (Turb == null){
        var IDTurbAgua = '';
      }else{
        var IDTurbAgua = Turb;
      }

      // Largo
      if (Largo == null){
        var IDLar = '';
      }else{
        var IDLar = Largo;
      }
      
      // Ph
      if (Ph == null){
        var IDPH = '';
      }else{
        var IDPH = Ph;
      }

      // Color;
      if (Color == null){
        var IDCol = '';
      }else{
        var IDCol = Color   
      }

      
      // Fuente
      if (Fuente == null){
        var IDFuen = '';
      }else{
        var IDFuen = Fuente;
      }

      // Tiempo
      if (Tiempo == null){
        var IDTiemPer = '';
      }else{
        var IDTiemPer = Tiempo;
      }

      // Superficie
      if (Superf == null){
        var IDSup = '';
      }else{
        var IDSup= Superf;
      }

      // Temperatura
      if (Temp == null){
        var IDTempAg = '';
      }else{
        var IDTempAg = Temp;
      }
      
      //Observaciones
      if (Obser == null){
        var IDObs = '';
      }else{
        var IDObs = Obser;
      }

      IDRels = new Array();
      IDFau = new Array();
      IDFlo = new Array();
      j= 0; //Relevadores-personas
      Person.forEach(element => {
        IDRels[j] = element['nombre_persona'];
        j++;
      });
      j= 0; //Fauna
      Fauna.forEach(element => {
        IDFau[j] = element['Nombre_coloquial'];
        j++;
      });
      j= 0; //Flora
      Flora.forEach(element => {
        IDFlo[j] = element['Nombre_coloquial'];
        j++;
      });   
      console.log("=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=");
      console.log("IDr: "+ IDr);
      console.log("NomAcc: "+ NomAcc);
      console.log("IDFecha: "+ IDFecha);
      console.log("IDConduc: "+ IDConduc);
      console.log("IDAnch: "+ IDAnch);
      console.log("IDOxgD: "+ IDOxgD);
      console.log("IDCalAg: "+ IDCalAg);
      console.log("IDDivVeg: "+ IDDivVeg);
      console.log("IDRegHid: "+ IDRegHid);
      console.log("IDTurbAgua : "+ IDTurbAgua );
      console.log("IDLar: "+ IDLar);
      console.log("IDPH: "+ IDPH);
      console.log("IDCol: "+ IDCol);
      console.log("IDFuen: "+ IDFuen);
      console.log("IDTiemPer: "+ IDTiemPer);
      console.log("IDSup: "+ IDSup);
      console.log("IDTempAg: "+ IDTempAg);
      console.log("IDObs: "+ IDObs);
      console.log("IDRels: "+ IDRels);
      console.log("IDFau: "+ IDFau);
      console.log("IDFlo: "+ IDFlo);
      console.log("=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=_=");

// ______________ SE CREAN TODOS LSO CAMPOS DE DATOS QUE SE PERMITIRAN MODIFICAR SOBRE ESTE OBJETO A MODIFICAR _____________________
  data =  
  "<section style='display: flex;'>"+
        "<div style=' height: 50px; font-size: 20px; margin-left: 100px; margin-bottom: 20px; width: 50%;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Accidente Geográfico: </a>" +
            "<div style='background: #e2e2e2; color:black; width: 50%; max-width: 250px; height: 25px; text-align: center;'>"+NomAcc+"</div><br><br><br>" + 
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px; width: 50%;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Fecha del relevamiento: </a>" +
            "<input type='date' id='InpModFecha' class='form-control' style='background: #e2e2e2; color:black; width: 175px; height: 25px;' value='"+IDFecha+"' min='2018-01-01' max='2022-12-31'><br><br><br>" + 
        "</div>"+
  "</section><br><br>"+
  "<section style='display: flex;'>"+
    "<div style=' width: 37%; padding-left: 50px;'>"+
      "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Conductividad: </a>" +
          "<input type='text' id='InpModConductividad' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDConduc+"'><br><br><br>" +
      "</div>"+
      "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Ancho: </a>" +
          "<input type='text' id='InpModAncho' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDAnch+"'><br><br><br>" +
      "</div>"+
      "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Largo: </a>" +
          "<input type='text' id='InpModLargo' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDLar+"'><br><br><br>" +
      "</div>"+
      "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Superficie: </a>" +
          "<input type='text' id='InpModSuper' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDSup+"'><br><br><br>" +
      "</div>"+
      "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Oxigeno Disuelto: </a>" +
          "<input type='text' id='InpModOxigDis' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDOxgD+"'><br><br><br>" +
      "</div>"+
      "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Turbidez del agua: </a>" +
          "<input type='text' id='InpModTurbAgua' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDTurbAgua+"'><br><br><br>" +
      "</div>"+
      "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>PH del agua: </a>" +
          "<input type='text' id='InpModPH' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDPH+"'><br><br><br>" +
      "</div>"+
      "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Color del agua: </a>" +
          "<input type='text' id='InpModColor' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDCol+"'><br><br><br>" +
      "</div>"+
      "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Temperatura del agua: </a>" +
          "<input type='text' id='InpModTempAg' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDTempAg+"'><br><br><br>" +
      "</div>"+
    "</div>"+
    "<div style=' width: 37%; padding-left: 20px;'>"+
      "<div  id='RadioModCaliAgua style='height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
        "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Calidad del Agua: </a>" +
          "<div class='form-check'>"+
            "<label class='form-check-label'>";
            ///console.log("IDCalAg: "+IDCalAg);
            if(IDCalAg=="Conservado"){
              //console.log("Checked1");
              data = data + "<input type='radio' class='form-check-input' name='opAgua' id='agua_op0' value='Conservado' checked=''>";
            }else{
              //console.log("UnChecked1");
              data = data + "<input type='radio' class='form-check-input' name='opAgua' id='agua_op0' value='Conservado'>";
            }
            data = data + 
              "Conservado"+
            "</label>"+
          "</div>"+
          "<div class='form-check'>"+
            "<label class='form-check-label'>";
            if(IDCalAg=="Alterado"){
              //console.log("Checked2");
              data = data + "<input type='radio' class='form-check-input' name='opAgua' id='agua_op1' value='Alterado' checked=''>";
            }else{
              ///console.log("UnChecked2");
              data = data + "<input type='radio' class='form-check-input' name='opAgua' id='agua_op1' value='Alterado'>";
            }
            data = data + 
              "Alterado"+
            "</label>"+
          "</div>"+
          "<div class='form-check'>"+
            "<label class='form-check-label'>";
            if(IDCalAg=="Muy Alterado"){
              //console.log("Checked3");
              data = data + "<input type='radio' class='form-check-input' name='opAgua' id='agua_op2' value='Muy Alterado' checked=''>";
            }else{
              //console.log("UnChecked3");
              data = data + "<input type='radio' class='form-check-input' name='opAgua' id='agua_op2' value='Muy Alterado'>";
            }
            data = data + 
              "Muy Alterado"+
            "</label>"+
          "</div>"+
      "</div>"+
      "<div  id='RadioModDivVeg style='height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
        "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Diversidad Vegetal: </a>" +
          "<div class='form-check'>"+
            "<label class='form-check-label'>";
            //console.log("IDDivVeg: "+IDDivVeg);
            if(IDDivVeg=="Conservado"){
              //console.log("Checked1");
              data = data + "<input type='radio' class='form-check-input' name='opDivVeg' id='Veg_op0' value='Conservado' checked=''>";
            }else{
              //console.log("UnChecked1");
              data = data + "<input type='radio' class='form-check-input' name='opDivVeg' id='Veg_op0' value='Conservado'>";
            }
            data = data + 
              "Conservado"+
            "</label>"+
          "</div>"+
          "<div class='form-check'>"+
            "<label class='form-check-label'>";
            if(IDDivVeg=="Alterado"){
              //console.log("Checked2");
              data = data + "<input type='radio' class='form-check-input' name='opDivVeg' id='Veg_op1' value='Alterado' checked=''>";
            }else{
              //console.log("UnChecked2");
              data = data + "<input type='radio' class='form-check-input' name='opDivVeg' id='Veg_op1' value='Alterado'>";
            }
            data = data + 
              "Alterado"+
            "</label>"+
          "</div>"+
          "<div class='form-check'>"+
            "<label class='form-check-label'>";
            if(IDDivVeg=="Muy Alterado"){
              //console.log("Checked3");
              data = data + "<input type='radio' class='form-check-input' name='opDivVeg' id='Veg_op2' value='Muy Alterado' checked=''>";
            }else{
              //console.log("UnChecked3");
              data = data + "<input type='radio' class='form-check-input' name='opDivVeg' id='Veg_op2' value='Muy Alterado'>";
            }
            data = data + 
              "Muy Alterado"+
            "</label>"+
          "</div>"+
      "</div>"+
      "<div  id='RadioModRegHid style='height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
        "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Régimen Hidrológico: </a>" +
          "<div class='form-check'>"+
            "<label class='form-check-label'>";
            //console.log("IDRegHid: "+IDRegHid);
            if(IDRegHid=="Conservado"){
              //console.log("Checked1");
              data = data + "<input type='radio' class='form-check-input' name='opRegHid' id='RegHid_op0' value='Conservado' checked=''>";
            }else{
              //console.log("UnChecked1");
              data = data + "<input type='radio' class='form-check-input' name='opRegHid' id='RegHid_op0' value='Conservado'>";
            }
            data = data + 
              "Conservado"+
            "</label>"+
          "</div>"+
          "<div class='form-check'>"+
            "<label class='form-check-label'>";
            if(IDRegHid=="Alterado"){
              //console.log("Checked2");
              data = data + "<input type='radio' class='form-check-input' name='opRegHid' id='RegHid_op1' value='Alterado' checked=''>";
            }else{
              //console.log("UnChecked2");
              data = data + "<input type='radio' class='form-check-input' name='opRegHid' id='RegHid_op1' value='Alterado'>";
            }
            data = data + 
              "Alterado"+
            "</label>"+
          "</div>"+
          "<div class='form-check'>"+
            "<label class='form-check-label'>";
            if(IDRegHid=="Muy Alterado"){
              //console.log("Checked3");
              data = data + "<input type='radio' class='form-check-input' name='opRegHid' id='RegHid_op2' value='Muy Alterado' checked=''>";
            }else{
              //console.log("UnChecked3");
              data = data + "<input type='radio' class='form-check-input' name='opRegHid' id='RegHid_op2' value='Muy Alterado'>";
            }
            data = data + 
              "Muy Alterado"+
            "</label>"+
          "</div>"+
      "</div>"+
      "<div  id='RadioModTiemPer style='height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
        "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Tiempo de permanencia: </a>" +
          "<div class='form-check'>"+
            "<label class='form-check-label'>";
            //console.log("IDTiemPer: "+IDTiemPer);
            if(IDTiemPer=="Permanente"){
              //console.log("Checked1");
              data = data + "<input type='radio' class='form-check-input' name='opTiemPer' id='TiemPer_op0' value='Permanente' checked=''>";
            }else{
              //console.log("UnChecked1");
              data = data + "<input type='radio' class='form-check-input' name='opTiemPer' id='TiemPer_op0' value='Permanente'>";
            }
            data = data + 
              "Permanente"+
            "</label>"+
          "</div>"+
          "<div class='form-check'>"+
            "<label class='form-check-label'>";
            if(IDTiemPer=="Temporal"){
              //console.log("Checked2");
              data = data + "<input type='radio' class='form-check-input' name='opTiemPer' id='TiemPer_op1' value='Temporal' checked=''>";
            }else{
              //console.log("UnChecked2");
              data = data + "<input type='radio' class='form-check-input' name='opTiemPer' id='TiemPer_op1' value='Temporal'>";
            }
            data = data + 
              "Temporal"+
            "</label>"+
          "</div>"+
      "</div>"+
      "<div  id='RadioModFuente style='height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
        "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Fuente: </a>" +
          "<div class='form-check'>"+
            "<label class='form-check-label'>";
            //console.log("IDFuen: "+IDFuen);
            if(IDFuen=="Natural"){
              //console.log("Checked1");
              data = data + "<input type='radio' class='form-check-input' name='opFuente' id='Fuente_op0' value='Natural' checked=''>";
            }else{
              //console.log("UnChecked1");
              data = data + "<input type='radio' class='form-check-input' name='opFuente' id='Fuente_op0' value='Natural'>";
            }
            data = data + 
              "Natural"+
            "</label>"+
          "</div>"+
          "<div class='form-check'>"+
            "<label class='form-check-label'>";
            if(IDFuen=="Artificial"){
              //console.log("Checked2");
              data = data + "<input type='radio' class='form-check-input' name='opFuente' id='Fuente_op1' value='Artificial' checked=''>";
            }else{
              //console.log("UnChecked2");
              data = data + "<input type='radio' class='form-check-input' name='opFuente' id='Fuente_op1' value='Artificial'>";
            }
            data = data + 
              "Artificial"+
            "</label>"+
          "</div>"+
      "</div>"+
  "</div>"+
  "<div>"+
    "<div id='ContPadreReles' style=' width: 100%; padding-left: 20px; height: 165px; overflow-x: auto;'>"+
      "<a style='font-weight: bold; color: grey; font-size: 20px;'>Relevadores: </a><br>";

  for (i=0 ; i<IDRels.length; i++){
    data = data+"<div id='ContBtnSelRele"+i+"' style='display:flex; margin-bottom: 15px;'>"+
                  "<button id='BtnQuitRele"+i+"' type='button' class='btn btn-danger' style='height: 25px; width: 25px; padding: 0px;' onclick='quitarRelevadores(SelModRele"+i+",BtnQuitRele"+i+",ContBtnSelRele"+i+","+i+");'> X </button>"+
                  "<select id='SelModRele"+i+"' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>"+
                      "<option>"+IDRels[i]+" 1</option>"+
                      "<option>"+IDRels[i]+" 2</option>"+
                      "<option>"+IDRels[i]+" 3</option>"+
                  "<select>";
               
    if(i == (IDRels.length-1)){
      data = data+"<button id='BtnNewRele' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirRelevadores("+(i+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
    }
    data = data+"</div>";
    CantReles++;
  }
  if(IDRels.length ==0){
    data = data+"<button id='BtnNewRele' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirRelevadores("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>";
  }
  data = data+"</div><br>"+
  "<div id='ContPadreFau' style=' width: 100%; padding-left: 20px; height: 165px; overflow-x: auto;'>"+
      "<a style='font-weight: bold; color: grey; font-size: 20px;'>Fauna: <button id='Mper$F' class='btn btn-success' onclick='MostrarFormulario("+4+");' type='button' style=' height: 25px; width: 25px; padding: 0px; font-size: 15px; color: #343a40; border-radius: 25px;'><i class='fa-solid fa-pen'></i></button></a><br>";
  for (i=0 ; i<IDFau.length; i++){
    data = data+"<div id='ContBtnSelFau"+i+"' style='display:flex; margin-bottom: 15px;'>"+
                  "<button id='BtnQuitFau"+i+"' type='button' class='btn btn-danger' style='height: 25px; width: 25px; padding: 0px;' onclick='quitarFauna(SelModFau"+i+",BtnQuitFau"+i+",ContBtnSelFau"+i+","+i+");'> X </button>"+
                  "<select id='SelModFau"+i+"' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>"+
                      "<option>"+IDFau[i]+" 1</option>"+
                      "<option>"+IDFau[i]+" 2</option>"+
                      "<option>"+IDFau[i]+" 3</option>"+
                  "<select>";
               
    if(i == (IDFau.length-1)){
      data = data+"<button id='BtnNewFau' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFauna("+(i+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
    }
    data = data+"</div>";
    CantFau++;
  }
  if(IDFau.length ==0){
    data = data+"<button id='BtnNewFau' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFauna("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>";
  }
  data = data+"</div><br>"+
  "<div id='ContPadreFlo' style=' width: 100%; padding-left: 20px; height: 165px; overflow-x: auto;'>"+
      "<a style='font-weight: bold; color: grey; font-size: 20px;'>Flora: <button id='Mper$F' class='btn btn-success' onclick='MostrarFormulario("+5+");' type='button' style=' height: 25px; width: 25px; padding: 0px; font-size: 15px; color: #343a40; border-radius: 25px;'><i class='fa-solid fa-pen'></i></button></a><br>";
  for (i=0 ; i<IDFlo.length; i++){
    data = data+"<div id='ContBtnSelFlo"+i+"' style='display:flex; margin-bottom: 15px;'>"+
                  "<button id='BtnQuitFlo"+i+"' type='button' class='btn btn-danger' style='height: 25px; width: 25px; padding: 0px;' onclick='quitarFlora(SelModFlo"+i+",BtnQuitFlo"+i+",ContBtnSelFlo"+i+","+i+");'> X </button>"+
                  "<select id='SelModFlo"+i+"' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>"+
                      "<option>"+IDFlo[i]+" 1</option>"+
                      "<option>"+IDFlo[i]+" 2</option>"+
                      "<option>"+IDFlo[i]+" 3</option>"+
                  "<select>";
               
    if(i == (IDFlo.length-1)){
      data = data+"<button id='BtnNewFlo' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFlora("+(i+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
    }
    data = data+"</div>";
    CantFlo++;
  }
  if(IDFlo.length ==0){
    data = data+"<button id='BtnNewFlo' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFlora("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>";
  }

  

  data = data+"</div></div><br>"+
  "</section>"+
  "<div style=' text-align: -webkit-center; width: 50%; height: 200px;>"+
      "<a style='font-weight: bold; color: grey; font-size: 20px;'>Observaciones: </a><br>" +
      "<textarea id='TextModObser' class='form-control' style='background: #e2e2e2; color:black; width: 400px; height: 200px; min-height: 100px; max-height: 225px;''>"+IDObs+"</textarea><br><br><br>"+
  "</div>";
  console.log("ahora CantReles:"+CantReles);
  $("#dataModif").html(data);
 
  // _____________ SE CARGAN TODAS LAS OPCIONES DE DATOS DESDE LA BASE DE DATOS EN LOS SELECTS DE LA VENTANA DE MODIFICACION _____________________
  tempRel = '';
  tempFau = '';
  tempFlo = '';
  pRel=0;
  pFau=0;
  pFlo=0;
  contpRel = new Array;
  contpFau = new Array;
  contpFlo = new Array;
  contpPr = new Array;

  // _____________ SE CARGAN TODAS LAS OPCIONES DE DATOS DESDE LA BASE DE DATOS EN LOS SELECTS DE LA VENTANA DE MODIFICACION _____________________
  const postData = {CargarSelects: true,}   
  $.post('php/modificar.php', postData, (response) => {
    let datos = JSON.parse(response);

    datos['miembros'].forEach(dato => {
      tempRel +=`<option>${dato.miembro}</option>` 
    });
    for (i=0; i<IDRels.length;i++){
      pRel=0;
      datos['miembros'].forEach(dato => {
        if (dato.miembro == IDRels[i]){
          contpRel[i] = pRel;
        }else{
          pRel++;
        }
      });        
    }

    datos['fauna'].forEach(dato => {
      tempFau +=`<option>${dato.fauna}</option>` 
    });
    for (i=0; i<IDFau.length;i++){
      pFau=0;
      datos['fauna'].forEach(dato => {
        if (dato.fauna == IDFau[i]){
          contpFau[i] = pFau;
        }else{
          pFau++;
        }
      });        
    }

    datos['flora'].forEach(dato => {
      tempFlo +=`<option>${dato.flora}</option>` 
    });
    for (i=0; i<IDFlo.length;i++){
      pFlo=0;
      datos['flora'].forEach(dato => {
        if (dato.flora == IDFlo[i]){
          contpFlo[i] = pFlo;
        }else{
          pFlo++;
        }
      });        
    }

    for (i=0; i<IDRels.length; i++){
      $('#SelModRele'+i).html(tempRel);
      document.getElementById('SelModRele'+i).options.item(contpRel[i]).selected = 'selected';
    }

    for (i=0; i<IDFau.length; i++){
      $('#SelModFau'+i).html(tempFau);
      document.getElementById('SelModFau'+i).options.item(contpFau[i]).selected = 'selected';
    }

    for (i=0; i<IDFlo.length; i++){
      $('#SelModFlo'+i).html(tempFlo);
      document.getElementById('SelModFlo'+i).options.item(contpFlo[i]).selected = 'selected';
    }

    

  });

  //__________ TERMINA LA CREACION DE TODA LA VENTANA DE MODIFICACION DE DATOS DE ESTE OBJETO (Accidentes) _________________

}