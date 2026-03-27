import { createSlice } from "@reduxjs/toolkit";
import type {Artist} from "../types";
import { fetchArtists } from "./artistsThunks";

interface State {
    items: Artist[];
}

const initialState: State = {
    items: [],
};

const artistsSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchArtists.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
});

export const artistsReducer = artistsSlice.reducer;