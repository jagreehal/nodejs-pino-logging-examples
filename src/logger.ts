import pino from 'pino';

export const logger = pino({
  transport: {
    targets: [
      {
        level: 'info',
        target: 'pino-pretty',
        options: {},
      },
    ],
  },
  options: {
    colorize: true,
  },
});
