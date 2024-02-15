<<<<<<< HEAD
<?php
// Assuming you have a database connection
include('../connection/connect.php');

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['id'])) {
    $id = $_GET['id'];

    header("Access-Control-Allow-Origin: *");
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "http://203.158.173.23:3000/api/lotterie/$id",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "DELETE",
        CURLOPT_HTTPHEADER => [
            "x-rapidapi-host: random-facts2.p.rapidapi.com",
            "x-rapidapi-key: "
        ],
    ]);
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    if ($err) {
        echo "cURL Error #:" . $err;
    } else {

        $data = json_decode($response, true); // Decode the JSON response
        header("Location: welcome.php"); // Redirect to the display page after updating
        exit();
    }
}
=======
<?php
// Assuming you have a database connection
include('../connection/connect.php');

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['id'])) {
    $id = $_GET['id'];

    header("Access-Control-Allow-Origin: *");
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "http://203.158.173.23:3000/api/lotterie/$id",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "DELETE",
        CURLOPT_HTTPHEADER => [
            "x-rapidapi-host: random-facts2.p.rapidapi.com",
            "x-rapidapi-key: "
        ],
    ]);
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    if ($err) {
        echo "cURL Error #:" . $err;
    } else {

        $data = json_decode($response, true); // Decode the JSON response
        header("Location: welcome.php"); // Redirect to the display page after updating
        exit();
    }
}
>>>>>>> 3d9a6a1e24b814eb988aa9df1902f705cea074f6
