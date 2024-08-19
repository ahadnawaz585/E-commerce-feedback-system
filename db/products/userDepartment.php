<?php
require_once '../../includes/database_connection.php';


if (isset($_GET['userID'])) {
    $userID = $_GET['userID'];

    try {
        $stmt = $conn->prepare("SELECT * FROM Departments WHERE id NOT IN 
                                (SELECT DISTINCT departmentID FROM SurveyResponses WHERE customerID = :userID)");
        $stmt->bindParam(':userID', $userID);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        

        header('Content-Type: application/json');
        echo json_encode($result);
    } catch(PDOException $e) {

        error_log("Error in read.php: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(array("error" => "An error occurred while fetching department data"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("error" => "User ID is required"));
}
?>
