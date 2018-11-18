import { get } from "./../../services/api";

const GET_CURRICULUMS_SUCCESS = "GET_CURRICULUMS_SUCCESS";
const GET_CURRICULUMS_FAILURE = "GET_CURRICULUMS_FAILURE";

const defaultState = {
    list: [],
    error: null
};

// Reducer
export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_CURRICULUMS_SUCCESS:
            return Object.assign({}, state, { list: action.payload });
        case GET_CURRICULUMS_FAILURE:
            const { error } = action.payload;
            return Object.assign({}, state, {
                error
            });

        default:
            return state;
    }
};

// Action creators
function getCurriculumsSuccess(params) {
    return {
        type: GET_CURRICULUMS_SUCCESS,
        payload: params
    };
}

function getCurriculumsFailure(params) {
    return {
        type: GET_CURRICULUMS_FAILURE,
        payload: params
    };
}

// Fetch all curriculums
export function getCurriculums() {
    return async dispatch => {
        try {
            const response = await dispatch(get("curriculum?offset=0"));
            if (!response || !response.data || !response.data.curriculums) {
                throw new Error("Data not sent from the server");
            }
            dispatch(getCurriculumsSuccess(response.data.curriculums));
            console.log(response);
        } catch (error) {
            dispatch(getCurriculumsFailure(error));
            console.log(error);
        }
    };
}
