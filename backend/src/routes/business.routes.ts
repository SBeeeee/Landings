import express from 'express';
import { verifyUser } from '../middlewares/auth.middleware';
import {
  create,
  getMe,
  getPublic,
  update,
  publish,
  remove,
  checkUsername,
} from '../controllers/business.controller';

const router = express.Router();

// ── Public routes (no auth) ───────────────────────────────────────────────────
router.get('/public/:username', getPublic);
router.get('/check-username/:username', checkUsername);

// ── Protected routes (must be logged in) ─────────────────────────────────────
router.post('/', verifyUser, create);
router.get('/me', verifyUser, getMe);
router.put('/me', verifyUser, update);
router.patch('/me/publish', verifyUser, publish);
router.delete('/me', verifyUser, remove);

export default router;
