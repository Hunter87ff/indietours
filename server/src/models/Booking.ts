import mongoose from 'mongoose';

export interface BookingDocument extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    tour: mongoose.Types.ObjectId;
    headCount: number;
    totalPrice: number;
    bookingDate: Date;
}



const bookingSchema = new mongoose.Schema<BookingDocument>({
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
const Booking = mongoose.model<BookingDocument>('Booking', bookingSchema);
export default Booking;
