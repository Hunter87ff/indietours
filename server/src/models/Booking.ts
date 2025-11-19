import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
        required: true,
    },
    headCount: {
        type: Number,
        required: [true, 'Please add head count'],
        min: 1,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    bookingDate: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Booking', bookingSchema);
