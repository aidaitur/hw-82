import mongoose, { Types } from "mongoose";
import Album from "./Album";

const TrackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: true,
        validate: {
            validator: async (albumId: Types.ObjectId) => {
                const album = await Album.findById(albumId);
                return !!album;
            },
            message: "Album does not exist!"
        }
    },
    duration: {
        type: String,
        required: true
    }
});

const Track = mongoose.model("Track", TrackSchema);

export default Track;