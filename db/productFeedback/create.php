<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once '../../includes/database_connection.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['userId'], $_POST['productId'], $_POST['rating'], $_POST['feedbackText'])) {
        $userId = filter_input(INPUT_POST, 'userId', FILTER_VALIDATE_INT);
        $productId = filter_input(INPUT_POST, 'productId', FILTER_VALIDATE_INT);
        $rating = filter_input(INPUT_POST, 'rating', FILTER_VALIDATE_INT);
        $feedbackText = filter_input(INPUT_POST, 'feedbackText', FILTER_SANITIZE_STRING);

        if ($userId === false || $productId === false || $rating === false || empty($feedbackText)) {
            echo json_encode(["error" => "Invalid input data"]);
            exit;
        }

        try {
            $conn->beginTransaction();

            $stmt = $conn->prepare("INSERT INTO productfeedback (userId, productId, rating, feedbackText) VALUES (:userId, :productId, :rating, :feedbackText)");
            $stmt->bindParam(':userId', $userId);
            $stmt->bindParam(':productId', $productId);
            $stmt->bindParam(':rating', $rating);
            $stmt->bindParam(':feedbackText', $feedbackText);
            $stmt->execute();

            $conn->commit();

            echo json_encode(["success" => true]);
        } catch (PDOException $e) {
            $conn->rollBack();
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Missing required parameters"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
