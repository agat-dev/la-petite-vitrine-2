const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  const { email, password } = req.body;
  // Utilise une base de données distante ici
  // Exemple de réponse simulée :
  if (email !== 'testproxy@agat.dev' || password !== 'proxytest123') {
    return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
  }
  const customer = {
    id: 'c_123456',
    email,
    firstName: 'Proxy',
    lastName: 'Test',
    phone: '0600000000',
    password: bcrypt.hashSync(password, 10),
    createdAt: new Date(),
    orders: []
  };
  const loginToken = jwt.sign({ id: customer.id, email: customer.email }, 'dev-secret-key', { expiresIn: '7d' });
  res.status(200).json({ ...customer, token: loginToken });
};
