import { Router } from 'express';
import { authenticateUser, createUser, getAuthUser, refreshAuth } from '../controllers/users.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', createUser);
router.post('/login', authenticateUser);
router.post('/me/refresh', refreshAuth);

router.get('/me', authenticate, getAuthUser);

export default router;
