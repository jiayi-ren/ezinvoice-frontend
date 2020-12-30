import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_SETTINGS_REQUEST,
    GET_USER_SETTINGS_SUCCESS,
    GET_USER_SETTINGS_FAILURE,
    CREATE_USER_SETTINGS_REQUEST,
    CREATE_USER_SETTINGS_SUCCESS,
    CREATE_USER_SETTINGS_FAILURE,
    UPDATE_USER_SETTINGS_REQUEST,
    UPDATE_USER_SETTINGS_SUCCESS,
    UPDATE_USER_SETTINGS_FAILURE,
    LOGIN,
    LOGOUT,
} from './userActions';

const initState = {
    account: {},
    settings: {},
    status: 'idle',
    error: '',
    isLoggedIn: false,
};

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                account: action.payload,
                status: 'succeeded',
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        case GET_USER_SETTINGS_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case GET_USER_SETTINGS_SUCCESS:
            return {
                ...state,
                settings: action.payload,
                status: 'succeeded',
            };
        case GET_USER_SETTINGS_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        case CREATE_USER_SETTINGS_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case CREATE_USER_SETTINGS_SUCCESS:
            return {
                ...state,
                settings: action.payload,
                status: 'succeeded',
            };
        case CREATE_USER_SETTINGS_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        case UPDATE_USER_SETTINGS_REQUEST:
            return {
                ...state,
                status: 'loading',
                error: '',
            };
        case UPDATE_USER_SETTINGS_SUCCESS:
            return {
                ...state,
                settings: action.payload,
                status: 'succeeded',
            };
        case UPDATE_USER_SETTINGS_FAILURE:
            return {
                ...state,
                status: 'failed',
                error: action.payload,
            };
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
            };
        default:
            return {
                ...state,
                status: 'idle',
                error: '',
            };
    }
};
