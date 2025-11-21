import express from 'express';
import { register, login, getMe, toggleWishlist } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/wishlist/:tourId', protect, toggleWishlist);

export default router;
