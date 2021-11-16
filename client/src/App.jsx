import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import Home from 'containers/Home';
import NotFound from 'containers/NotFound';

const App = () => {
	return (
		<Provider store={configureStore}>
			<BrowserRouter>
				<Routes>
					<Route exact path='/' component={Home} />
					<Route path='*' component={NotFound} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
