import {
    getInvoices,
    createInvoice,
    updateInvoiceById,
    deleteInvoices,
} from '../../api/invoices';
import { convertKeysCase } from '../../utils/caseConversion';

export const GET_INVOICES_REQUEST = 'GET_INVOICES_REQUEST';
export const GET_INVOICES_SUCCESS = 'GET_INVOICES_SUCCESS';
export const GET_INVOICES_FAILURE = 'GET_INVOICES_FAILURE';

export const getInvoicesAct = () => {
    return async dispatch => {
        dispatch({ type: GET_INVOICES_REQUEST });

        try {
            const res = await getInvoices();
            dispatch({
                type: GET_INVOICES_SUCCESS,
                payload: convertKeysCase(res.data, 'camel'),
            });
        } catch (err) {
            console.log('FAILED');
            dispatch({ type: GET_INVOICES_FAILURE, payload: err });
        }
    };
};

export const CREATE_INVOICE_REQUEST = 'CREATE_INVOICE_REQUEST';
export const CREATE_INVOICE_SUCCESS = 'CREATE_INVOICE_SUCCESS';
export const CREATE_INVOICE_FAILURE = 'CREATE_INVOICE_FAILURE';

export const createInvoiceAct = invoice => {
    return async dispatch => {
        dispatch({ type: CREATE_INVOICE_REQUEST });

        try {
            const res = await createInvoice(convertKeysCase(invoice, 'snake'));
            dispatch({
                type: CREATE_INVOICE_SUCCESS,
                payload: convertKeysCase(res.data.invoice, 'camel'),
            });
        } catch (err) {
            console.log('FAILED');
            dispatch({ type: CREATE_INVOICE_FAILURE, payload: err });
        }
    };
};

export const UPDATE_INVOICE_REQUEST = 'UPDATE_INVOICE_REQUEST';
export const UPDATE_INVOICE_SUCCESS = 'UPDATE_INVOICE_SUCCESS';
export const UPDATE_INVOICE_FAILURE = 'UPDATE_INVOICE_FAILURE';

export const updateInvoiceByIdAct = invoice => {
    return async dispatch => {
        dispatch({ type: UPDATE_INVOICE_REQUEST });

        try {
            const res = await updateInvoiceById(
                convertKeysCase(invoice, 'snake'),
            );
            dispatch({
                type: UPDATE_INVOICE_SUCCESS,
                payload: convertKeysCase(res.data.invoice, 'camel'),
            });
        } catch (err) {
            console.log('FAILED');
            dispatch({ type: UPDATE_INVOICE_FAILURE, payload: err });
        }
    };
};

export const DELETE_INVOICE_REQUEST = 'DELETE_INVOICE_REQUEST';
export const DELETE_INVOICE_SUCCESS = 'DELETE_INVOICE_SUCCESS';
export const DELETE_INVOICE_FAILURE = 'DELETE_INVOICE_FAILURE';

export const deleteInvoicesAct = ids => {
    return async dispatch => {
        dispatch({ type: DELETE_INVOICE_REQUEST });

        try {
            await deleteInvoices(ids);
            const res = await getInvoices();
            dispatch({
                type: DELETE_INVOICE_SUCCESS,
                payload: convertKeysCase(res.data, 'camel'),
            });
        } catch (err) {
            console.log('FAILED');
            dispatch({ type: DELETE_INVOICE_FAILURE, payload: err });
        }
    };
};
