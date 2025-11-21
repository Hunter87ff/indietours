import { Request, Response } from 'express';
import Comment from '../models/Comment';

interface AuthRequest extends Request {
    user?: any;
}

// @desc    Get comments for a tour
// @route   GET /api/comments/:tourId
// @access  Public
export const getComments = async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find({ tour: req.params.tourId })
            .populate('user', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a comment
// @route   POST /api/comments/:tourId
// @access  Private
export const createComment = async (req: AuthRequest, res: Response) => {
    try {
        const { text, rating } = req.body;
        const tourId = req.params.tourId;

        const comment = await Comment.create({
            user: req.user.id,
            tour: tourId,
            text,
            rating
        });

        const populatedComment = await Comment.findById(comment._id).populate('user', 'name');

        res.status(201).json(populatedComment);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
