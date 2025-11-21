import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Tour from '../models/Tour';

interface AuthRequest extends Request {
    user?: any;
}

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req: AuthRequest, res: Response) => {
    try {
        const { tourId, headCount } = req.body;

        const tour = await Tour.findById(tourId);

        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }

        // Calculate total price
        const totalPrice = (tour.price || 0) * headCount;

        const booking = await Booking.create({
            user: req.user.id,
            tour: tourId,
            headCount,
            totalPrice,
        });

        res.status(201).json(booking);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
export const getMyBookings = async (req: AuthRequest, res: Response) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('tour');
        res.status(200).json(bookings);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bookings (Admin only)
// @route   GET /api/bookings
// @access  Private/Admin
export const getBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.find().populate('user').populate('tour');
        res.status(200).json(bookings);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const cancelBooking = async (req: AuthRequest, res: Response) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Make sure user owns booking
        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await booking.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
