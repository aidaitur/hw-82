import express from "express";
import User from "../models/User";
import auth from "../middleware/auth";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = new User({ username, password });
        user.generateAuthToken();

        await user.save();
        res.send({ message: "User registered successfully", user });
    } catch (e: any) {
        if (e.name === "ValidationError") {
            return res.status(400).send(e);
        }
        next(e);
    }
});

usersRouter.post("/sessions", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).send({ error: "Username not found" });
        }

        const isMatch = await user.checkPassword(password);
        if (!isMatch) {
            return res.status(400).send({ error: "Invalid password" });
        }

        user.generateAuthToken();
        await user.save();

        res.send({ message: "Logged in successfully", user });
    } catch (e) {
        next(e);
    }
});

usersRouter.get("/", auth, async (req, res, next) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        next(e);
    }
});

export default usersRouter;