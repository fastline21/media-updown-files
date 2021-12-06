import axios from 'axios';
import { GET_OUTPUT, OUTPUT_ERROR } from './types';

export const fetchOutput = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/output');

		dispatch({
			type: GET_OUTPUT,
			payload: res.data,
		});
	} catch (error) {
		const { status, data } = error.response;
		dispatch({
			type: OUTPUT_ERROR,
			payload: {
				statusCode: status,
				message: data.message,
			},
		});
	}
};
