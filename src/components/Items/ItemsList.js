import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from '../Common/Table/Table';
import { useAuth0 } from '@auth0/auth0-react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { getItemsAct } from '../../state/items/itemActions';
import isEqual from 'lodash.isequal';

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
    const { items, getItemsAct } = props;
    const { isAuthenticated } = useAuth0();
    const [itemsList, setItemsList] = useState([]);
    const [dense, setDense] = useState(false);

    useEffect(() => {
        getItemsAct();
    }, [getItemsAct]);

    useEffect(() => {
        if (!isAuthenticated) {
            const localItems = JSON.parse(window.localStorage.getItem('items'));
            if (!isEqual(localItems, itemsList)) {
                setItemsList(localItems);
            }
        } else {
            if (!isEqual(items, itemsList)) {
                setItemsList(items);
            }
        }
    }, [isAuthenticated, items, itemsList, getItemsAct]);

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
                data={itemsList}
                dataType={'Item'}
                dense={dense}
                headCells={headCells}
            />
        </>
    );
};

const mapStateToProps = state => {
    return {
        items: state.items.items,
    };
};

export default connect(mapStateToProps, {
    getItemsAct,
})(ItemsList);
