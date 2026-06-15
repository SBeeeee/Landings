import express from 'express';
import { verifyUser } from '../middlewares/auth.middleware';
import upload from '../middlewares/upload.middleware';
import { uploadImage, deleteImage } from '../controllers/gallery.controller';

const router = express.Router();

router.post('/images', verifyUser, upload.single('image'), uploadImage);
router.delete('/images/:publicId', verifyUser, deleteImage);

export default router;
