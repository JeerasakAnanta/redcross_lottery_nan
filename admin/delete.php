<?php
// Assuming you have a database connection
include('../connection/connect.php');

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['id'])) {
    $id = $_GET['id'];

    // Delete the selected record
    $sql = "DELETE FROM lottery WHERE id = $id";
    if (mysqli_query($conn, $sql)) {
        header("Location: welcome.php"); // Redirect to the display page after deletion
        exit();
    } else {
        echo "Error deleting record: " . mysqli_error($conn);
    }
} else {
    echo "Invalid request";
}

mysqli_close($conn);
