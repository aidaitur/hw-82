import express, { Request, Response } from "express";
import TrackHistory from "../models/TrackHistory";
import User from "../models/User";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post("/", async (req: Request, res: Response) => {
    const token = req.get("Authorization");

    if (!token) {
        return res.status(401).send({ error: "No token" });
    }

    const user = await User.findOne({ token });

    if (!user) {
        return res.status(401).send({ error: "Wrong token" });
    }

    const trackId = req.body.track;

    if (!trackId) {
        return res.status(400).send({ error: "Track is required" });
    }

    const history = new TrackHistory({
        user: user._id,
        track: trackId
    });

    await history.save();

    return res.send(history);
});

trackHistoryRouter.get("/", async (req: Request, res: Response) => {
    const token = req.get("Authorization");

    if (!token) {
        return res.status(401).send({ error: "No token" });
    }

    const user = await User.findOne({ token });

    if (!user) {
        return res.status(401).send({ error: "Wrong token" });
    }

    const history = await TrackHistory.find({ user: user._id })
        .populate("track")
        .sort({ datetime: -1 });

    return res.send(history);
});

export default trackHistoryRouter;