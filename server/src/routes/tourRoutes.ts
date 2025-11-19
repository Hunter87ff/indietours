import express from 'express';
import {
    getTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
} from '../controllers/tourController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.route('/')
    .get(getTours)
    .post(protect, authorize('admin'), createTour);

router.route('/:id')
    .get(getTour)
    .put(protect, authorize('admin'), updateTour)
    .delete(protect, authorize('admin'), deleteTour);

export default router;
