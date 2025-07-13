const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  // Récupère les packs, maintenanceOptions et socialOptions depuis Supabase
  const { data: packs, error: packsError } = await supabase.from('packs').select();
  const { data: maintenanceOptions, error: maintenanceError } = await supabase.from('maintenance_options').select();
  const { data: socialOptions, error: socialError } = await supabase.from('social_options').select();

  if (packsError || maintenanceError || socialError) {
    return res.status(500).json({
      error: [packsError?.message, maintenanceError?.message, socialError?.message].filter(Boolean).join(' | ')
    });
  }
  res.status(200).json({ packs, maintenanceOptions, socialOptions });
};
