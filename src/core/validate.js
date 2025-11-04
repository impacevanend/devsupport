// src/core/validate.js
import { ZodError } from 'zod';

export function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.validated = schema.parse(req.body);
      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        const issues = err.issues.map(e => ({
          path: Array.isArray(e.path) ? e.path.join('.') : String(e.path ?? ''),
          message: e.message,
        }));
        return res.status(400).json({
          message: 'Validación fallida',
          errors: issues,
        });
      }
      return next(err);
    }
  };
}
