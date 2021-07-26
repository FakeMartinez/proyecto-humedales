// GeoJson (Poligonos del ejido chajarí y los humedales)
//------------ARCHIVO GEOJSON1-------------------
const xhttp = new XMLHttpRequest();
xhttp.open('GET', 'GeoJSON/PoligonoJSON.geojson', 'true');
xhttp.send();
xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      L.geoJSON(JSON.parse(this.responseText)).addTo(myMap);
      //console.log(this.responseText);
    }
}
//---------------------------------------------

//------------ARCHIVO GEOJSON2-----------------
const xhttp2 = new XMLHttpRequest();
xhttp2.open('GET', 'GeoJSON/Humedal_chajarí.geojson', 'true');
xhttp2.send();
xhttp2.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        L.geoJSON(JSON.parse(this.responseText)).addTo(myMap);
        
    }
}
//---------------------------------------------

//------------ARCHIVO GEOJSON3-----------------
const xhttp3 = new XMLHttpRequest();
xhttp3.open('GET', 'GeoJSON/Pileta_chajarí.geojson', 'true');
xhttp3.send();
xhttp3.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        L.geoJSON(JSON.parse(this.responseText)).addTo(myMap); 

    }
}
//---------------------------------------------

//------------ARCHIVO GEOJSON4-----------------
const xhttp4 = new XMLHttpRequest();
xhttp4.open('GET', 'GeoJSON/Laguna_artificial_chajarí.geojson', 'true');
xhttp4.send();
xhttp4.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){

       lag = L.geoJSON(JSON.parse(this.responseText)).addTo(myMap); 
       infoa = JSON.parse(this.responseText);
        lag.addEventListener('click', function(){
        alert(''+ query + "'"+ infoa.name + "'");
   });
    }
}