<?php
include('includes/database_connection.php');
include('includes/seeder.php');
require_once __DIR__ . '/src/render.php';
$renderer = new MainRenderer();
$htmlContent = $renderer->renderMain();
echo $htmlContent;