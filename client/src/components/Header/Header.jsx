import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
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
					<Button color="inherit" component={Link} to="/">
						Home
					</Button>
					{/* TODO: Transfer the IMDb Image Downloader url to ActionMenu */}
					{/* <Button color='inherit' href={process.env.REACT_APP_IMDB_IMAGE_DOWNLOADER_URL} target="_blank">
						Output
					</Button> */}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
