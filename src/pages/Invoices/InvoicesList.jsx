import React, { useState } from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import Table from '../../components/Common/Table/Table';

const headCells = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'client', numeric: false, disablePadding: false, label: 'Client' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
    { id: 'edit', numeric: true, disablePadding: false, label: '' },
];

const InvoicesList = props => {
    const { invoicesList, selected, setSelected } = props;
    const [dense, setDense] = useState(false);

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
                data={invoicesList}
                dataType="invoices"
                dense={dense}
                headCells={headCells}
                selected={selected}
                setSelected={setSelected}
            />
        </>
    );
};

export default InvoicesList;
