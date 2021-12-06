import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';

const MediaTable = ({ media }) => {
	const {
		downloadedImage = [],
		downloadedVideo = [],
		uploadedImage = [],
		uploadedVideo = [],
		errors = [],
	} = media;

	const orderTable = [];

	if (downloadedImage.length > 0) {
		orderTable.push(downloadedImage);
	}

	if (downloadedVideo.length > 0) {
		orderTable.push(downloadedVideo);
	}

	if (uploadedImage) {
		orderTable.push(uploadedImage);
	}

	if (uploadedVideo) {
		orderTable.push(uploadedVideo);
	}

	if (errors) {
		orderTable.push(errors);
	}

	const RenderTable = (data = []) => {
		return (
			data.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>No.</TableCell>
								<TableCell align='right'>Filename</TableCell>
								<TableCell align='right'>Original</TableCell>
								<TableCell align='right'>MD5</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((element, index) => (
								<TableRow
									key={index}
									sx={{
										'&:last-child td, &:last-child th': {
											border: 0,
										},
									}}
								>
									<TableCell component='th' scope='row'>
										{index + 1}
									</TableCell>
									<TableCell align='right'>
										{element.filename}
									</TableCell>
									<TableCell align='right'>
										{element.original}
									</TableCell>
									<TableCell align='right'>
										{element.md5}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)
		);
	};

	return orderTable.map((element) => <RenderTable data={element} />);
};

export default MediaTable;
