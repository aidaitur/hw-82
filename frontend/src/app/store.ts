import { configureStore } from "@reduxjs/toolkit";
import { artistsReducer } from "../artists/artistsSlice";
import { albumsReducer } from "../albums/albumsSlice";
import { tracksReducer } from "../tracks/tracksSlice";

export const store = configureStore({
    reducer: {
        artists: artistsReducer,
        albums: albumsReducer,
        tracks: tracksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;