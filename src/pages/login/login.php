<?php
function renderLoginPage()
{
    ?>
    <header>
        <h1>Login</h1>
    </header>
    <div class="login-container">
        <section class="main-content">
            <h2>Enter Your Credentials</h2>
            <form action="../../../db/User/checkCredentials.php" method="post" class="login-form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <div class="password-container">
                        <input type="password" id="password" name="password" required>
                        <input type="checkbox" id="showPassword" onchange="togglePasswordVisibility()">Show Password
                    </div>
                </div>
                <div class="message" > Don't have an account ? <a href="?page=signup">Sign Up Here</a></div>
                <div class="form-group">
                    <button type="submit">Login</button>
                </div>
            </form>
        </section>
    </div>
    <?php
}
?>
