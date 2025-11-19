import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a tour name'],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    location: {
        type: String,
        required: [true, 'Please add a location'],
    },
    imageUrl: {
        type: String,
        default: 'no-photo.jpg',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Tour', tourSchema);
