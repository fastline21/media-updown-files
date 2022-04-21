import React from 'react';
import { Helmet } from 'react-helmet-async';

// Components
import OutputMedia from 'components/OutputMedia';

// Utils
import getPageTitle from 'utils/getPageTitle';

const Output = () => {
	return (
		<div>
			<Helmet>
				<title>{getPageTitle('Output')}</title>
			</Helmet>
			<OutputMedia />
		</div>
	);
};

export default Output;
