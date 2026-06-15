import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { addGalleryImage, removeGalleryImage } from '../services/gallery.services';

export const uploadImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file?.buffer) {
      res.status(400).json({ error: 'No image file provided' });
      return;
    }
    const image = await addGalleryImage(req.userId as string, req.file.buffer);
    res.status(201).json({ message: 'Image uploaded', image });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteImage = async (req: AuthRequest, res: Response) => {
  try {
    await removeGalleryImage(req.userId as string, req.params['publicId'] as string);
    res.status(200).json({ message: 'Image deleted' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
