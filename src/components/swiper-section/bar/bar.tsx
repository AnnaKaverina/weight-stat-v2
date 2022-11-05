import React from 'react';
import { IBarItem } from '../../../interfaces/user-data.interface';
import { Wrapper, BarWrapper, MaxValue, Value, Title, Overflow, Level } from './bar.style';

const getOverflowPercentWidth = (overflow: number, maxValue: number): number => {
	if (overflow <= 0) return 0;
	if (overflow > maxValue) return 100;
	return overflow / maxValue * 100;
};

export function Bar({ barItem }: { barItem: IBarItem }) {
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
