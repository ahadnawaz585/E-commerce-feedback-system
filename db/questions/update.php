<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['update'])) {
    $id = $_POST['id'];
    $questionText = $_POST['questionText'];

    try {
        $stmt = $conn->prepare("UPDATE SurveyQuestions SET questionText=:questionText WHERE id=:id");
        $stmt->bindParam(':questionText', $questionText);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        echo "Question updated successfully";
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
