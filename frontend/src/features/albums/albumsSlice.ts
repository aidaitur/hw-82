import { createSlice } from '@reduxjs/toolkit';
import type { Album } from '../../types';
import { fetchAlbumsByArtist } from './albumsThunks';

interface AlbumsState {
    items: Album[];
    loading: boolean;
    error: boolean;
}

const initialState: AlbumsState = {
    items: [],
    loading: false,
    error: false,
};

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbumsByArtist.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAlbumsByArtist.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.items = payload;
            })
            .addCase(fetchAlbumsByArtist.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const albumsReducer = albumsSlice.reducer;