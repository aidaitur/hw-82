import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '../../axiosApi';
import type { Track } from '../../types';

export const fetchTracks = createAsyncThunk<Track[]>(
    'tracks/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get('/tracks');
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Ошибка при загрузке треков');
        }
    }
);