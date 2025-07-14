import React from 'react';
import ClientDashboard from '../components/ecommerce/ClientDashboard';

const EspaceClientPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-gray-50">
      <h1 className="text-3xl font-bold text-center py-8 text-blue-gray-900">Mon espace client</h1>
      <ClientDashboard />
    </div>
  );
};

export default EspaceClientPage;
