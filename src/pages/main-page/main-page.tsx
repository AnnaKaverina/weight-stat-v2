import React, { useEffect } from 'react';
import getTitleLocaleDate from '../../helpers/getTitleLocaleDate';
import { useAppDispatch } from '../../hooks/redux';
import { setStat } from '../../features/userSlice';
import { DateInfo } from './main-page.style';
import { SwiperSection } from '../../components/swiper-section/swiper-section';
import 'swiper/swiper.css';
import { IUserDataItem } from '../../interfaces/user-data.interface';
import { useGetStatQuery } from '../../api/stat';

function MainPage() {
	const dispatch = useAppDispatch();
	const currentDate = getTitleLocaleDate(new Date());

	// todo use query argument???
	const { data: userData } = useGetStatQuery('');

	useEffect(() => {
		if (userData) {
			const userDataArray = [...userData];
			const userDataForToday = userData.findIndex((userDataItem) => userDataItem.date === currentDate) !== -1;
			if (!userDataForToday) {
				const emptyItem: IUserDataItem = {
					date: currentDate,
					values: null
				};
				userDataArray.push(emptyItem);
			}
			if (userDataArray && userDataArray.length) {
				dispatch(setStat(userDataArray));
			}
		}

	}, [userData]);

	return (
		<>
			<DateInfo>{currentDate}</DateInfo>
			<SwiperSection />
		</>
	);
}

export default MainPage;
