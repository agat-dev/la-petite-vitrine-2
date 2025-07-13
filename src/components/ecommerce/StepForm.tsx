import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { FormStep, FormField } from '../../types/ecommerce';
import { cn } from '../../lib/utils';

import { useEcommerce } from '../../hooks/useEcommerce';

interface StepFormProps {
  steps: FormStep[];
  currentStep: number;
  formData: Record<string, any>;
  onUpdateFormData: (stepId: string, data: Record<string, any>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onGoToStep: (stepIndex: number) => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  className?: string;
}

export const StepForm: React.FC<StepFormProps> = ({
  steps,
  currentStep,
  formData,
  onUpdateFormData,
  onNextStep,
  onPrevStep,
  onGoToStep,
  isLastStep,
  isFirstStep,
  className
}) => {
  const [currentStepData, setCurrentStepData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Appel du hook à l'intérieur du composant
  const { registerOrLoginCustomer, createOrder, stepFormData } = useEcommerce();

  const currentStepInfo = steps[currentStep];

  // Validation des champs
  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && (!value || value.toString().trim() === '')) {
      return `${field.label} est requis`;
    }

    if (field.validation) {
      const { pattern, minLength, maxLength } = field.validation;
      
      if (minLength && value && value.toString().length < minLength) {
        return `${field.label} doit contenir au moins ${minLength} caractères`;
      }
      
      if (maxLength && value && value.toString().length > maxLength) {
        return `${field.label} ne peut pas dépasser ${maxLength} caractères`;
      }
      
      if (pattern && value && !new RegExp(pattern).test(value.toString())) {
        return `${field.label} n'est pas valide`;
      }
    }

    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.toString())) {
        return 'Email non valide';
      }
    }

    return null;
  };

  // Validation de l'étape courante
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    currentStepInfo.fields.forEach(field => {
      const value = currentStepData[field.id] || formData[field.id];
      const error = validateField(field, value);
      
      if (error) {
        newErrors[field.id] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Gérer le changement de valeur d'un champ
  const handleFieldChange = (fieldId: string, value: any) => {
    setCurrentStepData(prev => ({
      ...prev,
      [fieldId]: value
    }));

    // Effacer l'erreur si elle existe
    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev, 
        [fieldId]: ''
      }));
    }
  };

  // Passer à l'étape suivante
  const handleNext = async () => {
    if (validateCurrentStep()) {
      // Fusionne les données du step courant dans le formData global 
      onUpdateFormData(currentStepInfo.id, currentStepData);
      setCurrentStepData({});
      if (isLastStep) {
        // Ajoute un log ici pour vérifier le formData global
        console.log('StepForm - formData envoyé:', formData);
        setLoading(true);
        setApiError(null);
        setSuccess(null);
        try {
          await registerOrLoginCustomer(formData);
          await createOrder();
          setSuccess('Commande enregistrée avec succès !');
        } catch (err) {
          setApiError('Erreur lors de la création de la commande ou du client.');
        } finally {
          setLoading(false);
        }
      } else {
        onNextStep();
      }
    }
  };

  // Revenir à l'étape précédente
  const handlePrev = () => {
    onUpdateFormData(currentStepInfo.id, currentStepData);
    setCurrentStepData({});
    onPrevStep();
  };

  // Rendu d'un champ de formulaire
  const renderField = (field: FormField) => {
    const value = currentStepData[field.id] || formData[field.id] || '';
    const error = errors[field.id];

    const baseInputClasses = cn(
      "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400",
      error ? "border-red-400" : "border-amber-300 focus:border-amber-400"
    );

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-blue-gray900 font-body-m">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              className={cn(baseInputClasses, "min-h-[100px] resize-vertical")}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-blue-gray900 font-body-m">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <select
              className={baseInputClasses}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            >
              <option value="">Sélectionnez une option</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      case 'radio':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-blue-gray900 font-body-m">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-3">
              {field.options?.map(option => (
                <label key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border border-amber-200 hover:bg-amber-50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name={field.id}
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    className="text-amber-600 focus:ring-amber-400"
                  />
                  <span className="text-sm text-blue-gray700 font-body-m">{option.label}</span>
                </label>
              ))}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      case 'file':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-blue-gray900 font-body-m">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              className={baseInputClasses}
              onChange={(e) => handleFieldChange(field.id, e.target.files?.[0])}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      default:
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-blue-gray900 font-body-m">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              className={baseInputClasses}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Indicateur d'étapes */}
      <div className="flex items-center justify-center space-x-4 mb-8 bg-gradient-to-r from-amber-100 to-blue-gray-100 p-6 rounded-xl">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => onGoToStep(index)}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 shadow-md",
                index === currentStep
                  ? "bg-amber-600 text-white scale-110"
                  : step.isCompleted
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-600 border-2 border-amber-200"
              )}
            >
              {step.isCompleted ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </button>
            {index < steps.length - 1 && (
              <div className="w-12 h-1 bg-amber-200 mx-2 rounded-full" />
            )}
          </div>
        ))}
      </div>

      {/* Formulaire de l'étape courante */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-blue-gray-50 p-8">
          <h2 className="text-2xl font-bold text-blue-gray900 font-heading-2">
            {currentStepInfo.title}
          </h2>
          {currentStepInfo.description && (
            <p className="text-blue-gray600 font-body-l mt-2">{currentStepInfo.description}</p>
          )}
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          {currentStepInfo.fields.map(renderField)}

          {/* Affichage des messages d'état */}
          {loading && <p className="text-amber-600">Enregistrement en cours...</p>}
          {success && <p className="text-green-600 font-bold">{success}</p>}
          {apiError && <p className="text-red-600 font-bold">{apiError}</p>}

          {/* Boutons de navigation */}
          <div className="flex justify-between pt-8 border-t border-amber-200">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={isFirstStep || loading}
              className="flex items-center gap-2 border-amber-300 text-amber-900 hover:bg-amber-50"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              Précédent
            </Button>

            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl shadow-md"
              disabled={loading}
            >
              {isLastStep ? 'Terminer' : 'Suivant'}
              {!isLastStep && <ChevronRightIcon className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};