import React from 'react';
import { Helmet } from 'react-helmet-async';

import getPageTitle from 'utils/getPageTitle';

const Output = () => {
	return (
		<div>
			<Helmet>
				<title>{getPageTitle('Output')}</title>
			</Helmet>
		</div>
	);
};

export default Output;
