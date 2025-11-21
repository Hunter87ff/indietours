import express from 'express';
import { getComments, createComment, updateComment, deleteComment } from '../controllers/commentController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/:tourId')
    .get(getComments)
    .post(protect, createComment);

router.route('/:id')
    .put(protect, updateComment)
    .delete(protect, deleteComment);

export default router;
