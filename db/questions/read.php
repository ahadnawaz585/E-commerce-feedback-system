<?php

require_once '../../includes/database_connection.php';

try {

    $stmt = $conn->query("SELECT * FROM questions");

    $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($questions);
} catch (PDOException $e) {
    // Handle errors
    echo "Error: " . $e->getMessage();
}
?>

