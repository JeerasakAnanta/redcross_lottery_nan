<?php
// Assuming you have a database connection
include('../connection/connect.php');

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['id'])) {
    $id = $_GET['id'];

    // Fetch data for the selected record
    $sql = "SELECT * FROM lottery WHERE id = $id";
    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
    } else {
        echo "Record not found";
    }
} else {
    echo "Invalid request";
}

// Fetch available reward numbers
$rewardNumbers = array(1, 2, 3, 4,  5); // You can fetch these from your database if needed

mysqli_close($conn);
include("../Includes/header.php");

// Include the admin navigation bar
include("../Includes/admin_navigation.php");

?>

<body>

    <div class="container mt-4">
        <?php if (isset($row)) : ?>
            <h2 class="mb-4 text-center"> แก้ไขข้อมูล หมายเลข</h2>
            <form action="update.php" method="post">
                <input type="hidden" name="id" value="<?php echo $row['id']; ?>">

                <div class="form-group">
                    <label for="lottery_number">หมายเลข (*เป็นตัวเลขเท่านั้น):</label>
                    <input type="text" class="form-control" name="lottery_number" pattern="\d{6}" title="Please enter 6 digits" value="<?php echo $row['lottery_number']; ?>" required>
                </div>

                <div class="form-group mt-4">
                    <label for="reward_number">เลือกรางวัล:</label>
                    <select class="form-control" name="reward_number" required>
                        <?php foreach ($rewardNumbers as $number) : ?>
                            <option value="<?php echo $number; ?>" <?php echo ($number == $row['reward_number']) ? 'selected' : ''; ?>><?php echo $number; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="py-3  text-center">
                    <button type="submit" class="btn btn-primary">Update Data</button>

                </div>
            </form>
        <?php endif; ?>
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

