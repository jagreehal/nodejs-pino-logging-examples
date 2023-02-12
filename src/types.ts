import pino from 'pino';

declare module 'express' {
  interface Request {
    logger: pino.Logger;
    id: string;
  }
}
