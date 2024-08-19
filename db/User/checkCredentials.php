<?php
require_once '../../includes/database_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

   

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

  
    $sql = "SELECT id, password, role FROM users WHERE username = :username LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':username', $username);
    $stmt->execute();

   
    $user = $stmt->fetch(PDO::FETCH_ASSOC);


    if ($user && password_verify($password, $user['password'])) {
        $userId = $user['id'];
        $token = base64_encode($userId . ':' . $username . ':' . time());
        setcookie("token", $token, time() + (86400 * 30), "/");


        if ($user['role'] === 'admin') {
            $adminToken = base64_encode('admin:' . $username . ':' . time());
            setcookie("admin_token", $adminToken, time() + (86400 * 30), "/");
        }

        header("Location: http://feedbacksystem.com/?page=success");
        exit();
    } else {
        header("Location: http://feedbacksystem.com/?page=error&msg=invalid_credentials");
        exit();
    }
}
?>
