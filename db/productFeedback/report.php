<?php

require_once '../../includes/database_connection.php';

try {
    $query = "
    SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.description AS product_description,
    AVG(pf.rating) AS average_rating,
    COUNT(pf.id) AS total_feedback_count,
    COALESCE(
        JSON_ARRAYAGG(JSON_OBJECT('user_name', u.username , 'feedback_text', pf.feedbackText, 'created_at', pf.createdAt)),
        JSON_ARRAY()
    ) AS feedback_details
FROM 
    products p
LEFT JOIN 
    productfeedback pf ON p.id = pf.productId
LEFT JOIN 
    users u ON pf.userId = u.id
GROUP BY 
    p.id, p.name, p.description;

;
    ";

    $statement = $conn->query($query);

    $productFeedbackReport = $statement->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($productFeedbackReport);

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
