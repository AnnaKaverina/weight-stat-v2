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
	endpoints: (builder) => ({
		getStat: builder.query<Array<IUserDataItem>, string>({
			query: () => '/stat',
		}),
	}),
});

export const { useGetStatQuery } = statApi;
