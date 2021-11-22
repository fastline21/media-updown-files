import React, { useState, useEffect } from 'react';
import { Typography, AppBar, Toolbar } from '@mui/material';
import {
	SignalCellularAlt as SignalCellularAltIcon,
	Error as ErrorIcon,
} from '@mui/icons-material';

const Footer = () => {
	const [status, setStatus] = useState(navigator.onLine);

	useEffect(() => {
		setInterval(() => {
			const currentStatus = navigator.onLine;

			if (status !== currentStatus) {
				setStatus(currentStatus);
			}
		}, 1000);
	}, [status]);

	return (
		<AppBar
			position='fixed'
			color='primary'
			sx={{ top: 'auto', bottom: 0 }}
		>
			<Toolbar>
				{status ? <SignalCellularAltIcon /> : <ErrorIcon />}
				&nbsp;
				<Typography>Internet Connection</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Footer;
