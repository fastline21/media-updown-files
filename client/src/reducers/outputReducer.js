import { GET_OUTPUT, OUTPUT_ERROR } from 'actions/types';

const initialState = {
	output: [],
	error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	switch (action.type) {
		case GET_OUTPUT:
			return {
				...state,
				output: action.payload,
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
