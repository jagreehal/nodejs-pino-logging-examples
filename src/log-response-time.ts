import { logger } from './logger';
import express from 'express';

export function logResponseTime(req: express.Request, res, next) {
  const start = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const responseTime = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);

    logger.info({ responseTime });
    req.logger.info({ responseTime });
  });

  next();
}
