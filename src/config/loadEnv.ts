import { ApiError } from '@/utils/apiError';
import dotenv from 'dotenv';
// Load environment variables from .env file
const result = dotenv.config();

if (result.error) {
  throw ApiError.badRequest('Failed to load environment variables');
}
