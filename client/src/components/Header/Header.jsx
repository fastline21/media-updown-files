import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
	const openLink = (link) => {
		return window.open(link, '_blank');
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Media UpDown Files
					</Typography>
					<Button
						color="inherit"
						onClick={() => {
							openLink(
								process.env.REACT_APP_IMDB_IMAGE_DOWNLOADER_URL
							);
						}}
					>
						IMDb Image Downloader
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
