const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcrypt');
const zxcvbn = require('zxcvbn');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A user must have a user name;'],
        },
        email: {
            type: String,
            validate: [validator.isEmail, 'Please provide a valid email;'],
            unique: true,
            required: [true, 'A user must have a email address'],
        },
        password: {
            type: String,
            required: [true, 'A user must hava a password.'],
            minlength: 8,
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                // this will only work when CREATE and SAVE!!!
                validator: function (val) {
                    return val === this.password;
                },
                message:
                    'password confirmation must equals to password you entered previously.',
            },
        },
        role: {
            type: String,
            enum: ['admin', 'guest', 'user', 'store'],
            default: 'guest',
        },
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
    },
    { timestamps: true },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcryptjs.hash(this.password, 12);
    this.passwordConfirm = undefined;

    if (!validator.isEmail(this.email)) {
        throw new Error('Please provide a valid email');
    }

    // check password strength -> 3up safe
    // if (zxcvbn(this.password).score < 3)) {
    //     throw new Error("Password is not strong enough");
    // }
});

userSchema.methods.correctPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Show active user only
userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
