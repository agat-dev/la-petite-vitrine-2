import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { MaintenanceOption } from '../../types/ecommerce';
import { useEcommerce } from '../../hooks/useEcommerce';
import { cn } from '../../lib/utils';

interface MaintenanceSelectorProps {
  selectedSocialOptions?: MaintenanceOption[];
  onSelectSocialOptions: (options: MaintenanceOption[]) => void;
  className?: string;
}

export const MaintenanceSelector: React.FC<MaintenanceSelectorProps> = ({
  selectedSocialOptions = [],
  onSelectSocialOptions,
  className
}) => {
  const { maintenanceOptions } = useEcommerce();
  const handleOptionToggle = (option: MaintenanceOption) => {
    const isSelected = selectedSocialOptions.some(selected => selected.id === option.id);
    
    if (isSelected) {
      // Retirer l'option
      const newOptions = selectedSocialOptions.filter(selected => selected.id !== option.id);
      onSelectSocialOptions(newOptions);
    } else {
      // Ajouter l'option (max 3)
      if (selectedSocialOptions.length < 3) {
        onSelectSocialOptions([...selectedSocialOptions, option]);
      }
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-gray900 mb-4">
          Options réseaux sociaux (optionnel)
        </h2>
        <p className="text-blue-gray600">
          Choisissez jusqu'à 3 options de présence en ligne (25€ chacune)
        </p>
        <p className="text-sm text-blue-gray500 mt-2">
          {selectedSocialOptions.length}/3 options sélectionnées
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Options de maintenance */}
        {maintenanceOptions.map((maintenance) => {
          const isSelected = selectedSocialOptions.some(selected => selected.id === maintenance.id);
          const isDisabled = !isSelected && selectedSocialOptions.length >= 3;
          
          return (
            <Card
              key={maintenance.id}
              className={cn(
                "cursor-pointer transition-all duration-300",
                isSelected
                  ? "ring-2 ring-amber-400 bg-amber-50"
                  : "border border-amber-200 bg-white"
              )}
              onClick={() => !isDisabled && handleOptionToggle(maintenance)}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
              )}
              
              {isDisabled && !isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">3/3</span>
                </div>
              )}

              <CardHeader className="text-center pb-2">
                <h3 className="text-lg font-bold text-blue-gray900 mb-1">
                  {maintenance.title}
                </h3>
                <div className="text-xl font-bold text-amber-900 mb-1">
                  {maintenance.price}€
                </div>
                <p className="text-blue-gray600 text-xs">
                  {maintenance.description}
                </p>
              </CardHeader>
            </Card>
          );
        })}
      </div>
      
      {selectedSocialOptions.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-semibold text-amber-900 mb-2">Options sélectionnées :</h4>
          <div className="space-y-1">
            {selectedSocialOptions.map((option, index) => (
              <div key={option.id} className="flex justify-between items-center">
                <span className="text-sm text-amber-800">{option.title}</span>
                <span className="text-sm font-medium text-amber-900">{option.price}€</span>
              </div>
            ))}
          </div>
          <div className="border-t border-amber-300 mt-2 pt-2">
            <div className="flex justify-between items-center font-bold">
              <span className="text-amber-900">Total options :</span>
              <span className="text-amber-900">
                {selectedSocialOptions.reduce((total, option) => total + option.price, 0)}€
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};