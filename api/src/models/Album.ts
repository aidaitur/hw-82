import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    cover: String,
    tracks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Track"
        }
    ]
});

const Album = mongoose.model("Album", AlbumSchema);

export default Album;