import {
    GET_BUSINESSES_REQUEST,
    GET_BUSINESSES_SUCCESS,
    GET_BUSINESSES_FAILURE,
    CREATE_BUSINESS_REQUEST,
    CREATE_BUSINESS_SUCCESS,
    CREATE_BUSINESS_FAILURE,
    UPDATE_BUSINESS_REQUEST,
    UPDATE_BUSINESS_SUCCESS,
    UPDATE_BUSINESS_FAILURE,
    DELETE_BUSINESS_REQUEST,
    DELETE_BUSINESS_SUCCESS,
    DELETE_BUSINESS_FAILURE,
} from './businessActions';
import { arrToObj } from '../../utils/arrToObj';

const initState = {
    businesses: {},
    status: 'idle',
    message: '',
};

export const businessReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_BUSINESSES_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case GET_BUSINESSES_SUCCESS:
            return {
                ...state,
                businesses: arrToObj(action.payload, 'id'),
                status: 'succeeded',
            };
        case GET_BUSINESSES_FAILURE:
            return {
                ...state,
                status: 'failed',
                message: action.payload,
            };
        case CREATE_BUSINESS_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case CREATE_BUSINESS_SUCCESS:
            let { id, ...newBusiness } = action.payload;
            return {
                ...state,
                businesses: { ...state.businesses, id: newBusiness },
                status: 'succeeded',
            };
        case CREATE_BUSINESS_FAILURE:
            return {
                ...state,
                status: 'failed',
                message: action.payload,
            };
        case UPDATE_BUSINESS_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case UPDATE_BUSINESS_SUCCESS:
            return {
                ...state,
                businesses: {
                    ...state.businesses,
                    [action.payload.id]: action.payload,
                },
                status: 'succeeded',
            };
        case UPDATE_BUSINESS_FAILURE:
            return {
                ...state,
                status: 'failed',
                message: action.payload,
            };
        case DELETE_BUSINESS_REQUEST:
            return {
                ...state,
                status: 'loading',
                message: '',
            };
        case DELETE_BUSINESS_SUCCESS:
            let businessesList =
                action.payload.length > 0 ? arrToObj(action.payload, 'id') : {};
            return {
                ...state,
                businesses: businessesList,
                status: 'succeeded',
            };
        case DELETE_BUSINESS_FAILURE:
            return {
                ...state,
                status: 'failed',
                message: action.payload,
            };
        default:
            return {
                ...state,
                status: 'idle',
                message: '',
            };
    }
};
