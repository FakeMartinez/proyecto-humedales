var VisibleTool = false;

//---Capas de fondo para el mapa-------------------

var g_hum = L.layerGroup(); //grupo de capas de los humedales
var m_default = L.tileLayer(`https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png`, {maxZoom:18});
var simple = L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png',{maxZoom:18});
var especial = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:18});
var topo= L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{maxZoom:18});

var baseMaps = { //Crea un objeto con los diferentes tipos de layers para el mapa
  "Normal": m_default,
  "Simple":simple,
  "Satelite":especial,
  "Topografico":topo
};

var overlayMaps = { //Crea un objeto con el conjunto de humedales
  "Humedales": g_hum
};

var baseMaps = { //Configura el objeto de los layers del mapa
  "<span style='color: gray'>Calles</span>": m_default,
  "<span style='color: gray'>Blanco y Negro</span>": simple,
  "<span style='color: gray'>Satelite</span>": especial,
  "<span style='color: gray'>Topografico</span>": topo
};

//---El objeto map-----------------
var myMap = L.map('myMap', {
  center: [-30.7628, -57.9567],
  zoom: 10,
  layers: [m_default,g_hum] //los layers o capas que contiene el mapa
});

myMap.setView([-30.7628, -57.9567], 13) //setear vista al comienzo

L.control.layers(baseMaps,overlayMaps).addTo(myMap); //Construye el panel de control con los objetos de layers


//----Estilo de los marcadores-----
var MarkerStyle = L.icon({
  iconUrl: 'descarga.png', //Imagen por defecto
  iconSize:     [30, 30], 
  iconAnchor: [15,30]
});

//----Estilo de los marcadoes cuando estan activos----
var MarkerActive = L.icon({
  iconUrl: 'marker.png',
  iconSize:     [30, 30], 
  iconAnchor:[15,30]
});

///////////////////////////Marcadores////////////////////////////////
var marker = new Array(); //Array con los marcadores
var markerBackup = new Array(); //Array con el backup de los marcadores

//myMap.doubleClickZoom.disable() //funcion dobleclick=zoom esta desabilitada

//Funcion que ejecuta la solicitud ajax para los datos en la BD
function tabla(){ 
  $.ajax({
      url:   'php/consulta.php', //Archivo PHP con los datos
      type:  'GET',
      success:  function (response) { //Funcion que se ejecuta si la solicitud sucede con exito
        console.log(response);
        var js = JSON.parse(response); //Obtiene al respuesta (response) y la convierte en string  
        console.log(js);
        for(var key=0; key < js.length; key++) { //para cada columna
          var single = js[key]; //pasa por variable cada elemento de la tabla
          //---Crea un marcador tomando como parametros las coordenadas y como caracteristicas la info del humedal
          var LamMarker = L.marker([single.coorx, single.coory],{icon:MarkerStyle, id: single.id_humedal, nombre: single.nombre, 
            largo:single.largo, ancho:single.ancho, lat:single.coorx, lng:single.coory, cuenca:single.nombre_cuenca,
            complejo: single.nombre_complejo, fuente:single.fuente, tiempo:single.tiempo, div_veg:single.diversidad_vegetal,
            reg_hidro:single.regimen_hidrologico, agua:single.calidad_agua, presion:single.presion, inclusion:single.carac_inclusion,
            obs:single.observaciones, fauna:single.fauna, flora:single.flora, img:single.img});
            //------------------------------------------------------------------------------------
            marker.push(LamMarker); //Guarda el marcador creado en el Array
            marker[key].on('click', onClick); //Crea un Evento onClick para marcador
            myMap.addLayer(marker[key]); //Agrega el marcador en el para
            g_hum.addLayer(marker[key]); //Agrega el marcador al grupo de marcadores 
            
            markerBackup = []; //Define como vacio al Array del backup marcadores 
            markerBackup = marker; //Guarda el los marcadores en el backup
          }
        }
      });
    }

 // variable que guarda los detalles del evento del marker al que se le dio click
 var eventBackup;

 // funcion que se ejecuta cuando se da click sobre un marcador del mapa
 function onClick(e) {
   var i = this.options; //Guarda los datos del elemento clickeado
   e.target.setIcon(MarkerActive); //Agrega el marcador activo
   console.log(eventBackup);

   if (eventBackup == undefined) { //Si no hay un backup del evento (si aun no se le dio click)
     eventBackup = e; //Guarda el evento reciente
     capa(i); //Ejecuta la funcion capa 

    } else { //Si ya hay un backup del evento (si ya se le dio click)
      eventBackup.target.setIcon(MarkerStyle); //Agrega el marcador por defecto
      eventBackup = e; //Guarda el evento reciente
      capa(i); //Ejecuta la funcion capa 
      //$('#info').hide();
    }
  };

var info;  //Variable para la capa de control
  // Funcion de capa flotante donde se muestra la info al darle click sobre un marcador
function capa(data){ //obtiene como parametro la informacion

  if (info != undefined) { // se valida si existe informacion en la capa, si es borra la capa
      info.remove(myMap); // esta linea quita la capa flotante
  }

  info = L.control({position: 'bottomright'}); //Creacion de la capa de informacion

  info.onAdd = function (myMap) {
      this._div = L.DomUtil.create('div', 'info'); //Crea un 'div' con la clase 'info'
      this.update(data); //Ejecuta la funcion update con el parametro data
      return this._div; //Devuele un 'div'
  };

  // Funcion update para mostrar los datos en el info   
  info.update = function (data) {
   /*
    var cont =
    '<div class="btn-group" role="group" aria-label="Button group with nested dropdown">'+
    '<button type="button" class="btn btn-info">Opciones</button>'+
    '<div class="btn-group" role="group">'+
      '<button id="btnDropHum" type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true"></button>'+
      '<div class="dropdown-menu" id="dropmenu_hum" aria-labelledby="btnDropHum">'+
        '<a class="dropdown-item" id="modif_hum" href="#" >Modificar</a>'+
        '<a class="dropdown-item" id="delete_hum" href="#">Eliminar</a>'+
        '<a class="dropdown-item" id="download" href="#">Exportar a PDF</a>'+
        '<a class="dropdown-item" id="download2" href="#">Exportar a Word</a>'+
      '</div>'+
    '</div>'+
  '</div>'+
  '<div id="contenido">'+
  ' <div class="close" style="cursor:pointer;" id="closeBtn">x</div>'+'<h4>'/*+ data.id *//*+'</h4><h4 class="poppins600 blue-3">Nombre: ' + data.nombre + '</h4>'
    + '<p class="lead">Largo: ' + data.largo + '</p>' + '<p class="lead">Ancho: ' + data.ancho + '</p>' + '<p class="lead">Lat: ' + data.lat + '</p>'+ '<p class="lead">Lng: ' + data.lng + '</p>'+
    '<p class="lead">Cuenca: ' + data.cuenca + '</p>'+'<p class="lead">Complejo: ' + data.complejo + '</p>'+'<p class="lead">Fuente: ' + data.fuente + '</p>' +
    '<p class="lead">Tiempo: ' + data.tiempo + '</p>'+'<p class="lead"> Diversidad vegetal: ' + data.div_veg + '</p>' + '<p class="lead">Regimen hidrologico: ' + data.reg_hidro + '</p>' 
    + '<p class="lead"> Calidad del agua: ' + data.agua + '</p>' + '<p class="lead"> Presión: ' + data.presion + '</p>' + '<p class="lead">Inclusión: ' + data.inclusion + '</p>'+'<p class="lead">Observaciones: ' + data.obs + '</p>'
    +'<p class="lead">Flora: ' + data.flora + '</p>' + '<p class="lead">Fauna: ' + data.fauna + '</p>'+'</div>';
    this._div.innerHTML = cont;
*/
$("#h_name").html(data.nombre);
$("#h_lat").html("Latitud: "+ data.lat);
$("#h_lng").html("Longitud: "+ data.lng);
$("#h_cuenca").html("Cuenca: " + data.cuenca);
$("#h_complejo").html("Complejo: "+ data.complejo);
$("#h_fuente").html("Fuente: " + data.fuente);
$("#h_tiempo").html("Tiempo: " + data.tiempo);
$("#h_div").html("Diversidad Vegetal: " + data.div_veg);
$("#h_reg").html("Regimen Hidrologico: " + data.reg_hidro);
$("#h_agua").html("Calidad del agua: " + data.agua);
$("#h_inclusion").html(data.inclusion);
$("#h_obs").html(data.obs);

$("#h_presion").html("Presion: "+ data.presion[0].tipo_presion);
for (var key=1; key< data.presion.length; key++){
  $("#h_presion").append(", "+ data.presion[key].tipo_presion);
};

$("#list_fauna").html("");

for (var key=0; key < data.fauna.length; key++){
$("#list_fauna").append(

`
  <div class="accordion-item-fauna">
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <img src="`+data.fauna[key].img_fauna+`">
                  <div class="card-body">
                    <p class="card-text">`+data.fauna[key].nom_coloquial_fauna+`</p>
                  </div>
                </div>
              </div>
            </div>
`
);

};

$("#list_flora").html("");
for (var key=0; key < data.flora.length; key++){
$("#list_flora").append(

`
  <div class="accordion-item-fauna">
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <img src="`+data.flora[key].img_flora+`">
                  <div class="card-body">
                    <p class="card-text">`+data.flora[key].nom_coloquial_flora+`</p>
                  </div>
                </div>
              </div>
            </div>
`
);
};
$("#list_img").html("");
for (var key=0; key < data.img.length; key++){
  console.log(data.img[key]);
$("#list_img").append(

`
  <div class="accordion-item-img">
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <img src="`+data.img[key].img_humedal+`">
                  <div class="card-body">
                    <p class="card-text">`+data.img[key].nom_img+`</p>
                  </div>
                </div>
              </div>
            </div>
`
);

};

$('#info').show();
$('#myMap').css({'width': '70%'});
};
  info.addTo(myMap);

  $('#btnDropHum').on('mouseover', function(){
    $('#dropmenu_hum').show();
    //alert('button');
  });

  $('#dropmenu_hum').on('mouseover',function(){
    $('#dropmenu_hum').show();
    $('#modif_hum.dropdown-item').on('click',function(){modif(data)});
    $('#delete_hum.dropdown-item').on('click',function(){del(data)}); 
    //console.log($('#contenido').html());
  });

  $('#btnDropHum').on('mouseout', function(){
    $('#dropmenu_hum').hide();
    //alert('button');
  });

  $('#download.dropdown-item').on('click',function(){exp(data)});
  $('#download2.dropdown-item').on('click',function(){exp_d(data)});

}

//Funcion para consultar por caracteristicas del humedal
function validarTipo(id){ //Pasa como parametro la caracteristica del humedal
  if (info != undefined) {
    info.remove(myMap);
  }
  $('.tiposHumedal button').removeClass('checked'); //Al boton de la clase 'tiposHumedal' remueve su estado de checked
  $('#'+id).addClass('checked'); //Al objeto con el id corresponiente le asigna el checked
  //var nombre = $('.tiposHumedal #'+id).text(); //???
  limpiarMapaDefault(); //Ejecuta la funcion de limpiar el mapa por defecto
  limpiarMapaBackup(); //Ejecuta la funcion de limpiar el mapa con el backup de los marcadores

  if(id == 'all'){ //Si la caracteristica corresponte a todos o 'all'
    for(var key=0; key<markerBackup.length; key++) { //Mostrar todos los marcadores de los humedales guardados(markerBackup)
      markerBackup[key].on('click', onClick); //Asigna evento
      myMap.addLayer(markerBackup[key]); //Añade al mapa
    }
  } else { //SINO
    $.ajax({
      data:{id:id}, //Ejecuta la consulta dependiendo de la caracteristica que tomó 
      url:   'php/consulta.php',
      type:  'GET',
      success:function(resp){
        var availableTags = JSON.parse(resp);
        for(var key=0; key<availableTags.length; key++) {
          var single = availableTags[key];
          var LamMarker = L.marker([single.coorx, single.coory],{icon:MarkerStyle, id: single.id_humedal, nombre: single.nombre, 
            largo:single.largo, ancho:single.ancho, lat:single.coorx, lng:single.coory, cuenca:single.nombre_cuenca,
            complejo: single.nombre_complejo, fuente:single.fuente, tiempo:single.tiempo, div_veg:single.diversidad_vegetal,
            reg_hidro:single.regimen_hidrologico, agua:single.calidad_agua, presion:single.presion, inclusion:single.carac_inclusion,
            obs:single.observaciones, fauna:single.fauna, flora:single.flora,img:single.img});
            marker.push(LamMarker);
            marker[key].on('click', onClick);
            myMap.addLayer(marker[key]);
            }
          },
        });
      }
}     
       
// funcion que cierra la capa flotante
$(document).on('click','#closeBtn', function(){ 
  $('#info').hide();
  $('#myMap').css({'width': '100%'});
  info.remove(myMap);
  eventBackup.target.setIcon(MarkerStyle);
});

function limpiarMapaDefault() { //Remueve los marcadores del array por Default
for(i=0;i<marker.length;i++) {
    myMap.removeLayer(marker[i]);
}
marker = [];
};

function limpiarMapaBackup() { //Remueve los marcadores del array backup
for(i=0;i<markerBackup.length;i++) {
    myMap.removeLayer(markerBackup[i]);
}

};

//----------------------------------------------------------

  $(function(){ //Funciones al iniciar el documento
    
    tabla();
    $('#info').hide();
    $('#myMap').css({'width': '100%'});
    $('#task-result').hide();

////////////////////Form Img////////////////////(Obtener coordenadas a partir de una imagen)
$('#sub_img').on('click', function(){
  var formData = new FormData();
  var files = $('#img_xy')[0].files[0];
  formData.append('file',files);
  $.ajax({
      url: 'coors.php',
      type: 'post',
      data: formData,
      contentType: false,
      processData: false,
      success: function(response) {
          if (response != 0) {

            console.log(response);
             var js = JSON.parse(response);
             if (js['lat']==0 &&  js['lng']==0){ //Si no posee lat y lng
              $(".card-img-top").attr("src", js['img']);
              $("#res_img").append('<p>Lo siento, la imagen no posee coordenadas geograficas</p>');
             }
             else{ //Si posee lat y lng
              $(".card-img-top").attr("src", js['img']);
              $("#res_img").append('<p>Coordenadas: '+js['lat']+' , '+js['lng']+'</p>'+'<button type="button" class="btn btn-warning" id="add_mak">Agregar Marcador al Mapa</button>');
              $('#add_mak').on('click', function(){add_marker(js['lat'],js['lng'])});
             }

          } else {
              alert('Formato de imagen incorrecto.');
          }
      }

  });

  

});

  //////////////////////////////////////////////////////////////////////////
  $('#tools').on('click',function(){
    if (VisibleTool){
      $('#tools_op').hide();
      VisibleTool = false;
    }else{
      $('#tools_op').show();
      VisibleTool = true;
    }
  });
  //////////////////////////////////////////////////////////////////////////
  $('#btn_img_xy').on('click', function(){
    $('#form_img_xy').show();
  });
  
  $('#close_btn_img_xy').on('click', function(){
    $('#form_img_xy').hide();
  });


/////////////////////////////////////////////////////


  });


 // search key type event
 $('#search').on('input',function() {
   if($('#search').val()) {
     let search = $('#search').val();
     limpiarMapaDefault(); //Ejecuta la funcion de limpiar el mapa por defecto
     limpiarMapaBackup(); //Ejecuta la funcion de limpiar el mapa con el backup de los marcadores
     $.ajax({
       url: 'php/consulta.php',
       data: {search},
       type: 'POST',
       success: function (response) {
           if(!response.error) {
             let tasks = JSON.parse(response);
             let template = '';
             tasks.forEach(task => {
               template += `
               <a href="#" class="task-item"><h6 class="poppins600 blue-3">${task.nombre}</h6></a>
                  ` });

                  var availableTags = JSON.parse(response);
                  for(var key=0; key<availableTags.length; key++) {
                    console.log(key);
                    var single = availableTags[key];
                    var LamMarker = L.marker([single.coorx, single.coory],{icon:MarkerStyle, id: single.id_humedal, nombre: single.nombre, 
                      largo:single.largo, ancho:single.ancho, lat:single.coorx, lng:single.coory, cuenca:single.nombre_cuenca,
                      complejo: single.nombre_complejo, fuente:single.fuente, tiempo:single.tiempo, div_veg:single.diversidad_vegetal,
                      reg_hidro:single.regimen_hidrologico, agua:single.calidad_agua, presion:single.presion, inclusion:single.carac_inclusion,
                      obs:single.observaciones, fauna:single.fauna, flora:single.flora,img:single.img});
                      marker.push(LamMarker);
                      marker[key].on('click', onClick);
                      myMap.addLayer(marker[key]);
                      };

          $('#task-result').show();
          $('#task-result').html(template);
          //$('#container').html(template); 
    } 
    
  }
  
   })
   
}
 });

$('#search').keydown(function() {
  for(var key=0; key<markerBackup.length; key++) { //Mostrar todos los marcadores de los humedales guardados(markerBackup)
    markerBackup[key].on('click', onClick); //Asigna evento
    myMap.addLayer(markerBackup[key]); //Añade al mapa
    $('#task-result').hide();
    $('#task-result').html();
  }
});

//////////////////////////////////////////////
function modif(data){
  $('#form_add').show();
  $('#t_form.modal-title').html('Modificar Humedal');
  $('#form_modal').css({'background':'#AEFED1'});


  $('#ID_humedal').val(data.id);
  $('#nombre').val(data.nombre);
  $('#sel_cuenca').val(data.cuenca);
  $('#sel_complejo').val(data.complejo);
  $('#lat').val(data.lat);
  $('#lng').val(data.lng);
  $('#ancho').val(data.ancho);
  $('#largo').val(data.largo);
  $('#carac').val(data.inclusion);
  $('#obs').val(data.obs);

  /*
  $('input:radio[name=optionsFuente]').val(data.fuente);
  $('input:radio[name=optionsTiempo]').val(data.tiempo);
  $('input:radio[name=optionsDV]').val(data.div_veg);
  $('input:radio[name=optionsReg]').val(data.reg_hidro);
  $('input:radio[name=optionsAgua]').val(data.agua);
  */
//
//Solucionar los problemas de los imputs: Al agregar otro input, este no reacciona al valor de el humedal en 
//esa posicion...
//

 // $('#sel_presion.form-select.0').val(data.presion[1]); !!!!!


  $('#sel_presion.form-select.0').val(data.presion[0]);
  $('#sel_fauna.form-select.0').val(data.fauna[0]);
  $('#sel_flora.form-select.0').val(data.flora[0]);
  //presion[]
  //fauna[]
  //flora[]
  update = true;
};
////////////////////      
function del(data){
  $('#del_hum').show();
  $('#close_btn_del_hum').on('click', function(){
    $('#del_hum').hide();
  });
  $('#delete_h').on('click', function(){
    $.ajax({
      data:{id:data.id}, //Ejecuta la consulta dependiendo de la caracteristica que tomó 
      url:   'php/eliminar.php',
      type:  'GET',
      success:function(resp){
        console.log(resp);
        alert('humedal eliminado');
      }
    });
    //consulta php delete data.id en todas las tablas o baja logica
  });
};

function exp(data){
  
  const $elementoParaConvertir = $('#contenido').html(); // <-- Aquí puedes elegir cualquier elemento del DOM
  html2pdf()
    .set({
        margin: 1,
        filename: data.nombre +'.pdf',
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 3, // A mayor escala, mejores gráficos, pero más peso
            letterRendering: true,
        },
        jsPDF: {
            unit: "in",
            format: "a3",
            orientation: 'portrait' // landscape o portrait
        }
    })
    .from($elementoParaConvertir)
    .save()
    .catch(err => console.log(err));
  };

function exp_d(data){
  Export2Doc('contenido',data.nombre);
};

/////////////////////////////////
function add_marker(lat,lng){
  var mark = L.marker([lat, lng]).addTo(myMap);
  mark.on('click',function(){myMap.removeLayer(mark)});

};