import type { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.js';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  void _next;

  if (err instanceof HttpError) {
    res.status(err.status).json({ ok: false, error: err.message });
    return;
  }

  console.error('[backend] request failed', err);
  res.status(500).json({ ok: false, error: 'Internal server error' });
};
