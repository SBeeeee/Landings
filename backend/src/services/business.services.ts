import Business from '../models/Business.models';
import User from '../models/User.models';

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
export type IntakeBusinessInput = CreateBusinessInput;

const sanitizeString = (value?: string) => {
  if (!value) return undefined;
  return value
    .replace(/[<>"'`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const sanitizeUsername = (value?: string) => {
  const cleaned = sanitizeString(value)?.toLowerCase().replace(/[^a-z0-9-]/g, '');
  return cleaned;
};

const sanitizeIntake = (data: IntakeBusinessInput): IntakeBusinessInput => ({
  username: sanitizeUsername(data.username) || '',
  businessName: sanitizeString(data.businessName) || '',
  businessType: data.businessType,
  tagline: sanitizeString(data.tagline),
  description: sanitizeString(data.description),
  services: data.services?.map((service) => ({
    name: sanitizeString(service.name),
    description: sanitizeString(service.description),
    price: sanitizeString(service.price),
    duration: sanitizeString(service.duration),
  })),
  contact: data.contact
    ? {
        phone: sanitizeString(data.contact.phone),
        email: sanitizeString(data.contact.email)?.toLowerCase(),
        address: sanitizeString(data.contact.address),
        whatsapp: sanitizeString(data.contact.whatsapp),
        socialLinks: data.contact.socialLinks
          ? {
              instagram: sanitizeString(data.contact.socialLinks.instagram),
              facebook: sanitizeString(data.contact.socialLinks.facebook),
              linkedin: sanitizeString(data.contact.socialLinks.linkedin),
            }
          : undefined,
      }
    : undefined,
  gallery: data.gallery?.map((item) => sanitizeString(item) || '').filter(Boolean),
  operatingHours: data.operatingHours
    ? {
        monday: sanitizeString(data.operatingHours.monday),
        tuesday: sanitizeString(data.operatingHours.tuesday),
        wednesday: sanitizeString(data.operatingHours.wednesday),
        thursday: sanitizeString(data.operatingHours.thursday),
        friday: sanitizeString(data.operatingHours.friday),
        saturday: sanitizeString(data.operatingHours.saturday),
        sunday: sanitizeString(data.operatingHours.sunday),
      }
    : undefined,
  theme: sanitizeString(data.theme),
});

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

/**
 * Submit onboarding/intake data for business page creation.
 * Upserts a single record per user so they can re-submit as they refine details.
 */
export const submitBusinessIntake = async (
  userId: string,
  data: IntakeBusinessInput
) => {
  const sanitized = sanitizeIntake(data);

  const user = await User.findById(userId).select('username');
  if (!user) {
    throw new Error('User not found');
  }

  const existingByUser = await Business.findOne({ userId });
  if (existingByUser) {
    throw new Error('You can only create one site. Details are already submitted.');
  }

  // Default to auth username unless user intentionally provides a different one.
  if (!sanitized.username) {
    sanitized.username = user.username;
  }

  if (!sanitized.businessName) {
    throw new Error('Business name is required');
  }

  const existingByUsername = await Business.findOne({ username: sanitized.username });
  if (existingByUsername && existingByUsername.userId.toString() !== userId) {
    throw new Error("This username is already taken");
  }

  const business = await Business.create({
    ...sanitized,
    userId,
    updatedAt: new Date(),
  });

  return business;
};
