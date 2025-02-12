import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import goalsReducer from './slices/goalsSlice';
import resourcesReducer from './slices/resourcesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        goals: goalsReducer,
        resources: resourcesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;