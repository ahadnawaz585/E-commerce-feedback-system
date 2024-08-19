<?php
require_once '../../includes/database_connection.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['userId'], $_POST['productId'])) {
        $userId = filter_input(INPUT_POST, 'userId', FILTER_VALIDATE_INT);
        $productId = filter_input(INPUT_POST, 'productId', FILTER_VALIDATE_INT);

        if ($userId === false || $productId === false) {
            echo json_encode(["error" => "Invalid input data"]);
            exit;
        }

        try {
            $stmt = $conn->prepare("SELECT * FROM productfeedback WHERE userId = :userId AND productId = :productId");
            $stmt->bindParam(':userId', $userId);
            $stmt->bindParam(':productId', $productId);
            $stmt->execute();
            $result = $stmt->fetch();

            if ($result) {
                echo json_encode(["responseSubmitted" => true]);
            } else {
                echo json_encode(["responseSubmitted" => false]);
            }
        } catch (PDOException $e) {
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Missing required parameters"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
