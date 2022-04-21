import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Box } from '@mui/material';

// Actions
import { outputMediaDir } from 'actions/outputAction';

const OutputMedia = ({ outputState: { output }, outputMediaDir }) => {
	const [outputDir, setOutputDir] = useState(null);

	useEffect(() => {
		outputMediaDir();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (output.length > 0) {
			setOutputDir(output);
		}
	}, [output]);

	return (
		<Container fixed>
			<Box
				sx={{
					marginTop: 8,
					marginBottom: 5,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{!outputDir
					? 'No found'
					: outputDir.map((dir, index) => <h1 key={index}>{dir}</h1>)}
			</Box>
		</Container>
	);
};

OutputMedia.propTypes = {
	outputMediaDir: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	outputState: state.outputState,
});

export default connect(mapStateToProps, { outputMediaDir })(OutputMedia);
