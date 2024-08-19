document.addEventListener('DOMContentLoaded', function () {
    const createProductForm = document.getElementById('createProductForm');
    const productContainer = document.getElementById('productContainer');
    const submitButton = createProductForm.querySelector('button[type="submit"]');

    function checkFormValidity() {
        const inputs = createProductForm.querySelectorAll('input, textarea');
        let allFieldsFilled = true;
        inputs.forEach(input => {
            if (input.required && !input.value.trim()) {
                allFieldsFilled = false;
            }
        });
        submitButton.disabled = !allFieldsFilled;
    }

    createProductForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', checkFormValidity);
    });

    createProductForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const formData = new FormData(createProductForm);

        fetch('../../db/products/create.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Product created successfully.');
                createProductForm.reset();
                fetchProducts();
            } else {
                alert('Error creating product: ' + data.error);
            }
        })
        .catch(error => console.error('Error creating product:', error));
    });

    productContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-button')) {
            const productId = event.target.dataset.id;
            if (confirm('Are you sure you want to delete this product?')) {
                fetch(`../../db/products/delete.php?id=${productId}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Product deleted successfully.');
                        fetchProducts();
                    } else {
                        alert('Error deleting product: ' + data.error);
                    }
                })
                .catch(error => console.error('Error deleting product:', error));
            }
        }

        if (event.target.classList.contains('see-more-button')) {
            const description = event.target.dataset.description;
            showModal(description);
        }
    });

    function showModal(description) {
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.innerHTML = `
            <span class="close">&times;</span>
            <h3>Product Description</h3>
            <p>${description}</p>
        `;

        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
        modalContainer.appendChild(modalContent);

        document.body.appendChild(modalContainer);

        modalContent.querySelector('.close').addEventListener('click', function () {
            document.body.removeChild(modalContainer);
        });
    }

    function fetchProducts() {
        fetch('../../db/products/read.php')
            .then(response => response.json())
            .then(products => {
                productContainer.innerHTML = '';
                products.forEach(product => {
                    const productCard = createProductCard(product);
                    productContainer.appendChild(productCard);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        const truncatedDescription = product.description.length > 100 ?
            product.description.substring(0, 100) + '...' :
            product.description;

        card.innerHTML = `
            <img src="data:image/jpeg;base64,${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${truncatedDescription}</p>
            <p>Price: $${product.price}</p>
            <p>Stock Quantity: ${product.stockQuantity}</p>
            <button class="see-more-button" data-description="${product.description}">See more</button>
            <button class="delete-button" data-id="${product.id}">Delete</button>
        `;

        return card;
    }

    fetchProducts();
});
