import mongoose, { HydratedDocument, Model, Document } from "mongoose";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import config from "../config";
import { UserFields } from "../types";

interface UserMethods {
    checkPassword: (password: string) => Promise<boolean>;
    generateAuthToken: () => void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

const UserSchema = new mongoose.Schema<
    HydratedDocument<UserFields>,
    UserModel,
    UserMethods,
    {}
>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
});

UserSchema.path('username').validate({
    validator: async function (this: Document, value: string) {
        if (!this.isModified('username')) return true;
        const user = await User.findOne({ username: value });
        return !user;
    },
    message: 'Username already exists. Please choose another one.'
});

UserSchema.methods.generateAuthToken = function () {
    this.token = jwt.sign(
        { _id: this._id },
        config.jwtSecret,
        { expiresIn: '1d' }
    );
};

UserSchema.methods.checkPassword = function (password: string) {
    return argon2.verify(this.password, password);
};

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await argon2.hash(this.password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
    });
});

UserSchema.set('toJSON', {
    transform: (_doc, ret, _options) => {
        const { password, ...rest } = ret;
        return rest;
    }
});

const User = mongoose.model('User', UserSchema);
export default User;