import mongoose, { HydratedDocument, Model } from "mongoose";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { UserFields } from "../types";

const SALT_WORK_FACTOR = 10;

type UserDocument = HydratedDocument<UserFields>;

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

const UserSchema = new mongoose.Schema<UserFields, UserModel, UserMethods>({
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
    }
});

UserSchema.pre("save", async function (this: UserDocument, next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    next();
});

UserSchema.methods.checkPassword = function (password: string) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
};

UserSchema.set("toJSON", {
    transform: (_doc, ret) => {
        const { password, ...rest } = ret;
        return rest;
    }
});

const User = mongoose.model<UserFields, UserModel>("User", UserSchema);

export default User;