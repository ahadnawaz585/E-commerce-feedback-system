<?php

require_once 'src/core/pageHeader.php';
require_once 'src/components/SideBar/sideBar.php';
require_once 'src/core/contentRenderer.php';
require_once 'src/core/resourceLoader.php';

class MainRenderer
{
    private $pageHeader;
    private $currentPage;

    public function __construct()
    {
        $this->pageHeader = new PageHeader("Feedback System - Home", "feedback system, customer feedback, report, products", "Welcome to the Feedback System. Collect feedback, manage products, and analyze feedback responses effortlessly.");
        $this->currentPage = isset($_GET['page']) ? $_GET['page'] : 'home';
        ResourceLoader::lazyLoadResources($this->currentPage, $this->pageHeader);
    }

    public function renderMain()
    {
        ob_start();
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <?php echo $this->pageHeader->renderHeader(); ?>

        <body>

            <?php if ($this->shouldShowNavbar()) : ?>
                <?php renderSideBar(); ?>
            <?php endif; ?>
            <div id="mainContentRender">
            <?php ContentRenderer::renderContent($this->currentPage); ?>
            </div>
            <?php if ($this->shouldShowFooter()) : ?>
                <?php $this->renderFooter(); ?>
            <?php endif; ?>
        </body>

        </html>
        <?php
        return ob_get_clean();
    }

    private function shouldShowNavbar()
    {
        $excludedRoutes = [ 'admin',  'productForm',  'questionForm', 'report'];
        $excludedRoutes2 = [ 'admin','productFeedBack','platformFeedBack',  'productForm',  'questionForm', 'report'];
    
        if (!isset($_COOKIE['admin_token']) && in_array($this->currentPage, $excludedRoutes)) {
            header("Location: http://feedbacksystem.com/?page=home");
            exit();
        }

        if (!isset($_COOKIE['token']) && in_array($this->currentPage, $excludedRoutes2)) {
            header("Location: http://feedbacksystem.com/?page=home");
            exit();
        }
    
        if ($this->currentPage === 'feedback' && !isset($_COOKIE['token'])) {
            header("Location: http://feedbacksystem.com/?page=login");
            exit();
        }
    
        if ($this->currentPage === 'login' && isset($_COOKIE['token'])) {
            header("Location: http://feedbacksystem.com/?page=feedback");
            exit();
        }
    
        return true;
    }
    

    private function shouldShowFooter()
    {
        $excludedRoutes = ['success'];
        return !in_array($this->currentPage, $excludedRoutes);
    }

    private function renderFooter()
    {
        include __DIR__ . '/components/Footer/footer.php';
    }
}

?>
