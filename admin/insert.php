<?php
// Assuming you have a database connection
include('../connection/connect.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lottery_number = $_POST['lottery_number'];
    $reward_number = $_POST['reward_number'];

    // Insert data into the 'lottery' table
    $sql = "INSERT INTO lottery (lottery_number, reward_number) VALUES ('$lottery_number', '$reward_number')";

    if (mysqli_query($conn, $sql)) {
        echo "Record inserted successfully";
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
    $rewardNumbers = array("รางวัลที่ 1", "รางวัลที่ 2", "รางวัลที่ 3", "รางวัลที่ 4", "รางวัลที่ 5");
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
    <div class="container mt-2 ">
        <table class="table">
            <thead>
                <tr>
                    <th>🔢 หมายเลข </th>
                    <th>🏆รางวัล</th>
                    <th>📝แก้ใข</th>
                    <th>❗ลบ</th>
                </tr>
            </thead>
            <tbody>
                <?php
                while ($row = mysqli_fetch_assoc($result)) {
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

    <!-- footer -->
    <?php
    include("../Includes/admin_footer.php");
    ?>
</body>

</html>