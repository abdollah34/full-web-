document.addEventListener('DOMContentLoaded', () => {
    // Load the products from localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productSelect = document.getElementById('product-select');
    const productForm = document.getElementById('product-form');
    const formTitle = document.getElementById('form-title');

    // Function to update the product dropdown
    function updateProductDropdown() {
        productSelect.innerHTML = '<option value="">-- Select a product --</option>';
        products.forEach((product, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }

    // Function to populate the form fields for editing
    function populateForm(product) {
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-discount').value = product.discount;
        document.getElementById('product-images').value = ''; // Reset the image field
    }

    // Event listener for selecting a product from the dropdown
    productSelect.addEventListener('change', () => {
        const selectedProductIndex = productSelect.value;
        if (selectedProductIndex !== "") {
            const product = products[selectedProductIndex];
            populateForm(product);
            formTitle.textContent = 'Edit Product';
        } else {
            productForm.reset();
            formTitle.textContent = 'Add New Product';
        }
    });

    // Handle form submission (Add or Edit product)
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('product-name').value;
        const price = parseFloat(document.getElementById('product-price').value);
        const description = document.getElementById('product-description').value;
        const discount = parseInt(document.getElementById('product-discount').value);
        const images = document.getElementById('product-images').files;

        const newProduct = {
            name,
            price,
            description,
            discount,
            images: images.length > 0 ? Array.from(images).map(file => URL.createObjectURL(file)) : []
        };

        // Add or update the product
        const selectedProductIndex = productSelect.value;
        if (selectedProductIndex !== "") {
            // Edit existing product
            products[selectedProductIndex] = newProduct;
        } else {
            // Add new product
            products.push(newProduct);
        }

        // Save products to localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Update the dropdown and reset form
        updateProductDropdown();
        productForm.reset();
        formTitle.textContent = 'Add New Product';
    });

    // Initial call to update product dropdown
    updateProductDropdown();
});