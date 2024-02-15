<?php
header("Access-Control-Allow-Origin: *");
$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "http://203.158.173.23:3000/api/lotteries",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
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
}
