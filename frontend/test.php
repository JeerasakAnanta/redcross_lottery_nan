<?php
// ใช้ค่าจาก environment variables แทนการ hardcode (แนะนำสำหรับ production)
$host = "db";          // ชื่อ service ของ MySQL ใน Docker Compose
$username = "root";    // หรือใช้ user ที่สร้างใน MySQL
$password = "redcross123!!"; // ต้องตรงกับ MYSQL_ROOT_PASSWORD ใน docker-compose
$dbname = "db";        // ต้องตรงกับ MYSQL_DATABASE ใน docker-compose

// สร้างการเชื่อมต่อ
$conn = new mysqli($host, $username, $password, $dbname);

// ตรวจสอบ connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connected successfully";
}
?>