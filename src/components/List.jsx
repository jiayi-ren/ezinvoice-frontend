import React from 'react';
import { TableComponent } from './Table/index';

const headCells = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'client', numeric: false, disablePadding: false, label: 'Client' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
    { id: 'edit', numeric: false, disablePadding: false, label: '' },
];

const List = props => {
    const { list, selected, setSelected, dense, dataType } = props;

    return (
        <TableComponent
            data={list}
            dataType={dataType}
            dense={dense}
            headCells={headCells}
            selected={selected}
            setSelected={setSelected}
        />
    );
};

export default List;
