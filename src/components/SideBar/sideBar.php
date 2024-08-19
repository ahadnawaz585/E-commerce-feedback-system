<?php
function renderSideBar()
{
    $isLoggedIn = isset($_COOKIE['token']);
    $isAdmin = isset($_COOKIE['admin_token']);
    ?>
    <button class="toggle-btn" onclick="toggleSidebar()">☰</button>

    <div class="sidebar" id="sidebar">
        <ul>
            <li>
                <a href="?page=home">Home</a>
            </li>
            <li>
                <a href="?page=about">About</a>
            </li>
            <li class="has-submenu">
                <a href="#">Services</a>
                <div class="arrow"></div>
                <ul class="submenu">
                    <li><a href="?page=product">Products</a></li>
                    <li><a href="?page=delivery">Delivery</a></li>
                </ul>
            </li>
            <li>
                <a href="?page=contact">Contact</a>
            </li>

            <?php if ($isLoggedIn): ?>
                <li class="has-submenu">
                    <a href="#">Feedback</a>
                    <div class="arrow"></div>
                    <ul class="submenu">
                        <li><a href="?page=feedback">Feedback</a></li>
                        <li><a href="?page=productFeedBack">Product Feedback</a></li>
                        <li><a href="?page=platformFeedBack">Platform Feedback</a></li>
                        <?php if ($isAdmin): ?>
                            <li><a href="?page=report">Feedback Report</a></li>
                        <?php endif; ?>
                    </ul>
                </li>
                <li class="has-submenu">
                    <a href="#">Account</a>
                    <div class="arrow"></div>
                    <ul class="submenu">
                        <li><a href="#" onclick="logout()">Logout</a></li>
                    </ul>
                </li>
                <?php if ($isAdmin): ?>
                    <li>
                        <a href="?page=admin">AdminLTE</a>
                    </li>
                <?php endif; ?>
            <?php else: ?>
                <li class="has-submenu">
                    <a href="#">Account</a>
                    <div class="arrow"></div>
                    <ul class="submenu">
                        <li><a href="?page=login">Login</a></li>
                    </ul>
                </li>
            <?php endif; ?>
        </ul>
    </div>
    <?php
}
?>