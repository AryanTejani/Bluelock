import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import ApiError from '../Utils/ApiError.js';

const userSchema = new mongoose.Schema({
    profilePic: {
        type: String,
        default: "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
    },
    username: {
        type: String,
        required: [true, "Please enter your name."],
    },
    email: {
        type: String,
        required: [true, "Please enter your email."],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email.']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        minlength: 8,
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password.'],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: 'Password and confirm password do not match.'
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    notVerified: {
        type: Boolean,
        default: true,
        select: false,
    },
    changeEmailVerificationOtp: String,
    otp: String,
    PasswordChangedAt: Date,
    PasswordResetToken: String,
    PasswordResetTokenExpires: Date,
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmPassword = undefined;
        next();
    } catch (error) {
        throw new ApiError(error);
    }
});

userSchema.methods.checkPassword = async function (pass, passDB) {
    return await bcrypt.compare(pass, passDB);
}

userSchema.methods.isPasswordChanged = function (jwtPassword) {
    if (this.PasswordChangedAt) {
        const pswdChangedTimestamp = parseInt(this.PasswordChangedAt.getTime() / 1000, 10);
        return jwtPassword < pswdChangedTimestamp;
    }
    return false;
}

userSchema.methods.createResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.PasswordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.PasswordResetTokenExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

userSchema.methods.generateOtp = async function () {
    let otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    this.otp = crypto.createHash('sha256').update(otp).digest('hex');
    return otp;
}

userSchema.methods.generateOtpForChangingEmail = async function () {
    let changeEmailVerificationOtp = `${Math.floor(100000 + Math.random() * 900000)}`;
    this.changeEmailVerificationOtp = crypto.createHash('sha256').update(changeEmailVerificationOtp).digest('hex');
    return changeEmailVerificationOtp;
}

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

const userModel = mongoose.model('userModel', userSchema);

export default userModel;