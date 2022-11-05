import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice';
import { statApi } from '../api/stat';

export const store = configureStore({
	reducer: {
		[userSlice.name]: userSlice.reducer,
		[statApi.reducerPath]: statApi.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(statApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
