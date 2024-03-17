import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.Http({
      batch: true,
      host: 'localhost',
      path: 'api/log',
      port: 3000,
    }),
  ],
});
