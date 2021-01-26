import React, { useEffect, useState } from 'react';
import { TableComponent } from './Table/index';

const filterHelper = (invoices, condition) => {
    if (condition === 'paid') {
        return invoices.filter(invoice => invoice.isPaid === true);
    }
    if (condition === 'outstanding') {
        return invoices.filter(invoice => invoice.isPaid === false);
    }
};

const headCells = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'client', numeric: false, disablePadding: false, label: 'Client' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
    { id: 'edit', numeric: false, disablePadding: false, label: '' },
];

const List = props => {
    const {
        list,
        selected,
        setSelected,
        dense,
        dataType,
        invoicesFilter,
    } = props;

    const [TableData, setTableData] = useState([]);

    useEffect(() => {
        if (invoicesFilter === 'paid') {
            setTableData(filterHelper(list, invoicesFilter));
        } else if (invoicesFilter === 'outstanding') {
            setTableData(filterHelper(list, invoicesFilter));
        } else {
            setTableData(list);
        }
    }, [list, invoicesFilter]);

    return (
        <TableComponent
            data={TableData}
            dataType={dataType}
            dense={dense}
            headCells={headCells}
            selected={selected}
            setSelected={setSelected}
        />
    );
};

export default List;
