<?php
session_start(); // เริ่ม Session

if (isset($_GET['number'])) {
    // ถ้ามี ให้กำหนดค่า lottery_no จากค่าที่ส่งมาทาง GET
    $lottery_no = $_GET['number'];

    // ข้อมูลที่จะส่งไปยัง API
    $data = array(
        'lottery_no' => $lottery_no
    );

    // แปลงข้อมูลเป็นรูปแบบ JSON
    $data_string = json_encode($data);

    // กำหนด URL ของ API
    $url = 'http://203.158.173.23:3000/api/check_reward';

    // สร้าง context สำหรับการส่งคำขอ HTTP
    $context = stream_context_create(
        array(
            'http' => array(
                'method' => 'POST',
                'header' => 'Content-Type: application/json',
                'content' => $data_string
            )
        )
    );

    // ส่งคำขอ HTTP และรับผลลัพธ์
    $response = file_get_contents($url, false, $context);

    // ตรวจสอบว่าสามารถเรียก API ได้หรือไม่
    if ($response === FALSE) {
        // ถ้าไม่สามารถเรียก API ได้
        echo 'Unable to call API';
        exit();
    }

    // แปลงข้อความ JSON เป็นอาร์เรย์
    $result_array = json_decode($response, true);

    // เก็บค่า $result_array['result'] ใน Session
    $_SESSION['result'] = $result_array['result'];

    // ส่งผู้ใช้ไปยังหน้า index.php
    header("Location: index.php");
    exit();
}
?>
