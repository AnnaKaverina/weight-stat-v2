import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	max-width: 400px;
	background-color: transparent;
	position: relative;
	margin-bottom: 3px;
	padding: 5px;
`;

export const BarWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 10px;
	background-color: ${({ theme }) => theme.colors.bar.background};
	border: ${({ theme }) => `1px solid ${theme.colors.barLevel}`};
`;

export const Title = styled.span`
	color: ${({ theme }) => theme.colors.font};
	font-size: 15px;
	line-height: 20px;
`;

export const Level = styled.div<{ percentWidth: number }>`
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: ${({ percentWidth }) => `${percentWidth}%`};
	height: 100%;
	background-color: ${({ theme }) => theme.colors.bar.levelBackground};
`;

export const Value = styled.span<{ percentWidth: number }>`
	font-size: 12px;
	color: ${({ theme }) => theme.colors.bar.levelBackground};
	position: absolute;
	right: ${({ percentWidth }) => `calc(${100 - percentWidth}% + 5px)`};
	bottom: 100%;
`;

export const MaxValue = styled.span`
	font-size: 12px;
	color: ${({ theme }) => theme.colors.bar.levelBackground};
	position: absolute;
	right: 5px;
	top: 100%;
`;

export const Overflow = styled.div<{ overflowPercentWidth: number }>`
	position: absolute;
	display: ${({ overflowPercentWidth }) => (overflowPercentWidth > 0 ? 'block' : 'none')};
	background-color: ${({ theme }) => theme.colors.bar.overflowBackground};
	width: ${({ overflowPercentWidth }) => `${overflowPercentWidth}%`};
	right: 0;
	top: 0;
	bottom: 0;
	left: ${({ overflowPercentWidth }) => `${100 - overflowPercentWidth}%`};
`;
