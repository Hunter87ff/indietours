import { Request, Response } from 'express';
import Tour from '../models/Tour';
import Booking from '../models/Booking';

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
export const getTours = async (req: Request, res: Response) => {
    try {
        const tours = await Tour.find();
        res.status(200).json(tours);
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

        res.status(200).json(tour);
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
