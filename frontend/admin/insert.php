<?php

// Include the API file
include('api.php');

// Include header and navigation
include("../Includes/header.php");
include("../Includes/admin_navigation.php");


// Check if the form is submitted using POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lottery_number = $_POST['lottery_number'];
    $reward_number = $_POST['reward_number'];

    // Allow cross-origin resource sharing
    header("Access-Control-Allow-Origin: *");

    // Prepare the request body
    $postData = [
        'lottery_number' => $lottery_number,
        'reward_number' => $reward_number,
        // Add more key-value pairs as needed
    ];

    // Initialize cURL session
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

    // Execute cURL session and get the response
    $response = curl_exec($curl);
    $err = curl_error($curl);

    // Close cURL session
    curl_close($curl);

    // Check for cURL errors
    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        // Decode the JSON response
        $data_insert = json_decode($response, true);

        header('Location: insert.php');
        exit();

        // Process the $data_insert as needed
        // var_dump($data_insert);
    }
}

// Array of reward numbers
$rewardNumbers = array(1, 2, 3, 4, 5, 6, 7);

?>

<body>
    <div class="container mt-4">
        <div class="text-center">
            <h2> 📩<Adr></Adr>เพิ่มหมายเลข</h2>
        </div>

        <div class="container m-3">

            <form action="insert.php" method="post">

                <!--  เลือกรางวัน -->
                <div class="form-group ">
                    <label for="reward_number">เลือกรางวัล:</label>
                    <select class="form-control" name="reward_number" required>
                        <?php foreach ($rewardNumbers as $number) : ?>
                            <option value="<?php echo $number; ?>">
                                <?php echo ($number == 7) ? "เลขท้าย 3" : "รางวันที่ " . $number; ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <!-- เลือกหมายเลข -->
                <div class="form-group mt-3 ">
                    <label for="lottery_number">หมายเลข (*6 digits):</label>
                    <input type="text" class="form-control" name="lottery_number" pattern="\d{6}" title="Please enter 6 digits" required>
                </div>

                <div class="text-center mt-5">
                    <!-- <button type="submit" class="btn btn-primary"> <span> <i class="bi bi-plus"></i> เพิ่มหมายเลข </span> </button> -->
                    <button type="submit" class="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        เพิ่มหมายเลข
                    </button>

                </div>
            </form>
        </div>

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
                    <th>❌ลบ</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // Loop through the data and display in the table
                foreach ($data as $row) {
                    echo "<tr>";
                    echo "<td>{$row['lottery_number']}</td>";
                    echo "<td>{$row['reward_number']}</td>";
                    echo "<td><a href='delete.php?id={$row['id']}' class='btn btn-danger' onclick='return confirmDelete()'>ลบ</a></td>";
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

    <!-- Include admin footer -->
    <?php
    include("../Includes/admin_footer.php");
    ?>
</body>