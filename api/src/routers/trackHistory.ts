import express from "express";
import TrackHistory from "../models/TrackHistory";
import Track from "../models/Track";
import auth, { RequestWithUser } from "../middleware/auth";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post("/", auth, async (req, res, next) => {
    try {
        const r = req as RequestWithUser;
        const { trackId } = r.body;
        if (!trackId) return res.status(400).send({ error: "trackId is required" });

        const track = await Track.findById(trackId)
            .populate<{ album: { artist: string } }>("album", "artist");
        if (!track) return res.status(404).send({ error: "Track not found" });

        const artistId = track.album.artist;

        const history = await TrackHistory.create({
            user: r.user._id,
            track: track._id,
            artist: artistId,
            datetime: new Date(),
        });

        res.send(history);
    } catch (e) {
        next(e);
    }
});

trackHistoryRouter.get("/", auth, async (req, res, next) => {
    try {
        const r = req as RequestWithUser;

        const history = await TrackHistory.find({ user: r.user._id })
            .populate("track", "title")
            .populate("artist", "name")
            .sort({ datetime: -1 });

        res.send(history);
    } catch (e) {
        next(e);
    }
});

export default trackHistoryRouter;