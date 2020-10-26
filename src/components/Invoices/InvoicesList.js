import { useAuth0 } from '@auth0/auth0-react';
import { FormControlLabel, Switch } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Table from '../Common/Table/Table';

const InvoicesList = () => {
    const { isAuthenticated } = useAuth0;
    const [invoices, setInvoices] = useState([]);
    const [dense, setDense] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            const localInvoices = JSON.parse(
                window.localStorage.getItem('invoices'),
            );
            setInvoices(localInvoices);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const localInvoices = JSON.parse(
            window.localStorage.getItem('invoices'),
        );
        setInvoices(localInvoices);
    }, []);

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

    return (
        <>
            <FormControlLabel
                control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
            />
            <Table data={invoices} dense={dense} />
        </>
    );
};

export default InvoicesList;
