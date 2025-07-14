const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Importer le router principal
const ecommerceApi = require('./ecommerce-api');
app.use('/', ecommerceApi);

app.listen(port, () => {
  console.log(`Backend démarré sur http://localhost:${port}`);
});