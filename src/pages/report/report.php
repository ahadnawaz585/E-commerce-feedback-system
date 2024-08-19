<?php
function renderReport()
{
    ?>
    <h1>FeedBack Reports</h1>
    <div class="tab-buttons">
        <button onclick="openTab('productTab')">Product</button>
        <button onclick="openTab('platformTab')">Platform</button>
    </div>

    <div class="tabs">
        <div id="productTab" class="tab">
            <h2>Product Feedback Report</h2>
        </div>

        <div id="platformTab" class="tab">
            <h2>Platform Feedback Report</h2>
        </div>
    </div>
    <?php
}
?>