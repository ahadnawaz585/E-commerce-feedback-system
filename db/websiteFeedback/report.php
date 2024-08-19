<?php

require_once '../../includes/database_connection.php';


try {
    if (!isset($_GET['questionId'])) {
        throw new Exception("Question ID is required");
    }
    
    $questionId = (int) $_GET['questionId'];
    
    $query = "
        SELECT 
            w.id AS feedback_id,
            u.username AS username,
            q.questionText AS question,
            w.answer AS answer,
            w.createdAt AS created_at
        FROM 
            websitefeedback w
        LEFT JOIN 
            users u ON w.userId = u.id
        LEFT JOIN 
            questions q ON w.questionId = q.id
        WHERE
            q.id = :questionId;
    ";
    
    $statement = $conn->prepare($query);
    $statement->bindParam(':questionId', $questionId, PDO::PARAM_INT);
    $statement->execute();
    
    $feedbacks = $statement->fetchAll(PDO::FETCH_ASSOC);
    
    header('Content-Type: application/json');
    echo json_encode($feedbacks);
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
