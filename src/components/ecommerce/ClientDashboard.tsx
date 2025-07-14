import React, { useEffect, useState } from 'react';
import { useEcommerce } from '../../hooks/useEcommerce';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';

const ClientDashboard: React.FC = () => {
  const { customer, orders, fetchCustomerOrders, logout } = useEcommerce();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetchCustomerOrders();
      } catch (err) {
        setError('Impossible de charger les commandes.');
      } finally {
        setLoading(false);
      }
    };
    if (customer) loadOrders();
  }, [customer, fetchCustomerOrders]);

  if (!customer) {
    return <div className="p-8 text-center">Veuillez vous connecter pour accéder à votre espace client.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Bienvenue, {customer.firstName} {customer.lastName}</h2>
          <p className="text-gray-600">Email : {customer.email}</p>
          <Button onClick={logout} className="mt-4 bg-red-500 hover:bg-red-600 text-white">Déconnexion</Button>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-4">Vos commandes</h3>
          {loading && <p>Chargement...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {orders.length === 0 && !loading ? (
            <p>Aucune commande enregistrée.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map(order => (
                <li key={order.id} className="border p-4 rounded-lg bg-amber-50">
                  <div><strong>Pack :</strong> {order.pack?.name}</div>
                  <div><strong>Prix :</strong> {order.totalPrice} €</div>
                  <div><strong>Status :</strong> {order.status}</div>
                  <div><strong>Date :</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
