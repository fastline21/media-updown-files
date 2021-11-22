import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const NotFound = () => {
	return (
		<HelmetProvider>
			<div>
				<Helmet>
					<title>Not Found - {process.env.REACT_APP_TITLE}</title>
				</Helmet>
				<h1>404 Error</h1>
				<p>The page you are looking for cound not be found.</p>
				<a href='/'>Back to home page</a>
			</div>
		</HelmetProvider>
	);
};

export default NotFound;
