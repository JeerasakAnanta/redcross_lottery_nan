<?php

// header admin
include("../Includes/admin_header.php");

// Include the admin navigation bar
include("../Includes/admin_navigation.php");

// Assuming you have a database connection
// include('../connection/connect.php');

// api 
include("./api.php");

?>

<body>
   

    <div class="text-center">
        <a href="./insert.php" class="btn btn-success  mt-3"> เพิ่มหมายเลข</a>
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

    <script>
        function confirmDelete() {
            
            return confirm(" ‼️ คุณต้องการลบ จริงๆใช้ไหมครับ ‼️");
        }
    </script>
    <?php
    include("../Includes/admin_footer.php");
    ?>

    <script>
        $(document).ready(function() {
            $('.table').DataTable();
        });
    </script>
</body>

</html>

<?php
mysqli_close($conn);
?>