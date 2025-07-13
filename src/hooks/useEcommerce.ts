import { useState, useEffect } from 'react';
import { Pack, MaintenanceOption, StepFormData, OrderData, Customer } from '../types/ecommerce';
import { DEFAULT_FORM_STEPS } from '../data/ecommerce-data';

const API_URL = '/api/ecommerce';

export const useEcommerce = () => {
  const [stepFormData, setStepFormData] = useState<StepFormData>({
    currentStep: 0,
    steps: DEFAULT_FORM_STEPS,
    formData: {},
    selectedPack: undefined,
    selectedMaintenance: undefined,
    selectedSocialOptions: []
  });

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<OrderData[]>([]);

  // Charger le catalogue packs/maintenance
  useEffect(() => {
    fetch(`${API_URL}/catalog`)
      .then(res => res.json())
      .then(data => {
        // Optionnel : stocker le catalogue dans le state si besoin
      });
  }, []);

  // Sauvegarder les données dans localStorage

  // Créer ou mettre à jour le client
  const createOrUpdateCustomer = async (formData: any): Promise<Customer> => {
    // formData doit contenir password
    const res = await fetch(`${API_URL}/customer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (!res.ok) throw new Error('Erreur création client');
    const customer = await res.json();
    setCustomer(customer);
    return customer;
  };

  // Connexion client
  const loginCustomer = async (email: string, password: string): Promise<Customer | null> => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) return null;
    const customer = await res.json();
    setCustomer(customer);
    // Récupérer les commandes du client
    const ordersRes = await fetch(`${API_URL}/customer/${customer.id}/orders`);
    const orders = ordersRes.ok ? await ordersRes.json() : [];
    setOrders(orders);
    return customer;
  };

  // Créer une commande
  const createOrder = async (): Promise<OrderData> => {
    if (!stepFormData.selectedPack) throw new Error('Aucun pack sélectionné');
    if (!customer) throw new Error('Aucun client connecté');
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerId: customer.id,
        pack: stepFormData.selectedPack,
        maintenance: stepFormData.selectedMaintenance,
        formData: stepFormData.formData,
        totalPrice: calculateTotal()
      })
    });
    if (!res.ok) throw new Error('Erreur création commande');
    const order = await res.json();
    setOrders(prev => [...prev, order]);
    return order;
  };

  // Déconnexion
  const logout = () => {
    setCustomer(null);
    setOrders([]);
  };

  // Sélectionner un pack
  const selectPack = (pack: Pack) => {
    console.log('Selecting pack:', pack);
    setStepFormData(prev => ({
      ...prev,
      selectedPack: pack
    }));
  };

  // Sélectionner une maintenance
  const selectMaintenance = (maintenance: MaintenanceOption) => {
    console.log('Selecting maintenance:', maintenance);
    setStepFormData(prev => ({
      ...prev,
      selectedMaintenance: maintenance
    }));
  };
  // Sélectionner une maintenance
  const selectSocialOptions = (options: MaintenanceOption[]) => {
    console.log('Selecting social options:', options);
    setStepFormData(prev => ({
      ...prev,
      selectedSocialOptions: options
    }));
  };

  // Mettre à jour les données du formulaire
  const updateFormData = (stepId: string, fieldData: Record<string, any>) => {
    setStepFormData(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        ...fieldData
      },
      steps: prev.steps.map(step => 
        step.id === stepId 
          ? { ...step, isCompleted: true }
          : step
      )
    }));
  };

  // Naviguer entre les étapes
  const goToStep = (stepIndex: number) => {
    setStepFormData(prev => ({
      ...prev,
      currentStep: stepIndex
    }));
  };

  const nextStep = () => {
    setStepFormData(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.steps.length - 1)
    }));
  };

  const prevStep = () => {
    setStepFormData(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0)
    }));
  };

  // Calculer le prix total
  const calculateTotal = () => {
    const packPrice = stepFormData.selectedPack?.price || 0;
    // La maintenance est facturée séparément (mensuelle)
    return packPrice;
  };

  // Créer une commande
  // (supprimé: ancienne version createOrder)

  // Réinitialiser le formulaire
  const resetForm = () => {
    setStepFormData({
      currentStep: 0,
      steps: DEFAULT_FORM_STEPS.map(step => ({ ...step, isCompleted: false })),
      formData: {},
      selectedPack: undefined,
      selectedMaintenance: undefined,
      selectedSocialOptions: []
    });
  };

  // Connexion client
  // (supprimé: ancienne version loginCustomer)

  // Déconnexion
  // (supprimé: ancienne version logout)

  return {
    stepFormData,
    customer,
    orders,
    selectPack,
    selectMaintenance,
    selectSocialOptions,
    updateFormData,
    goToStep,
    nextStep,
    prevStep,
    calculateTotal,
    createOrder,
    resetForm,
    loginCustomer,
    logout,
    createOrUpdateCustomer,
    isFormValid: stepFormData.steps.every(step => step.isCompleted) && stepFormData.selectedPack && stepFormData.selectedMaintenance,
    currentStep: stepFormData.steps[stepFormData.currentStep],
    isLastStep: stepFormData.currentStep === stepFormData.steps.length - 1,
    isFirstStep: stepFormData.currentStep === 0
  };
};