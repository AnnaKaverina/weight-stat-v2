import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../../constants/theme';
import MainPage from '../../pages/main-page/main-page';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

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
	
	.swiper-slide {
		height: auto;
	}
`;

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					<Routes>
						<Route path="/" element={<MainPage />} />
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
