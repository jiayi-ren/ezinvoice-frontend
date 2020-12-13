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

const initState = {
    businesses: [],
    status: 'idle',
    error: '',
};

export const businessReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_BUSINESSES_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case GET_BUSINESSES_SUCCESS:
            return {
                ...state,
                businesses: action.payload,
                status: 'succeeded',
            };
        case GET_BUSINESSES_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        case CREATE_BUSINESS_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case CREATE_BUSINESS_SUCCESS:
            return {
                ...state,
                businesses: [...state.businesses, action.payload],
                status: 'succeeded',
            };
        case CREATE_BUSINESS_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        case UPDATE_BUSINESS_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case UPDATE_BUSINESS_SUCCESS:
            return {
                ...state,
                businesses: [...state.businesses, action.payload],
                status: 'succeeded',
            };
        case UPDATE_BUSINESS_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        case DELETE_BUSINESS_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case DELETE_BUSINESS_SUCCESS:
            return {
                ...state,
                businesses: action.payload,
                status: 'succeeded',
            };
        case DELETE_BUSINESS_FAILURE:
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
