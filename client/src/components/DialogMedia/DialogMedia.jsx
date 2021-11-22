import React from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
} from '@mui/material';

const DialogMedia = ({ isOpen, title, type, index, handleCloseDialog }) => {
	return (
		<Dialog
			open={isOpen}
			onClose={handleCloseDialog}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>
				{`Remove ${type}`}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					{`Are you sure you want to remove ${title}?`}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleCloseDialog(false, type, index)}>
					Disagree
				</Button>
				<Button
					onClick={() => handleCloseDialog(true, type, index)}
					autoFocus
				>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DialogMedia;
