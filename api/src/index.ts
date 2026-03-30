import express from "express";
import mongoose from "mongoose";
import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import trackHistoryRouter from "./routers/trackHistory";
import cors from "cors";
import usersRouter from "./routers/users";

const app = express();
app.use(cors());
app.use(cors({
    origin: "http://localhost:5173"
}));
const port = 8000;

app.use(express.json());
app.use(express.static("public"));

app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/track-history", trackHistoryRouter);
app.use("/users", usersRouter);


const run = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/music");
        app.listen(port, () => {
        console.log("Server started on port " + port);
        });
    } catch (e) {
        console.error("Error starting server:", e);
    }
};

run();