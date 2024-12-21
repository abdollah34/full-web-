// Function to handle adding a product to the cart
function addToCart() {
    const productName = "Edgar Moran Kobhy Chair"; // Replace with dynamic name if needed
    const productPrice = 150; // Replace with dynamic price if needed

    // Get the main image for the product
    const productImage = document.querySelector(".carousel-item.active img").src;

    // Get selected size
    const selectedSize = document.querySelector("#size-options span.selected");
    const size = selectedSize ? selectedSize.textContent : "N/A";

    // Get selected color
    const selectedColor = document.querySelector("#color-options .color.selected");
    const color = selectedColor ? selectedColor.classList[1] : "N/A";

    // Get quantity
    const quantity = parseInt(document.getElementById("quantity").value) || 1;

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product with the same options is already in the cart
    const existingProduct = cart.find(item =>
        item.name === productName &&
        item.size === size &&
        item.color === color
    );

    if (existingProduct) {
        // Increment quantity
        existingProduct.quantity += quantity;
    } else {
        // Add new product
        cart.push({
            name: productName,
            price: productPrice,
            size: size,
            color: color,
            quantity: quantity,
            image: productImage // Include product image
        });
    }

    // Save cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`Added ${productName} (Size: ${size}, Color: ${color}, Quantity: ${quantity}) to your cart!`);
    updateCartUI(); // Update the cart display
}

// Function to update the cart display
function updateCartUI() {
    const cartElement = document.getElementById("cart");
    const totalElement = document.getElementById("total-price");
    cartElement.innerHTML = ""; // Clear the cart display

    let totalPrice = 0;

    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div>
                    <span>${item.name}</span>
                    <span>Size: ${item.size}</span>
                    <span>Color: ${item.color}</span>
                    <span>Quantity: ${item.quantity}</span>
                    <span>${item.price.toFixed(2)} MAD</span>
                </div>
            </div>
            <button class="btn btn-sm btn-secondary" onclick="changeQuantity('${item.name}', '${item.size}', '${item.color}', -1)">-</button>
            <button class="btn btn-sm btn-secondary" onclick="changeQuantity('${item.name}', '${item.size}', '${item.color}', 1)">+</button>
        `;
        cartElement.appendChild(cartItem);
    });

    totalElement.textContent = `Total: ${totalPrice.toFixed(2)} MAD`;

    // Handle empty cart
    if (cart.length === 0) {
        cartElement.innerHTML = "<p>Your cart is empty!</p>";
        totalElement.textContent = "Total: 0 MAD";
    }
}

// Initial cart display
updateCartUI();