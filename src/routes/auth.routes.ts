import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { loginSchema, registerSchema } from '../schemas/auth.schema';
import { tokenSchema } from '../schemas/token.schema';
const router = Router();
const authController = new AuthController();

// Auth routes
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/token', authController.refreshToken);
router.post('/logout', authController.logout);

export default router;
