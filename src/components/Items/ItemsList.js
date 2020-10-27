import React, { useState, useEffect } from 'react';
import Table from '../Common/Table/Table';
import { useAuth0 } from '@auth0/auth0-react';
import { FormControlLabel, Switch } from '@material-ui/core';

const headCells = [
    {
        id: 'description',
        numeric: false,
        disablePadding: true,
        label: 'Description',
    },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
];

const ItemsList = props => {
    const { isAuthenticated } = useAuth0;
    const [items, setItems] = useState([]);
    const [dense, setDense] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            const localItems = JSON.parse(window.localStorage.getItem('items'));
            setItems(localItems);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const localItems = JSON.parse(window.localStorage.getItem('items'));
        setItems(localItems);
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
                data={items}
                dataType={'Item'}
                dense={dense}
                headCells={headCells}
            />
        </>
    );
};

export default ItemsList;
