import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Card, CardContent } from './card';
import { cn } from '../../lib/utils';
import type { MaintenanceService } from '../../types/stripe';

interface MaintenanceSelectorProps {
  maintenanceServices: MaintenanceService[];
  selectedMaintenance: MaintenanceService | null;
  onSelect: (maintenance: MaintenanceService | null) => void;
}

export const MaintenanceSelector: React.FC<MaintenanceSelectorProps> = ({
  maintenanceServices,
  selectedMaintenance,
  onSelect
}) => {
  return (
    <div className="mt-12 space-y-4">
      <div className="text-left">
        <h3 className="text-2xl font-heading-4 text-blue-gray100 mb-4">
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {maintenanceServices.map((service) => (
          <Card
            key={service.id}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:scale-102",
              service.bgColor,
              service.borderColor,
              selectedMaintenance?.id === service.id
                ? "border-2 border-amber-400 scale-105"
                : "border hover:border-amber-300"
            )}
            onClick={() => onSelect(service)}
          >
            <CardContent className="p-4 relative">
              {selectedMaintenance?.id === service.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-4 h-4 text-blue-gray900" />
                </div>
              )}

              <div className="text-center mb-3">
                <div className="text-2xl mb-2">{service.icon}</div>
                <h4 className={cn("font-bold text-lg mb-1", service.titleColor)}>
                  {service.title}
                </h4>
                <div className={cn("text-xl font-medium", service.priceColor)}>
                  {service.price} par mois
                </div>
              </div>

              <div className="space-y-1">
                {service.features.slice(0, 10).map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckIcon className={cn("w-3 h-3 mt-0.5 flex-shrink-0", service.checkColor)} />
                    <span className={cn("text-xs", service.textColor)}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};