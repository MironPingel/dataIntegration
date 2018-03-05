<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "world";

$json = [];

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    $json = "Connection failed: " . $conn->connect_error;
} 


// City Query
$sqlString = 'SELECT * FROM country;';
$result = mysqli_query($conn, $sqlString);


if (mysqli_num_rows($result)) {
   while ($row = mysqli_fetch_assoc($result)) {
      
    array_push($json, [$row["Name"], $row["Code"]]);
   }
}


echo json_encode($json, true);