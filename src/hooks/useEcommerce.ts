import { useState, useEffect } from 'react';
import { Pack, MaintenanceOption, StepFormData, OrderData, Customer } from '../types/ecommerce';
import { DEFAULT_FORM_STEPS } from '../data/ecommerce-data';

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
  // Ajoutez ce state pour le token
  const [token, setToken] = useState<string | null>(null);

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedCustomer = localStorage.getItem('customer');
    const savedOrders = localStorage.getItem('orders');
    
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }
    
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Charger le token depuis le localStorage au démarrage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  // Sauvegarder les données dans localStorage
  const saveToStorage = (customerData: Customer, ordersData: OrderData[]) => {
    localStorage.setItem('customer', JSON.stringify(customerData));
    localStorage.setItem('orders', JSON.stringify(ordersData));
  };

  // Sauvegarder le token dans le localStorage
  const saveToken = (jwt: string) => {
    setToken(jwt);
    localStorage.setItem('token', jwt);
  };

  // Création ou connexion client via l'API
  const registerOrLoginCustomer = async (formData: any, isLogin = false) => {
    const endpoint = isLogin ? '/api/login' : '/api/customer';

    // Mapping des champs pour le backend
    const mappedData = {
      email: formData.mail,
      firstName: formData.prenom,
      lastName: formData.nom,
      phone: formData.telephone,
      password: formData.password
      // Ajoute d'autres champs si le backend les utilise
    };
    console.log('registerOrLoginCustomer - body envoyé:', JSON.stringify(mappedData));
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mappedData)
    });
    const data = await response.json();
    if (data.token) {
      saveToken(data.token);
      setCustomer(data);
      localStorage.setItem('customer', JSON.stringify(data));
    }
    return data;
  };

  // Sélectionner un pack
  const selectPack = (pack: Pack) => {
    setStepFormData(prev => ({
      ...prev,
      selectedPack: pack
    }));
  };

  // Sélectionner une maintenance
  const selectMaintenance = (maintenance: MaintenanceOption) => {
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

  // Créer une commande avec le token
  const createOrder = async (): Promise<OrderData> => {
    if (!stepFormData.selectedPack) throw new Error('Aucun pack sélectionné');
    if (!customer || !token) throw new Error('Client non authentifié');

    const orderPayload = {
      customerId: customer.id,
      pack: stepFormData.selectedPack,
      maintenance: stepFormData.selectedMaintenance,
      formData: stepFormData.formData,
      totalPrice: calculateTotal()
    };

    const response = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderPayload)
    });
    const order = await response.json();
    setOrders(prev => [...prev, order]);
    localStorage.setItem('orders', JSON.stringify([...orders, order]));
    return order;
  };

  // Récupérer les commandes du client
  const fetchCustomerOrders = async () => {
    if (!customer || !token) return [];
    const response = await fetch(`/api/customer/${customer.id}/orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    setOrders(data);
    localStorage.setItem('orders', JSON.stringify(data));
    return data;
  };

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
  const loginCustomer = (email: string) => {
    // Simulation de connexion - en production, cela ferait appel à une API
    const savedCustomer = localStorage.getItem('customer');
    if (savedCustomer) {
      const customerData = JSON.parse(savedCustomer);
      if (customerData.email === email) {
        setCustomer(customerData);
        return true;
      }
    }
    return false;
  };

  // Déconnexion complète (efface le token et les données locales)
  const logout = () => {
    setCustomer(null);
    setToken(null);
    setOrders([]);
    localStorage.removeItem('customer');
    localStorage.removeItem('token');
    localStorage.removeItem('orders');
  };

  return {
    // État
    stepFormData,
    customer,
    orders,
    token,

    // Actions
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
    registerOrLoginCustomer,
    fetchCustomerOrders,

    // Utilitaires
    isFormValid: stepFormData.steps.every(step => step.isCompleted) && stepFormData.selectedPack && stepFormData.selectedMaintenance,
    currentStep: stepFormData.steps[stepFormData.currentStep],
    isLastStep: stepFormData.currentStep === stepFormData.steps.length - 1,
    isFirstStep: stepFormData.currentStep === 0
  };
};