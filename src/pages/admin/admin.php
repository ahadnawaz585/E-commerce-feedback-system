<?php
function renderAdmin()
{
    ?>
    <div class="admin-panel">
        <header>
            <h1>Feedback System Admin Panel</h1>
        </header>
        <section class="widgets-container">
            <div class="widget">
                <a href="?page=questionForm">
                    <div class="widget-content">
                        <h2>Questions</h2>
                        <p>View and manage existing questions.</p>
                    </div>
                </a>
            </div>
            <div class="widget">
                <a href="?page=productForm">
                    <div class="widget-content">
                        <h2>Products</h2>
                        <p>Manage products available in the system.</p>
                    </div>
                </a>
            </div>
            <div class="widget">
                <a href="?page=report">
                    <div class="widget-content">
                        <h2>Reports</h2>
                        <p>Generate and view comprehensive reports based on feedback data.</p>
                    </div>
                </a>
            </div>
            <div class="widget">
                <a href="https://feedbacksystem.com/?page=feedback" target="_blank">
                    <div class="widget-content">
                        <h2>Feedback System</h2>
                        <p>Go to the live Feedback System page to view feedback forms.</p>
                    </div>
                </a>
            </div>
        </section>
    </div>
    <?php
}
?>
