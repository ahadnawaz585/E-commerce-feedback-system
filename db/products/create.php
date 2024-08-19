<?php
header('Content-Type: application/json');

require '../../includes/database_connection.php';

if (
    isset($_POST['name'], $_POST['description'], $_POST['price'], $_POST['stockQuantity'], $_FILES['photo'])
) {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $stockQuantity = $_POST['stockQuantity'];

    $imageData = file_get_contents($_FILES['photo']['tmp_name']);
    $base64Image = base64_encode($imageData);

    $sql = "INSERT INTO products (name, image, description, price, stockQuantity) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $name);
    $stmt->bindParam(2, $base64Image);
    $stmt->bindParam(3, $description);
    $stmt->bindParam(4, $price);
    $stmt->bindParam(5, $stockQuantity);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->errorInfo()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
}

?>
