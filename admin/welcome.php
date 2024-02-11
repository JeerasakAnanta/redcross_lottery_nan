<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION["username"])) {
    header("Location: login.html");
    exit();
}

// Display welcome message
echo "Welcome, " . $_SESSION["username"] . "!";

// You can include a logout button here
