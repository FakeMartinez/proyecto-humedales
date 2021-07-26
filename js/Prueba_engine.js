
const express = require('express');
const app = express();
var body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended:true}));



app.get('/', (req, res) => {
   res.send("hola mundo");
});

app.listen(8000, function() {
  console.log('Server on port 8000');
});



// Require client library and private key.
var ee = require('@google/earthengine');
var privateKey = require('./static/Clavekey.json');

/*app.post("/",(req,res)=> {
  const alumno = req.body.nombre;
  console.log(alumno);
  res.send(alumno);

});*/


// Initialize client library and run analysis.
var runAnalysis = function() {
  ee.initialize(null, null, function() {
      console.log("Ok...");
    
app.post('/', (req, res) => {
  
  var geometry = /* color: #d63000 */ee.Geometry.Point([-57.98116528325975, -30.754592668368158]);

      //var landsat8Collection = new ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA").first();
      //var url = landsat8Collection.visualize({bands:['B4','B3','B2'],gamma:1.5}).getThumbURL({dimensions:'1024x1024',format:'jpg'});
      var coleccion = new ee.ImageCollection('COPERNICUS/S2').filterBounds(geometry)
      .filterDate(req.body.f_ini,req.body.f_fin)
      .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than', 10).first();
     var img = coleccion.visualize({bands:['B4','B3','B2'],max:1600, min:600, gamma:1.5}).getThumbURL({dimensions:'1024x1024',format:'jpg'});
    //  var url = img.select(['B2','B3','B4','B5','B6','B7']);
      console.log("'"+ req.body.f_ini+"'" ,"'" + req.body.f_fin+ "'");
      res.send(img);

      
      /*
      var mosaico = coleccion.mosaic();
      var url = coleccion.visualize({bands:[req.body.Banda_Roja,req.body.Banda_Verde,req.body.Banda_Azul],min:500, max:1300, gamma:1.5}).getThumbURL({dimensions:'1024x1024',format:'jpg'});

      var UrlDescarga = mosaico.getDownloadURL({
      'scale': 50, // Resolucion de pixel de todas las bandas a exportar
      'region': geometry});
    //console.log(ee.Date(req.body.f_ini).format('YYYY-MM-dd'));
    /*var layer = ui.Map.Layer(coleccion, {bands: [dicobjetos.select.b1.getValue(),dicobjetos.select.b2.getValue(),dicobjetos.select.b3.getValue()],
    min:dicobjetos.slider.getValue(), max:dicobjetos.slider1.getValue(), gamma:dicobjetos.slider2.getValue() }, 'Sentinel 2')
    Map.layers().set(0,layer)*/

    /*var image = new ee.Image('srtm90_v4');
    image.getMap({min: 0, max: 1000}, function(map) {
      res.send(map.urlFormat);
    });*/

    });
    // ... run analysis ...
  }, function(e) {
    console.error('Initialization error: ' + e);
  });
};

// Authenticate using a service account.
ee.data.authenticateViaPrivateKey(privateKey, runAnalysis, function(e) {
  console.error('Authentication error: ' + e);
});


/*=================
Diccionario de Widgets
=======================*/
/*
var bandas = {
    "B1": [], 
    "B2": [], 
    "B3": [],
    "B4": [], 
    "B5": [],
    "B6": [], 
    "B7": [], 
     "B8": [], 
     "B8A": [], 
     "B9": [],  
     "B11": [], 
     "B12": [], 
    "AOT": [], 
    "WVP": [], 
    "SCL": [],
    "TCI_R": [],
    "TCI_G": [],
    "TCI_B": [],
    "MSK_CLDPRB": [],
    "MSK_SNWPRB": [],
    "QA10": [], 
    "QA20": [], 
    "QA60": [], 
    }
    
    var dicobjetos = {
      Sliderfecha:ui.DateSlider({start:'2015-01-01', end:ee.Date(Date.now()), period: 15, onChange:function(){}}),
      select:{
        b1: ui.Select({items: Object.keys(bandas), placeholder: 'Seleccione Banda', onChange:function(){}}),
        b2: ui.Select({items: Object.keys(bandas), placeholder: 'Seleccione Banda', onChange:function(){}}),
        b3: ui.Select({items: Object.keys(bandas), placeholder: 'Seleccione Banda', onChange:function(){}}),
      },
      label: ui.Label('Min: ', {}),
      slider:ui.Slider({min: 500, max:5000, step: 100, onChange: function(){}}),
      label1:ui.Label('Max: ', {}),
      slider1:ui.Slider({min: 500, max:5000, step: 100, onChange: function(){}}),
      label2:ui.Label('Gamma: ', {}),
      slider2:ui.Slider({min: 0, max:3, step: 0.1, onChange: function(){}}),
    }
    
    var panelv = ui.Panel({widgets:[
    dicobjetos.select.b1,
    dicobjetos.select.b2,
    dicobjetos.select.b3], layout: ui.Panel.Layout.Flow('horizontal'), style: {backgroundColor: '00000000'}})
    
    
    var boton = ui.Button({label:'Aplicar', onClick:function(b){
        var coleccion = ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(geometry)
        .filterDate(ee.Date(dicobjetos.Sliderfecha.getValue()[0]).format('YYYY-MM-dd'), ee.Date(dicobjetos.Sliderfecha.getValue()[1]).format('YYYY-MM-dd'))
        .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than', 10).mosaic()
        var layer = ui.Map.Layer(coleccion, {bands: [dicobjetos.select.b1.getValue(),dicobjetos.select.b2.getValue(),dicobjetos.select.b3.getValue()],
        min:dicobjetos.slider.getValue(), max:dicobjetos.slider1.getValue(), gamma:dicobjetos.slider2.getValue() }, 'Sentinel 2')
       Map.layers().set(0,layer);
    }})
    */
    /*PANEL PRINCIPAL*/
    /*
    var panel = ui.Panel({widgets:[
    dicobjetos.Sliderfecha,panelv, dicobjetos.label,
    dicobjetos.slider,dicobjetos.label1,
    dicobjetos.slider1,dicobjetos.label2,
    dicobjetos.slider2, boton], layout: ui.Panel.Layout.Flow('vertical'), style: {backgroundColor: '00005555'}})
    Map.add(panel);
 */
    
  
  
