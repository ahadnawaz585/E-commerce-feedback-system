<div class="homeContainer">
        <h1>Product Feedback System</h1>
        <div class="feedback-info">
            <p>Our feedback system allows you to share your thoughts and opinions with us. We appreciate your input and use it to enhance your experience with us.</p>
            <p>Here's what you can do:</p>
            <ul class="list">
                <li class="listItem">Provide feedback on our products or services.</li>
                <li class="listItem">Share suggestions for improvement.</li>
                <li class="listItem">Report any issues you encountered.</li>
                <li class="listItem">Ask questions or seek assistance.</li>
            </ul>
            <p>We value your feedback and use it to enhance your experience with us.</p>
        </div>
        <div class="btn-container">
            <?php
            if (isset($_COOKIE['token'])) {
                ?>
                <a href="?page=feedback" class="btn">Give Feedback</a>
                <?php
            } else {
                ?>
                <a href="?page=signup" class="btn">Give Feedback</a>
                <?php
            }
            ?>
        </div>

        <div class="section">
            <h2>Previous Feedback</h2>
            <div class="feedback-example">
                <h3>Product Feedback</h3>
                <p>"I recently purchased your latest product and I must say, I am thoroughly impressed with the quality and performance. However, I believe the user manual could be more detailed."</p>
                <p>- John D.</p>
            </div>
            <div class="feedback-example">
                <h3>Service Suggestion</h3>
                <p>"Your customer service team is very helpful, but the wait times are too long. It would be great if you could introduce a callback option during peak hours."</p>
                <p>- Sarah K.</p>
            </div>
            <div class="feedback-example">
                <h3>Issue Report</h3>
                <p>"I encountered a bug in the mobile app where it crashes when trying to upload a photo. Please look into this as it hinders my usage significantly."</p>
                <p>- Alex P.</p>
            </div>
            <div class="feedback-example">
                <h3>General Inquiry</h3>
                <p>"Could you provide more information on the warranty period for your products? I couldn't find detailed information on the website."</p>
                <p>- Emily R.</p>
            </div>
        </div>
    </div>