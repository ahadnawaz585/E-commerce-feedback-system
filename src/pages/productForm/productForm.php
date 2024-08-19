<?php
function renderProductForm()
{
    ?>

    <div class="container">
        <h1>Create Product</h1>
        <form id="createProductForm">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" name="description" required></textarea>
            </div>
            <div class="form-group">
                <label for="price">Price:</label>
                <input type="number" id="price" name="price" step="0.01" min="0" required>
            </div>
            <div class="form-group">
                <label for="stockQuantity">Stock Quantity:</label>
                <input type="number" id="stockQuantity" name="stockQuantity" required>
            </div>
            <div class="form-group">
                <label for="photo">Choose Photo:</label>
                <input type="file" id="photo" name="photo" accept="image/*" required>
            </div>
            <button type="submit">Create Product</button>
        </form>
    </div>

    <div class="showContainer">
        <h1>Products</h1>
        <div class="product-container" id="productContainer"></div>
    </div>

    <?php
}