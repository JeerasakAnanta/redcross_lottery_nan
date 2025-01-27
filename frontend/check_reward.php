<?php
session_start();
include 'connection/connect.php';
if (isset($_GET['number'])) {
    $lottery_no = $_GET['number'];

    // Validate input (example: 6 digits)
    if (!preg_match('/^\d{6}$/', $lottery_no)) {
        $_SESSION['error'] = "Invalid lottery number format.";
        header("Location: index.php");
        exit();
    }

    $data = json_encode(['lottery_no' => $lottery_no]);

    // Updated API URL (ensure correct hostname)
    $url = 'http://localhost:3000/api/check_reward';

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $data
        ]
    ]);

    try {
        $response = file_get_contents($url, false, $context);
        if ($response === FALSE) {
            throw new Exception("API request failed.");
        }
        $result_array = json_decode($response, true);
        $_SESSION['result'] = $result_array['result'];
    } catch (Exception $e) {
        $_SESSION['error'] = "Unable to check the lottery number. Please try later.";
        error_log("API Error: " . $e->getMessage()); // Log the error
    }

    header("Location: index.php");
    exit();
}
?>