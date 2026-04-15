import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../features/users/usersSlice';
import { trackHistoryReducer } from '../features/trackHistory/trackHistorySlice';
import { tracksReducer  } from '../features/albums/tracksSlice.ts';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        trackHistory: trackHistoryReducer,
        tracks: tracksReducer,
       },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;