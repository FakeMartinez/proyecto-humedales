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
  if(postData.tipo=='')
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
    $('#tipo').val('');
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
    
    while(x_pre>=0)
    {
      //console.log('sel_presion.form-select '.concat(x_pre.toString()));
      Object.defineProperty(postData, 'presiones'+ x_pre.toString(),
      {
        value:$('#sel_presion.form-select.'.concat(x_pre.toString())).val(),
        writable: true,
        enumerable: true,
        configurable: true
      }); 
      //postData.presion.concat(x.toString()) = $('#sel_presion.form-select '.concat(x.toString())).val()
      x_pre = x_pre-1;
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
      if(postData.nombre != '' && postData.tipo != '' && postData.cuenca != "... Seleccione una cuenca ..."){          
        console.log ("llama al PHP");
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
              NewRelev=false;
              from2();
            }else{
              CambiarClass($('#nombre'), "form-control is-invalid", "form-control"); 
              CambiarClass($('#tipo'), "form-control is-invalid", "form-control");
              CambiarClass($('#sel_cuenca'), "form-select is-invalid", "form-select");
              $('div').remove('#TexErrorIncompleto');
              $('#form_add').hide();
              $('#nombre').val('');
              $('#tipo').val('');
              $('#descripcion').val('');
            }
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
    while(x_pre>=0){
      console.log('sel_presion.form-select '.concat(x_pre.toString()));
      Object.defineProperty(postData, 'presion'+ x_pre.toString(),{
        value:$('#sel_presion.form-select.'.concat(x_pre.toString())).val(),
        writable: true,
        enumerable: true,
        configurable: true
      }); 
      //postData.presion.concat(x.toString()) = $('#sel_presion.form-select '.concat(x.toString())).val()
      x_pre = x_pre-1;

    }          

    console.log(postData);
       
  
    while(x_fau>=0){
      console.log('sel_fauna.form-select '.concat(x_fau.toString()));
      Object.defineProperty(postData, 'fauna'+ x_fau.toString(),{
        value:$('#sel_fauna.form-select.'.concat(x_fau.toString())).val(),
        writable: true,
        enumerable: true,
        configurable: true
        
      }); 
      //postData.presion.concat(x.toString()) = $('#sel_presion.form-select '.concat(x.toString())).val()
      x_fau = x_fau-1;
    }
//    console.log("====================================================================");
//    console.log("postData.x_fau");
//    console.log(postData.cont_fau);
//    console.log("====================================================================");
    while(x_flo>=0){
      console.log('sel_flora.form-select '.concat(x_flo.toString()));
      Object.defineProperty(postData, 'flora'+ x_flo.toString(),{
        value:$('#sel_flora.form-select.'.concat(x_flo.toString())).val(),
        writable: true,
        enumerable: true,
        configurable: true
      }); 
      x_flo = x_flo-1;
    }
    
    while(x_pers>=0){
      console.log('sel_miembro.form-select '.concat(x_pers.toString()));
      Object.defineProperty(postData, 'persona'+ x_pers.toString(),{
        value:$('#sel_miembro.form-select.'.concat(x_pers.toString())).val(),
        writable: true,
        enumerable: true,
        configurable: true
      }); 
      x_pers = x_pers-1;
    }
          
    e.preventDefault();
                
    if (update != false){
      $.post('php/carga.php', postData, (response) => {
        console.log(response);
        e.preventDefault();    
      });
    }else
    {
       /*if(validacion(postData) == true){     
        
        
      } */
      console.log("Correcto");
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
      });
     
    }
  });

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
    $('#o2disuelto').val('');
    $('#Turbidez').val('');
    $('#Color').val('');
    $('#Temperatura').val('');
    $('#obs').val('');   
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
    e.preventDefault();                         //para que es preventDefault();
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
      carga_form_alta_p();    //definido en linea *357
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
    
    carga_form_alta_p();
    
    $('#btn_presion_dhum').on('click', function(){
      $('#sel_presion.form-select.'+ x_pre.toString()).remove();
      x_pre = x_pre-1;
      if (max_pre != x_pre){
        $('#btn_presion_hum').show();
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
      if (max_flora != x_flo){
        $('#btn_flora_hum').show(); 
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
    });
  });

  //-----------------------------------------------------------------------
});

$('#btn_add').on('click', function(){
  $('#form_add').show();
  $('#t_form.modal-title').html('Alta Accidente Geografico');
  $('#form_modal').css({'background':'#DEFEAE'});
  $('#ID_humedal').val('');
  $('#nombre').val('');
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
       }              
    }
  });
}

// ----------------CUENCA-----------------  //
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

//-------------------------------------------------//
//--------------------Modificar--------------------------//
    
$('#btn_modif').on('click', function(){
  $('#form_modif').show();
  $('#t_form.modal-title').html('Modificar');
  $('#form_modal').css({'background':'#DEFEAE'});
  update = false; 
  
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
});           


