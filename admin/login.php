<?php
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get user input
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Check username and password (this is just a basic example)
    // In a real-world scenario, you would validate against a database
    if ($username === "your_username" && $password === "your_password") {
        // Authentication successful
        $_SESSION["username"] = $username;
        header("Location: welcome.php"); // Redirect to a welcome page or dashboard
        exit();
    } else {
        // Authentication failed
        $error = "Invalid username or password";
    }
}
