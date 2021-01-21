import React from 'react';
import { TableComponent } from './Table/index';

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
    { id: 'edit', numeric: false, disablePadding: false, label: '' },
];

const ContactList = props => {
    const { contactList, selected, setSelected, dense, dataType } = props;

    return (
        <TableComponent
            data={contactList}
            dataType={dataType}
            dense={dense}
            headCells={headCells}
            selected={selected}
            setSelected={setSelected}
        />
    );
};

export default ContactList;
