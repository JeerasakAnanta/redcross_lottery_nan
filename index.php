<?php
session_start(); // เริ่ม Session
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover">
    <title> ตรวจผลรางวัล ด้วยการถ่ายภาพ OCR </title>
    <link rel="icon" type="image/x-icon" href="Assets/image/RedCross.png">

    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

    <!-- Bootstrap CSS v5.2.1 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />

    <link rel="stylesheet" href="Assets/style.css">
</head>

<body>

    <div id="container">
        


        <div class="header">
            <span><i class='bx bx-plus-medical'></i></span>
            <div class="text">
                <h3>สลากกาชาดประจำปี 2567</h3>
                <hr>
                <p>สภากาชาดไทย THAI RED CROSS SOCIETY</p>
            </div>
        </div>
<?php
// ตรวจสอบว่ามีค่า $result_array['result'] อยู่ใน Session หรือไม่
if (isset($_SESSION['result'])) {
    // แสดงผลลัพธ์ที่ได้จาก API ที่เก็บใน Session
    $data = $_SESSION['result'];

    // ตรวจสอบว่าสตริง $data มีคำว่า "คุณถูกรางวัล" หรือไม่
    if (strpos($data, "คุณถูกรางวัล") !== false) {
        // หากพบคำว่า "คุณถูกรางวัล" ในสตริง $data
        // ทำการแสดงผลลัพธ์นั้นในส่วนของ modal
        ?>
                            <div class="row text-center mb-4">
                                <h1>ยินดีด้วย</h1>
                                <h3><?php echo $data ?></h3>
                            </div>
                            <div class="container text-center">
                                <a href="index.php" class="btn btn-primary text-center">กลับไปหน้าตรวจสลาก</a>
                            </div>
                    <?php
    } else { ?>
                             <div class="row text-center mb-4">
                                 <h1>เสียใจด้วย</h1>
                                <h2><?php echo $data ?></h2>
                            </div>
                            <div class="container text-center">
                                <a href="index.php" class="btn btn-primary text-center">กลับไปหน้าตรวจสลาก</a>
                            </div>
       
               <?php }

    // หลังจากใช้ข้อมูลใน Session เสร็จสิ้น สามารถลบข้อมูลใน Session ได้
    unset($_SESSION['result']);
} else {
    // ถ้าไม่มีข้อมูลใน Session แสดงข้อความว่าไม่พบผลลัพธ์
    ?> 
    
                        <div class="row text-center">
                            <form action="check_reward.php" method="get">
                                <div class="mb-3 mt-3">
                                    <h6 class="text text-center mb-2">กรอกเลขสลากจำนวน 6 หลัก</h6>
                                    <input type="text" class="form-control" id="number" placeholder="กรอกเลขสลาก 6 หลัก" name="number" pattern="[0-9]{6}" title="กรุณากรอกเลขสลาก 6 หลักเท่านั้น">
                                </div>
                                <button type="submit" class="btn btn-info btn-sm mt-0 mb-4">ตรวจผลรางวัล</button>
                            </form>
                        </div>


        <form id="uploadForm" action="upload.php" method="post" enctype="multipart/form-data">

        <div class="button-group">
            <button id="btnStream" type="button" class="button"><span><i class='bx bxs-camera' style='color:rgb(7, 18, 63)'></i> สแกนสลาก</span></button>
            <label id="picture" for="file" class="label custom-file-upload"><span><i class='bx bx-upload'></i>เลือกรูปภาพ</span></label>
            <input id="file" name="image" type="file" accept="image/*">
        </div>

        <div style="text-align: center;">
            <h4>ตรวจผลรางวัลด้วยการถ่ายภาพ</h4>
        </div>
        <div id="camera">
            <video id="stream" width="100%" height="450"></video>
            <div>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <canvas id="canvas" width="600" height="450"></canvas>
        <div id="snapshot">
            <img src="https://placehold.jp/dddddd/ffffff/600x450.png?text=Preview%20Image" id="img1" width="100%">
        </div>
        <!-- ใส่ข้อมูลรูปภาพที่ถูกจับในแบบซ่อน -->
        <input type="hidden" id="imageData" name="imageData" value="">
        <!-- เมื่อกดปุ่ม Submit ฟอร์มจะถูกส่ง -->
        <div class="btn-btn">
            
        </div>
        <div class="text text-center mt-3">
            <button class="btn btn-primary btn-sm" type="submit">ตรวจผลรางวัลด้วยการถ่ายภาพ</button>
        </div>
        </form>
        
            
                <?php
}
?>

</div>
            <footer class="footer">
                <div class="container text-center">
                    <p>&copy; 2024 Computer Science RMUTL </p>
                </div>
            </footer>
    
        
            <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
            <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
            <script type="module" src="Assets/script/index.js"></script>
            
    
        </body>
    
        </html>
