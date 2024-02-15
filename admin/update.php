<?php
// Assuming you have a database connection
include('../connection/connect.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $lottery_number = $_POST['lottery_number'];
    $reward_number = $_POST['reward_number'];

    // Update data in the 'lottery' table
    $sql = "UPDATE lottery SET lottery_number='$lottery_number', reward_number='$reward_number' WHERE id=$id";

    if (mysqli_query($conn, $sql)) {
        echo "Record updated successfully";
        header("Location: welcome.php"); // Redirect to the display page after updating
        exit();
    } else {
        echo "Error updating record: " . mysqli_error($conn);
    }
} else {
    echo "Invalid request";
}

mysqli_close($conn);
