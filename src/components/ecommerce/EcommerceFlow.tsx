import React, { useState } from 'react';
import { useEcommerce } from '../../hooks/useEcommerce';
import { PackSelector } from './PackSelector';
import { StepForm } from './StepForm';
import { OrderSummary } from './OrderSummary';
import { CustomerDashboard } from './CustomerDashboard';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ArrowLeftIcon, ShoppingCartIcon, UserIcon, HomeIcon } from 'lucide-react';
import { CheckIcon } from 'lucide-react';
import { PACKS, MAINTENANCE_OPTIONS } from '../../data/ecommerce-data';
import { useEffect } from 'react';
import { cn } from '../../lib/utils';

type FlowStep = 'pack-selection' | 'maintenance-selection' | 'social-options' | 'form' | 'summary' | 'dashboard';

interface EcommerceFlowProps {
  initialFlow?: FlowStep;
  preSelectedPackId?: string;
  preSelectedMaintenanceId?: string | null;
}

export const EcommerceFlow: React.FC<EcommerceFlowProps> = ({ 
  initialFlow = 'pack-selection',
  preSelectedPackId,
  preSelectedMaintenanceId
}) => {
  const [currentFlow, setCurrentFlow] = useState<FlowStep>(initialFlow);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');

  const {
    stepFormData,
    customer,
    selectPack,
    selectMaintenance,
    updateFormData,
    goToStep,
    nextStep,
    prevStep,
    calculateTotal,
    createOrder,
    resetForm,
    loginCustomer,
    logout,
    isFormValid,
    currentStep,
    isLastStep,
    isFirstStep,
    createOrUpdateCustomer // <-- ajout pour tunnel fonctionnel
  } = useEcommerce();

  // Pré-sélection du pack si spécifié
  useEffect(() => {
    console.log('Pack useEffect - preSelectedPackId:', preSelectedPackId, 'current pack:', stepFormData.selectedPack);
    if (preSelectedPackId && !stepFormData.selectedPack) {
      const pack = PACKS.find(p => p.id === preSelectedPackId);
      console.log('Found pack:', pack);
      if (pack) {
        console.log('Selecting pack via useEffect:', pack);
        selectPack(pack);
      }
    }
  }, [preSelectedPackId, stepFormData.selectedPack, selectPack]);

  // Pré-sélection de la maintenance si spécifiée
  useEffect(() => {
    if (preSelectedMaintenanceId !== undefined) {
      const option = preSelectedMaintenanceId ? MAINTENANCE_OPTIONS.find(m => m.id === preSelectedMaintenanceId) : null;
      if (option && !stepFormData.selectedMaintenance) {
        selectMaintenance(option);
      }
    }
  }, [preSelectedMaintenanceId, stepFormData.selectedMaintenance, selectMaintenance]);

  // Debug: afficher l'état actuel
  console.log('EcommerceFlow render - currentFlow:', currentFlow);
  console.log('EcommerceFlow render - selectedPack:', stepFormData.selectedPack?.title);
  console.log('EcommerceFlow render - selectedMaintenance:', stepFormData.selectedMaintenance?.title);

  // Gestion de la connexion (async)
  const handleLogin = async () => {
    const customer = await loginCustomer(loginEmail);
    if (customer) {
      setCurrentFlow('dashboard');
      setShowLogin(false);
      setLoginEmail('');
    } else {
      alert('Client non trouvé. Veuillez passer une commande d\'abord.');
    }
  };

  // Gestion de la déconnexion
  const handleLogout = () => {
    logout();
    setCurrentFlow('pack-selection');
    resetForm();
  };

  // Finaliser la commande : crée ou met à jour le client avant la commande
  const handleCompleteOrder = async () => {
    try {
      // Création ou mise à jour du client avant commande
      const { firstName, lastName, email, phone } = stepFormData.formData;
      await createOrUpdateCustomer({ firstName, lastName, email, phone });
      await createOrder();
      alert('Commande créée avec succès !');
      setCurrentFlow('dashboard');
    } catch (error) {
      alert('Erreur lors de la création de la commande');
    }
  };

  // Navigation entre les étapes
  const handlePackSelected = () => {
    console.log('handlePackSelected - going to maintenance-selection');
    setCurrentFlow('maintenance-selection');
  };

  const handleMaintenanceSelected = () => {
    console.log('handleMaintenanceSelected - going to social-options');
    setCurrentFlow('social-options');
  };

  const handleFormCompleted = () => {
    setCurrentFlow('summary');
  };

  const goBack = () => {
    switch (currentFlow) {
      case 'maintenance-selection':
        setCurrentFlow('pack-selection');
        break;
      case 'form':
        setCurrentFlow('maintenance-selection');
        break;
      case 'summary':
        setCurrentFlow('form');
        break;
      default:
        break;
    }
  };

  // Si un client est connecté et on est sur le dashboard
  if (customer && currentFlow === 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-blue-gray900 font-heading-2">Espace client</h1>
            <button
              onClick={handleLogout}
              className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-2 rounded-xl shadow"
            >
              Se déconnecter
            </button>
          </div>
          <div className="bg-white/90 backdrop-blur-sm border-amber-200/50 shadow-lg rounded-2xl p-8">
            <CustomerDashboard
              customer={customer}
              onLogout={handleLogout}
              className="w-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-gray-50 via-white to-amber-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-gray-200/50">
          <div className="flex items-center space-x-4">
            {/* Bouton retour à l'accueil */}
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-100"
            >
              <HomeIcon className="w-4 h-4" />
              Accueil
            </Button>
            
            {currentFlow !== 'pack-selection' && (
              <Button
                variant="outline"
                onClick={goBack}
                className="flex items-center gap-2 border-blue-gray-300 text-blue-gray900 hover:bg-blue-gray-100"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Retour
              </Button>
            )}
            <h1 className="text-3xl font-bold text-blue-gray900 font-heading-2">
              Commande en ligne
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Indicateur panier */}
            {stepFormData.selectedPack && (
              <div className="flex items-center gap-2 bg-blue-gray-100 px-4 py-2 rounded-full border border-blue-gray-300 shadow-md">
                <ShoppingCartIcon className="w-4 h-4 text-blue-gray900" />
                <span className="text-sm font-medium text-blue-gray900">
                  {calculateTotal()}€
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {currentFlow === 'pack-selection' && (
              <PackSelector
                selectedPack={stepFormData.selectedPack}
                onSelectPack={(pack) => {
                  selectPack(pack);
                  handlePackSelected();
                }}
              />
            )}

            {currentFlow === 'maintenance-selection' && (
              <Card className="bg-white/95 backdrop-blur-sm border-blue-gray-200/50 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-gray-100 to-amber-50 p-8">
                  <h2 className="text-3xl font-bold text-blue-gray900 mb-4 font-heading-2 text-center">
                    Choisissez votre maintenance (obligatoire)
                  </h2>
                  <p className="text-blue-gray600 font-body-l text-center">
                    Sélectionnez le niveau de maintenance qui vous convient
                  </p>
                </CardHeader>

                <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {MAINTENANCE_OPTIONS.map((maintenance) => {
                    const isSelected = stepFormData.selectedMaintenance?.id === maintenance.id;
                    
                    return (
                      <Card
                        key={maintenance.id}
                        className={cn(
                          "cursor-pointer transition-all duration-300 hover:scale-105 border-2 rounded-xl overflow-hidden",
                          isSelected
                            ? "border-blue-gray-400 bg-blue-gray-50 shadow-lg"
                            : "border-blue-gray-200 hover:border-blue-gray-300 hover:shadow-lg bg-white"
                        )}
                        onClick={() => {
                          selectMaintenance(maintenance);
                        }}
                      >
                        {isSelected && (
                          <div className="absolute top-4 right-4 w-8 h-8 bg-blue-gray-400 rounded-full flex items-center justify-center shadow-md">
                            <CheckIcon className="w-4 h-4 text-white" />
                          </div>
                        )}

                        <CardHeader className="text-center pb-4 bg-gradient-to-b from-white to-blue-gray-50/30 p-6">
                          <h3 className="text-xl font-bold text-blue-gray900 mb-2 font-heading-6">
                            {maintenance.title}
                          </h3>
                          <div className="text-3xl font-bold text-blue-gray900 mb-2">
                            {maintenance.price}€/mois
                          </div>
                        </CardHeader>

                        <CardContent className="p-6">
                          <p className="text-blue-gray700 text-sm text-center font-body-m">
                            {maintenance.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                     setCurrentFlow('form');
                    }}
                    disabled={!stepFormData.selectedMaintenance}
                    className="bg-blue-gray900 hover:bg-blue-gray700 text-white font-medium px-8 py-3 rounded-xl shadow-md"
                  >
                    Continuer
                  </Button>
                </div>
                </CardContent>
              </Card>
            )}

            {currentFlow === 'form' && (
              <StepForm
                steps={stepFormData.steps}
                currentStep={stepFormData.currentStep}
                formData={stepFormData.formData}
                onUpdateFormData={updateFormData}
                onNextStep={() => {
                  if (isLastStep && isFormValid) {
                    handleFormCompleted();
                  } else {
                    nextStep();
                  }
                }}
                onPrevStep={prevStep}
                onGoToStep={goToStep}
                isLastStep={isLastStep}
                isFirstStep={isFirstStep}
                className="bg-white/95 backdrop-blur-sm border-blue-gray-200/50 shadow-lg rounded-2xl"
              />
            )}

            {currentFlow === 'summary' && (
              <div className="space-y-6">
                <Card className="bg-white/95 backdrop-blur-sm border-blue-gray-200/50 shadow-lg rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-gray-100 to-amber-50 p-8">
                    <h2 className="text-3xl font-bold text-blue-gray900 mb-2 font-heading-2 text-center">
                      Finaliser votre commande
                    </h2>
                  </CardHeader>
                  <CardContent className="p-8">
                    
                    <div className="space-y-4 mb-6">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-semibold text-green-800 mb-2">
                          ✅ Votre commande est prête !
                        </h3>
                        <p className="text-green-700 text-sm">
                          Vérifiez les détails ci-contre et cliquez sur "Confirmer la commande" 
                          pour finaliser votre achat.
                        </p>
                      </div>
                      
                      <div className="bg-blue-gray-50 border border-blue-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-semibold text-blue-gray900 mb-2">
                          📧 Prochaines étapes
                        </h3>
                        <ul className="text-blue-gray700 text-sm space-y-1">
                          <li>• Vous recevrez un email de confirmation</li>
                          <li>• Notre équipe vous contactera sous 24h</li>
                          <li>• Accès à votre espace client pour suivre l'avancement</li>
                        </ul>
                      </div>
                    </div>

                    <Button
                      onClick={handleCompleteOrder}
                      className="w-full bg-blue-gray900 hover:bg-blue-gray700 text-white text-lg py-4 rounded-xl shadow-lg font-medium"
                    >
                      Confirmer la commande
                    </Button>
                    
                    <div className="text-center mt-4">
                      <Button
                        variant="outline"
                        onClick={() => window.location.href = '/'}
                        className="text-blue-gray700 hover:text-blue-gray900 border-blue-gray-300 hover:bg-blue-gray-100"
                      >
                        Retourner à l'accueil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary
                selectedPack={stepFormData.selectedPack}
                selectedMaintenance={stepFormData.selectedMaintenance}
                formData={stepFormData.formData}
                totalPrice={calculateTotal()}
                className="bg-white/95 backdrop-blur-sm border-blue-gray-200/50 shadow-lg rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};