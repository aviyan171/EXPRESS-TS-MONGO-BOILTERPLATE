import { ApiError } from '@/utils/apiError';
import { logger } from '@/utils/logger';
import mongoose from 'mongoose';
import { ERROR_MESSAGES } from './constants';
import { env } from './env';

/**
 * MongoDB connection options
 */
const mongooseOptions: mongoose.ConnectOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

/**
 * Connect to MongoDB
 */
export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, mongooseOptions);
    logger.info(`MongoDB Connected on ${conn.connection.host} port ${conn.connection.port} 📅📅`);

    // Handle MongoDB connection events
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error);
    throw ApiError.internalServerError(ERROR_MESSAGES.SERVER_ERROR);
  }
};

/**
 * Disconnect from MongoDB
 */
export const disconnectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    logger.info('MongoDB connection closed');
  }
};
