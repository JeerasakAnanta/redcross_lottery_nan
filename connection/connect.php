<<<<<<< HEAD
<?php
// server dev  
// $servername = "localhost";
// $username = "root";
// $password = "";
// $dbname = "lottery_db";
// server dev  

$servername = "db";
$username = "admin";
$password = "p@ssw0rd";
$dbname = "lotteries";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Perform your database operations here...
=======
<?php
// server dev  
// $servername = "localhost";
// $username = "root";
// $password = "";
// $dbname = "lottery_db";
// server dev  

$servername = "localhost";
$username = "admin";
$password = "p@ssw0rd";
$dbname = "lotteries";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Perform your database operations here...
>>>>>>> 3d9a6a1e24b814eb988aa9df1902f705cea074f6
