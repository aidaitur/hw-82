import mongoose, { Model, Document } from "mongoose";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import config from "../config";
import { UserFields } from "../types";

interface UserMethods {
    checkPassword: (password: string) => Promise<boolean>;
    generateAuthToken: () => void;
}

export type UserDocument = Document & UserFields & UserMethods;

type UserModel = Model<UserFields, {}, UserMethods>;

const UserSchema = new mongoose.Schema<UserFields, UserModel, UserMethods>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function (this: UserDocument) {
            return !this.googleID;
        },
    },
    displayName: {
        type: String,
        required: true,
    },
    avatar: String,
    googleID: String,
    token: {
        type: String,
        required: true,
    },
});

UserSchema.path('username').validate({
    validator: async function (this: UserDocument, value: string) {
        if (!this.isModified('username')) return true;
        const user = await User.findOne({ username: value });
        return !user;
    },
    message: 'Username already exists. Please choose another one.'
});

UserSchema.methods.generateAuthToken = function (this: UserDocument) {
    this.token = jwt.sign(
        { _id: this._id },
        config.jwtSecret,
        { expiresIn: '1d' }
    );
};

UserSchema.methods.checkPassword = function (this: UserDocument, password: string) {
    if (!this.password) return Promise.resolve(false);
    return argon2.verify(this.password, password);
};

UserSchema.pre('save', async function (this: UserDocument, next) {
    if (!this.isModified('password') || !this.password) return next();

    this.password = await argon2.hash(this.password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        timeCost: 3,
    });
    next();
});

UserSchema.set('toJSON', {
    transform: (_doc, ret) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model<UserFields, UserModel>('User', UserSchema);
export default User;