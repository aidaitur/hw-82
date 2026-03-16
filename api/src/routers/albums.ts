import express from "express";
import mongoose from "mongoose";
import Album from "../models/Album";
import { AlbumMutation } from "../types";

const albumsRouter = express.Router();

albumsRouter.get("/", async (req, res) => {
    try {
        const artistId = req.query.artist as string;

        const filter: { artist?: string } = {};

        if (artistId) {

            if (!mongoose.Types.ObjectId.isValid(artistId)) {
                return res.status(400).send({ error: "Invalid artist id" });
            }

            filter.artist = artistId;
        }

        const albums = await Album.find(filter).populate("artist", "name");
        return res.send(albums);

    } catch (e) {
        console.error(e);
        return res.sendStatus(500);
    }
});

albumsRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.sendStatus(400);
        }

        const album = await Album.findById(id).populate("artist");

        if (!album) {
            return res.sendStatus(404);
        }

        return res.send(album);

    } catch (e) {
        console.error(e);
        return res.sendStatus(500);
    }
});

albumsRouter.post("/", async (req, res) => {

    if (!req.body.title || !req.body.artist) {
        return res.status(400).send({ error: "Title and artist are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.artist)) {
        return res.status(400).send({ error: "Invalid artist id" });
    }

    const albumData: AlbumMutation = {
        title: req.body.title,
        artist: req.body.artist,
        year: req.body.year,
        cover: req.body.cover
    };

    const album = new Album(albumData);

    try {
        await album.save();
        return res.send(album);

    } catch (e) {
        console.error(e);
        return res.status(400).send(e);
    }
});

export default albumsRouter;