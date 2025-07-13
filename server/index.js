const express = require('express');
const cors = require('cors');
require('dotenv').config();
const ecommerceApi = require('./ecommerce-api');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/ecommerce', ecommerceApi);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
