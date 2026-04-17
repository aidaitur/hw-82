import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi';
import type { Album } from '../../types';

export const fetchAlbumsByArtist = createAsyncThunk<Album[], string>(
    'albums/fetchByArtist',
    async (artistId) => {
        const response = await axiosApi.get<Album[]>(`/albums?artist=${artistId}`);
        return response.data;
    }
);