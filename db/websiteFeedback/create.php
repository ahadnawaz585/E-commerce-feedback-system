<?php
require_once '../../includes/database_connection.php';

header('Content-Type: application/json'); 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = $_POST['userId'];
    $questionIds = $_POST['questionId']; 
    $answers = $_POST['answer']; 

    try {
        $conn->beginTransaction();  

        foreach ($questionIds as $index => $questionId) {
            $answer = $answers[$index];

            $stmt = $conn->prepare("INSERT INTO websitefeedback (userId, questionId, answer) VALUES (:userId, :questionId, :answer)");
            $stmt->bindParam(':userId', $userId);
            $stmt->bindParam(':questionId', $questionId);
            $stmt->bindParam(':answer', $answer);
            $stmt->execute();
        }

        $conn->commit();  

        echo json_encode(["success" => true]);

    } catch (PDOException $e) {
        $conn->rollBack();  

        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
