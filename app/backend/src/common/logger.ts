import * as winston from 'winston';

type Transports = winston.transports.ConsoleTransportInstance[];

const transports: Transports = [
  new winston.transports.Console({
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.simple()
    ),
  }),
];

const Logger: winston.Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports,
});

export { Logger };
