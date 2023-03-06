import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice';
import { statApi } from '../services/stat-service';
import { foodApi } from '../services/food-service';

export const store = configureStore({
	reducer: {
		[userSlice.name]: userSlice.reducer,
		[statApi.reducerPath]: statApi.reducer,
		[foodApi.reducerPath]: foodApi.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(statApi.middleware, foodApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
