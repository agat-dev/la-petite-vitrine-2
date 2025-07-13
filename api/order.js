
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  const { customerId, pack, maintenance, formData, totalPrice } = req.body;
  // Insère la commande dans Supabase
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        customerId,
        pack,
        maintenance,
        formData,
        totalPrice,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    ])
    .select();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json(data[0]);
}
