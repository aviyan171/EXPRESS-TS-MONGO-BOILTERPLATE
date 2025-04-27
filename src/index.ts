import './config/loadEnv';
import { createApp } from './config/app';
import { connectDB } from './config/database';
import { env } from './config/env';
import { logger } from './utils/logger';

const startServer = async () => {
  // Connect to database
  await connectDB();

  // Create Express app with configurations
  const app = createApp({
    enableCors: true,
    enableHelmet: true,
    enableCompression: true,
    enableMorgan: env.NODE_ENV === 'development',
    enableRateLimiter: true,
  });

  // Start server
  app.listen(env.PORT, () => {
    logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT} 🚀🚀`);
  });
};

startServer().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});
