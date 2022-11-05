import React from 'react';
import styled from 'styled-components';
import { IBarItem } from '../../constants/types';

const Wrapper = styled.div`
	width: 100%;
	max-width: 400px;
	background-color: transparent;
	position: relative;
	margin-bottom: 3px;
	padding: 5px;
`;

const BarWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 10px;
	background-color: ${({ theme }) => theme.colors.bar.background};
	border: ${({ theme }) => `1px solid ${theme.colors.barLevel}`};
`;

const Title = styled.span`
	color: ${({ theme }) => theme.colors.font};
	font-size: 15px;
	line-height: 20px;
`;

const Level = styled.div<{ percentWidth: number }>`
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: ${({ percentWidth }) => `${percentWidth}%`};
	height: 100%;
	background-color: ${({ theme }) => theme.colors.bar.levelBackground};
`;

const Value = styled.span<{ percentWidth: number }>`
	font-size: 12px;
	color: ${({ theme }) => theme.colors.bar.levelBackground};
	position: absolute;
	right: ${({ percentWidth }) => `calc(${100 - percentWidth}% + 5px)`};
	bottom: 100%;
`;

const MaxValue = styled.span`
	font-size: 12px;
	color: ${({ theme }) => theme.colors.bar.levelBackground};
	position: absolute;
	right: 5px;
	top: 100%;
`;

const Overflow = styled.div<{ overflowPercentWidth: number }>`
	position: absolute;
	display: ${({ overflowPercentWidth }) => (overflowPercentWidth > 0 ? 'block' : 'none')};
	background-color: ${({ theme }) => theme.colors.bar.overflowBackground};
	width: ${({ overflowPercentWidth }) => `${overflowPercentWidth}%`};
	right: 0;
	top: 0;
	bottom: 0;
	left: ${({ overflowPercentWidth }) => `${100 - overflowPercentWidth}%`};
`;

const getOverflowPercentWidth = (overflow: number, maxValue: number): number => {
	if (overflow <= 0) return 0;
	if (overflow > maxValue) return 100;
	return overflow / maxValue * 100;
};

function Bar({ barItem }: { barItem: IBarItem }) {
	const overflow = barItem.value - barItem.maxValue;
	const percentWidth = overflow > 0 ? 100 : Math.round((barItem.value / barItem.maxValue) * 100);
	const overflowPercentWidth = getOverflowPercentWidth(overflow, barItem.maxValue);
	return (
		<Wrapper>
			<Title>{barItem.title}</Title>
			<BarWrapper>
				<Level percentWidth={percentWidth} />
				<Overflow overflowPercentWidth={overflowPercentWidth} />
				<Value percentWidth={percentWidth}>{barItem.value}</Value>
				<MaxValue >{barItem.maxValue}</MaxValue>
			</BarWrapper>
		</Wrapper>
	);
}

export default Bar;
