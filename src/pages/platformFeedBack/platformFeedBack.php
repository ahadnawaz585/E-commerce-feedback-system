<?php
function renderPlatFormFeedBack()
{
    ?>
        <div id="message-container"></div>
    <div id="form-container" class="platformContainer">
        <h1>Feedback Form</h1>
        <p>Answer all questions to the best of your ability before submitting your feedback.</p>
        <div id="questions-container"></div>
        <button id="submitBtn">Submit</button>
    </div>

    <?php
    // Add a message if feedback has already been submitted
    if (isset($_SESSION['feedback_submitted']) && $_SESSION['feedback_submitted']) {
        echo '<div>Your feedback has already been submitted.</div>';
    }
}
?>
