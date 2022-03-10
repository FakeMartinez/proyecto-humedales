var x_pre = 0;
var x_fau = 0;
var x_flo = 0;
var x_pers = 0 ;
var update = false;
var max_flora = 0;
var max_fauna = 0;
var max_miembro = 0;
var max_pre = 0;


$(function(){
    
    carga_form_alta_cu();
    carga_form_alta_co();
    carga_form_alta_p();
    carga_form_alta_fa();
    carga_form_alta_fl();
    carga_form_alta_pers();
    //Cerrar Formulario Alta y relevamiento 
    $('#close_btn_add').on('click', function(){
        $('#form_add').hide();
        $('#form_add2').hide();
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
        $('#form_modif').hide();
      });


  //////////////////////Formulario Alta////////////////////////
  
    
  $('#form_add').submit(e => {
        e.preventDefault();
        var postData = {
          
          id:$('#ID_humedal').val(),  
          nombre: $('#nombre').val(),  
          cuenca: $('#sel_cuenca').val(),
          complejo: $('#sel_complejo').val(),
         

          cont_pre: x_pre,
          
          
        }
              

        while(x_pre>=0){
          console.log('sel_presion.form-select '.concat(x_pre.toString()));
          Object.defineProperty(postData, 'presiones'+ x_pre.toString(),{
            value:$('#sel_presion.form-select.'.concat(x_pre.toString())).val(),
            writable: true,
            enumerable: true,
            configurable: true
          }); 
          //postData.presion.concat(x.toString()) = $('#sel_presion.form-select '.concat(x.toString())).val()
          x_pre = x_pre-1;
        }
  
       
        e.preventDefault();
        console.log(update);
        
  
        if (update != false){
        $.post('php/carga.php', postData, (response) => {
          console.log(response);
          e.preventDefault();
          //$('#form_add').trigger('reset');
          
        });
      } 


     else{
      
      if(validacion(postData) == true){          //comprueba los campos 
        console.log('entro0');
        $.post('php/alta.php', postData, (response) => {
          console.log(response);
          console.log(postData);
          //$('#form_add').trigger('reset');
           e.preventDefault();
        
        });
      }
        
          }
     
        
      
  
  
      });

      $('#form_add2').submit(e => {
        e.preventDefault();
        
        var postData = {
          
          id:$('#ID_humedal').val(),  
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

          cont_fau: x_fau,
          cont_flo: x_flo,
          cont_pers: x_pers
          //
          //
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
        console.log(update);
        
  
        if (update != false){
        $.post('php/carga.php', postData, (response) => {
          console.log(response);
          e.preventDefault();
          
        });
      }/*else{
       if(validacion(postData) == true){       
          
        $.post('php/alta.php', postData, (response) => {
          console.log(postData);
          //$('#form_add').trigger('reset');
           e.preventDefault();
        
        });
      }
     
        }*/
      
  
  
      });
  ////////////////////////////////////////////////////////////////
  
  //////////////////Form cuenca/////////////////////
       $('#form-cuenca').submit(e => {
        e.preventDefault();
        const postData = {
          id_cuenca:$('#id_cuenca').val(),
          nombre_cuenca: $('#nom_cuenca').val(),
          sup_cuenca: $('#sup_cuenca').val(),
          ext_cuenca: $('#ext_cuenca').val(),
          tipo_cuenca:$('#tipo_cuenca').val(),
        };
        //console.log(postData);
        $.post('php/sub_forms.php', postData, (response) => {
          console.log(response);
          //$('#form_add').trigger('reset');
          e.preventDefault();
          carga_form_alta_cu();
          $('#form_cuenca_add').hide();
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
    });
  });
  
  ////////////////////////////////////////////////

  //////////////////Form presion/////////////////////
  $('#form-presion').submit(e => {
    e.preventDefault();
    const postData = {
      tipo_presion: $('#tipo_presion').val(),
      obs_presion: $('#obs_presion').val(),
    };
    //console.log(postData);
    $.post('php/sub_forms.php', postData, (response) => {
      console.log(response);
      //$('#form_add').trigger('reset');
      e.preventDefault();
      carga_form_alta_p();
      $('#form_presion_add').hide();
    });
  });
  
  ////////////////////////////////////////////////

  //////////////////Form fauna/////////////////////
  $('#form-fauna').submit(e => {
    e.preventDefault();
    const postData = {
      nom_cq_fauna: $('#nom_colquial_fauna').val(),
      nom_cf_fauna: $('#nom_ctfico_fauna').val(),
      carac_fauna: $('#carac_fauna').val(),
      img_fauna: $('#img_fauna').val(),
  
    };
    //console.log(postData);
    $.post('php/sub_forms.php', postData, (response) => {
      console.log(response);
      //$('#form_add').trigger('reset');
      e.preventDefault();
      carga_form_alta_fa();
      $('#form_fauna_add').hide();
    });
  });
  
  ////////////////////////////////////////////////
  
  //////////////////Form flora/////////////////////
  $('#form-flora').submit(e => {
    e.preventDefault();
    const postData = {
      nom_cq_flora: $('#nom_colquial_flora').val(),
      nom_cf_flora: $('#nom_ctfico_flora').val(),
      carac_flora: $('#carac_flora').val(),
      img_flora: $('#img_flora').val(),
  
    };
    //console.log(postData);
    $.post('php/sub_forms.php', postData, (response) => {
      console.log(response);
      //$('#form_add').trigger('reset');
      e.preventDefault();
      carga_form_alta_fl();
      $('#form_flora_add').hide();
    });
  });

  ///---------------form rel---------

  $('#form-relevamiento').submit(e => {
    e.preventDefault();
    const postData = {
     /* $('#ancho').val('');
      $('#largo').val('');
      $('#Conductividad').val('');
      $('#pH').val('');
      $('#o2disuelto').val('');
      $('#Turbidez').val('');
      $('#Color').val('');
      $('#Temperatura').val('');
      $('#obs').val('');*/
      
    };
    //console.log(postData);
    $.post('php/sub_forms.php', postData, (response) => {
      console.log(response);
      //$('#form_add').trigger('reset');
      e.preventDefault();
      carga_form_alta_p();
      $('#form_relevamiento_add').hide();
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
   if (max_pre != x_pre){
    $('#btn_presion_hum').show();}
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
    $('#btn_fauna_hum').show();}
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
    $('#btn_miebro_hum').show();}
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
    update = false; 

   
  });
$(document).on('click','#btn_brel',function(){
//  $('#btn_brel').on('click', function(){
    $('#form_add').hide();
    $('#form_add2').show();
    $('#t_form.modal-title').html('Relevamiento');
    $('#form_modal').css({'background':'#DEFEAE'});
   
    $('#ancho').val('');
    $('#largo').val('');
    $('#Conductividad').val('');
    $('#pH').val('');
    $('#o2disuelto').val('');
    $('#Turbidez').val('');
    $('#Color').val('');
    $('#Temperatura').val('');
    $('#obs').val('');
    update = false; 

   
  });
 //----------------------------------CARGA DE LOS SELECT-----------------------------------------------------------------------//
 // ----------------Presiones-----------------  //
      
 function carga_form_alta_p(){
        var x=x_pre;
        var antpre = new Array();
     
          while(x!=-1){
             antpre[x] = $('#sel_presion.form-select.'+ x.toString()).val();
             x--;
           }
             
           $.ajax({
             url: 'php/alta.php',
             type: 'GET',
               
             success: function (response) {
                 
               if(!response.error) {
                   let datos = JSON.parse(response);
                   let template0 = '';
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

// ----------------Cuenca-----------------  //
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


//----------COMPLEJO-----------------------------------//
   
   function carga_form_alta_co(){
    $.ajax({
      url: 'php/alta.php',
      type: 'GET',
      success: function (response) {
          if(!response.error) {
            //console.log(response);
            let datos = JSON.parse(response);
            //console.log(datos);
            let template2 = '';
            datos['complejos'].forEach(dato => {
              template2 += `
              <option>${dato.nombre_complejo}</option>
                    ` });
            
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
             
           $.ajax({
             url: 'php/alta.php',
             type: 'GET',
               
             success: function (response) {
                 
               if(!response.error) {
                   let datos = JSON.parse(response);
                   let template3 = '';
                   
                   datos['persona'].forEach(dato => {
                     var val= true;
                     antpers.forEach(e =>{
                       if(e==dato.nom_pers){
                         val = false;}
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
        
      $.ajax({
        url: 'php/alta.php',
        type: 'GET',
          
        success: function (response) {
            
          if(!response.error) {
              let datos = JSON.parse(response);
              let template4 = '';
              
              datos['faunas'].forEach(dato => {
                var val= true;
                antfau.forEach(e =>{
                  if(e==dato.nom_fauna){
                    val = false;}
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
                    
               $.ajax({
                 url: 'php/alta.php',
                 type: 'GET',
                   
                 success: function (response) {
                     
                   if(!response.error) {
                    
                       let datos = JSON.parse(response);
                       let template5 = '';
                       
                       datos['floras'].forEach(dato => {
                         var val= true;
                         antflo.forEach(e =>{
                           if(e==dato.nom_flora){
                             val = false;}
                           });
                           if(val==true){
                             template5 += `
                           <option>${dato.nom_flora}</option>
                                   `
                            }
                       });  
                       $('#sel_flora.form-select.'+ x_flo.toString()).html(template5);
                       if( (datos['floras'].length-1) == x_flo){
                        $('#btn_flora_hum').hide();
                        max_flora = (datos['floras'].length-1);
                      }  
                       
                   }
                       
                 }
                           
                          
                           
               });
              
                     }

   

             

               
        


//-------------------------------------------------//
//--------------------Modificar--------------------------//
    


$('#btn_modif').on('click', function(){
  $('#form_modif').show();
  $('#t_form.modal-title').html('Modificar');
  $('#form_modal').css({'background':'#DEFEAE'});
  update = false; 
  
  function modif_comp(){
    $.ajax({
      url: 'php/modificar.php',
      type: 'GET',
      success: function (response) {
         //lo que devuelve modificar.php
         
         
          }
                
        });
      };
    
 

});           



//-----------------------------------------------------------------------//
//----------------------Validacion------------------------------------//

function validacion(postData){
  console.log('entro1');
var b = true;
$('#nombre').on('input', function(){
  $('#nombre').css({'background' : '#FFFFFF', 'border': '1px dashed #FFFFFF' });
})
  if(postData.nombre==''){
    alert("Ingrese un nombre al humedal para continuar");
    $('#nombre').css({'background' : '#FFDDDD', 'border': '1px dashed #FF0000' });
    
    b = false;
    console.log('entro2');
  }

 /* if(isNaN(postData.ancho) && postData.ancho!=''){
    alert("Ingrese un valor númerico en ancho");
    $('#ancho').css({'background' : '#FFDDDD', 'border': '1px dashed #FF0000' }); 
 
   b = false;
  }

  if(isNaN(postData.largo) && postData.largo!=''){
    alert("Ingrese un valor númerico en largo");
    $('#largo').css({'background' : '#FFDDDD', 'border': '1px dashed #FF0000' });
    b = false;
    } */

   
     return b;
   
  }






                   
                    
                   


