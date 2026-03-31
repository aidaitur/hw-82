import type { GlobalError, User, ValidationError } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./usersThunks.ts";

interface UsersState {
    user: User | null;
    registerLoading: boolean;
    registerError: ValidationError | null;
    loginLoading: boolean;
    loginError: GlobalError | null;
}

const initialState: UsersState = {
     user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null,
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    loginError: null,
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.registerLoading = true;
            state.registerError = null;
        });
        builder.addCase(register.fulfilled, (state, { payload: user }) => {
            state.registerLoading = false;
            state.user = user;
               localStorage.setItem("user", JSON.stringify(user));
        });
        builder.addCase(register.rejected, (state, { payload: error }) => {
            state.registerLoading = false;
            state.registerError = error || null;
        });

        builder.addCase(login.pending, (state) => {
            state.loginLoading = true;
            state.loginError = null;
        });
        builder.addCase(login.fulfilled, (state, { payload: user }) => {
            state.loginLoading = false;
            state.user = user;
                localStorage.setItem("user", JSON.stringify(user));
        });
        builder.addCase(login.rejected, (state, { payload: error }) => {
            state.loginLoading = false;
            state.loginError = error || null;
        });
    },
});

export const { logout } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;