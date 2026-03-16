import express from "express";
import mongoose from "mongoose";
import Track from "../models/Track";
import { TrackMutation } from "../types";

const tracksRouter = express.Router();

tracksRouter.get("/", async (req, res) => {
    try {
        const albumId = req.query.album as string;

        const filter: { album?: string } = {};

        if (albumId) {

            if (!mongoose.Types.ObjectId.isValid(albumId)) {
                return res.status(400).send({ error: "Invalid album id" });
            }

            filter.album = albumId;
        }

        const tracks = await Track.find(filter).populate("album", "title");
        return res.send(tracks);

    } catch (e) {
        console.error(e);
        return res.sendStatus(500);
    }
});

tracksRouter.post("/", async (req, res) => {

    if (!req.body.title || !req.body.album) {
        return res.status(400).send({ error: "Title and album are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.album)) {
        return res.status(400).send({ error: "Invalid album id" });
    }

    const trackData: TrackMutation = {
        title: req.body.title,
        album: req.body.album,
        duration: req.body.duration
    };

    const track = new Track(trackData);

    try {
        await track.save();
        return res.send(track);

    } catch (e) {
        console.error(e);
        return res.status(400).send(e);
    }
});

export default tracksRouter;