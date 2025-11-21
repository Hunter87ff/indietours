import express from 'express';
import {
    createBooking,
    getMyBookings,
    getBookings,
    cancelBooking,
} from '../controllers/bookingController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.use(protect); // Protect all routes

router.route('/')
    .post(createBooking)
    .get(authorize('admin'), getBookings);

router.get('/mybookings', getMyBookings);
router.delete('/:id', cancelBooking);

export default router;
