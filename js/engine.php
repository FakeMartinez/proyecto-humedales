<?php

error_reporting(0);
require('conexion.php');



 	

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  
</head>

<body>
<script language="javascript">

var ee = require('@google/earthengine');
var privateKey = require('./static/Clavekey.json');


// Initialize client library and run analysis.
var runAnalysis = function() {
  ee.initialize(null, null, function() {
      console.log("Ok...");
      var landsat8Collection = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
      console.log(landsat8Collection.limit(5));
      <?php
      $valor= "hola";
      echo ($valor);	
      ?>

    
    // ... run analysis ...
  }, function(e) {
    console.error('Initialization error: ' + e);
  });
};

// Authenticate using a service account.
ee.data.authenticateViaPrivateKey(privateKey, runAnalysis, function(e) {
  console.error('Authentication error: ' + e);
});

</script> 
</body>

</html>