import {
    GET_ESTIMATES_REQUEST,
    GET_ESTIMATES_SUCCESS,
    GET_ESTIMATES_FAILURE,
    CREATE_ESTIMATE_REQUEST,
    CREATE_ESTIMATE_SUCCESS,
    CREATE_ESTIMATE_FAILURE,
    UPDATE_ESTIMATE_REQUEST,
    UPDATE_ESTIMATE_SUCCESS,
    UPDATE_ESTIMATE_FAILURE,
    DELETE_ESTIMATE_REQUEST,
    DELETE_ESTIMATE_SUCCESS,
    DELETE_ESTIMATE_FAILURE,
} from './estimateActions';
import { arrToObj } from '../../utils/arrToObj';

const initState = {
    estimates: {},
    status: 'idle',
    error: '',
};

export const estimateReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ESTIMATES_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case GET_ESTIMATES_SUCCESS:
            return {
                ...state,
                estimates: arrToObj(action.payload, 'id'),
                status: 'succeeded',
            };
        case GET_ESTIMATES_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        case CREATE_ESTIMATE_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case CREATE_ESTIMATE_SUCCESS:
            let { id, ...newInvoice } = action.payload;
            return {
                ...state,
                estimates: { ...state.estimates, id: newInvoice },
                status: 'succeeded',
            };
        case CREATE_ESTIMATE_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        case UPDATE_ESTIMATE_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case UPDATE_ESTIMATE_SUCCESS:
            return {
                ...state,
                estimates: {
                    ...state.estimates,
                    [action.payload.id]: action.payload,
                },
                status: 'succeeded',
            };
        case UPDATE_ESTIMATE_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        case DELETE_ESTIMATE_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case DELETE_ESTIMATE_SUCCESS:
            let estimatesList =
                action.payload.length > 0 ? arrToObj(action.payload, 'id') : {};
            return {
                ...state,
                estimates: estimatesList,
                status: 'succeeded',
            };
        case DELETE_ESTIMATE_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        default:
            return {
                ...state,
                status: 'idle',
                error: '',
            };
    }
};
