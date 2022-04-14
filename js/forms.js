var x_pre = 0;
var x_fau = 0;
var x_flo = 0;
var x_prop = 0;
var update = false;
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


$(function(){
    
    carga_form_alta_cu();
    carga_form_alta_co();
    carga_form_alta_p();
    carga_form_alta_fa();
    carga_form_alta_fl();
    carga_form_alta_propie();

    $('#img_flora').on("change", (e) => {
      console.log(e);
      });

    //Cerrar Formulario Alta
    $('#close_btn_add').on('click', function(){
        $('#form_add').hide();
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
     
    
  //////////////////////Formulario Alta////////////////////////
      $('#form_add').submit(e => {
        e.preventDefault();
        var postData = {
          id:$('#ID_humedal').val(),
          nombre: $('#nombre').val(),
          cuenca: $('#sel_cuenca').val(),
          complejo: $('#sel_complejo').val(),
          latitud:$('#lat').val(),
          longitud:$('#lng').val(),
          ancho:$('#ancho').val(),
          largo:$('#largo').val(),
          carac:$('#carac').val(),
          obs:$('#obs').val(),
          fuente:$('input:radio[name=optionsFuente]:checked').val(),
          tiempo:$('input:radio[name=optionsTiempo]:checked').val(),
          diversidad_vegetal:$('input:radio[name=optionsDV]:checked').val(),
          regimen_hidrologico:$('input:radio[name=optionsReg]:checked').val(),
          calidad_agua:$('input:radio[name=optionsAgua]:checked').val(),
          //Dir : DireccionesHU.slice(),
          cont_pre: x_pre,
          cont_fau: x_fau,
          cont_flo: x_flo
          //
          //
        };
        
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
  
        while(x_flo>=0){
          console.log('sel_flora.form-select '.concat(x_flo.toString()));
          Object.defineProperty(postData, 'flora'+ x_flo.toString(),{
            value:$('#sel_flora.form-select.'.concat(x_flo.toString())).val(),
            writable: true,
            enumerable: true,
            configurable: true
          }); 
          //postData.presion.concat(x.toString()) = $('#sel_presion.form-select '.concat(x.toString())).val()
          x_flo = x_flo-1;
        }
  
  
  
        
        //e.preventDefault();
        console.log(update);
        
  
        if (update != false){
        $.post('php/carga.php', postData, (response) => {
          console.log(response);
          //e.preventDefault();
          //$('#form_add').trigger('reset');
          
        });
      }else{
        $.post('php/alta.php', postData, (response) => {
          console.log(response);
          //$('#form_add').trigger('reset');
          
        });
      }
  
      });
  ////////////////////////////////////////////////////////////////
  
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
      if ($('#sel_propietario'+i.toString()).val() === '... agregue un propietario ...'){
        CambiarClass($('#sel_propietario'+i.toString()), "form-select", "form-select is-invalid"); //Si el campo está vacío, cambia la clase del input de "form-control" a "form control is-invalid"
        $('#DivPropComp'+i.toString()).append("<div id='TexErrorIncompleto' style='color: red'>Este campo es obligatorio</div>"); //Crea el mensaje de advertencia de campo incompleto
      }else{
        CambiarClass($('#sel_propietario'+i.toString()), "form-select is-invalid", "form-select");
      }
    }
    

    if ($('#nom_comp').val() !== '' && $('#sel_propietario').val() !== '... agregue un propietario ...'){
    const postData = {
    //  id_complejo:$('#id_complejo').val(),
      nombre_complejo: $('#nom_comp').val(),
      prop_complejo: $('#sel_propietario').val(),
    };
    console.log(postData);
    $.post('php/sub_forms.php', postData, (response) => {
      console.log(response);    //Si se comenta, no se va a escribir ningún echo del php en la consola de la pagina ¡OJO!
      //$('#form_add').trigger('reset');
      e.preventDefault();
      carga_form_alta_co();
      $('#form_complejo_add').hide();
      $('#id_complejo').val('');
      $('#nom_comp').val('');
      $('#prop_comp').val('');
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

  //////////////////Form presion///////////////////// | 🗸 FUNCIONA 🗸 |
  $('#form-presion').submit(e => {
    e.preventDefault();                         //para que es preventDefault();
    
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
      Dir: DireccionesFA.slice()   
  
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

//////////////////Form imagen/////////////////////
$('#form-imagen').submit(e => {
  e.preventDefault();
  var formData = new FormData();
  var files = $('#Newimg')[0].files[0];
  formData.append('file',files);
 
    $.ajax({
      url: 'php/CargaImagenes.php',
      type: 'post',
      data: formData,
      contentType: false,
      processData: false,
      success: function(response) {
      console.log(response);  //Si se comenta, no se va a escribir ningún echo del php en la consola de la pagina ¡OJO!
  let templateD = '';
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
    
  }else
  if (BtFlo){
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
      if (BtHum){ //Carga de imagenes en el HTML
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
    

     
      //Direcciones.forEach(dir => {templateD += `<div class=pI><button class=pI2>X</button><img src='images/${dir}' style="width:200px;height:200px;"></img></div>`});
     
      //console.log(templateD);
      
      
      
      //$('#form_add').trigger('reset');
      e.preventDefault();
      $('#form_imagen_add').hide();
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
  });
  
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
  
  
});

$('#btn_add').on('click', function(){
    $('#form_add').show();
    $('#t_form.modal-title').html('Alta Humedal');
    $('#form_modal').css({'background':'#DEFEAE'});
  
    $('#ID_humedal').val('');
    $('#nombre').val('');
    $('#lat').val('');
    $('#lng').val('');
    $('#ancho').val('');
    $('#largo').val('');
    $('#carac').val('');
    $('#obs').val('');
    update = false;
    
  });
  
  //Carga de los select de Presion,Fauna,Flora
  function carga_form_alta_p(){
    $.ajax({
      url: 'php/alta.php',
      type: 'GET',
      success: function (response) {
          if(!response.error) {
            //console.log(response);
            let datos = JSON.parse(response);
            //console.log(datos);
            let template3 = '';
            datos['presiones'].forEach(dato => {
              template3 += `
              <option>${dato.tipo_presion}</option>
                     ` });       
            $('#sel_presion.form-select.'+ x_pre.toString()).html(template3);
            }
            
          }
        });
      };
      ////////////////////////////////
     
      function carga_form_alta_fa(){
        
        $.ajax({
          url: 'php/alta.php',
          type: 'GET',
          success: function (response) {
              if(!response.error) {
                //console.log(response);
                let datos = JSON.parse(response);
                //console.log(datos);
                let template4 = '';
                
                datos['faunas'].forEach(dato => {
                  template4 += `
                  <option>${dato.nom_fauna}</option>
                          ` });     
                          
                        
                $('#sel_fauna.form-select.'+ x_fau.toString()).html(template4);
                            
              }
        }});
            
          };
          
      ////////////////////////////////
      function carga_form_alta_fl(){
        $.ajax({
          url: 'php/alta.php',
          type: 'GET',
          success: function (response) {
              if(!response.error) {
                //console.log(response);
                let datos = JSON.parse(response);
                console.log(datos);
                let template5 = '';
                datos['floras'].forEach(dato => {
                  template5 += `
                  <option>${dato.nom_flora}</option>
                          ` });          
                $('#sel_flora.form-select.'+ x_flo.toString()).html(template5);
                }
              }
            });
          };
          
          
          function carga_form_alta_propie(){
            $.ajax({
              url: 'php/alta.php',
              type: 'GET',
              success: function (response) {
                  if(!response.error) {
                    //console.log(response);
                    let datos = JSON.parse(response);
                    //console.log(datos);
                    let template6 = `<option>... agregue un propietario ...</option>`;
                    datos['propietarios'].forEach(dato => {template6 += `<option>${dato.nom_prop}</option>` });  
                    //console.log(template6);    
                    for (var i = 0; i <= x_prop; i++) {
                      $('#sel_propietario'+i.toString()).html(template6);
                    }
                    
                  }                    
              }
            });
          };
              
      ////////////////////////////////
  
      function carga_form_alta_cu(){
        $.ajax({
          url: 'php/alta.php',
          type: 'GET',
          success: function (response) {
              if(!response.error) {
                //console.log(response);
                let datos = JSON.parse(response);
                //console.log(datos);
                let template1 = '';
                datos['cuencas'].forEach(dato => {
                  template1 += `
                  <option>${dato.nombre_cuenca}</option>
                     ` });
                
                $('#sel_cuenca').html(template1);
  
                }
                
              }
            });
          };
  
          function carga_form_alta_co(){
            $.ajax({
              url: 'php/alta.php',
              type: 'GET',
              success: function (response) {
                  if(!response.error) {
                  //  console.log(response);
                    let datos = JSON.parse(response);
                  //  console.log(datos);
                    let template2 = '';
                    datos['complejos'].forEach(dato => {template2 += `<option>${dato.nombre_complejo}</option>` });                    
                    $('#sel_complejo').html(template2);
                    
                    }
                    
                  }
                });
              };


