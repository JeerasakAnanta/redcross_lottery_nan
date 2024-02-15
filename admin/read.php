<?php
include('connection/connect.php');

// Select all records from the 'lottery' table
$sql = "SELECT * FROM lottery";
$result = mysqli_query($conn, $sql);

if ($result) {
    // Display the records
    while ($row = mysqli_fetch_assoc($result)) {
        echo "ID: " . $row["l_id"] . ", Lottery Number: " . $row["lottery_number"] . ", Reward Number: " . $row["reward_number"] . "<br>";
    }
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
