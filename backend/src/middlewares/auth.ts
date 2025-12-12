import crypto from 'crypto';
import type { NextFunction, Request, Response } from 'express';
import { getAuthToken } from '../services/auth-token.js';
import { HttpError } from '../errors/http-error.js';

const HEADER_NAME = 'x-kidsprotect-token';

const timingSafeEqual = (provided: string, expected: string): boolean => {
  const expectedBuffer = Buffer.from(expected, 'utf8');
  const providedBuffer = Buffer.from(provided, 'utf8');

  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, providedBuffer);
};

export const requireAuthToken = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const provided = (req.get(HEADER_NAME) ?? '').trim();
  if (!provided) {
    next(new HttpError(401, 'Missing auth token'));
    return;
  }

  try {
    const token = await getAuthToken();
    const valid = timingSafeEqual(provided, token);
    if (!valid) {
      next(new HttpError(403, 'Invalid auth token'));
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};
