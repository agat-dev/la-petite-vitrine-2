const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_PATH = path.join(__dirname, 'ecommerce-data.json');

function readData() {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify({ customers: [], orders: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// Create or update customer
router.post('/customer', (req, res) => {
  const { email, firstName, lastName, phone, password } = req.body;
  const data = readData();
  let customer = data.customers.find(c => c.email === email);
  if (!customer) {
    customer = {
      id: 'c_' + Date.now(),
      email,
      firstName,
      lastName,
      phone,
      password,
      createdAt: new Date(),
      orders: []
    };
    data.customers.push(customer);
    writeData(data);
  }
  res.json(customer);
});

// Login customer
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const data = readData();
  const customer = data.customers.find(c => c.email === email && c.password === password);
  if (customer) {
    res.json(customer);
  } else {
    res.status(401).json({ error: 'Email ou mot de passe incorrect' });
  }
});

// Create order
router.post('/order', (req, res) => {
  const { customerId, pack, maintenance, formData, totalPrice } = req.body;
  const data = readData();
  const customer = data.customers.find(c => c.id === customerId);
  if (!customer) return res.status(404).json({ error: 'Client non trouvé' });
  const order = {
    id: 'o_' + Date.now(),
    pack,
    maintenance,
    formData,
    totalPrice,
    status: 'pending',
    createdAt: new Date()
  };
  customer.orders.push(order);
  data.orders.push(order); 
  writeData(data);
  res.json(order);
});

// Get customer orders
router.get('/customer/:id/orders', (req, res) => {
  const data = readData();
  const customer = data.customers.find(c => c.id === req.params.id);
  if (!customer) return res.status(404).json({ error: 'Client non trouvé' });
  res.json(customer.orders);
});

// Get all packs and maintenance options
router.get('/catalog', (req, res) => {
  // Importe les vrais packs et options depuis le frontend
  try {
    const packs = require('../src/data/ecommerce-data').PACKS || [];
    const maintenanceOptions = require('../src/data/ecommerce-data').MAINTENANCE_OPTIONS || [];
    const socialOptions = require('../src/data/ecommerce-data').SOCIAL_OPTIONS || [];
    res.json({ packs, maintenanceOptions, socialOptions });
  } catch (e) {
    res.json({ packs: [], maintenanceOptions: [], socialOptions: [] });
  }
});

module.exports = router;
