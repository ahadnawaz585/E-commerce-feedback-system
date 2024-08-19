<header>
    <h1>Sign Up Successful</h1>
</header>
<div class="success-container">
    <section class="main-content">
        <h2>Welcome to Our Community!</h2>
        <p>Your account has been created successfully. You can now enjoy all the features and benefits available to our members.</p>
        
        <?php if(!isset($_COOKIE['token'])): ?>
            <p><a href="http://feedbacksystem.com/?page=login" class="button">Log In</a></p>
        <?php endif; ?>
        
        <p><a href="http://feedbacksystem.com/?page=feedback" class="button">Give Feedback</a></p>
    </section>
</div>
