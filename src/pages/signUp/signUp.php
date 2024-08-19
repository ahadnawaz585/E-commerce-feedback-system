<?php
function renderSignUpPage()
{
    ?>
     <header>
        <h1>Sign Up</h1>
    </header>
    <div class="signup-container">
        <section class="main-content">
            <h2>Create Your Account</h2>
            <form action="../../../db/User/create.php" method="post" class="signup-form" onsubmit="return validateForm()">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required>
                    <p id="passwordError" style="color: red; display: none;">Passwords do not match!</p>
                </div>
                <div class="message" > Already have an account ? <a href="?page=login">Login Here</a></div>
                <div class="form-group">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </section>
    </div>
    <?php
}
?>
