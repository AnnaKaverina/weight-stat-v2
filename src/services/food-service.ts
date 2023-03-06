import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFoodSearchProps, IFoodSearchResult } from '../interfaces/food-data.interface';

export const foodApi = createApi({
	reducerPath: 'food',
	baseQuery: fetchBaseQuery(
		{
			baseUrl: 'https://api.nal.usda.gov/fdc/v1',
			prepareHeaders: (headers) => {
				headers.set('Content-Type', 'application/json');
			}
		}),
	endpoints: (builder) => ({
		search: builder.mutation<IFoodSearchResult, IFoodSearchProps>({
			query: (props) => ({
				url: '/foods/search?api_key=DEMO_KEY',
				method: 'POST',
				body: props
			}),
		}),
	}),
});

export const { useSearchMutation } = foodApi;
