<?php

class ResourceLoader
{
    public static function lazyLoadResources($currentPage, $pageHeader)
    {

        $pageHeader->addCssLink('/public/css/sideBar.css');
        $pageHeader->addCssLink('/public/css/home.css');
        $pageHeader->addCssLink('/public/css/footer.css');
        $pageHeader->addCssLink('/public/css/styles.css');
        $pageHeader->addScript('/public/js/sideBar.js');

        switch ($currentPage) {
            case 'feedback':
                $pageHeader->addCssLink('/public/css/feedBack.css');
                $pageHeader->addScript('/public/js/feedBack.js');
                break;
            case 'platformFeedBack':
                $pageHeader->addCssLink('/public/css/platform.css');
                $pageHeader->addScript('/public/js/platform.js');
            case 'signup':
                $pageHeader->addCssLink('/public/css/signup.css');
                $pageHeader->addScript('/public/js/signup.js');
                break;
            case 'login':
                $pageHeader->addCssLink('/public/css/login.css');
                $pageHeader->addScript('/public/js/login.js');
                break;
            case 'error':
                $pageHeader->addCssLink('/public/css/error.css');
                $pageHeader->addScript('/public/js/error.js');
                break;
            case 'productFeedBack':
                $pageHeader->addCssLink('/public/css/productFeedBack.css');
                $pageHeader->addScript('/public/js/productFeedBack.js');
                break;
            case 'success':
                $pageHeader->addCssLink('/public/css/success.css');
                break;
            case 'delivery':
                $pageHeader->addCssLink('/public/css/delivery.css');
                break;
            case 'product':
                $pageHeader->addCssLink('/public/css/product.css');
                break;
            case 'questionForm':
                $pageHeader->addCssLink('/public/css/questionForm.css');
                $pageHeader->addScript('/public/js/questionForm.js');
                break;
            case 'questions':
                $pageHeader->addCssLink('/public/css/questions.css');
                $pageHeader->addScript('/public/js/questions.js');
                break;
            case 'productForm':
                $pageHeader->addCssLink('/public/css/productForm.css');
                $pageHeader->addScript('/public/js/productForm.js');
                break;
            case 'admin':
                $pageHeader->addCssLink('/public/css/admin.css');
                break;
            case 'about':
                $pageHeader->addCssLink('/public/css/about.css');
                break;
            case 'contact':
                $pageHeader->addCssLink('/public/css/contact.css');
                break;
            case 'report':
                $pageHeader->addCssLink('/public/css/report.css');
                $pageHeader->addScript('/public/js/report.js');
                $pageHeader->addScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js');
                break;
            default:
                $pageHeader->addCssLink('/public/css/home.css');
                break;
        }
    }
}

?>