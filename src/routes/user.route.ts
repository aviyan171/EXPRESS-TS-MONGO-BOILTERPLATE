import { adminRoleValidation } from '@/middleware/role.middleware';
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
const router = Router();
const userController = new UserController();

router.get('/', authenticate, adminRoleValidation, userController.getUsers);
router.get('/:id', authenticate, adminRoleValidation, userController.getUserById);
router.post('/', authenticate, adminRoleValidation, userController.createUser);
router.put('/:id', authenticate, adminRoleValidation, userController.updateUser);
router.delete('/:id', authenticate, adminRoleValidation, userController.deleteUser);

export const userRoutes = router;
