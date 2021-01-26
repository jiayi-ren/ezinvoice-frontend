import {
    getEstimates,
    createEstimate,
    updateEstimateById,
    deleteEstimates,
} from '../../api/estimates';
import { convertKeysCase } from '../../utils/caseConversion';

export const GET_ESTIMATES_REQUEST = 'GET_ESTIMATES_REQUEST';
export const GET_ESTIMATES_SUCCESS = 'GET_ESTIMATES_SUCCESS';
export const GET_ESTIMATES_FAILURE = 'GET_ESTIMATES_FAILURE';

export const getEstimatesAct = () => {
    return async dispatch => {
        dispatch({ type: GET_ESTIMATES_REQUEST });

        try {
            const res = await getEstimates();
            dispatch({
                type: GET_ESTIMATES_SUCCESS,
                payload: convertKeysCase(res.data, 'camel'),
            });
        } catch (err) {
            const errMessage = err.response.data.message
                ? err.response.data.message
                : err.response.statusText;
            dispatch({ type: GET_ESTIMATES_FAILURE, payload: errMessage });
        }
    };
};

export const CREATE_ESTIMATE_REQUEST = 'CREATE_ESTIMATE_REQUEST';
export const CREATE_ESTIMATE_SUCCESS = 'CREATE_ESTIMATE_SUCCESS';
export const CREATE_ESTIMATE_FAILURE = 'CREATE_ESTIMATE_FAILURE';

export const createEstimateAct = estimate => {
    return async dispatch => {
        dispatch({ type: CREATE_ESTIMATE_REQUEST });

        try {
            const res = await createEstimate(
                convertKeysCase(estimate, 'snake'),
            );
            dispatch({
                type: CREATE_ESTIMATE_SUCCESS,
                payload: convertKeysCase(res.data.estimate, 'camel'),
            });
        } catch (err) {
            const errMessage = err.response.data.message
                ? err.response.data.message
                : err.response.statusText;
            dispatch({ type: CREATE_ESTIMATE_FAILURE, payload: errMessage });
        }
    };
};

export const UPDATE_ESTIMATE_REQUEST = 'UPDATE_ESTIMATE_REQUEST';
export const UPDATE_ESTIMATE_SUCCESS = 'UPDATE_ESTIMATE_SUCCESS';
export const UPDATE_ESTIMATE_FAILURE = 'UPDATE_ESTIMATE_FAILURE';

export const updateEstimateByIdAct = estimate => {
    return async dispatch => {
        dispatch({ type: UPDATE_ESTIMATE_REQUEST });

        try {
            const res = await updateEstimateById(
                convertKeysCase(estimate, 'snake'),
            );
            dispatch({
                type: UPDATE_ESTIMATE_SUCCESS,
                payload: convertKeysCase(res.data.estimate, 'camel'),
            });
        } catch (err) {
            const errMessage = err.response.data.message
                ? err.response.data.message
                : err.response.statusText;
            dispatch({ type: UPDATE_ESTIMATE_FAILURE, payload: errMessage });
        }
    };
};

export const DELETE_ESTIMATE_REQUEST = 'DELETE_ESTIMATE_REQUEST';
export const DELETE_ESTIMATE_SUCCESS = 'DELETE_ESTIMATE_SUCCESS';
export const DELETE_ESTIMATE_FAILURE = 'DELETE_ESTIMATE_FAILURE';

export const deleteEstimatesAct = ids => {
    return async dispatch => {
        dispatch({ type: DELETE_ESTIMATE_REQUEST });

        try {
            await deleteEstimates(ids);
            const res = await getEstimates();
            dispatch({
                type: DELETE_ESTIMATE_SUCCESS,
                payload: convertKeysCase(res.data, 'camel'),
            });
        } catch (err) {
            const errMessage = err.response.data.message
                ? err.response.data.message
                : err.response.statusText;
            dispatch({ type: DELETE_ESTIMATE_FAILURE, payload: errMessage });
        }
    };
};
