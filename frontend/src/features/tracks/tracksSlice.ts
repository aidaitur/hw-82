import { createSlice } from "@reduxjs/toolkit";
import type {Track} from "../types";
import { fetchTracks } from "./tracksThunks";

interface State {
    items: Track[];
}

const initialState: State = { items: [] };

const tracksSlice = createSlice({
    name: "tracks",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchTracks.fulfilled, (state, action) => {
            state.items = action.payload;
        });
    },
});

export const tracksReducer = tracksSlice.reducer;