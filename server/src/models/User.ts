import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserDocument extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    createdAt: Date;
    wishlist: mongoose.Types.ObjectId[];
    matchPassword(enteredPassword: string): Promise<boolean>;
}



const userSchema = new mongoose.Schema<UserDocument>({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour'
    }]
});

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
