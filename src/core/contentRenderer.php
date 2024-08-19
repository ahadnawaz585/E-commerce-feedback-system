<?php

class ContentRenderer
{
    public static function renderContent($currentPage)
    {
        switch ($currentPage) {
            case 'about':
                include __DIR__ . '/../pages/about/about.php';
                renderAbout();
                break;
            case 'admin':
                include __DIR__ . '/../pages/admin/admin.php';
                renderAdmin();
                break;
            case 'login':
                include __DIR__ . '/../pages/login/login.php';
                renderLoginPage();
                break;
            case 'error':
                include __DIR__ . '/../components/error/error.php';
                renderError();
                break;
            case 'contact':
                include __DIR__ . '/../pages/contact/contact.php';
                renderContact();
                break;
            case 'feedback':
                include __DIR__ . '/../pages/feedBack/feedBack.php';
                renderFeedback();
                break;
            case 'signup':
                include __DIR__ . '/../pages/signUp/signUp.php';
                renderSignUpPage();
                break;
            case 'success':
                include __DIR__ . '/../components/success/success.php';
                break;
            case 'product':
                include __DIR__ . '/../pages/product/product.php';
                renderProducts();
                break;
            case 'delivery':
                include __DIR__ . '/../pages/delivery/delivery.php';
                renderHomeDelivery();
                break;
            case 'questionForm':
                include __DIR__ . '/../pages/questionForm/questionForm.php';
                renderQuestionForm();
                break;
            case 'report':
                include __DIR__ . '/../pages/report/report.php';
                renderReport();
                break;

            case 'platformFeedBack':
                include __DIR__ . '/../pages/platformFeedBack/platformFeedBack.php';
                renderPlatFormFeedBack();
                break;
            case 'productFeedBack':
                include __DIR__ . '/../pages/productFeedBack/productFeedBack.php';
                renderProductFeedBack();
                break;
            case 'productForm':
                include __DIR__ . '/../pages/productForm/productForm.php';
                renderProductForm();
                break;
            default:
                include __DIR__ . '/../pages/Home/HomePageRenderer.php';
                break;
        }
    }
}

?>