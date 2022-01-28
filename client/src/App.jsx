import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { HelmetProvider } from 'react-helmet-async';

import configureStore from './configureStore';

import Home from 'containers/Home';
import NotFound from 'containers/NotFound';

import Header from 'components/Header';
import Footer from 'components/Footer';

const App = () => {
	return (
		<Provider store={configureStore}>
			<HelmetProvider>
				<SnackbarProvider
					maxSnack={3}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				>
					<BrowserRouter>
						<Header />
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
						<Footer />
					</BrowserRouter>
				</SnackbarProvider>
			</HelmetProvider>
		</Provider>
	);
};

export default App;
