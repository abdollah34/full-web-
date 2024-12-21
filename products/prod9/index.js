// Initialize an empty cart if not already present
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add a product to the cart
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({...product, quantity: 1 });
    }

    // Save the cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to the cart!`);
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const product = {
            id: button.dataset.id,
            name: button
                .dataset.name,
            price: parseFloat(button.dataset.price),
        };
        addToCart(product);
    });
});