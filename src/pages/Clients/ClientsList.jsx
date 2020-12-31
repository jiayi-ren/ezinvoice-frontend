import React from 'react';

import { TableComponent } from '../../components/Table/index';

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
];

const ClientsList = props => {
    const { clientsList, selected, setSelected, dense } = props;

    return (
        <TableComponent
            data={clientsList}
            dataType="Client"
            dense={dense}
            headCells={headCells}
            selected={selected}
            setSelected={setSelected}
        />
    );
};

export default ClientsList;
