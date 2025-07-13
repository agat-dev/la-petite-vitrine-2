import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EspaceClientLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler une authentification simple
    if (email && password) {
      // Ici, vous pouvez ajouter la logique d'authentification réelle
      navigate('/espace-client-dashboard');
    } else {
      setError('Veuillez renseigner votre email et mot de passe.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-gray-50 via-white to-amber-50">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-blue-gray-200/50 shadow-lg rounded-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center mb-6">
            <UserIcon className="w-12 h-12 text-blue-gray900 mb-2" />
            <h2 className="text-2xl font-bold text-blue-gray900 mb-2">Connexion espace client</h2>
            <p className="text-blue-gray600 text-sm text-center">Accédez à votre espace personnel pour suivre vos commandes et projets.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-gray900 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-blue-gray-300 rounded-lg focus:ring-2 focus:ring-blue-gray-400 focus:border-blue-gray-400"
                placeholder="votre@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-gray900 mb-1">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-blue-gray-300 rounded-lg focus:ring-2 focus:ring-blue-gray-400 focus:border-blue-gray-400"
                placeholder="Votre mot de passe"
                required
              />
            </div>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            <Button type="submit" className="w-full bg-blue-gray900 hover:bg-blue-gray700 text-white font-bold py-3 rounded-lg shadow">Se connecter</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EspaceClientLogin;
