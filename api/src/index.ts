import express from "express";
import mongoose from "mongoose";

import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import tracksRouter from "./routers/tracks";

const app = express();
const port = 8000;

app.use(express.json());

app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/tracks", tracksRouter);

const run = async () => {

    await mongoose.connect("mongodb://127.0.0.1:27017/music");

    app.listen(port, () => {
        console.log("Server started on port " + port);
    });
};

run();