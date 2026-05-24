import Business from '../models/Business.models';

// ── Input types ───────────────────────────────────────────────────────────────

export interface ServiceItem {
  name?: string;
  description?: string;
  price?: string;
  duration?: string;
}

export interface ContactInput {
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
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

export interface CreateBusinessInput {
  username: string;
  businessName: string;
  businessType: 'salon' | 'tutor' | 'boutique' | 'gym' | 'restaurant' | 'other';
  tagline?: string;
  description?: string;
  services?: ServiceItem[];
  contact?: ContactInput;
  gallery?: string[];
  operatingHours?: OperatingHours;
  theme?: string;
}

export type UpdateBusinessInput = Partial<Omit<CreateBusinessInput, 'username'>>;

// ── Service functions ─────────────────────────────────────────────────────────

/**
 * Create a new business page for a user.
 * One user can have only one business page.
 */
export const createBusiness = async (
  userId: string,
  data: CreateBusinessInput
) => {
  // One user → one business
  const existing = await Business.findOne({ userId });
  if (existing) {
    throw new Error('You already have a business page');
  }

  // Username must be unique (enforced by schema index too, but fail early)
  const takenUsername = await Business.findOne({ username: data.username });
  if (takenUsername) {
    throw new Error('This username is already taken');
  }

  const business = await Business.create({ ...data, userId });
  return business;
};

/**
 * Get the authenticated user's own business page.
 */
export const getMyBusiness = async (userId: string) => {
  const business = await Business.findOne({ userId });
  if (!business) {
    throw new Error('No business page found');
  }
  return business;
};

/**
 * Get a public business page by username (no auth required).
 * Only returns published pages.
 */
export const getPublicBusiness = async (username: string) => {
  const business = await Business.findOne({ username, isPublished: true });
  if (!business) {
    throw new Error('Page not found');
  }
  return business;
};

/**
 * Update the authenticated user's business page.
 */
export const updateBusiness = async (
  userId: string,
  data: UpdateBusinessInput
) => {
  const business = await Business.findOneAndUpdate(
    { userId },
    { ...data, updatedAt: new Date() },
    { new: true, runValidators: true }
  );
  if (!business) {
    throw new Error('No business page found');
  }
  return business;
};

/**
 * Toggle publish/unpublish.
 */
export const togglePublish = async (userId: string) => {
  const business = await Business.findOne({ userId });
  if (!business) {
    throw new Error('No business page found');
  }
  business.isPublished = !business.isPublished;
  business.updatedAt = new Date();
  await business.save();
  return business;
};

/**
 * Delete the authenticated user's business page.
 */
export const deleteBusiness = async (userId: string) => {
  const business = await Business.findOneAndDelete({ userId });
  if (!business) {
    throw new Error('No business page found');
  }
};

/**
 * Check if a username is available (public, no auth).
 */
export const checkUsernameAvailability = async (username: string) => {
  const existing = await Business.findOne({ username });
  return { available: !existing };
};
