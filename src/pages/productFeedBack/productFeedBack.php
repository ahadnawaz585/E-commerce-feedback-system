<?php
function renderProductFeedback()
{
    ?>
    <div class="product-feedback-section">
        <h1 class="feedback-section-title">Product Feedback</h1>
        <p class="feedback-section-description">Welcome to our product feedback section! We value your opinion and strive to
            continuously improve our products based on your feedback.</p>


        <div class="feedback-guidelines" >
           
        </div>

        <button id="helpButton" class="help-button">Help</button>

        <div class="productContainer" id="productContainer">
            <!-- Products will be rendered here dynamically -->
        </div>

        <!-- Modal -->
        <div class="modal" id="productModal">
            <div class="modal-content">
                <span class="close" id="closeModal">&times;</span>
                <div id="modalContent"></div>
            </div>
        </div>
    </div>
    <?php
}
?>