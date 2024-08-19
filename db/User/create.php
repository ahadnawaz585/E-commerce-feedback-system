<?php
require_once '../../includes/database_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $role = "user"; 


    if (empty($username) || empty($email) || empty($password)) {
        header("Location: http://feedbacksystem.com/?page=error&msg=empty_fields");
        exit();
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    try {
        $stmt = $conn->prepare("INSERT INTO users (username, email, password, role) VALUES (:username, :email, :password, :role)");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':role', $role);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            header("Location: http://feedbacksystem.com/?page=success");
            exit();
        } else {
            header("Location: http://feedbacksystem.com/?page=error");
            exit();
        }
    } catch (PDOException $e) {
        header("Location: http://feedbacksystem.com/?page=error");
        error_log("Database Error: " . $e->getMessage());
    }
}
?>
