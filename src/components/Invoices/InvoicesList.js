import React, { useEffect, useState } from 'react';
import Table from '../Common/Table/Table';
import { useAuth0 } from '@auth0/auth0-react';
import { FormControlLabel, Switch } from '@material-ui/core';

const headCells = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'client', numeric: false, disablePadding: false, label: 'Client' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
];

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
            <Table 
                data={invoices}
                dataType="Invoice"
                dense={dense}
                headCells={headCells}
            />
        </>
    );
};

export default InvoicesList;
