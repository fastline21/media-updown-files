import axios from 'axios';
import { GET_ALL_OUTPUT, OUTPUT_ERROR } from './types';

export const outputMediaDir = () => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.get('/api/output', config);
		dispatch({
			type: GET_ALL_OUTPUT,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: OUTPUT_ERROR,
			payload: error.data,
		});
	}
};
