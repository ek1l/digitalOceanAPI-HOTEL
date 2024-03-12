import { NextFunction, Request, Response } from 'express';
import { AppError } from './appError.erros';
import { ZodError } from 'zod';
import { JsonWebTokenError } from 'jsonwebtoken';

export class HandleErrors {
  static execute(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof ZodError) {
      const errorMessage = err.errors.map(error => error.message).join(', ');
      return res.status(409).json({ error: errorMessage });
    } else if (err instanceof JsonWebTokenError) {
      return res.status(401).json({ error: err.message });
    } else {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}