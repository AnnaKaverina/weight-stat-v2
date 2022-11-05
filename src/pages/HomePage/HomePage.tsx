import React from 'react';
import styled from 'styled-components';
import { Swiper,  SwiperSlide} from 'swiper/react';
import Chart from '../../components/Chart/Chart';
import { userData } from '../../testData/userData';
import { IUserDataItem } from '../../constants/types';

const Wrapper = styled.div`
`;

const DateInfo = styled.div`
	text-align: right;
	padding: 5px;
	font-size: 14px;
	color: ${({ theme }) => theme.colors.font};
`;

const Title = styled.h1`
	text-align: center;
	font-size: 20px;
`;

function HomePage() {
	const date = new Date().toLocaleString('ru-RU', { weekday: 'long', month: 'long', year: 'numeric', day: 'numeric' });

	// todo: change to server data

	const renderChartSlides = (userData: IUserDataItem[]) => {
		return userData.map((userDataItem) => {
			return (
				<SwiperSlide key={userDataItem.date}>
					<Chart values={userDataItem.values} />
				</SwiperSlide>
			);
		});
	};

	return (
		<Wrapper>
			<DateInfo>{date}</DateInfo>
			<Title>Your stats for today</Title>
			{userData.length && (
				<Swiper>
					{renderChartSlides(userData)}
				</Swiper>
			)}
		</Wrapper>
	);
}

export default HomePage;
