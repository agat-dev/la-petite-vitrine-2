import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Customer, OrderData } from '../../types/ecommerce';
import { 
  UserIcon, 
  ShoppingBagIcon, 
  CreditCardIcon, 
  SettingsIcon,
  LogOutIcon,
  EyeIcon,
  DownloadIcon,
  FileTextIcon,
  BuildingIcon,
  PaletteIcon
} from 'lucide-react';

interface CustomerDashboardProps {
  customer: Customer;
  onLogout: () => void;
  className?: string;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  customer,
  onLogout,
  className
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'billing' | 'project-config'>('orders');
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number | null>(null);

  const getStatusColor = (status: OrderData['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: OrderData['status']) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in_progress': return 'En cours';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulé';
      default: return 'Brouillon';
    }
  };

  const tabs = [
    { id: 'orders' as const, label: 'Mes commandes', icon: ShoppingBagIcon },
    { id: 'project-config' as const, label: 'Configuration projet', icon: FileTextIcon },
    { id: 'profile' as const, label: 'Mon profil', icon: UserIcon },
    { id: 'billing' as const, label: 'Facturation', icon: CreditCardIcon },
  ];

  // Fonction pour afficher les détails d'une commande
  const renderOrderDetails = (order: OrderData, index: number) => (
    <Card key={index}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-blue-gray900">
              {order.pack.title}
            </h3>
            <p className="text-sm text-blue-gray600">
              Commandé le {new Date(order.createdAt).toLocaleDateString('fr-FR')}
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-gray900">
              {order.totalPrice}€
            </div>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-medium text-blue-gray900 mb-2">Pack</h4>
            <p className="text-sm text-blue-gray600">{order.pack.description}</p>
          </div>
          {order.maintenance && (
            <div>
              <h4 className="font-medium text-blue-gray900 mb-2">Maintenance</h4>
              <p className="text-sm text-blue-gray600">
                {order.maintenance.title} - {order.maintenance.price}€
              </p>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedOrderIndex(selectedOrderIndex === index ? null : index)}
          >
            <EyeIcon className="w-4 h-4 mr-2" />
            {selectedOrderIndex === index ? 'Masquer détails' : 'Voir détails'}
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Télécharger facture
          </Button>
        </div>

        {/* Détails étendus de la commande */}
        {selectedOrderIndex === index && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-blue-gray900 mb-4">Configuration du projet</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informations entreprise */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <BuildingIcon className="w-4 h-4 text-blue-600" />
                  <h5 className="font-medium text-blue-gray900">Informations entreprise</h5>
                </div>
                {order.formData.company && (
                  <div>
                    <span className="text-sm font-medium text-blue-gray700">Entreprise :</span>
                    <p className="text-sm text-blue-gray600">{order.formData.company}</p>
                  </div>
                )}
                {order.formData.activity && (
                  <div>
                    <span className="text-sm font-medium text-blue-gray700">Secteur d'activité :</span>
                    <p className="text-sm text-blue-gray600">{order.formData.activity}</p>
                  </div>
                )}
                {order.formData.description && (
                  <div>
                    <span className="text-sm font-medium text-blue-gray700">Description :</span>
                    <p className="text-sm text-blue-gray600">{order.formData.description}</p>
                  </div>
                )}
              </div>

              {/* Configuration du site */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <PaletteIcon className="w-4 h-4 text-purple-600" />
                  <h5 className="font-medium text-blue-gray900">Configuration du site</h5>
                </div>
                {order.formData.colors && (
                  <div>
                    <span className="text-sm font-medium text-blue-gray700">Couleurs préférées :</span>
                    <p className="text-sm text-blue-gray600">{order.formData.colors}</p>
                  </div>
                )}
                {order.formData.services && (
                  <div>
                    <span className="text-sm font-medium text-blue-gray700">Services :</span>
                    <p className="text-sm text-blue-gray600 whitespace-pre-line">{order.formData.services}</p>
                  </div>
                )}
                {order.formData.logo && (
                  <div>
                    <span className="text-sm font-medium text-blue-gray700">Logo :</span>
                    <p className="text-sm text-blue-gray600">Fichier fourni</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className={className}>
      {/* En-tête */}
      <div className="bg-blue-gray900 text-white p-6 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Espace Client</h1>
            <p className="text-blue-gray200">
              Bienvenue, {customer.firstName} {customer.lastName}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={onLogout}
            className="text-white border-white hover:bg-white hover:text-blue-gray900"
          >
            <LogOutIcon className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-amber-600 text-amber-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenu */}
      <div className="p-6">
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-blue-gray900">Mes commandes</h2>
            
            {customer.orders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <ShoppingBagIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucune commande
                  </h3>
                  <p className="text-gray-600">
                    Vous n'avez pas encore passé de commande.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {customer.orders.map(renderOrderDetails)}
              </div>
            )}
          </div>
        )}

        {activeTab === 'project-config' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-blue-gray900">Configuration des projets</h2>
            
            {customer.orders.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <FileTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucune configuration
                  </h3>
                  <p className="text-gray-600">
                    Vous n'avez pas encore de projet configuré.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {customer.orders.map((order, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-blue-gray900">
                            Projet {order.pack.title}
                          </h3>
                          <p className="text-sm text-blue-gray600">
                            Configuré le {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Informations client */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <UserIcon className="w-4 h-4 text-green-600" />
                          <h4 className="font-medium text-blue-gray900">Informations client</h4>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm font-medium text-blue-gray700">Contact :</span>
                            <p className="text-sm text-blue-gray600">
                              {order.formData.prenom} {order.formData.nom}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-blue-gray700">Email :</span>
                            <p className="text-sm text-blue-gray600">{order.formData.mail}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-blue-gray700">Téléphone :</span>
                            <p className="text-sm text-blue-gray600">{order.formData.telephone}</p>
                          </div>
                          {order.formData.entreprise && (
                            <div>
                              <span className="text-sm font-medium text-blue-gray700">Entreprise :</span>
                              <p className="text-sm text-blue-gray600">{order.formData.entreprise}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Informations entreprise */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <BuildingIcon className="w-4 h-4 text-blue-600" />
                          <h4 className="font-medium text-blue-gray900">Informations entreprise</h4>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                          {order.formData.secteur_activite && (
                            <div>
                              <span className="text-sm font-medium text-blue-gray700">Secteur d'activité :</span>
                              <p className="text-sm text-blue-gray600">{order.formData.secteur_activite}</p>
                            </div>
                          )}
                          {order.formData.adresse_complete && (
                            <div>
                              <span className="text-sm font-medium text-blue-gray700">Adresse complète :</span>
                              <p className="text-sm text-blue-gray600 whitespace-pre-line">{order.formData.adresse_complete}</p>
                            </div>
                          )}
                          {order.formData.zone_intervention && (
                            <div>
                              <span className="text-sm font-medium text-blue-gray700">Zone d'intervention :</span>
                              <p className="text-sm text-blue-gray600 whitespace-pre-line">{order.formData.zone_intervention}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Configuration du site */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <PaletteIcon className="w-4 h-4 text-purple-600" />
                          <h4 className="font-medium text-blue-gray900">Configuration du site</h4>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg space-y-3">
                          {order.formData.concurrents_principaux && (
                            <div>
                              <span className="text-sm font-medium text-blue-gray700">Concurrents principaux :</span>
                              <p className="text-sm text-blue-gray600 whitespace-pre-line">{order.formData.concurrents_principaux}</p>
                            </div>
                          )}
                          {order.formData.services_proposes && (
                            <div>
                              <span className="text-sm font-medium text-blue-gray700">Services proposés :</span>
                              <p className="text-sm text-blue-gray600 whitespace-pre-line">{order.formData.services_proposes}</p>
                            </div>
                          )}
                          {order.formData.specificite_positionnement && (
                            <div>
                              <span className="text-sm font-medium text-blue-gray700">Spécificité / Positionnement :</span>
                              <p className="text-sm text-blue-gray600 whitespace-pre-line">{order.formData.specificite_positionnement}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Clientèle et communication */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <UserIcon className="w-4 h-4 text-orange-600" />
                          <h4 className="font-medium text-blue-gray900">Clientèle et communication</h4>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg space-y-3">
                          {order.formData.types_clients && (
                            <div>
                              <span className="text-sm font-medium text-blue-gray700">Types de clients :</span>
                              <p className="text-sm text-blue-gray600">{order.formData.types_clients}</p>
                            </div>
                          )}
                          {order.formData.ton_communication && (
                            <div>
                              <span className="text-sm font-medium text-blue-gray700">Ton de communication :</span>
                              <p className="text-sm text-blue-gray600">{order.formData.ton_communication}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Éléments visuels et contenus */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <PaletteIcon className="w-4 h-4 text-pink-600" />
                          <h4 className="font-medium text-blue-gray900">Éléments visuels et contenus</h4>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-lg space-y-3">
                          {order.formData.elements_visuels && (
                            <div>
                              <span className="text-sm font-medium text-blue-gray700">Éléments visuels :</span>
                              <p className="text-sm text-blue-gray600">
                                📎 Fichier fourni ({typeof order.formData.elements_visuels === 'object' ? order.formData.elements_visuels.name : 'Fichier personnalisé'})
                              </p>
                            </div>
                          )}
                          {order.formData.textes_contenus && (
                            <div>
                              <span className="text-sm font-medium text-blue-gray700">Textes et contenus :</span>
                              <p className="text-sm text-blue-gray600">
                                📎 Fichier fourni ({typeof order.formData.textes_contenus === 'object' ? order.formData.textes_contenus.name : 'Fichier personnalisé'})
                              </p>
                            </div>
                          )}
                          {order.formData.autres_fichiers && (
                            <div>
                              <span className="text-sm font-medium text-blue-gray700">Autres fichiers :</span>
                              <p className="text-sm text-blue-gray600">
                                📎 Fichier fourni ({typeof order.formData.autres_fichiers === 'object' ? order.formData.autres_fichiers.name : 'Fichier personnalisé'})
                              </p>
                            </div>
                          )}
                          {order.formData.liens_contenus_existants && (
                            <div>
                              <span className="text-sm font-medium text-blue-gray700">Liens vers contenus existants :</span>
                              <p className="text-sm text-blue-gray600 whitespace-pre-line">{order.formData.liens_contenus_existants}</p>
                            </div>
                          )}
                          {order.formData.informations_diverses && (
                            <div>
                              <span className="text-sm font-medium text-blue-gray700">Informations diverses :</span>
                              <p className="text-sm text-blue-gray600 whitespace-pre-line">{order.formData.informations_diverses}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Pack et maintenance */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <ShoppingBagIcon className="w-4 h-4 text-amber-600" />
                          <h4 className="font-medium text-blue-gray900">Pack et services</h4>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm font-medium text-blue-gray700">Pack sélectionné :</span>
                            <p className="text-sm text-blue-gray600 font-medium">{order.pack.title}</p>
                            <p className="text-xs text-blue-gray500">{order.pack.description}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-blue-gray700">Maintenance :</span>
                            <p className="text-sm text-blue-gray600">
                              {order.maintenance ? `${order.maintenance.title} (${order.maintenance.price}€)` : 'Aucune maintenance'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Note importante */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                          <strong>📝 Note :</strong> Ces informations sont utilisées par notre équipe pour configurer votre projet. 
                          Pour toute modification, veuillez nous contacter directement.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-blue-gray900">Mon profil</h2>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Informations personnelles</h3>
                  <span className="text-sm text-blue-gray500">Lecture seule</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-gray900 mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      value={customer.firstName || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-gray900 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={customer.lastName || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-gray900 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={customer.email || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-gray900 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={customer.phone || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-600">
                    <strong>ℹ️ Information :</strong> Pour modifier vos informations personnelles, 
                    veuillez nous contacter à <a href="mailto:contact@lapetitevitrine.com" className="underline">contact@lapetitevitrine.com</a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-blue-gray900">Facturation</h2>
            
            <Card>
              <CardContent className="text-center py-12">
                <CreditCardIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Gestion de la facturation
                </h3>
                <p className="text-gray-600 mb-4">
                  Gérez vos moyens de paiement et consultez vos factures.
                </p>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  Ajouter un moyen de paiement
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};