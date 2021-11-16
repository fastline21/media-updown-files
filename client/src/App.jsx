import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import Home from 'containers/Home';
import NotFound from 'containers/NotFound';

const App = () => {
	return (
		<Provider store={configureStore}>
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='*' component={NotFound} />
				</Switch>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
