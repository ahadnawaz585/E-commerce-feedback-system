<?php
require_once '../../includes/database_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"));

    if (isset($data->questionText)) {
        $questionText = $data->questionText;

        try {
            $stmt = $conn->prepare("INSERT INTO questions (questionText) VALUES (:questionText)");
            $stmt->bindParam(':questionText', $questionText);
            $stmt->execute();
            http_response_code(201); // Created
        } catch (PDOException $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Invalid input']);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Invalid request method']);
}
?>
