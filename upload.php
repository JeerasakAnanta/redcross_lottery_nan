<?php
session_start(); // Start the session

// Check if an image file has been uploaded
if(isset($_FILES['image'])) {
    // Set the temporary file path
    $file_tmp = $_FILES['image']['tmp_name'];

    // Check connection to the host by calling API
    $host = 'http://203.158.173.23:3000/api/upload';

    // Prepare data for the API call (if needed)
    $data = array(
        // Add any data parameters needed for the API call
    );

    // Prepare options for the API call
    $options = array(
        'http' => array(
            'method' => 'GET', // Adjust method as per your API
            // You can add headers, parameters, etc. as needed
            // 'header' => 'Content-type: application/json', // Example header
            // 'content' => json_encode($data), // Example data
            'ignore_errors' => true // Ignore HTTP errors to handle manually
        )
    );

    // Create stream context
    $context = stream_context_create($options);

    // Make API call and get response
    $response = file_get_contents($host, false, $context);

    // Check if response is received
    if($response !== false) {
        echo $response;
    } else {
        // Connection failed, echo an error message
        echo 'Failed to connect to host. Please try again later.';
        exit(); // Stop script execution
    }
}
?>
