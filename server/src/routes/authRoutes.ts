import express from 'express';
import { register, login, getMe, toggleWishlist, updateDetails } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/wishlist/:tourId', protect, toggleWishlist);
router.put('/updatedetails', protect, updateDetails);

export default router;
