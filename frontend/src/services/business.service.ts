import api from '../utils/api';

export type BusinessType =
  | 'salon'
  | 'tutor'
  | 'boutique'
  | 'gym'
  | 'restaurant'
  | 'other';

export interface ServiceItem {
  name?: string;
  description?: string;
  price?: string;
  duration?: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

export interface ContactInput {
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
  socialLinks?: SocialLinks;
}

export interface OperatingHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface BusinessIntakeInput {
  username: string;
  businessName: string;
  businessType: BusinessType;
  tagline?: string;
  description?: string;
  services?: ServiceItem[];
  contact?: ContactInput;
  operatingHours?: OperatingHours;
}

export interface Business {
  _id: string;
  userId: string;
  username: string;
  businessName: string;
  businessType: BusinessType;
  tagline?: string;
  description?: string;
  services?: ServiceItem[];
  contact?: ContactInput;
  operatingHours?: OperatingHours;
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

  updateBusiness: async (data: Partial<BusinessIntakeInput>): Promise<Business> => {
    const res = await api.put('/business/me', data);
    return res.data.business;
  },

  getPublicBusiness: async (username: string): Promise<Business> => {
    const res = await api.get(`/business/public/${username}`);
    return res.data.business;
  },
};

export default businessService;
