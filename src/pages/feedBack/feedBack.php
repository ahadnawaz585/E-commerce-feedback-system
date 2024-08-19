<?php
function renderFeedback()
{
    ?>
    <div class="feedbackContainer">
    <h1>Choose Feedback Type</h1>
        <div class="feedback-options">
            <a href="?page=productFeedBack" class="feedback-option">
                <div class="icon">
                    <!-- <img src="https://static.vecteezy.com/system/resources/previews/018/742/214/non_2x/3d-minimal-product-delivery-parcels-transportation-goods-distribution-cargos-preparation-for-sending-cardbox-with-a-wing-3d-rendering-illustration-free-png.png" alt="Products Icon"> -->
                    <img src="/public/images/product.webp" alt="Products Icon">
                </div>
                <div class="info">
                    <h2>About Products</h2>
                    <p>Share your feedback about our products here.</p>
                </div>
            </a>
            <a href="?page=platformFeedBack" class="feedback-option">
                <div class="icon">
                    <!-- <img src="https://static.vecteezy.com/system/resources/previews/010/873/246/original/3d-business-man-presenting-business-growth-illustration-png.png" alt="Platform Icon"> -->
                    <img src="/public/images/business.webp" alt="Platform Icon">
                </div>
                <div class="info">
                    <h2>About Our Platform</h2>
                    <p>Provide feedback on our platform and services.</p>
                </div>
            </a>
        </div>
    </div>
    <?php
}
?>