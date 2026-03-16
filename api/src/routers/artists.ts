import express from "express";
import Artist from "../models/Artist";
import { ArtistMutation } from "../types";

const artistsRouter = express.Router();

artistsRouter.get("/", async (req, res) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);

    } catch (e) {
        console.error(e);
        return res.sendStatus(500);
    }
});

artistsRouter.post("/", async (req, res) => {

    if (!req.body.name) {
        return res.status(400).send({ error: "Name is required" });
    }

    const artistData: ArtistMutation = {
        name: req.body.name,
        photo: req.body.photo,
        information: req.body.information
    };

    const artist = new Artist(artistData);

    try {
        await artist.save();
        return res.send(artist);

    } catch (e) {
        console.error(e);
        return res.status(400).send(e);
    }
});

export default artistsRouter;