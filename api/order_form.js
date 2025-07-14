import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const {
    orderId,
    firstName,
    lastName,
    email,
    phone,
    company,
    street,
    city,
    postalCode,
    country,
    packId,
    packTitle,
    packDescription,
    packFeatures,
    packDeliveryTime,
    maintenanceId,
    maintenanceTitle,
    maintenanceDescription,
    maintenanceFeatures,
    maintenanceBillingCycle,
    socialOptions,
    additionalInfo,
    budget,
    objectif,
    delai,
    referenceUrl,
    description,
    color,
    logoUrl,
    imageUrl,
    domain,
    cms,
    hebergement,
    paiement,
    livraison,
    produit,
    service,
    autre,
    besoin,
    fonctionnalite,
    rgpdAccepted,
    status
  } = req.body;

  const { data, error } = await supabase
    .from('order_forms')
    .insert([
      {
        orderId,
        firstName,
        lastName,
        email,
        phone,
        company,
        street,
        city,
        postalCode,
        country,
        packId,
        packTitle,
        packDescription,
        packFeatures,
        packDeliveryTime,
        maintenanceId,
        maintenanceTitle,
        maintenanceDescription,
        maintenanceFeatures,
        maintenanceBillingCycle,
        socialOptions,
        additionalInfo,
        budget,
        objectif,
        delai,
        referenceUrl,
        description,
        color,
        logoUrl,
        imageUrl,
        domain,
        cms,
        hebergement,
        paiement,
        livraison,
        produit,
        service,
        autre,
        besoin,
        fonctionnalite,
        rgpdAccepted,
        status: status || 'en cours de validation'
      }
    ])
    .select();

  if (error) {
    console.error('Erreur Supabase (order_form):', error.message, error);
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json(data[0]);
}
