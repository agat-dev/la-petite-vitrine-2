import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { AnimatedSection } from "../../../../components/ui/animated-section";
import { StaggeredContainer } from "../../../../components/ui/staggered-container";
import { cn } from "../../../../lib/utils";
import StyledWrapper from "../../../../components/ui/button-ui";
import { MaintenanceSelector } from "../../../../components/ecommerce/MaintenanceSelector";
import { useEcommerce } from '../../../../hooks/useEcommerce';

export const ProductsSection = (): JSX.Element => {
  const { packs, maintenanceOptions } = useEcommerce();
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [selectedSocialOptions, setSelectedSocialOptions] = useState<any[]>([]);
  const [showMaintenanceSelector, setShowMaintenanceSelector] = useState(false);

  // Affichage des packs Supabase
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Nos Packs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packs.map((pack) => (
            <Card key={pack.id} className="border rounded-xl shadow-md p-6">
              <CardHeader className="text-center pb-4">
                <h3 className="text-2xl font-bold mb-2">{pack.title}</h3>
                <div className="text-4xl font-bold text-amber-900 mb-2">{pack.price}€</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{pack.description}</p>
                <ul className="mb-4">
                  {pack.features && pack.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-2 px-4 bg-amber-500 text-white rounded hover:bg-amber-600"
                  onClick={() => {
                    setSelectedPack(pack);
                    setShowMaintenanceSelector(true);
                  }}
                >Choisir ce pack</button>
              </CardContent>
            </Card>
          ))}
        </div>
        {showMaintenanceSelector && (
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 text-center">Choisissez une option de maintenance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {maintenanceOptions.map((maintenance) => (
                <Card key={maintenance.id} className="border rounded-xl shadow-md p-6 cursor-pointer"
                  onClick={() => setSelectedSocialOptions([maintenance])}
                >
                  <CardHeader className="text-center pb-2">
                    <h4 className="text-lg font-bold mb-1">{maintenance.title}</h4>
                    <div className="text-xl font-bold text-amber-900 mb-1">{maintenance.price}€</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-2">{maintenance.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
