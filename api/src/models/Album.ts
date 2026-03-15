import mongoose, { Types } from "mongoose";
import Artist from "./Artist";

const AlbumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        required: true,
        validate: {
            validator: async (artistId: mongoose.Types.ObjectId) => {
                const artist = await Artist.findById(artistId);
                return !!artist;
            },
            message: "Artist does not exist!"
        }
    },
    year: {
        type: Number,
        required: true
    },
    cover: String
});

const Album = mongoose.model("Album", AlbumSchema);

export default Album;