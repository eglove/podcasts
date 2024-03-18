import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.Http({
      batch: true,
      host: process.env.PUBLIC_HOST,
      path: 'api/log',
      port: Number(process.env.PUBLIC_PORT),
    }),
  ],
});
