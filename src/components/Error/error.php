<?php
function renderError()
{
    ?>
    <header>
        <h1>Error</h1>
    </header>
    <div class="error-container">
        <section class="main-content">
            <h2>Database Error</h2>
            <p>We apologize, but an error occurred while processing your request. Please try again later or contact support for assistance.</p>
            <p><a href="http://feedbacksystem.com/?page=contact" class="button">Contact Support</a></p>
            <p><a onclick="window.location.reload()" class="button">Try Again</a></p>
            <p><a onclick="goBack()" class="button">Go Back</a></p>
        </section>
    </div>
    <?php
}
?>

