import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Pack } from '../../types/ecommerce';
import { useEcommerce } from '../../hooks/useEcommerce';
import { cn } from '../../lib/utils';

interface PackSelectorProps {
  selectedPack?: Pack;
  onSelectPack: (pack: Pack) => void;
  className?: string;
}

export const PackSelector: React.FC<PackSelectorProps> = ({
  selectedPack,
  onSelectPack,
  className
}) => {
  const { packs } = useEcommerce();
  return (
    <div className={cn("space-y-6", className)}>
      <Card className="bg-white/90 backdrop-blur-sm border-amber-200/50 shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-amber-100 to-blue-gray-100 p-8">
        <h2 className="text-3xl font-bold text-blue-gray900 mb-4 font-heading-2 text-center">
          Choisissez votre pack
        </h2>
        <p className="text-blue-gray600 text-lg font-body-l text-center">
          Sélectionnez le pack qui correspond le mieux à vos besoins
        </p>
        </CardHeader>

        <CardContent className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packs.map((pack) => (
          <Card
            key={pack.id}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:scale-105 border-2 rounded-xl overflow-hidden",
              selectedPack?.id === pack.id
                ? "border-amber-400 bg-amber-50 shadow-lg"
                : "border-amber-200 hover:border-amber-300 hover:shadow-lg bg-white"
            )}
            onClick={() => onSelectPack(pack)}
          >
            {selectedPack?.id === pack.id && (
              <div className="absolute top-4 right-4 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-md z-10">
                <CheckIcon className="w-4 h-4 text-white" />
              </div>
            )}

            <CardHeader className="text-center pb-4 bg-gradient-to-b from-white to-amber-50/30 p-6">
              <h3 className="text-2xl font-bold text-blue-gray900 mb-2 font-heading-6">
                {pack.title}
              </h3>
              <div className="text-4xl font-bold text-amber-900 mb-2">
                {pack.price}€
              </div>
              <p className="text-blue-gray600 text-sm font-body-m">
                Livraison en {pack.deliveryTime}
              </p>
            </CardHeader>

            <CardContent className="p-6">
              <p className="text-blue-gray700 mb-4 text-sm font-body-m">
                {pack.description}
              </p>
              
              <div className="space-y-2">
                {pack.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-blue-gray700 font-body-m">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
        </CardContent>
      </Card>
    </div>
  );
};