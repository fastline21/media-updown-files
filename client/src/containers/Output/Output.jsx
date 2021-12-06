import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getPageTitle from 'utils/getPageTitle';

import { fetchOutput } from 'actions/outputAction';

const Output = ({ outputState: { output }, fetchOutput }) => {
	useEffect(() => {
		fetchOutput();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Helmet>
				<title>{getPageTitle('Output')}</title>
			</Helmet>
		</div>
	);
};

Output.propTypes = {
	outputState: PropTypes.object.isRequired,
	fetchOutput: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	outputState: state.outputState,
});

export default connect(mapStateToProps, {
	fetchOutput,
})(Output);
