const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(express.static('uploads')); // Serve static files (images)

// In-memory product list (can be replaced with a database)
let products = [
    { name: "Product 1", price: 20, description: "Description for Product 1", images: [] },
    { name: "Product 2", price: 30, description: "Description for Product 2", images: [] }
];

// Endpoint to fetch products for the dropdown
app.get('/api/products', (req, res) => {
    res.json(products.map(product => product.name)); // Return only product names
});

// Endpoint to update product information
app.post('/api/products/:productName', upload.array('images', 5), (req, res) => {
    const { name, price, description, discount } = req.body;
    const productName = req.params.productName;
    const product = products.find(p => p.name === productName);

    if (!product) {
        return res.status(404).json({ message: "Product not found." });
    }

    // Update product details
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.discount = discount || product.discount;

    // Add new images if provided
    if (req.files) {
        product.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    res.json({ message: 'Product updated successfully!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});