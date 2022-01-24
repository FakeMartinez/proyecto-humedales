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
        $('#form_cuenca_add').hide();
      });
  
      //Añadir Complejo
      $('#btn_complejo_add').on('click', function(){
        $('#form_complejo_add').show();
      });
      //Cerrar Formulario Complejo
      $('#close_btn_comp_add').on('click', function(){
        $('#form_complejo_add').hide();
      });
  
      //Añadir Presión
      $('#btn_presion_add').on('click', function(){
        $('#form_presion_add').show();
      });
      //Cerrar Formulario Presión
      $('#close_btn_presion_add').on('click', function(){
        $('#form_presion_add').hide();
      });
      //Añadir Fauna
      $('#btn_fauna_add').on('click', function(){
        $('#form_fauna_add').show();
      });
      //Cerrar Formulario Fauna
      $('#close_btn_fauna_add').on('click', function(){
        $('#form_fauna_add').hide();
      });
      //Añadir Flora
      $('#btn_flora_add').on('click', function(){
        $('#form_flora_add').show();
      });
      //Cerrar Formulario Flora
      $('#close_btn_flora_add').on('click', function(){
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
      $('#btn_imagen_addHu').on('click', function(){
        $('#form_imagen_add').show();
        BtFau = false;
        BtFlo = false;
        BtHum = true;
      });
      
     
    
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
          Dir : DireccionesHU.slice(),
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
        const postData = {
          id_cuenca:$('#id_cuenca').val(),
          nombre_cuenca: $('#nom_cuenca').val(),
          sup_cuenca: $('#sup_cuenca').val(),
          tipo_cuenca:$('#tipo_cuenca').val(),
        };
        //console.log(postData);
        $.post('php/sub_forms.php', postData, (response) => {
          console.log(response);
          //$('#form_add').trigger('reset');
          e.preventDefault();
          carga_form_alta_cu();
          $('#form_cuenca_add').hide();
          $('#id_cuenca').val('');
          $('#nom_cuenca').val('');
          $('#sup_cuenca').val('');
          $('#tipo_cuenca').val('');
          
        });
      });
  ////////////////////////////////////////////////

  //////////////////Form complejo/////////////////////
  $('#form-complejo').submit(e => {
    e.preventDefault();
    const postData = {
      id_complejo:$('#id_complejo').val(),
      nombre_complejo: $('#nom_comp').val(),
      prop_complejo: $('#prop_comp').val(),
    };
    //console.log(postData);
    $.post('php/sub_forms.php', postData, (response) => {
      console.log(response);
      //$('#form_add').trigger('reset');
      e.preventDefault();
      carga_form_alta_co();
      $('#form_complejo_add').hide();
      $('#id_complejo').val('');
      $('#nom_comp').val('');
      $('#prop_comp').val('');
    });
  });
  
  ////////////////////////////////////////////////

  //////////////////Form presion///////////////////// | 🗸 FUNCIONA 🗸 |
  $('#form-presion').submit(e => {
    e.preventDefault();                         //para que es preventDefault();
    const postData = {                          //const crea una variable llamada postData
      tipo_presion: $('#tipo_presion').val(),   //Parametro tipo_presion de la variable postData, toma el valor del objeto con id tipo_presion
      obs_presion: $('#obs_presion').val(), 
      ID_presion: $('#Id_presion').val()    //Parametro obs_presion de la variable postData, toma el valor del objeto con id  obs_presion
    };
    //console.log(postData);
    $.post('php/sub_forms.php', postData, (response) => {  //post llama al archivo php llamada sub_forms.php    ¿response es el valor que devuelve?
      console.log(response);                               // ¿que es el parametro response? que es console.log?
      //$('#form_add').trigger('reset');
      e.preventDefault();
      carga_form_alta_p();    //definido en linea *357
      $('#form_presion_add').hide();    //oculta eñ formulario add presion
      $('#tipo_presion').val('');
      $('#obs_presion').val('');
      $('#Id_presion').val('');
        
    });
  });
  
  ////////////////////////////////////////////////

  //////////////////Form fauna/////////////////////
  $('#form-fauna').submit(e => {
    e.preventDefault();
    DireccionesFA.forEach(function (Dire, Indi, Vect){
      if(Dire==""){
        console.log("Elimina" + DireccionesFA[Indi]);
        DireccionesFA.splice(Indi,1);
        console.log("eliminado"+ DireccionesFA[Indi]);
      };
    });
    const postData = {
      id_fauna: $('#ID_fauna').val(),
      nom_cq_fauna: $('#nom_colquial_fauna').val(),
      nom_cf_fauna: $('#nom_ctfico_fauna').val(),
      carac_fauna: $('#carac_fauna').val(),
      //img_fauna: $('#img_fauna').val(),
      Dir: DireccionesFA.slice()   
  
    };
    //DireccionesFA.forEach(dir =>{postData.Dir += dir});
    console.log(postData);
    $.post('php/sub_forms.php', postData, (response) => {
      console.log(response);
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
      console.log(DireccionesFA);
    });
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
     // console.log(response);
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
          $('#BIFa' + Indi.toString()).on('click',function(e){
         //  console.log("imagen" + Indi);
          // DireccionesHU.splice(Indi,1);
          DireccionesFA[Indi] = "";
           $('#CIFa' + Indi.toString()).remove();
        //   console.log(DireccionesFA);
          });
           
         })
        
      }else
      if (BtFlo){
        DireccionesFL.push(response);
      ////  console.log(DireccionesFL);
        DireccionesFL.forEach(function (Dire, Indi, Vect){
          if (Dire!="")
          {
            templateD += `<div class=pI id='CIFl${Indi}'><button type="button" class='pI2' id='BIFl${Indi}' >X</button><img src='images/${Dire}' style="width:200px;height:200px;"></img></div>`;
          }
        })
        $('#ContenedorImgFlor').html(templateD);
        DireccionesFL.forEach(function (Dire, Indi, Vect){
          $('#BIFl' + Indi.toString()).on('click',function(e){
          // console.log("imagen" + Indi);
          // DireccionesHU.splice(Indi,1);
          DireccionesFL[Indi] = "";
           $('#CIFl' + Indi.toString()).remove();
          //// console.log(DireccionesFL);
          });
           
         })
        }else{
          if (BtHum){
            DireccionesHU.push(response);
        //    console.log("direccionesHU");
           // console.log(DireccionesHU);
            DireccionesHU.forEach(function (Dire, Indi, Vect){
              if (Dire!="")
              {
              templateD += `<div class=pI id='CIH${Indi}'><button type="button" class='pI2' id='BIH${Indi}'>X</button><img src='images/${Dire}' style="width:200px;height:200px;"></img></div>`;
              }
            })
            $('#ContenedorImgHu').html(templateD);
            DireccionesHU.forEach(function (Dire, Indi, Vect){
             $('#BIH' + Indi.toString()).on('click',function(e){
              //console.log("imagen" + Indi);
             // DireccionesHU.splice(Indi,1);
             DireccionesHU[Indi] = "";
              $('#CIH' + Indi.toString()).remove();
              //console.log(DireccionesHU);
             });
              
            })
          }
        }


     
      //Direcciones.forEach(dir => {templateD += `<div class=pI><button class=pI2>X</button><img src='images/${dir}' style="width:200px;height:200px;"></img></div>`});
     
      console.log(templateD);
      
      
      
      //$('#form_add').trigger('reset');
      e.preventDefault();
      $('#form_imagen_add').hide();
    }
})});


  //////////////////Form flora/////////////////////
  $('#form-flora').submit(e => {
    e.preventDefault();
    DireccionesFL.forEach(function (Dire, Indi, Vect){
      if(Dire==""){
        console.log("Elimina" + DireccionesFL[Indi]);
        DireccionesFL.splice(Indi,1);
        console.log("eliminado"+ DireccionesFL[Indi]);
      };
    });
    console.log(DireccionesFL);
    const postData = {
      id_flora: $('#ID_flora').val(),
      nom_cq_flora: $('#nom_colquial_flora').val(),
      nom_cf_flora: $('#nom_ctfico_flora').val(),
      carac_flora: $('#carac_flora').val(),
     // img_flora: $('#img_flora').val(),
      Dir: DireccionesFL.slice()   
    };
    console.log(postData);
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
    });
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
                
              }
            });
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
                //console.log(datos);
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
                    let template6 = '';
                    datos['propietarios'].forEach(dato => {template6 += `<option>${dato.nom_prop}</option>` });  
                    //console.log(template6);    
                    $('#sel_propietario').html(template6);
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


