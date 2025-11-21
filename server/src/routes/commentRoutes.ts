import express from 'express';
import { getComments, createComment } from '../controllers/commentController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/:tourId')
    .get(getComments)
    .post(protect, createComment);

export default router;
