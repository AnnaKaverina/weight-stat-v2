import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUserDataItem, IUserState } from '../interfaces/user-data.interface';
import getTitleLocaleDate from '../helpers/getTitleLocaleDate';

const initialState: IUserState = {
	index: 0,
	date: getTitleLocaleDate(new Date()),
	stat: [],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setStat: (state, action: PayloadAction<IUserDataItem[]>) => {
			state.stat = action.payload;
			state.index = state.stat.length - 1;
		},
	},
});

export const { setStat } = userSlice.actions;

export default userSlice;
