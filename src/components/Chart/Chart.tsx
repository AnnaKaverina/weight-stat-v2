import React from 'react';
import styled from 'styled-components';
import Bar from '../Bar/Bar';
import { IBarItem } from '../../constants/types';

const Wrapper = styled.div`
	padding: 5px 10px;
`;

function Chart({ values }: { values: IBarItem[] }) {
	const renderBars = (values: IBarItem[]) => {
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

export default Chart;
