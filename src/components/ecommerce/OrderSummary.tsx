import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Pack, MaintenanceOption } from '../../types/ecommerce';
import { MAINTENANCE_OPTIONS } from '../../data/ecommerce-data';
import { CheckIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface OrderSummaryProps {
  selectedPack?: Pack;
  selectedMaintenance?: MaintenanceOption;
  formData: Record<string, any>;
  totalPrice: number;
  className?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedPack,
  selectedMaintenance,
  formData,
  totalPrice,
  className
}) => {
  
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-amber-100 to-blue-gray-100 p-6">
        <h3 className="text-xl font-bold text-blue-gray900 font-heading-6">
          Récapitulatif de votre commande
        </h3>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Pack sélectionné */}
        {selectedPack && (
          <div className="border-b pb-4">
            <h4 className="font-semibold text-blue-gray900 mb-3 font-body-m">Pack sélectionné</h4>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-blue-gray900 font-heading-6">{selectedPack.title}</h5>
                <span className="font-bold text-amber-900">{selectedPack.price}€</span>
              </div>
              <p className="text-sm text-blue-gray600 mb-3 font-body-m">{selectedPack.description}</p>
              <div className="space-y-1">
                {selectedPack.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckIcon className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-blue-gray700 font-body-m">{feature}</span>
                  </div>
                ))}
                {selectedPack.features.length > 3 && (
                  <p className="text-xs text-blue-gray500 italic">
                    +{selectedPack.features.length - 3} autres fonctionnalités
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Maintenance obligatoire */}
        {selectedMaintenance && (
          <div className="border-b pb-4">
            <h4 className="font-semibold text-blue-gray900 mb-3 font-body-m">Maintenance (obligatoire)</h4>
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-blue-gray900 font-heading-6">{selectedMaintenance.title}</h5>
                <span className="font-bold text-green-700">{selectedMaintenance.price}€/mois</span>
              </div>
              <p className="text-sm text-blue-gray600 font-body-m">{selectedMaintenance.description}</p>
            </div>
          </div>
        )}

        {/* Informations client */}
        {(formData.firstName || Object.keys(formData).length > 0) && (
          <div className="border-b pb-4">
            <h4 className="font-semibold text-blue-gray900 mb-3 font-body-m">Informations client</h4>
            <div className="space-y-2 text-sm bg-blue-gray-50 p-4 rounded-xl">
              {formData.firstName && (
                <p className="font-body-m"><span className="font-medium">Nom :</span> {formData.firstName} {formData.lastName}</p>
              )}
              {formData.email && (
                <p className="font-body-m"><span className="font-medium">Email :</span> {formData.email}</p>
              )}
              {formData.phone && (
                <p className="font-body-m"><span className="font-medium">Téléphone :</span> {formData.phone}</p>
              )}
              {formData.company && (
                <p className="font-body-m"><span className="font-medium">Entreprise :</span> {formData.company}</p>
              )}
              {Object.keys(formData).length === 0 && (
                <p className="text-blue-gray500 italic">Informations à remplir dans le formulaire</p>
              )}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-6 rounded-xl border border-amber-300 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-blue-gray900 font-heading-6">Total</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-900">{totalPrice}€</div>
              {selectedMaintenance && (
                <div className="text-sm text-blue-gray600">
                  + {selectedMaintenance.price}€/mois
                </div>
              )}
            </div>
          </div>
          
          {selectedPack && (
            <div className="mt-3 text-sm text-blue-gray600 font-body-m">
              Livraison prévue en {selectedPack.deliveryTime}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};