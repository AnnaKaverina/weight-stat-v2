import React, { useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Title, SlideInner } from './swiper-section.style';
import { IUserDataItem } from '../../interfaces/user-data.interface';
import { Swiper as SwiperType } from 'swiper';
import { Chart } from './chart';
import getTitleLocaleDate from '../../helpers/getTitleLocaleDate';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store/store';

export const SwiperSection = () => {
	const userState = useAppSelector((root: RootState) => root.user);
	const currentDate = getTitleLocaleDate(new Date());
	const [swiperInst, setSwiperInst] = useState<SwiperType | null>(null);
	const [slideDate, setSlideDate] = useState('');

	const renderChartSlides = useCallback((userData: Array<IUserDataItem>) => {
		return userData.map((userDataItem, id) => {
			return (
				<SwiperSlide key={id}>
					{userDataItem.values ? (
						<Chart values={userDataItem.values} />
					) : (
						<SlideInner>
							<button>Add info</button>
						</SlideInner>
					)}
				</SwiperSlide>
			);
		});
	}, [JSON.stringify(userState.stat)]);

	const onSlideChange = () => {
		if (swiperInst) {
			// todo change data format
			setSlideDate(getTitleLocaleDate(new Date(userState.stat[swiperInst.activeIndex].date)));
		}
	};

	useEffect(() => {
		if (swiperInst) {
			swiperInst.slideTo(userState.stat.length, 0);
		}
	}, [swiperInst]);
  
	return (
		<>
			<Title>
				{currentDate !== slideDate ? slideDate : 'Your stats for today'}
			</Title>
			{userState.stat.length > 0 && (
				<Swiper
					onSlideChange={onSlideChange}
					onSwiper={setSwiperInst}
				>
					{renderChartSlides(userState.stat)}
				</Swiper>
			)}
		</>
	);
};

export default SwiperSection;