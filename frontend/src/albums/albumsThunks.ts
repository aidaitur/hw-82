import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi } from "../axiosApi";

export const fetchAlbums = createAsyncThunk(
    "albums/fetch",
    async (artistId: string) => {
        const res = await axiosApi.get(`/albums?artist=${artistId}`);
        return res.data;
    }
);

