import {
    getBusinesses,
    createBusiness,
    updateBusinessById,
    deleteBusiness,
} from '../../api/businesses';
import { convertKeysCase } from '../../utils/caseConversion';

export const GET_BUSINESSES_REQUEST = 'GET_BUSINESSES_REQUEST';
export const GET_BUSINESSES_SUCCESS = 'GET_BUSINESSES_SUCCESS';
export const GET_BUSINESSES_FAILURE = 'GET_BUSINESSES_FAILURE';

export const getBusinessesAct = () => {
    return async dispatch => {
        dispatch({ type: GET_BUSINESSES_REQUEST });

        try {
            const res = await getBusinesses();
            dispatch({
                type: GET_BUSINESSES_SUCCESS,
                payload: convertKeysCase(res.data, 'camel'),
            });
        } catch (err) {
            console.log('FAILED');
            dispatch({ type: GET_BUSINESSES_FAILURE, payload: err });
        }
    };
};

export const CREATE_BUSINESS_REQUEST = 'CREATE_BUSINESS_REQUEST';
export const CREATE_BUSINESS_SUCCESS = 'CREATE_BUSINESS_SUCCESS';
export const CREATE_BUSINESS_FAILURE = 'CREATE_BUSINESS_FAILURE';

export const createBusinessAct = business => {
    return async dispatch => {
        dispatch({ type: CREATE_BUSINESS_REQUEST });

        try {
            const res = await createBusiness(business);
            dispatch({
                type: CREATE_BUSINESS_SUCCESS,
                payload: convertKeysCase(res.data.business, 'camel'),
            });
        } catch (err) {
            console.log('FAILED');
            dispatch({ type: CREATE_BUSINESS_FAILURE, payload: err });
        }
    };
};

export const UPDATE_BUSINESS_REQUEST = 'UPDATE_BUSINESS_REQUEST';
export const UPDATE_BUSINESS_SUCCESS = 'UPDATE_BUSINESS_SUCCESS';
export const UPDATE_BUSINESS_FAILURE = 'UPDATE_BUSINESS_FAILURE';

export const updateBusinessByIdAct = business => {
    return async dispatch => {
        dispatch({ type: UPDATE_BUSINESS_REQUEST });

        try {
            const res = await updateBusinessById(
                convertKeysCase(business, 'snake'),
            );
            dispatch({
                type: UPDATE_BUSINESS_SUCCESS,
                payload: convertKeysCase(res.data.business, 'camel'),
            });
        } catch (err) {
            console.log('FAILED');
            dispatch({ type: UPDATE_BUSINESS_FAILURE, payload: err });
        }
    };
};

export const DELETE_BUSINESS_REQUEST = 'DELETE_BUSINESS_REQUEST';
export const DELETE_BUSINESS_SUCCESS = 'DELETE_BUSINESS_SUCCESS';
export const DELETE_BUSINESS_FAILURE = 'DELETE_BUSINESS_FAILURE';

export const deleteBusinessesAct = ids => {
    return async dispatch => {
        dispatch({ type: DELETE_BUSINESS_REQUEST });

        try {
            await deleteBusiness(ids);
            const res = await getBusinesses();
            dispatch({
                type: DELETE_BUSINESS_SUCCESS,
                payload: convertKeysCase(res.data, 'camel'),
            });
        } catch (err) {
            console.log('FAILED');
            dispatch({ type: DELETE_BUSINESS_FAILURE, payload: err });
        }
    };
};
