import React from 'react';
import { TableComponent } from '../../components/Table/index';

const headCells = [
    {
        id: 'description',
        numeric: false,
        disablePadding: true,
        label: 'Description',
    },
    { id: 'rate', numeric: true, disablePadding: false, label: 'Rate' },
];

const ItemsList = props => {
    const { dense, itemsList, selected, setSelected } = props;

    return (
        <TableComponent
            data={itemsList}
            dataType={'Item'}
            dense={dense}
            headCells={headCells}
            selected={selected}
            setSelected={setSelected}
        />
    );
};

export default ItemsList;
