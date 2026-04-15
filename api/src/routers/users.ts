import express from "express";
import { OAuth2Client } from 'google-auth-library';
import User from "../models/User";
import auth from "../middleware/auth";
import { imagesUpload } from "../middleware/multer";
import config from "../config";

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post("/", imagesUpload.single('avatar'), async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName,
            avatar: req.file ? 'images/' + req.file.filename : null,
        });

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

usersRouter.post("/google", async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId,
        });

        const payload = ticket.getPayload();

        if (!payload || !payload.email || !payload.sub) {
            return res.status(400).send({ error: "Google login error!" });
        }

        let user = await User.findOne({ googleID: payload.sub });

        if (!user) {

            user = new User({
                username: payload.email,
                password: null,
                googleID: payload.sub,
                displayName: payload.name || payload.email,
                avatar: payload.picture || null,
            });
        }

        user.generateAuthToken();
        await user.save();

        return res.send({ message: "Login with Google successful!", user });
    } catch (e) {
        return next(e);
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