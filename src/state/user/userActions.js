import { convertKeysCase } from '../../utils/caseConversion';
import {
    getUserInfo,
    getUserSettings,
    createUserSettings,
    updateUserSettings,
} from '../../api/users';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const getUserInfoAct = () => {
    return async dispatch => {
        dispatch({ type: GET_USER_REQUEST });

        try {
            const res = await getUserInfo();
            dispatch({ type: GET_USER_SUCCESS, payload: res.data });
        } catch (err) {
            console.log('FAILED');
            dispatch({ type: GET_USER_FAILURE, payload: err });
        }
    };
};

export const GET_USER_SETTINGS_REQUEST = 'GET_USER_SETTINGS_REQUEST';
export const GET_USER_SETTINGS_SUCCESS = 'GET_USER_SETTINGS_SUCCESS';
export const GET_USER_SETTINGS_FAILURE = 'GET_USER_SETTINGS_FAILURE';

export const getUserSettingsAct = () => {
    return async dispatch => {
        dispatch({ type: GET_USER_SETTINGS_REQUEST });

        try {
            const res = await getUserSettings();
            dispatch({
                type: GET_USER_SETTINGS_SUCCESS,
                payload: convertKeysCase(res.data, 'camel'),
            });
        } catch (err) {
            dispatch({ type: GET_USER_SETTINGS_FAILURE, payload: err });
        }
    };
};

export const CREATE_USER_SETTINGS_REQUEST = 'CREATE_USER_SETTINGS_REQUEST';
export const CREATE_USER_SETTINGS_SUCCESS = 'CREATE_USER_SETTINGS_SUCCESS';
export const CREATE_USER_SETTINGS_FAILURE = 'CREATE_USER_SETTINGS_FAILURE';

export const createUserSettingsAct = settings => {
    return async dispatch => {
        dispatch({ type: CREATE_USER_SETTINGS_REQUEST });

        try {
            const res = await createUserSettings(settings);
            dispatch({
                type: CREATE_USER_SETTINGS_SUCCESS,
                payload: convertKeysCase(res.data.settings, 'camel'),
            });
        } catch (err) {
            dispatch({ type: CREATE_USER_SETTINGS_FAILURE, payload: err });
        }
    };
};

export const UPDATE_USER_SETTINGS_REQUEST = 'UPDATE_USER_SETTINGS_REQUEST';
export const UPDATE_USER_SETTINGS_SUCCESS = 'UPDATE_USER_SETTINGS_SUCCESS';
export const UPDATE_USER_SETTINGS_FAILURE = 'UPDATE_USER_SETTINGS_FAILURE';

export const updateUserSettingsAct = settings => {
    return async dispatch => {
        dispatch({ type: UPDATE_USER_SETTINGS_REQUEST });

        try {
            const res = await updateUserSettings(settings);
            dispatch({
                type: UPDATE_USER_SETTINGS_SUCCESS,
                payload: convertKeysCase(res.data.settings, 'camel'),
            });
        } catch (err) {
            dispatch({ type: UPDATE_USER_SETTINGS_FAILURE, payload: err });
        }
    };
};

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginAct = () => {
    return dispatch => {
        dispatch({ type: LOGIN });
    };
};

export const logoutAct = () => {
    return dispatch => {
        dispatch({ type: LOGOUT });
    };
};
