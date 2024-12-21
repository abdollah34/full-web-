const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let products = [];

app.post('/update-product', (req, res) => {
    const { name, price, description, image } = req.body;
    // Save product info to database (for now, we are storing it in memory)
    products.push({ name, price, description, image });
    res.json({ message: 'Product updated successfully!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});