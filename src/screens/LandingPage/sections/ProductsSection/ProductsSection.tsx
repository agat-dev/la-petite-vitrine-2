import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { useEcommerce } from '../../../../hooks/useEcommerce';
import { StepForm } from '../../../../components/ecommerce/StepForm';

export const ProductsSection = (): JSX.Element => {
  const {
    packs,
    maintenanceOptions,
    stepFormData,
    updateFormData,
    nextStep,
    prevStep,
    submitFullOrder,
    isFormValid
  } = useEcommerce();
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Sélection du pack
  if (!selectedPack) {
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
                    onClick={() => setSelectedPack(pack)}
                  >Choisir ce pack</button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 2. Sélection de la maintenance
  if (!selectedMaintenance) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Choisissez une option de maintenance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {maintenanceOptions.map((maintenance) => (
              <Card key={maintenance.id} className="border rounded-xl shadow-md p-6 cursor-pointer"
                onClick={() => setSelectedMaintenance(maintenance)}
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
      </section>
    );
  }

  // 3. Formulaire multi-étapes
  if (!formSubmitted) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-8">Informations complémentaires</h2>
          <StepForm
            steps={stepFormData.steps}
            currentStep={stepFormData.currentStep}
            formData={stepFormData.formData}
            onUpdateFormData={updateFormData}
            onNextStep={nextStep}
            onPrevStep={prevStep}
            onGoToStep={() => {}}
            isLastStep={stepFormData.currentStep === stepFormData.steps.length - 1}
            isFirstStep={stepFormData.currentStep === 0}
          />
          {isFormValid && (
            <button
              className="w-full py-3 px-4 mt-8 bg-amber-500 text-white rounded hover:bg-amber-600 font-bold"
              disabled={loading}
              onClick={async () => {
                if (!selectedPack?.id || !selectedMaintenance?.id) {
                  setError('Veuillez sélectionner un pack et une maintenance.');
                  return;
                }
                setLoading(true);
                setError(null);
                try {
                  await submitFullOrder({
                    ...stepFormData.formData,
                    packId: selectedPack.id,
                    maintenanceId: selectedMaintenance.id
                  });
                  setFormSubmitted(true);
                } catch (err) {
                  setError('Erreur lors de la soumission.');
                } finally {
                  setLoading(false);
                }
              }}
            >Valider ma commande</button>
          )}
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </section>
    );
  }

  // 4. Confirmation
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-bold mb-4 text-amber-700">Merci pour votre commande !</h2>
        <p className="text-gray-700 mb-8">Votre demande a bien été enregistrée. Vous recevrez un email de confirmation et pourrez suivre l’avancement dans votre espace client.</p>
        <button
          className="py-2 px-4 bg-amber-500 text-white rounded hover:bg-amber-600"
          onClick={() => {
            setSelectedPack(null);
            setSelectedMaintenance(null);
            setFormSubmitted(false);
          }}
        >Faire une nouvelle commande</button>
      </div>
    </section>
  );
};
