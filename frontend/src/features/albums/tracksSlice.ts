import { createSlice } from '@reduxjs/toolkit';
import type { Track } from '../../types';
import { fetchTracks } from './tracksThunks';

interface TracksState {
    items: Track[];
    loading: boolean;
    error: string | null;
}

const initialState: TracksState = {
    items: [],
    loading: false,
    error: null,
};

export const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTracks.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTracks.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.items = payload;
        });
        builder.addCase(fetchTracks.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload as string;
        });
    },
});

export const tracksReducer = tracksSlice.reducer;

import type { RootState } from '../../app/store';
export const selectTracks = (state: RootState) => state.tracks.items;