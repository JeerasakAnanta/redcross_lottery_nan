<?php
// Assuming you have a database connection
include('../connection/connect.php');

// api 
include('./api.php');


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lottery_number = $_POST['lottery_number'];
    $reward_number = $_POST['reward_number'];

    header("Access-Control-Allow-Origin: *");

    // Sample data for the request body
    $postData = [
        'lottery_number' => $lottery_number,
        'reward_number' => $reward_number,
        // Add more key-value pairs as needed
    ];

    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "http://203.158.173.23:3000/api/lotterie",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => json_encode($postData), // Encode the data as JSON
        CURLOPT_HTTPHEADER => [
            "Content-Type: application/json", // Specify the content type as JSON
            // Add other headers as needed
        ],
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        $data = json_decode($response, true); // Decode the JSON response
        // Process the $data as needed
        var_dump($data);
    }


    // Insert data into the 'lottery' table
    $sql = "INSERT INTO lottery (lottery_number, reward_number) VALUES ('$lottery_number', '$reward_number')";

    if (mysqli_query($conn, $sql)) {
        echo '<div class="alert alert-success text-center" role="alert"> ';
        echo 'เพิ่มหมายเลข สำเร็จ สําเร็จ ';
        echo '</div> ';
    } else {
        echo "Error inserting record: " . mysqli_error($conn);
    }
}

// Fetch data from the 'lottery' table
$sql = "SELECT * FROM lottery";
$result = mysqli_query($conn, $sql);

// Fetch available reward numbers from the database
$rewardNumbersQuery = "SELECT DISTINCT reward_number FROM lottery";
$rewardNumbersResult = mysqli_query($conn, $rewardNumbersQuery);

if ($rewardNumbersResult) {
    $rewardNumbers = array();
    while ($rewardRow = mysqli_fetch_assoc($rewardNumbersResult)) {
        $rewardNumbers[] = $rewardRow['reward_number'];
    }
} else {
    // Default reward numbers if there's an issue fetching from the database
    $rewardNumbers = array(1, 2, 3, 4, 5, 7);
}

mysqli_close($conn);

include("../Includes/header.php");

// Include the admin navigation bar
include("../Includes/admin_navigation.php");

?>

<body>

    <div class="container mt-4">
        <div class="text-center">
            <h2> 📩<Adr></Adr>เพิ่มหมายเลข</h2>
        </div>
        <form action="insert.php" method="post">
            <div class="form-group">
                <label for="lottery_number">หมายเลข (*6 digits):</label>
                <input type="text" class="form-control" name="lottery_number" pattern="\d{6}" title="Please enter 6 digits" required>
            </div>

            <div class="form-group">
                <label for="reward_number">เลือกรางวัล:</label>
                <select class="form-control" name="reward_number" required>
                    <?php foreach ($rewardNumbers as $number) : ?>
                        <option value="<?php echo $number; ?>"><?php echo $number; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="text-center m-3">

                <button type="submit" class="btn btn-primary">เพิ่มหมายเลข</button>
            </div>
        </form>
    </div>

    <!-- Display data in a table -->
    <div class="container mt-auto">
        <div class="text-center">
            <h4>ข้อมูล</h4>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>🔢 หมายเลข </th>
                    <th>🏆รางวัล</th>
                    <th>📝แก้ใข</th>
                    <th>❗ลบ</th>
                </tr>
            </thead>
            <tbody>`
                <?php
                foreach ($data as $row) {
                    echo "<tr>";
                    echo "<td>{$row['lottery_number']}</td>";
                    echo "<td>{$row['reward_number']}</td>";
                    echo "<td> <a href='edit.php?id={$row['id']}' class='btn btn-warning'>แก้ไข</a></td>";
                    echo "<td> <a href='delete.php?id={$row['id']}' class='btn btn-danger' onclick='return confirmDelete()'>ลบ</a></td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table>
    </div>

    <!-- Bootstrap JS and dependencies (jQuery) -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>

    <!-- Add these links to the head section of your HTML document -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css">
    <script type="text/javascript" charset="utf8" src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js"></script>

    <!-- footer -->
    <?php
    include("../Includes/admin_footer.php");
    ?>
</body>

</html>