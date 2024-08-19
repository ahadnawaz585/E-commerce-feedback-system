document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById('productContainer');
    const productModal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModal');
    const helpButton = document.getElementById('helpButton');
    const feedbackForm = createFeedbackForm();

    fetch('../../db/products/read.php')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const userId = getUserIdFromToken();
                if (userId) {
                    checkResponseAndCreateCard(userId, product);
                } else {
                    const card = createProductCard(product, false);
                    productContainer.appendChild(card);
                }
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    function checkResponseAndCreateCard(userId, product) {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('productId', product.id);

        fetch('../../db/productFeedback/checkResponse.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                const responseSubmitted = data.responseSubmitted;
                const card = createProductCard(product, responseSubmitted);
                productContainer.appendChild(card);
            })
            .catch(error => console.error('Error checking response status:', error));
    }

    function createProductCard(product, responseSubmitted) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = product.id;

        const image = document.createElement('img');
        image.src = `data:image/jpeg;base64,${product.image}`;
        image.alt = product.name;

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const title = document.createElement('h2');
        title.textContent = product.name;

        const price = document.createElement('p');
        price.textContent = `Price: $${product.price}`;

        const stockQuantity = document.createElement('p');
        stockQuantity.textContent = `Stock Quantity: ${product.stockQuantity}`;

        const feedbackButton = document.createElement('button');
        feedbackButton.textContent = 'Give Feedback';
        feedbackButton.classList.add('feedback-button');
        feedbackButton.addEventListener('click', () => {
            const userId = getUserIdFromToken();
            if (!userId) {
                console.error('User token not found. Please log in.');
                return;
            }

            const productId = card.dataset.id;
            fetchResponseStatus(userId, productId, card);
        });

        cardContent.appendChild(title);
        cardContent.appendChild(price);
        cardContent.appendChild(stockQuantity);

        if (responseSubmitted) {
            const responseFlag = document.createElement('span');
            responseFlag.classList.add('response-flag');
            responseFlag.textContent = 'Feedback Submitted';
            cardContent.appendChild(responseFlag);
        } else {
            cardContent.appendChild(feedbackButton);
        }

        card.appendChild(image);
        card.appendChild(cardContent);

        return card;
    }

    closeModal.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === productModal) {
            productModal.style.display = 'none';
        }
    });

    function fetchResponseStatus(userId, productId, card) {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('productId', productId);

        fetch('../../db/productFeedback/checkResponse.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.responseSubmitted) {
                    modalContent.innerHTML = 'Your response is already submitted. Thank you for your feedback.';
                    productModal.style.display = 'block';
                } else {
                    modalContent.innerHTML = '';
                    const productClone = card.cloneNode(true);
                    productClone.querySelector('.feedback-button').remove();
                    modalContent.appendChild(productClone);
                    modalContent.appendChild(feedbackForm);
                    productModal.style.display = 'block';
                }
            })
            .catch(error => console.error('Error checking response status:', error));
    }

    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const ratingInput = document.querySelector('input[name="rating"]:checked');
        const rating = ratingInput ? ratingInput.value : null;
        const feedbackText = document.getElementById('feedbackText').value;
        const userId = getUserIdFromToken();
        const productId = getProductIdFromModal();

        if (!userId || !productId || !rating || !feedbackText) {
            console.error('Error: Required data missing.');
            return;
        }

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('productId', productId);
        formData.append('rating', rating);
        formData.append('feedbackText', feedbackText);

        fetch('../../db/productFeedback/create.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Feedback submitted successfully.');
                    productModal.style.display = 'none';
                    window.location.reload();
                } else {
                    console.error('Error:', data.error);
                }
            })
            .catch(error => console.error('Error submitting feedback:', error));
        window.location.reload();
    });

    function createFeedbackForm() {
        const form = document.createElement('form');
        form.id = 'feedbackForm';

        const ratingDiv = document.createElement('div');
        ratingDiv.classList.add('rating');

        const ratings = ['5', '4', '3', '2', '1'];
        ratings.forEach((ratingValue) => {
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = `star${ratingValue}`;
            input.name = 'rating';
            input.value = ratingValue;

            const label = document.createElement('label');
            label.htmlFor = `star${ratingValue}`;
            label.title = `${ratingValue} stars`;

            ratingDiv.appendChild(input);
            ratingDiv.appendChild(label);

            input.addEventListener('change', toggleSubmitButton);
        });

        const feedbackTextDiv = document.createElement('div');
        feedbackTextDiv.classList.add('feedback-text');

        const feedbackTextArea = document.createElement('textarea');
        feedbackTextArea.id = 'feedbackText';
        feedbackTextArea.name = 'feedbackText';
        feedbackTextArea.rows = '4';
        feedbackTextArea.cols = '50';
        feedbackTextArea.placeholder = 'Enter your feedback...';
        feedbackTextArea.addEventListener('input', toggleSubmitButton);

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit Feedback';
        submitButton.disabled = true;

        feedbackTextDiv.appendChild(feedbackTextArea);

        form.appendChild(ratingDiv);
        form.appendChild(feedbackTextDiv);
        form.appendChild(submitButton);

        return form;
    }

    function toggleSubmitButton() {
        const ratingInput = document.querySelector('input[name="rating"]:checked');
        const feedbackText = document.getElementById('feedbackText').value.trim();
        const submitButton = document.querySelector('#feedbackForm button[type="submit"]');
        submitButton.disabled = !(ratingInput && feedbackText);
    }

    function getUserIdFromToken() {
        const token = getCookie('token');
        if (!token) {
            console.error('User token not found. Please log in.');
            return null;
        }
        const decodedToken = decodeURIComponent(token);
        const decodedTokenFinal = atob(decodedToken);
        const tokenParts = decodedTokenFinal.split(':');
        return tokenParts[0];
    }

    function getProductIdFromModal() {
        const productClone = document.getElementById('modalContent').querySelector('.card');
        if (productClone) {
            return productClone.dataset.id;
        } else {
            console.error('Product ID not found in modal content.');
            return null;
        }
    }

    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }

    helpButton.addEventListener('click', function () {
        const guidelinesContent = document.querySelector('.feedback-guidelines');
        if (guidelinesContent) {
            modalContent.innerHTML =
                '<h2>Feedback Guidelines</h2>' +
                '<p>Here are some guidelines for providing feedback:</p>' +
                '<ul>' +
                '<li>Be specific and constructive.</li>' +
                '<li>Focus on both positive and negative aspects.</li>' +
                '<li>Provide suggestions for improvement.</li>' +
                '</ul>' +
                '<h2>Feedback Steps</h2>' +
                '<p>Here are some steps for providing feedback:</p>' +
                '<ul>' +
                '<li>Select product for feedback.</li>' +
                '<li>Give star rating and text feedback.</li>' +
                '<li>Submit it by finalizing your feedback.</li>' +
                '</ul>';

            modalContent.appendChild(guidelinesContent);
            productModal.style.display = 'block';
        } else {
            console.error('Guidelines content not found.');
        }
    });
});
