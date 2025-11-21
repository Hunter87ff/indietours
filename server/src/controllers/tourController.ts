import { Request, Response } from 'express';
import Tour from '../models/Tour';
import Booking from '../models/Booking';
import Comment from '../models/Comment';

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
export const getTours = async (req: Request, res: Response) => {
    try {
        const tours = await Tour.find();

        // Add rating info to each tour
        const toursWithRatings = await Promise.all(tours.map(async (tour) => {
            const comments = await Comment.find({ tour: tour._id });
            const averageRating = comments.length > 0
                ? Number((comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1))
                : 0;
            const reviewCount = comments.length;

            // Calculate current bookings and spots left
            const bookings = await Booking.find({ tour: tour._id });
            const currentBookings = bookings.reduce((sum, b) => sum + b.headCount, 0);
            const spotsLeft = tour.maxCapacity - currentBookings;

            return {
                ...tour.toObject(),
                averageRating,
                reviewCount,
                currentBookings,
                spotsLeft
            };
        }));

        res.status(200).json(toursWithRatings);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single tour
// @route   GET /api/tours/:id
// @access  Public
export const getTour = async (req: Request, res: Response) => {
    try {
        const tour = await Tour.findById(req.params.id);

        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        // Add rating info
        const comments = await Comment.find({ tour: tour._id });
        const averageRating = comments.length > 0
            ? Number((comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1))
            : 0;
        const reviewCount = comments.length;

        // Calculate current bookings and spots left
        const bookings = await Booking.find({ tour: tour._id });
        const currentBookings = bookings.reduce((sum, b) => sum + b.headCount, 0);
        const spotsLeft = tour.maxCapacity - currentBookings;

        res.status(200).json({
            ...tour.toObject(),
            averageRating,
            reviewCount,
            currentBookings,
            spotsLeft
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new tour
// @route   POST /api/tours
// @access  Private/Admin
export const createTour = async (req: Request, res: Response) => {
    try {
        const tour = await Tour.create(req.body);
        res.status(201).json(tour);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update tour
// @route   PUT /api/tours/:id
// @access  Private/Admin
export const updateTour = async (req: Request, res: Response) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        res.status(200).json(tour);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete tour
// @route   DELETE /api/tours/:id
// @access  Private/Admin
export const deleteTour = async (req: Request, res: Response) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);

        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        // Delete associated bookings
        await Booking.deleteMany({ tour: req.params.id });

        // Remove from all wishlists
        const User = (await import('../models/User')).default;
        await User.updateMany(
            { wishlist: req.params.id },
            { $pull: { wishlist: req.params.id } }
        );

        res.status(200).json({ id: req.params.id });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
