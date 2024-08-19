<?php
require_once '../../includes/database_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        try {
            $stmt = $conn->prepare("DELETE FROM questions WHERE id=:id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                http_response_code(200); 
                echo json_encode(['message' => 'Question deleted successfully']);
            } else {
                http_response_code(404); 
                echo json_encode(['error' => 'Question not found']);
            }
        } catch (PDOException $e) {
            http_response_code(500); 
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    } else {
        http_response_code(400); 
        echo json_encode(['error' => 'Invalid request']);
    }
} else {
    http_response_code(405); 
    echo json_encode(['error' => 'Invalid request method']);
}
?>
