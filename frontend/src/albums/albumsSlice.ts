import { createSlice } from "@reduxjs/toolkit";
import type {Album} from "../types";
import { fetchAlbums } from "./albumsThunks";

interface State {
    current: null,
    items: Album[];
}

const initialState: State = {
    items: [],
    current: null,
};

const albumsSlice = createSlice({
    name: "albums",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchAlbums.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
});

export const albumsReducer = albumsSlice.reducer;