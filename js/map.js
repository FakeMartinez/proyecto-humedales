var VisibleTool = false;

var Info;
var IdAccMod_Rel_o_acc;
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

var osmUrl = //'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            //osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            //osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
            myMap = new L.Map('myMap', { center: new L.LatLng(-30.7628, -57.9567), zoom: 13, layers: [m_default,g_hum]  }),
            drawnItems = L.featureGroup().addTo(myMap);
    L.control.layers({
        /*'osm': osm.addTo(myMap),
        "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
            attribution: 'google'
        })*/
    }, { 'drawlayer': drawnItems }, { position: 'topleft', collapsed: false }).addTo(myMap);
    myMap.addControl(new L.Control.Draw({
        edit: {
            featureGroup: drawnItems,
            poly: {
                allowIntersection: true
            }
        },
        draw: {
            polygon: {
                allowIntersection: true,
                showArea: true
            },
            circle:false,
            rectangle:false
            }
        }
    ));

 var postData;

    //::::::::::::::::::::::::MARCAR_MAPA::::::::::::::::::::::::
    myMap.on(L.Draw.Event.CREATED, function (event) {
        var layer = event.layer;
        var points = JSON.stringify(event.layer.toGeoJSON());
        var ubi = [];
        if(event.layerType == 'marker'){
          ubi[0] = event.layer.toGeoJSON().geometry.coordinates[0];
          ubi[1] = event.layer.toGeoJSON().geometry.coordinates[1];
          console.log('marcador_: '+ubi);
        };

        if(event.layerType == 'polyline'){
          var ubi = event.layer.toGeoJSON().geometry.coordinates[0]
          console.log('linea_: '+ubi);
        };
        if(event.layerType=='polygon'){
          var ubi = event.layer.toGeoJSON().geometry.coordinates[0][0]
          console.log(ubi);
        };

        
        console.log("points : "+ points);
        $("#msj_marcar_mapa").show();
        $('#continue_marcar').on('click', function(){
          $("#msj_marcar_mapa").hide();
        });

        drawnItems.addLayer(layer);

        $('#cancel_marcar').on('click', function(){
         
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
          
            $('#form_add').submit(e => {
              postData = {
                type: event.layer.toGeoJSON().geometry.type,
                coors: event.layer.toGeoJSON().geometry.coordinates,
                nom: $('#nombre').val()};
              });

          //////////////////////////////
          $("#msj_marcar_mapa").hide();
       
    });
    


 });
 L.control.layers(baseMaps,overlayMaps).addTo(myMap); //Construye el panel de control con los objetos de layers
 function add_geo(){
  $.post('php/geometry.php', postData, (response) => {
    console.log(postData);
    console.log(response);
    });}
/*
 L.marker([-30.7628, -57.9567], {icon: L.AwesomeMarkers.icon({
  icon: 'tint', 
  prefix: 'fa', 
  markerColor: 'blue'}) 
 }).addTo(myMap);

 L.marker([-30.7628, -57.9650], {icon: L.AwesomeMarkers.icon({
  icon: 'question', 
  prefix: 'fa', 
  markerColor: 'red'}) 
 }).addTo(myMap);

L.marker([-30.7628, -57.9800], {icon: L.AwesomeMarkers.icon({
  icon: 'code-fork', 
  prefix: 'fa', 
  markerColor: 'green'}) 
 }).addTo(myMap);


 L.marker([-30.7628, -57.9999], {icon: L.AwesomeMarkers.icon({
  icon: 'circle', 
  prefix: 'fa', 
  markerColor: 'cadetblue'}) 
 }).addTo(myMap);

//---El objeto map-----------------
var myMap = L.map('myMap', {
  center: [-30.7628, -57.9567],
  zoom: 10,
  drawControl: true,
  layers: [m_default,g_hum] //los layers o capas que contiene el mapa
});

myMap.setView([-30.7628, -57.9567], 13) //setear vista al comienzo



var drawnItems = new L.FeatureGroup();
myMap.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    }
});
//yMap.addControl(drawControl);

var editableLayers = new L.FeatureGroup();
myMap.addLayer(editableLayers);

L.Control.RemoveAll = L.Control.extend({
  options: {
      position: 'topleft',
  },

  onAdd: function (myMap) {
      var controlDiv = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
      var controlUI = L.DomUtil.create('a', 'leaflet-draw-edit-remove', controlDiv);
      controlUI.title = 'Remove all drawn items';
      controlUI.setAttribute('href', '#');

      L.DomEvent
          .addListener(controlUI, 'click', L.DomEvent.stopPropagation)
          .addListener(controlUI, 'click', L.DomEvent.preventDefault)
          .addListener(controlUI, 'click', function () {
              drawnItems.clearLayers();
              if(window.console) window.console.log('Drawings deleted...');
          });
      return controlDiv;
  }
});

removeAllControl = new L.Control.RemoveAll();
myMap.addControl(removeAllControl);

myMap.on('draw:created', function(e) {
  var type = e.layerType,
    layer = e.layer;

  if (type === 'marker') {
    layer.bindPopup('A popup!');
  }

  drawnItems.addLayer(layer);
});
*/
var obj;

function colorPuntos(d) { 
  return d == "Sin Definir" ? 'red' : 
  d == "Humedal" ? '#02b96e' : 
  d == "Arroyo" ? '#46b4f5' : 
  d == "Laguna" ? '#337a7e' :
  d == "Lago" ? '#604fc8':
  d == "Punto de Interés" ? 'orange':
  d == "Manantial" ? 'deepskyblue':
  d == "Pantano" ? 'green':
  d == "Río" ? '#127fe1':
  d == "Cascada" ? 'lightskyblue':
        'red'; 
};


function estilo_monumentos (tipo) {
  return{
    fillColor: colorPuntos(tipo), 
      color: colorPuntos(tipo), 
    weight: 2,
    opacity : 1,
    fillOpacity : 0.2
  };
};

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 3,
      dashArray: '',
      fillOpacity: 0.5
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }

}


function resetHighlight(e) {
  
  //obj.resetStyle(e.target);
  const objeto = {
    objet: e.target.defaultOptions.id,
  };
  console.log (objeto.objet);
  $.post('php/geometry.php', objeto, (response) => {
    console.log(response);
    switch (response){
      case "Humedal":
        e.target.setStyle({
          fillColor: '#02b96e',  // color del fondo
            color: '#02b96e',  // COlor de la linea
          weight: 2,  // Anchura de la linea
          dashArray: '',
          fillOpacity: 0.2 //Opacidad del fondo
        });
        break;
      case "Lago":
        e.target.setStyle({
          fillColor: '#604fc8',  // color del fondo
            color: '#604fc8',  // COlor de la linea
          weight: 2,  // Anchura de la linea
          dashArray: '',
          fillOpacity: 0.2 //Opacidad del fondo
        });
        break;
      case "Pantano": 
        e.target.setStyle({
          fillColor: 'green',  // color del fondo
            color: 'green',  // COlor de la linea
          weight: 2,  // Anchura de la linea
          dashArray: '',
          fillOpacity: 0.2 //Opacidad del fondo
        });
        break;  
      case "Río":
        e.target.setStyle({
          fillColor: '#127fe1',  // color del fondo
            color: '#127fe1',  // COlor de la linea
          weight: 2,  // Anchura de la linea
          dashArray: '',
          fillOpacity: 0.2 //Opacidad del fondo
        });
        break;  
      case "Arroyo":
        e.target.setStyle({
          fillColor: '#46b4f5',  // color del fondo
            color: '#46b4f5',  // COlor de la linea
          weight: 2,  // Anchura de la linea
          dashArray: '',
          fillOpacity: 0.2 //Opacidad del fondo
        });
        break;       
      case "Cascada":
        e.target.setStyle({
          fillColor: 'lightskyblue',  // color del fondo
            color: 'lightskyblue',  // COlor de la linea
          weight: 2,  // Anchura de la linea
          dashArray: '',
          fillOpacity: 0.2 //Opacidad del fondo
        });
        break;    
      case "Laguna":
        e.target.setStyle({
          fillColor: '#337a7e',  // color del fondo
            color: '#337a7e',  // COlor de la linea
          weight: 2,  // Anchura de la linea
          dashArray: '',
          fillOpacity: 0.2 //Opacidad del fondo
        });
        break;   
      case "Manantial":
        e.target.setStyle({
          fillColor: 'deepskyblue',  // color del fondo
            color: 'deepskyblue',  // COlor de la linea
          weight: 2,  // Anchura de la linea
          dashArray: '',
          fillOpacity: 0.2 //Opacidad del fondo
        });
        break;        
      case "Punto de Interés":
        e.target.setStyle({
          fillColor: 'orange',  // color del fondo
            color: 'orange',  // COlor de la linea
          weight: 2,  // Anchura de la linea
          dashArray: '',
          fillOpacity: 0.1 //Opacidad del fondo
        });
        break;      
    }

  });

 
}

function zoomToFeature(e) {
myMap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
});
}

  
///------------000--------------------//SELECCIONAR_ACC//-------------000-------------------///
$(document).ready(function() { //Me aseguro que los eventos esten cargados
$.ajax({
  url:   'php/cons_lug_interes.php', //Archivo PHP con los datos
  type:  'GET',
  success:  function (response) { //Funcion que se ejecuta si la solicitud sucede con exito
    console.log(response);
    var lg = JSON.parse(response);
    
    for(var key=0; key < lg.length; key++) { //para cada columna
      var single = lg[key];
      console.log(single.type);
if(single.type=="POINT"){
  obj = L.geoJSON(JSON.parse(single.objeto), {
    id:single.id,
  }).bindPopup('<p>'+ single.nombre + '('+single.tipo+')'+ '</p>');
  marker.push(obj);
  //obj.on('mouseover', onClick3);

  obj.on('click', onClick2);
  myMap.addLayer(obj);
}else{
     obj = L.geoJSON(JSON.parse(single.objeto), {
        id:single.id,
        style: estilo_monumentos(single.tipo),
        onEachFeature: onEachFeature
      }).bindPopup('<p>'+ single.nombre + '('+single.tipo+')'+ '</p>');
      marker.push(obj);
      //obj.on('mouseover', onClick3);

      obj.on('click', onClick2);
      myMap.addLayer(obj);
      }

    };
    markerBackup = []; //Define como vacio al Array del backup marcadores 
    markerBackup = marker; //Guarda el los marcadores en el backup

  }});

})//----->>>>
 //Eventos asociados a los Lugares de interes 

  $(document).on('mouseover','#btnDropLg',function(){
    $('#dropmenu_lg').show();
  }); 

  $(document).on('mouseover','#dropmenu_lg',function(){
    $('#dropmenu_lg').show();
  });
  
  $(document).on('mouseout','#btnDropLg',function(){
    $('#dropmenu_lg').hide();
  }); 

  $(document).on('click','#conv_lg',function(){
    //Convertir Representación
    $("#form_marcar").show();
    //-> Fomulario Carga_Humedal (Lucia)
    //-> Formulario Acc Geografico (Lucia)
  }); 

  $(document).on('click','#edit_lg',function(){
    //Editar Descripción
    //-> Formulario Lugar de Interés (Lucia)
    
  }); 

  $(document).on('click','#delete_lg',function(i){
    //Eliminar Lugar de Interés
    console.log(i.currentTarget.classList[1]);
    var id = i.currentTarget.classList[1];
    $.ajax({
      data:{Id_lugar:id}, //Ejecuta la consulta dependiendo de la caracteristica que tomó 
      url:   'php/delete_lug_interes.php',
      type:  'GET',
      success:function(resp){
        console.log(resp);
      }
    });

  }); 
  
///------------000--------------------//!!!!!!!!!!!!!!!!//-------------000-------------------///




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
function tabla(id){ 
  $.ajax({
      url:   'php/busq_sel.php', //Archivo PHP con los datos
      type:  'GET',
      data:{Id_acc:id},
      success:  function (response) { //Funcion que se ejecuta si la solicitud sucede con exito
        console.log(response);
        
        
        if(response=="[]"){console.log('Sin Relevamiento')}
        else{
          var data = JSON.parse(response);
          Info = data;
          capa(data);
          $('#info').show();
          $('#myMap').css({'width': '75%'});
          $('#myMap').css({'min-width': '75%'});
        };
       /* var js = JSON.parse(response); //Obtiene al respuesta (response) y la convierte en string  
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
          }*/
        }
      });
    }

 // variable que guarda los detalles del evento del marker al que se le dio click
 var eventBackup;

 // funcion que se ejecuta cuando se da click sobre un marcador del mapa
 function onClick(e) {
   var i = this.options; //Guarda los datos del elemento clickeado
   //e.target.setIcon(MarkerActive); //Agrega el marcador activo
   console.log(eventBackup);

   if (eventBackup == undefined) { //Si no hay un backup del evento (si aun no se le dio click)
     eventBackup = e; //Guarda el evento reciente
     //capa(i); //Ejecuta la funcion capa 

    } else { //Si ya hay un backup del evento (si ya se le dio click)
      //eventBackup.target.setIcon(MarkerStyle); //Agrega el marcador por defecto
      eventBackup = e; //Guarda el evento reciente
      //capa(i); //Ejecuta la funcion capa 
      //$('#info').hide();
    }
  };

  var popup = L.popup();

	function onClick2(e) {
    var i = this.options;
    console.log(e.target.options);
    tabla(e.target.options.id);


      
		//popup.setContent('Descripción: '+ e.target.options.properties).openOn(myMap);
	};

  function onClick3(e) {
    var i = this.options;
    var layer = e.target;
    console.log(e.target.options);
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });
    //tabla(e.target.options.id);


      
		//popup.setContent('Descripción: '+ e.target.options.properties).openOn(myMap);
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
   
    var cont = data[0].id;
    this._div.innerHTML = cont;
    $("#rele").html("");
    $("#rele").html("<p>Relevamiento</p>");
    $("#rele").append('<select class="form-select" id="sel_frel"></select>');
    $("#sel_frel").on('change', rele);//Crear funcion para mostrar datos rel por fecha

  data.forEach(function(i){
    console.log(i['fecha']);
    $("#sel_frel").append('<option value='+(i['id_rel'])+'>'+i['fecha']+'</option>');
  });

  rele();
  function rele(){
    var rel = ($("#sel_frel").val());
    var presiones = "";
    var persona = "";
    var faunas = "";
    var floras = "";



    $('#data_list').html('');
    
    data.forEach(function(i){
      if(i['id_rel']==rel){
        for (const key in i) {
          if(key=="presion"){
            i['presion'].forEach(function(e){presiones = presiones + ' ' + e['tipo_presion']});
          }
          if(key=="persona"){
            i['persona'].forEach(function(e){persona = persona + ' ' + e['nombre_persona']});
          }
          if(key=="fauna"){
            $('#data_list').append('<div class="accordion" id="seccionFauna">'+
    '<div class="accordion-item" id="headFauna">'+
    '<h2 class="accordion-header">'+
      '<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">'+
        'Fauna'+
      '</button>'+
    '</h2></div>');

            i['fauna'].forEach(function(e){
              appendfauna = '<div class="accordion-body" style="border-top: 1px solid #adadad; border-bottom: 1px solid #adadad;">'+
              '<div class="card-body"><h5 class="card-title">'+e['Nombre_coloquial']+'</h5>'+
                '<h6 class="card-subtitle text-muted">'+e['Nombre_cientifico']+'</h6></div>';
                if (e['img_fauna'] == null){
                  appendfauna = appendfauna + "<a>sin imagen</a>";
                }else{
                  appendfauna = appendfauna + '<img src=images/'+e['img_fauna']+ ' width="100" height="100">';
                }
                appendfauna = appendfauna +  '<div class="card-body"><p class="card-text" id="styleADD" style="font-size: 14px">'+e['Descripcion']+'</p></div></div>';
              $('#headFauna').append(appendfauna);
            });
          }

          if(key=="flora"){

            $('#data_list').append('<div class="accordion" id="seccionFlora">'+
            '<div class="accordion-item">'+
            '<h2 class="accordion-header" id="headFlora">'+
              '<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">'+
                'Flora'+
              '</button>'+
            '</h2></div>');

            i['flora'].forEach(function(e){
              appendflora = '<div class="accordion-body">'+
              '<div class="card-body"><h5 class="card-title">'+e['Nombre_coloquial']+'</h5>'+
                '<h6 class="card-subtitle text-muted">'+e['Nombre_cientifico']+'</h6></div>';
                if (e['img_flora'] == null){
                  appendflora = appendflora + "<a>sin imagen</a>";
                }else{
                  appendflora = appendflora + '<img src=images/'+e['img_flora']+ ' width="100" height="100">';
                }
                appendflora = appendflora + '<div class="card-body"> <p class="card-text" id="styleADD" style="font-size: 14px">'+e['Descripcion']+'</p> </div> </div>'
              //floras = floras + ' ' + e['Nombre_coloquial']
              $('#headFlora').append(appendflora);
            });
            
          }

          if(key=="img"){

            $('#data_list').append('<div class="accordion" id="seccionImg">'+
            '<div class="accordion-item">'+
            '<h2 class="accordion-header" id="headImg">'+
              '<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">'+
                'Imagenes'+
              '</button>'+
            '</h2></div>');

            i['img'].forEach(function(e){
              //floras = floras + ' ' + e['Nombre_coloquial']
              $('#headImg').append('<div class="accordion-body">'+
              '<div class="card-body"><h5 class="card-title"></h5>'+
                '<h6 class="card-subtitle text-muted"></h6></div>'+
                  '<img src='+e['img_rel']+ ' width="100" height="100">'+
              '<div class="card-body"> <p class="card-text" id="styleADD" style="font-size: 14px">'+e['Descripcion']+'</p> </div> </div>');
            });
            
          }

          //$('#styleADD').css("font-size", "30px");


          if(i[key]!=='' && i[key]!==null && key!=='fecha' && key!=='id_acc' && key !=='id_rel' && key !=='presion' && key !=='fauna' && key !=='flora' && key !=='img' && key !=='persona'){
            console.log(key);
            $('#h_name').html(i['nombre']);
            $('#data_list').append('<li class="list-group-item">'+key+': '+i[key]+'</li>');
          }
        };
        $('#data_list').append('<li class="list-group-item">'+'Presiones: '+ presiones +'</li>');
        $('#data_list').append('<li class="list-group-item">'+'Involucrados: '+ persona +'</li>');

        //$('#data_list').append('<li class="list-group-item">'+'Fauna: '+ faunas +'</li>');
        //$('#data_list').append('<li class="list-group-item">'+'Flora: '+ floras +'</li>');
      }
    });
  }

  $('#closeBtn').on('click', function(){
    $('#info').hide();
    $('#myMap').css({'width': '100%'});
  });

/*
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
*/
  $('#info').show();
  $('#myMap').css({'width': '80%'});

  };
  info.addTo(myMap);

  $('#btnDropHum').on('mouseover', function(){
    $('#dropmenu_hum').show();
    //alert('button');
  });

  $('#dropmenu_hum').on('mouseover',function(){
    $('#dropmenu_hum').show();

    //console.log($('#contenido').html());
  });
 
  $('#btnDropHum').on('mouseout', function(){
    $('#dropmenu_hum').hide();
    //alert('button');
  });

  $('#optionsRelInf').on('click',function(){
    $('#dropmenu_hum').show();
  });
  $('#dropdown-item').on('click',function(){exp(data)});
  $('#dropdown-item2').on('click',function(){exp_d(data)});

}
$('#modif_hum.dropdown-item').on('click',function(){modif(Info,1)});
$('#agre_rel.dropdown-item').on('click',function(){console.log("hola")});
$('#modif_rel.dropdown-item').on('click',function(){modif(Info,2)});
//$('#delete_hum.dropdown-item').on('click',function(){del(Info)}); 

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
       
/* funcion que cierra la capa flotante
$(document).on('click','#closeBtn', function(){ 
  $('#info').hide();
  $('#myMap').css({'width': '100%'});
  info.remove(myMap);
  eventBackup.target.setIcon(MarkerStyle);
});
*/
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
    
   // tabla();
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
       url: 'php/consulta2.php',
       data: {search},
       type: 'POST',
       success: function (response) {
           if(!response.error) {
             let tasks = JSON.parse(response);
             console.log(tasks);
            

             
             let template = '';
             tasks.forEach(task => {
              
              var obj = L.geoJSON(JSON.parse(task.objeto), {
                id:task.id,
                style: estilo_monumentos(task.tipo)
              }).bindPopup('<p>'+ task.nombre + '('+task.tipo+')'+ '</p>');
              //obj.on('click', onClick2);
              marker.push(obj);
              obj.on('click', onClick2);
              myMap.addLayer(obj);

              template += `
               <a href="#" class="task-item ${task.id}"><h6 class="poppins600 blue-3">${task.nombre}</h6></a>
             ` });
                  /*
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
                      */
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
function modif(data,tipMod){
  ent = 0;
  /*$('#form_add').show();
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

   $('#sel_presion.form-select.0').val(data.presion[0]);
  $('#sel_fauna.form-select.0').val(data.fauna[0]);
  $('#sel_flora.form-select.0').val(data.flora[0]);

  update = true;*/

  /*
  $('#form_modif').show();
  $('#t_form.modal-title').html('Modificar');
  $('#form_modal').css({'background':'#DEFEAE'});
  var postData= {
    accidente:true,
  }
  $('#ContTable').css({'visibility':'visible'});
  
  $.post('php/modificar.php', postData, (response) => {
    console.log(response);  
    $("#myTable").html(response);
  });*/
  
if (tipMod == 1){
  data.forEach(element => {
    // console.log("id_acc:"+ element['id_acc']);
     IdAcc = element['id_acc'];
     IdAccMod_Rel_o_acc = element['id_acc'];
 
     //console.log("nombre:"+ element['nombre']);
     Nombre = element['nombre'];
 
     //console.log("Cuenca:"+ element['Cuenca']);
     Cuenca = element['Cuenca'];
 
     //console.log("Complejo:"+ element['Complejo']);
     Complejo = element['Complejo'];
 
     //console.log("Tipoacc:"+ element['Tipoacc']);
     Tipo = element['Tipoacc'];
 
     //console.log("Descripcion:"+ element['Descripcion']);
     Descr = element['Descripcion'];
 
     //console.log("presion:"+ element['presion']);
     Pres = element['presion'];
     
   });
   console.log("ent:"+ ent);
   if (ent==0){
     ModifAccInf(IdAcc,Nombre,Cuenca,Complejo,Tipo,Descr,Pres);
   }
}
if (tipMod == 2){
  data.forEach(element => {
    // console.log("id_acc:"+ element['id_acc']);
    IdRel= element['id_rel'];
    IdAccMod_Rel_o_acc = element['id_acc'];

    //console.log("nombre:"+ element['nombre']);
    NombreAcc = element['nombre'];
    FechRel = element['fecha'];
    Conduc = element['conductividad'];
    Ancho = element['ancho'];
    Largo = element['largo'];
    Superf = element['superficie'];
    O2d = element['02_disuelto'];
    Turb = element['turbidez'];
    Ph = element['pH'];
    Color = element['color'];
    Temp = element['temp_agua'];
    
    CalAgua = element['calidad_agua'];
    DiverVeg = element['diversidad_vegetal'];
    RegHidro = element['regimen_hidrologico'];
    Tiempo = element['tiempo'];
    Fuente = element['fuente'];
    
    Person = element['persona'];
    Fauna = element['fauna'];
    Flora = element['flora'];

    Obser = element['observaciones'];
    
   });
   console.log("ent:"+ ent);
   if (ent==0){
     ModifRelInf(IdRel,NombreAcc,FechRel,Conduc,Ancho,Largo,Superf,O2d,Turb,Ph,Color,Temp,CalAgua,DiverVeg,RegHidro,Tiempo,Fuente,Person,Fauna,Flora,Obser);
   }
}
  
  //ModifData()
};

////////////////////      
function del(data){
  $('#del_hum').show();
  $('#close_btn_del_hum').on('click', function(){
    $('#del_hum').hide();
  });
  $('#delete_h').on('click', function(){
    console.log('humedal eliminado');
    console.log('...');
    console.log('...');
    console.log('...');
    console.log('psst... realmente no se eliminó nada....');
    /*$.ajax({
      data:{id:data.id}, //Ejecuta la consulta dependiendo de la caracteristica que tomó 
      url:   'php/eliminar.php',
      type:  'GET',
      success:function(resp){
        console.log(resp);
        //alert('humedal eliminado');
        console.log('humedal eliminado');
      }
    });*/
    //consulta php delete data.id en todas las tablas o baja logica
  });
};

function exp(data){
  
  const $elementoParaConvertir = $('#info').html(); // <-- Aquí puedes elegir cualquier elemento del DOM
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
  Export2Doc('info',data[0].nombre);
};

/////////////////////////////////
function add_marker(lat,lng){
  var mark = L.marker([lat, lng]).addTo(myMap);
  mark.on('click',function(){myMap.removeLayer(mark)});

};

