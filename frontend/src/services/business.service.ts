import api from '../utils/api';

export type BusinessType =
  | 'salon'
  | 'tutor'
  | 'boutique'
  | 'gym'
  | 'restaurant'
  | 'other';

export interface ContactInput {
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
}

export interface BusinessIntakeInput {
  username: string;
  businessName: string;
  businessType: BusinessType;
  tagline?: string;
  description?: string;
  contact?: ContactInput;
}

export interface Business {
  _id: string;
  userId: string;
  username: string;
  businessName: string;
  businessType: BusinessType;
  tagline?: string;
  description?: string;
  contact?: ContactInput;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

const businessService = {
  submitIntake: async (data: BusinessIntakeInput): Promise<Business> => {
    const res = await api.post('/business/intake', data);
    return res.data.business;
  },

  getMyBusiness: async (): Promise<Business> => {
    const res = await api.get('/business/me');
    return res.data.business;
  },
};

export default businessService;
