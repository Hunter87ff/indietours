import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Generate JWT
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user', // Default to user if not specified, but allow admin creation for prototype
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Check for user email
        const user: any = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user.id).populate('wishlist');
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle wishlist item
// @route   POST /api/auth/wishlist/:tourId
// @access  Private
export const toggleWishlist = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user.id);
        const tourId = req.params.tourId;

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if tour is already in wishlist
        // @ts-ignore
        const index = user.wishlist.indexOf(tourId);

        if (index > -1) {
            // Remove
            user.wishlist.splice(index, 1);
        } else {
            // Add
            // @ts-ignore
            user.wishlist.push(tourId);
        }

        await user.save();

        // Return updated wishlist
        const updatedUser = await User.findById(req.user.id).populate('wishlist');
        res.status(200).json(updatedUser?.wishlist);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
