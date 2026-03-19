import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import User from "../models/User";

const usersRouter = express.Router();

usersRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });

        user.generateToken();

        await user.save();
        return res.send(user);

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

usersRouter.post("/sessions", async (req: Request, res: Response) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
        return res.status(400).send({ error: "Username not found" });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({ error: "Invalid password" });
    }

    user.generateToken();
    await user.save();

    return res.send({
        message: "Logged in successfully",
        user
    });
});

usersRouter.post("/secret", async (req: Request, res: Response) => {
    const token = req.get("Authorization");

    if (!token) {
        return res.status(401).send({ error: "No token present" });
    }

    const user = await User.findOne({ token });

    if (!user) {
        return res.status(401).send({ error: "Wrong token!" });
    }

    return res.send({
        message: "Secret message",
        username: user.username
    });
});

export default usersRouter;