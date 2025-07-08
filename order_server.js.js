const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

const ORDER_FILE = 'orders.json';

app.use(cors());
app.use(express.json());

// Load orders from file
function loadOrders() {
    if (!fs.existsSync(ORDER_FILE)) return [];
    const data = fs.readFileSync(ORDER_FILE);
    return JSON.parse(data);
}

// Save orders to file
function saveOrders(orders) {
    fs.writeFileSync(ORDER_FILE, JSON.stringify(orders, null, 2));
}

// GET all orders
app.get('/orders', (req, res) => {
    const orders = loadOrders();
    res.json(orders);
});

// POST a new order
app.post('/new-order', (req, res) => {
    const { pickup, material, dropoff, time, loads } = req.body;

    if (!pickup || !material || !dropoff || !time) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const orders = loadOrders();

    orders.push({
        pickup,
        material,
        dropoff,
        time,
        loads: loads || 1 // Default to 1 load if not specified
    });

    saveOrders(orders);
    res.json({ status: 'Order saved' });
});

app.listen(PORT, () => {
    console.log(`🚛 Order server running at http://localhost:${PORT}`);
});
