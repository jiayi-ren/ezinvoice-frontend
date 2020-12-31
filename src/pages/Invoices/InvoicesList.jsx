import React from 'react';
import { TableComponent } from '../../components/Table/index';

const headCells = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'client', numeric: false, disablePadding: false, label: 'Client' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
    { id: 'edit', numeric: true, disablePadding: false, label: '' },
];

const InvoicesList = props => {
    const { invoicesList, selected, setSelected, dense } = props;

    return (
        <TableComponent
            data={invoicesList}
            dataType="invoices"
            dense={dense}
            headCells={headCells}
            selected={selected}
            setSelected={setSelected}
        />
    );
};

export default InvoicesList;
