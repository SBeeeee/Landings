import Business from '../models/Business.models';
import { uploadToCloudinary, deleteFromCloudinary, GalleryImage } from '../utils/cloudinary';

export const addGalleryImage = async (
  userId: string,
  buffer: Buffer
): Promise<GalleryImage> => {
  const business = await Business.findOne({ userId });
  if (!business) {
    throw new Error('No business page found');
  }

  if (business.gallery && business.gallery.length >= 3) {
    throw new Error('Gallery limit reached. You can only upload up to 3 images.');
  }

  const image = await uploadToCloudinary(buffer, `landings/${business.username}`);
  await Business.updateOne({ userId }, { $push: { gallery: image } });

  return image;
};

export const removeGalleryImage = async (
  userId: string,
  publicId: string
): Promise<void> => {
  const business = await Business.findOne({ userId });
  if (!business) {
    throw new Error('No business page found');
  }

  const exists = business.gallery.some((img) => img.publicId === publicId);
  if (!exists) {
    throw new Error('Image not found in gallery');
  }

  await deleteFromCloudinary(publicId);
  await Business.updateOne({ userId }, { $pull: { gallery: { publicId } } });
};
