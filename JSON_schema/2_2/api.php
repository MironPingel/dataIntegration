<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "world";

// Variables for Query: FROM $table WHERE $column = $value
$table = $_GET["table"];

if (isset($_GET["column"])) {
   $column = $_GET["column"];
} else {
   $column = null;
}

if (isset($_GET["value"])) {
   $value = $_GET["value"];
} else {
   $value = null;
}



// Test values

// $table = "country";
// $column = "Region";
// $value = "Caribbean";

// RESULT ARRAY
$json = [];




// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


// Query

if ($column && $value) {
   $sqlString = 'SELECT * FROM '.$table.' WHERE '.$column.'="'.$value.'";';
} else {
   $sqlString = 'SELECT * FROM '.$table.';';
}

$result = mysqli_query($conn, $sqlString);

if (mysqli_num_rows($result)) {
   do {
    array_push($json, mysqli_fetch_assoc($result));
   } while (mysqli_fetch_assoc($result));
}

echo json_encode($json, true);