import { GET_ALL_OUTPUT, OUTPUT_ERROR } from 'actions/types';

const initialState = {
	output: [],
	success: true,
	loading: false,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_OUTPUT:
			return {
				...state,
				output: action.payload,
				success: true,
				loading: false,
			};
		case OUTPUT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
