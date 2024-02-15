<?php
include('../connection/connect.php');

session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get user input
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Assuming you have a 'admin' table with 'username' and 'password' columns
    $sql = "SELECT * FROM admin WHERE username = '$username' AND password = '$password'";
    $result = mysqli_query($conn, $sql);

    if ($result) {
        // Check if a row is returned
        if (mysqli_num_rows($result) > 0) {
            // Authentication successful
            $_SESSION["username"] = $username;
            header("Location: welcome.php"); // Redirect to a welcome page or dashboard
            exit();
        } else {
            // Authentication failed
            $error = "Invalid username or password";
            header("Location: login_auth.php?error=$error"); // Redirect with an error message
            exit();
        }
    } else {
        // Query execution failed
        $error = "Error executing the query";
        header("Location: login_auth.php?error=$error"); // Redirect with an error message
        exit();
    }
}

include("../Includes/admin_footer.php");