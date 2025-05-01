import winston from 'winston';

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   debug: 4,
//   verbose: 5,
//   silly: 6,
// };

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'blue',
  debug: 'magenta',
};

winston.addColors(colors);

// Console format - with colors
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

// File format - without colors
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.uncolorize(),
  winston.format.json(),
);

// Create the logger with a default level
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    // Console transport with colors
    new winston.transports.Console({
      format: consoleFormat,
    }),
    // File transports without colors (only in production)
    ...(process.env.NODE_ENV === 'production'
      ? [
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: fileFormat,
          }),
          new winston.transports.File({
            filename: 'logs/combined.log',
            format: fileFormat,
          }),
        ]
      : []),
  ],
});

// Function to update logger level after env is loaded
export const updateLoggerLevel = (level: string) => {
  logger.level = level;
};
