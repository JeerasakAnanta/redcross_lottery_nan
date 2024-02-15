<?php
session_start(); // เริ่ม session
// ตรวจสอบว่ามีการส่งไฟล์รูปภาพมาหรือไม่
if(isset($_FILES['image'])) {
    // กำหนดตัวแปรที่เก็บที่อยู่ของไฟล์ชั่วคราว
    $file_tmp = $_FILES['image']['tmp_name'];
    
    // กำหนด URL ของ API
    $api_url = 'http://203.158.173.23:3000/api/upload';
    
    // กำหนดข้อมูลที่จะส่งไปยัง API
    $post_data = array(
        'image' => new CURLFile($file_tmp, $_FILES['image']['type'], $_FILES['image']['name'])
    );

    // สร้างคำขอ HTTP POST โดยใช้ cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $api_url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    // ส่งคำขอและรับผลลัพธ์
    $response = curl_exec($ch);
    
    // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
    if($response === false) {
        echo 'cURL Error: ' . curl_error($ch);
    } else {
        // ปิดการเชื่อมต่อ cURL
        curl_close($ch);
        
         // แปลงข้อมูล JSON เป็นอาร์เรย์ของ PHP
         $result = json_decode($response, true);
        
          // บันทึกผลลัพธ์ใน session
        $_SESSION['result'] = $result['result'];
        
        // ส่งผู้ใช้ไปยัง "index.php"
        header("Location: index.php");
        exit; // หยุดการทำงานของสคริปต์หลังจากส่ง header
    }
}
?>