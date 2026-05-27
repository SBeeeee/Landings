import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { Request } from 'express';
import {
  createBusiness,
  getMyBusiness,
  getPublicBusiness,
  updateBusiness,
  togglePublish,
  deleteBusiness,
  checkUsernameAvailability,
  submitBusinessIntake,
} from '../services/business.services';

// POST /api/business
export const create = async (req: AuthRequest, res: Response) => {
  try {
    const business = await createBusiness(req.userId as string, req.body);
    res.status(201).json({ message: 'Business page created', business });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/business/me
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const business = await getMyBusiness(req.userId as string);
    res.status(200).json({ business });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

// GET /api/business/public/:username  (no auth)
export const getPublic = async (req: Request, res: Response) => {
  try {
    const business = await getPublicBusiness(req.params['username'] as string);
    res.status(200).json({ business });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

// PUT /api/business/me
export const update = async (req: AuthRequest, res: Response) => {
  try {
    const business = await updateBusiness(req.userId as string, req.body);
    res.status(200).json({ message: 'Business page updated', business });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH /api/business/me/publish
export const publish = async (req: AuthRequest, res: Response) => {
  try {
    const business = await togglePublish(req.userId as string);
    const status = business.isPublished ? 'published' : 'unpublished';
    res.status(200).json({ message: `Business page ${status}`, business });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/business/me
export const remove = async (req: AuthRequest, res: Response) => {
  try {
    await deleteBusiness(req.userId as string);
    res.status(200).json({ message: 'Business page deleted' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/business/check-username/:username  (no auth)
export const checkUsername = async (req: Request, res: Response) => {
  try {
    const result = await checkUsernameAvailability(
      req.params['username'] as string
    );
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// POST /api/business/intake
export const submitIntake = async (req: AuthRequest, res: Response) => {
  try {
    const business = await submitBusinessIntake(req.userId as string, req.body);
    res.status(200).json({ message: 'Business intake saved', business });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
