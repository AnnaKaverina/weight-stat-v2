import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../../constants/theme';
import 'swiper/css';

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
	}

	html {
		height: 100%;
	}

	body {
		min-height: 100%;
		display: flex;
		flex-direction: column;
		min-width: 320px;
		margin: 0;
		background-color: #fcf3ef;
	}
`;

const HomePage = React.lazy(() => import('../../pages/HomePage/HomePage'));

function App() {
	return (
		<BrowserRouter>
			<Suspense>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					<Routes>
						<Route path="/" element={<HomePage />} />
					</Routes>
				</ThemeProvider>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
