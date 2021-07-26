<?php
/**
 * get_image_location
 * Returns an array of latitude and longitude from the Image file
 * @param $image file path
 * @return multitype:array|boolean
 */
error_reporting(0);
function get_image_location($image = ''){
    $exif = exif_read_data($image, 0, true);
    if($exif && isset($exif['GPS'])){
        $GPSLatitudeRef = $exif['GPS']['GPSLatitudeRef'];
        $GPSLatitude    = $exif['GPS']['GPSLatitude'];
        $GPSLongitudeRef= $exif['GPS']['GPSLongitudeRef'];
        $GPSLongitude   = $exif['GPS']['GPSLongitude'];
        
        $lat_degrees = count($GPSLatitude) > 0 ? gps2Num($GPSLatitude[0]) : 0;
        $lat_minutes = count($GPSLatitude) > 1 ? gps2Num($GPSLatitude[1]) : 0;
        $lat_seconds = count($GPSLatitude) > 2 ? gps2Num($GPSLatitude[2]) : 0;
        
        $lon_degrees = count($GPSLongitude) > 0 ? gps2Num($GPSLongitude[0]) : 0;
        $lon_minutes = count($GPSLongitude) > 1 ? gps2Num($GPSLongitude[1]) : 0;
        $lon_seconds = count($GPSLongitude) > 2 ? gps2Num($GPSLongitude[2]) : 0;
        
        $lat_direction = ($GPSLatitudeRef == 'W' or $GPSLatitudeRef == 'S') ? -1 : 1;
        $lon_direction = ($GPSLongitudeRef == 'W' or $GPSLongitudeRef == 'S') ? -1 : 1;
        
        $latitude = $lat_direction * ($lat_degrees + ($lat_minutes / 60) + ($lat_seconds / (60*60)));
        $longitude = $lon_direction * ($lon_degrees + ($lon_minutes / 60) + ($lon_seconds / (60*60)));

        return array('latitude'=>$latitude, 'longitude'=>$longitude);
    }else{
        return false;
    }
}

function gps2Num($coordPart){
    $parts = explode('/', $coordPart);
    if(count($parts) <= 0)
    return 0;
    if(count($parts) == 1)
    return $parts[0];
    return floatval($parts[0]) / floatval($parts[1]);
}


//image file path
//$imageURL = $_GET["img_URL"];
if (($_FILES["file"]["type"] == "image/pjpeg")
    || ($_FILES["file"]["type"] == "image/jpeg")
    || ($_FILES["file"]["type"] == "image/png")
    || ($_FILES["file"]["type"] == "image/gif")) {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], "images/".$_FILES['file']['name'])) {
        //more code here...
        //echo "images/".$_FILES['file']['name'];

    } else {
        echo 0;
    }
} else {
    echo 0;
}

$imageURL = "images/".$_FILES['file']['name'];

//get location of image
$imgLocation = get_image_location($imageURL);

//latitude & longitude
$imgLat = $imgLocation['latitude'];
$imgLng = $imgLocation['longitude'];

if ($imgLocation == false){
    $img = array();
    $img['img']= $imageURL;
    $img['lat']= 0;
    $img['lng']= 0;
    echo json_encode($img);
}else{
$img = array();
$img['img']= $imageURL;
$img['lat']= $imgLat;
$img['lng']= $imgLng;
echo json_encode($img);
//echo($imgLat);
//echo($imgLng);
}
?>