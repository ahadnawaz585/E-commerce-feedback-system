<?php
require_once '../../includes/database_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['userId'])) {
    $userId = $_GET['userId'];

    try {
        $stmt = $conn->prepare("SELECT COUNT(*) AS count FROM websitefeedback WHERE userId = :userId");
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();

        header('Content-Type: application/json');
        echo json_encode($stmt->fetch(PDO::FETCH_ASSOC)['count'] > 0 ? false : true);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid request"]);
}
?>
