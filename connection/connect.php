<?php
// server dev  
// $servername = "localhost";
// $username = "root";
// $password = "";
// $dbname = "lottery_db";
// server dev  
$servername = "localhost";
$username = "redcross";
$password = "redcross123!!";
$dbname = "redcross";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Perform your database operations here...
