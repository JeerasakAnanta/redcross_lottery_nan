<?php

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
        <nav class="nav">
            <?php
            include("./Includes/navigation.php")
            ?>
        </nav>

        

        <div class="header">
            <span><i class='bx bx-plus-medical'></i></span>
            <div class="text">
                <h3>สลากกาชาดประจำปี 2567</h3>
                <hr>
                <p>สภากาชาดไทย THAI RED CROSS SOCIETY</p>
            </div>
        </div>

        <div class="row text-center">
            <form action="#">
                <div class="mb-3 mt-3">
                <h6 class="text text-center mb-2">กรอกเลขสลากจำนวน 6 หลัก</h6>
                <input type="text" class="form-control" id="number" placeholder="กรอกเลขสลาก 6 หลัก" name="number">
                </div>
                <button type="button" class="btn btn-info btn-sm mt-0 mb-4">ตรวจผลรางวัล</button>
            </form>
        </div>

        <div class="button-group">
            <button id="btnStream" type="button" class="button"><span><i class='bx bxs-camera' style='color:rgb(7, 18, 63)'></i> สแกนสลาก</span></button>
            <label id="picture" for="file" class="label custom-file-upload"><span><i class='bx bx-upload'></i>เลือกรูปภาพ</span></label>
            <input id="file" name="file" type="file" accept="image/*">
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