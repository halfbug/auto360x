import { FETCHING, SUCCESS, ERROR } from './actionTypes';

export const initialState = {
    status: null,
    response: null,
    sell:[],
};

const reducer = (state = initialState, { type, response } = {}) => {
    // console.log (state)
    switch (type) {
        
        case FETCHING:
            return { ...initialState, status: FETCHING };
        case SUCCESS:
            // console.log(response)
            return { ...state, status: SUCCESS, response };
        case ERROR:
            return { ...state, status: ERROR, response };
        default:
            return state;
    }
};

export default reducer;