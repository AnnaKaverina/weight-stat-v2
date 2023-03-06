import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserDataItem } from '../interfaces/user-data.interface';

export const statApi = createApi({
	reducerPath: 'stat',
	baseQuery: fetchBaseQuery(
		{
			baseUrl: 'http://localhost:3001',
			prepareHeaders: (headers) => {
				headers.set('Content-Type', 'application/json');
			}
		}),
	// tagTypes: ['userDataItem'],
	endpoints: (builder) => ({
		getStat: builder.query<Array<IUserDataItem>, void>({
			query: () => '/stat',
			// providesTags: ['userDataItem'],
		}),
		addStat: builder.mutation<void, IUserDataItem>({
			query: (item) => ({
				url: '/add-stat',
				method: 'POST',
				body: item
			}),
			// invalidatesTags: ['userDataItem'],
		}),
	}),
});

export const { useGetStatQuery, useAddStatMutation } = statApi;
