import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosApi} from "../axiosApi";
import type {Track} from "../types";
export const fetchTracks = createAsyncThunk<Track[], string>(
    "tracks/fetch",
    async (albumId) => {
        const res = await axiosApi.get(`/tracks?album=${albumId}`);
        return res.data;
    }

);