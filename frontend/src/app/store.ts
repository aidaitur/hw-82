import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "../features/users/usersSlice";
import { tracksReducer } from "../features/tracks/tracksSlice.ts";
import { albumsReducer } from "../features/albums/albumsSlice";
import { artistsReducer } from "../features/artist/artistsSlice.ts";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        tracks: tracksReducer,
        albums: albumsReducer,
        artists: artistsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;