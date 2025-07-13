import React from 'react';
import { CustomerDashboard } from '../components/ecommerce/CustomerDashboard';

// Simuler un client connecté pour la démo
const mockCustomer = {
  id: 'demo-1',
  createdAt: new Date(),
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'jean.dupont@email.com',
  phone: '0601020304',
  orders: [],
};

export const EspaceClientDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-gray-50 via-white to-amber-50 py-8">
      <CustomerDashboard customer={mockCustomer} onLogout={() => window.location.href = '/espace-client-login'} />
    </div>
  );
};

export default EspaceClientDashboard;
