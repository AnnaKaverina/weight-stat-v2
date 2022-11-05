import React from 'react';
import { Bar } from '../bar';
import { IBarItem } from '../../../interfaces/user-data.interface';
import { Wrapper } from './chart.style';

export function Chart({ values }: { values: Array<IBarItem> }) {
	const renderBars = (values: Array<IBarItem>) => {
		return values.map((barItem) => {
			return <Bar barItem={barItem} key={barItem.title} />;
		});
	};

	return (
		<Wrapper>
			{renderBars(values)}
		</Wrapper>
	);
}
