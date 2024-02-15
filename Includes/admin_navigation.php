<header>
    <!-- place navbar here -->
    <!-- admin_nav.php -->
    <div class="container ">
        <nav class="navbar navbar-expand-lg navbar-expand bg-body">
            <a class="navbar-brand" href="#">Admin Panel</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="welcome.php">หน้าแรก</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="insert.php">เพิ่มข้อมูล</a>
                    </li>
                    <!-- Add more navigation links as needed -->
                </ul>

                <!-- Logout form -->
                <form action="welcome.php" method="post" class="ms-auto">
                    <button type="submit" name="logout" class="btn btn-danger">Logout</button>
                </form>
            </div>
        </nav>
    </div>
</header>