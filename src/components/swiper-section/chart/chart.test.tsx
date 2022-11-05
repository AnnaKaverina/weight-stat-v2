import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Chart } from './chart';
import theme from '../../../constants/theme';
import { ThemeProvider } from 'styled-components';

describe('chart render', () => {
	it('Chart component should be in the document', () => {
		const values = [
			{
				title: 'Calories',
				value: 2000,
				maxValue: 1500
			},
			{
				title: 'Fats',
				value: 800,
				maxValue: 800
			},
			{
				title: 'Proteins',
				value: 700,
				maxValue: 900
			},
			{
				title: 'Carbohydrates',
				value: 400,
				maxValue: 700
			}
		];
		const { getByText, container } = render(
			<ThemeProvider theme={theme}>
				<Chart values={values} />
			</ThemeProvider>
		);
		const element = getByText('Calories');
		expect(element).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
