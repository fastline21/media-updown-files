import React, { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	TablePagination,
} from '@mui/material';

const MediaTable = ({ media }) => {
	const [page, setPage] = useState({
		DOWNLOADEDIMAGE: { currentPage: 0, rowsPerPage: 10 },
		DOWNLOADEDVIDEO: { currentPage: 0, rowsPerPage: 10 },
		UPLOADEDIMAGE: { currentPage: 0, rowsPerPage: 10 },
		UPLOADEDVIDEO: { currentPage: 0, rowsPerPage: 10 },
		ERRORS: { currentPage: 0, rowsPerPage: 10 },
	});

	const {
		name = '',
		downloadedImage = [],
		downloadedVideo = [],
		uploadedImage = [],
		uploadedVideo = [],
		errors = [],
	} = media;

	const orderTable = [];

	if (downloadedImage.length > 0) {
		orderTable.push({ table: 'DOWNLOADEDIMAGE', content: downloadedImage });
	}

	if (downloadedVideo.length > 0) {
		orderTable.push({ table: 'DOWNLOADEDVIDEO', content: downloadedVideo });
	}

	if (uploadedImage.length > 0) {
		orderTable.push({ table: 'UPLOADEDIMAGE', content: uploadedImage });
	}

	if (uploadedVideo.length > 0) {
		orderTable.push({ table: 'UPLOADEDVIDEO', content: uploadedVideo });
	}

	if (errors.length > 0) {
		orderTable.push({ table: 'ERRORS', content: errors });
	}

	const handleChangePage = (event, table, newPage) => {
		console.log(event);
		setPage({
			...page,
			[table]: {
				rowsPerPage: page[table].rowsPerPage,
				currentPage: newPage,
			},
		});
	};

	const handleChangeRowsPerPage = (event, table) => {
		setPage({
			...page,
			[table]: {
				rowsPerPage: +event.target.value,
				currentRow: 0,
			},
		});
	};

	const RenderTable = ({ data }) => {
		const { currentPage, rowsPerPage } = page[data.table];
		console.log(page[data.table]);
		return (
			data.content.length > 0 && (
				<>
					<Typography>{data.table}</Typography>
					<Paper sx={{ width: '100%', overflow: 'hidden' }}>
						<TableContainer sx={{ maxHeight: 440 }}>
							<Table stickyHeader aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>No.</TableCell>
										<TableCell align="right">
											Filename
										</TableCell>
										<TableCell align="right">MD5</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data.content
										.slice(
											currentPage * rowsPerPage,
											currentPage * rowsPerPage +
												rowsPerPage
										)
										.map((element, index) => (
											<TableRow
												key={index}
												sx={{
													'&:last-child td, &:last-child th':
														{
															border: 0,
														},
												}}
											>
												<TableCell
													component="th"
													scope="row"
												>
													{index + 1}
												</TableCell>
												<TableCell align="right">
													{element.filename}
												</TableCell>
												<TableCell align="right">
													{element.md5}
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</TableContainer>
						{/* {console.log(page[data.table].rowsPerPage)} */}
						<TablePagination
							rowsPerPageOptions={[10, 25, 100]}
							component="div"
							count={data.content.length}
							rowsPerPage={rowsPerPage}
							page={currentPage}
							onPageChange={(element) =>
								handleChangePage(
									element,
									data.table,
									currentPage + 1
								)
							}
							onRowsPerPageChange={(element) =>
								handleChangeRowsPerPage(element, data.table)
							}
						/>
					</Paper>
				</>
			)
		);
	};

	return (
		<>
			<Typography variant="h6" component="div">
				{name}
			</Typography>
			{orderTable.map((element) => (
				<RenderTable data={element} />
			))}
		</>
	);
};

export default MediaTable;
