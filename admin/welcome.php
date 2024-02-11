<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION["username"])) {
    header("Location: login.html");
    exit();
}

// Logout logic
if (isset($_POST["logout"])) {
    // Unset all session variables
    $_SESSION = array();

    // Destroy the session
    session_destroy();

    // Redirect to the login page
    header("Location: login_auth.php");
    exit();
}


include("../Includes/header.php");
include("../Includes/navigation.php");

?>

<body>

    <div class="text-center">

        <h3>Welcome, <?php echo $_SESSION["username"]; ?>!</h3>
    </div>

    <!-- Logout form -->
    <form method="post">
        <button type="submit" name="logout">Logout</button>
    </form>
</body>

</html>


<?php
include("../Includes/footer.php")
?>