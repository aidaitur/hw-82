import { createSlice } from '@reduxjs/toolkit';
import type { Artist } from '../../types';
import { fetchArtists } from './artistsThunks';

interface ArtistsState {
    items: Artist[];
    loading: boolean;
    error: boolean;
}

const initialState: ArtistsState = {
    items: [],
    loading: false,
    error: false,
};

export const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtists.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchArtists.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.items = payload;
            })
            .addCase(fetchArtists.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const artistsReducer = artistsSlice.reducer;