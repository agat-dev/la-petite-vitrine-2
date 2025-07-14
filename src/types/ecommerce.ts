export interface Pack {
  id: string;
  title: string;
  price: number;
  description: string;
  features: string[];
  deliveryTime: string;
}

export interface MaintenanceOption {
  id: string;
  title: string;
  price: number;
  description: string;
  features: string[];
  billingCycle: 'monthly' | 'yearly' | 'one-time';
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  isCompleted: boolean;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

export interface OrderData {
  pack: Pack;
  maintenance?: MaintenanceOption;
  formData: Record<string, any>;
  totalPrice: number;
  status: 'draft' | 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
  orders: OrderData[];
}

export interface StepFormData {
  currentStep: number;
  steps: FormStep[];
  formData: Record<string, any>;
  selectedPack?: Pack;
  selectedMaintenance?: MaintenanceOption;
  selectedSocialOptions?: MaintenanceOption[];
}