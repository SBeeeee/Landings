import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';

const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

const isObject = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value);

const sanitizeInput = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeInput(item));
  }

  if (isObject(value)) {
    const sanitizedEntries = Object.entries(value)
      .filter(([key]) => !key.startsWith('$') && !key.includes('.'))
      .map(([key, nestedValue]) => [key, sanitizeInput(nestedValue)]);

    return Object.fromEntries(sanitizedEntries);
  }

  if (typeof value === 'string') {
    return value.replace(/[<>"'`]/g, '').trim();
  }

  return value;
};

export const requestSanitizer = (req: Request, _res: Response, next: NextFunction) => {
  if (req.body) {
    req.body = sanitizeInput(req.body);
  }

  next();
};

export const issueCsrfToken = (req: Request, res: Response, next: NextFunction) => {
  const existing = req.cookies?.[CSRF_COOKIE_NAME];
  if (!existing) {
    res.cookie(CSRF_COOKIE_NAME, crypto.randomBytes(32).toString('hex'), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
  }
  next();
};

export const enforceCsrf = (req: Request, res: Response, next: NextFunction) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const cookieToken = req.cookies?.[CSRF_COOKIE_NAME];
  const headerToken = req.headers[CSRF_HEADER_NAME] as string | undefined;

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({ error: 'CSRF validation failed' });
  }

  next();
};
