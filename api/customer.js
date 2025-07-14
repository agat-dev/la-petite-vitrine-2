
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


// api/customer.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { email, firstName, lastName, phone, password } = req.body;

  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Mot de passe requis (min 6 caractères)" });
  }

  // Ici, tu dois utiliser une base de données cloud (MongoDB Atlas, Supabase, etc.)
  // car le file system local n'est pas persistant sur Vercel.

  // Insère le client dans Supabase
  const { data, error } = await supabase
    .from("customers")
    .insert([
      {
        email,
        firstName,
        lastName,
        phone,
        password: bcrypt.hashSync(password, 10),
        createdAt: new Date().toISOString(),
      },
    ])
    .select();
  if (error) {
    console.error('Erreur Supabase (customer):', error.message, error);
    return res.status(500).json({ error: error.message });
  }
  const customer = data[0];
  const customerToken = jwt.sign(
    { id: customer.id, email: customer.email },
    "dev-secret-key",
    { expiresIn: "7d" }
  );
  res.status(200).json({ ...customer, token: customerToken });
}
