import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../../axiosApi";
import type { Track } from "../../types";

export const fetchTracks = createAsyncThunk<Track[], string>(
    "tracks/fetchByAlbum",
    async (albumId, { rejectWithValue }) => {
        try {
          const response = await axiosApi.get<Track[]>(`/tracks?album=${albumId}`);
            return response.data;
        } catch (e) {
            return rejectWithValue("Не удалось загрузить треки");
        }
    }
);