import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosApi} from "../axiosApi";
import type {Artist} from "../types";

export const fetchArtists = createAsyncThunk<Artist[]>(
    "artists/fetchAll",
    async () => {
        const res = await axiosApi.get("/artists");
        return res.data;
    }
);