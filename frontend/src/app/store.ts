import { configureStore } from "@reduxjs/toolkit";
import { tracksReducer } from "../trackHistory/trackHistorySlice.ts";

export const store = configureStore({
    reducer: {
        artists: artistsReducer,
        albums: albumsReducer,
        tracks: tracksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;