import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { EcommerceFlow } from '../components/ecommerce/EcommerceFlow';

export const EcommercePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  
  // Récupérer les paramètres d'URL
  const packId = searchParams.get('pack') || 'pack-pro'; // Pack Pro par défaut
  const maintenanceId = searchParams.get('maintenance') || null;
  
  return (
    <EcommerceFlow 
      initialFlow={packId ? 'maintenance-selection' : 'pack-selection'}
      preSelectedPackId={packId}
      preSelectedMaintenanceId={maintenanceId}
    />
  );
};

export default EcommercePage;