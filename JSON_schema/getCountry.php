<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "world";
$countryName = $_GET["country"];


$capitalId = "";

$json = [];

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


// City Query
$sqlString = 'SELECT * FROM country WHERE Name="'.$countryName.'";';
$result = mysqli_query($conn, $sqlString);

if (mysqli_num_rows($result)) {
    $country = mysqli_fetch_assoc($result);
    $capitalId = $country["Capital"];
    $json["country"] = $country;
}

// Capital Query
$sqlString = 'SELECT * FROM city WHERE Id="'.$capitalId.'";';
$result = mysqli_query($conn, $sqlString);

if (mysqli_num_rows($result)) {
   $capital = mysqli_fetch_assoc($result);
   $json["capital"] = $capital;
}


// Languages Query
$sqlString = 'SELECT * FROM countrylanguage WHERE CountryCode="'.$country["Code"].'";';
$result = mysqli_query($conn, $sqlString);
$languages = [];

if (mysqli_num_rows($result)) {
    while ($row = mysqli_fetch_assoc($result)) {
        array_push($languages, $row);
    }
    $json["languages"] = $languages;
} 

echo json_encode($json, true);