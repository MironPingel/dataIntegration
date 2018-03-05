<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "world";
$countryCode = $_GET["countrycode"];
$district = $_GET["district"];

// $countryCode = "DEU";
// $district = "Niedersachsen";


$capitalId = "";

$json = [];

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


// City Query
$sqlString = 'SELECT * FROM city WHERE CountryCode="'.$countryCode.'" AND District = "'.$district.'";';
$result = mysqli_query($conn, $sqlString);
$citiesInDistrict = [];

if (mysqli_num_rows($result)) {
    do {
        array_push($citiesInDistrict, mysqli_fetch_assoc($result));
    } while ($row = mysqli_fetch_assoc($result));

    $json = $citiesInDistrict;
} else {
    $json = "empty";
}


echo json_encode($json, true);
