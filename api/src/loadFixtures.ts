import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

export const loadFixtures = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("artists");
        await db.dropCollection("albums");
        await db.dropCollection("tracks");
    } catch {
        console.log("Collections were not present, skipping drop...");
    }

    const [imagineDragons, coldplay] = await Artist.create(
        {
            name: "Imagine Dragons",
            photo: "/images/artists/imagine_dragons.jpg",
            information: "Американская рок-группа"
        },
        {
            name: "Coldplay",
            photo: "/images/artists/coldplay.jpg",
            information: "Британская рок-группа"
        }
    );

    const [evolve, origins, headDreams, ghostStories] = await Album.create(
        {
            title: "Evolve",
            artist: imagineDragons._id,
            year: 2017,
            cover: "/images/albums/evolve.jpg"
        },
        {
            title: "Origins",
            artist: imagineDragons._id,
            year: 2018,
            cover: "/images/albums/origins.jpg"
        },
        {
            title: "A Head Full of Dreams",
            artist: coldplay._id,
            year: 2015,
            cover: "/images/albums/head_full_of_dreams.jpg"
        },
        {
            title: "Ghost Stories",
            artist: coldplay._id,
            year: 2014,
            cover: "/images/albums/ghost_stories.jpg"
        }
    );

    await Track.create(

        { title: "Believer", album: evolve._id, number: 1, duration: "3:24" },
        { title: "Thunder", album: evolve._id, number: 2, duration: "3:07" },
        { title: "Whatever It Takes", album: evolve._id, number: 3, duration: "3:21" },
        { title: "Walking the Wire", album: evolve._id, number: 4, duration: "3:52" },
        { title: "Rise Up", album: evolve._id, number: 5, duration: "3:51" },

        { title: "Natural", album: origins._id, number: 1, duration: "3:09" },
        { title: "Boomerang", album: origins._id, number: 2, duration: "3:08" },
        { title: "Machine", album: origins._id, number: 3, duration: "3:01" },
        { title: "Bad Liar", album: origins._id, number: 4, duration: "4:20" },
        { title: "Birds", album: origins._id, number: 5, duration: "3:39" },

        { title: "Adventure of a Lifetime", album: headDreams._id, number: 1, duration: "4:23" },
        { title: "Hymn for the Weekend", album: headDreams._id, number: 2, duration: "4:18" },
        { title: "Everglow", album: headDreams._id, number: 3, duration: "4:42" },
        { title: "Fun", album: headDreams._id, number: 4, duration: "4:27" },
        { title: "Army of One", album: headDreams._id, number: 5, duration: "6:16" },

        { title: "Magic", album: ghostStories._id, number: 1, duration: "4:45" },
        { title: "A Sky Full of Stars", album: ghostStories._id, number: 2, duration: "4:28" },
        { title: "Ink", album: ghostStories._id, number: 3, duration: "3:48" },
        { title: "True Love", album: ghostStories._id, number: 4, duration: "4:05" },
        { title: "Midnight", album: ghostStories._id, number: 5, duration: "4:54" }
    );

    console.log("Fixtures loaded!");
    await db.close();
};

loadFixtures().then(() => console.log("Done")).catch(console.error);