export function notFoundHandler(req, res, next) {
  res.status(404).json({ message: 'Recurso no encontrado' });
}

export function errorHandler(err, req, res, next) {
  console.error('Unhandled error:', err);

  if (res.headersSent) return next(err);

  res.status(500).json({ message: 'Error interno del servidor' });
}
