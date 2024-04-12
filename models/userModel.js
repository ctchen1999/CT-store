const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "A user must have a user name;"],
        },
        email: {
            type: String,
            validate: [validator.isEmail, "Please provide a valid email;"],
            unique: true,
            required: [true, "A user must have a email address"],
        },
        password: {
            type: String,
            required: [true, "A user must hava a password."],
            minlength: 8,
        },
        passwordConfirm: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                // this will only work when CREATE and SAVE!!!
                validator: function (val) {
                    return val === this.password;
                },
                message:
                    "password confirmation must equals to password you entered previously.",
            },
        },
        role: {
            type: String,
            enum: ["admin", "guest", "user", "store"],
            default: "guest",
        },
    },
    { timestamps: true }
);

// hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
});

userSchema.methods.correctPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
