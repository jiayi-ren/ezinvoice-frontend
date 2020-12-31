import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FormControlLabel, Switch } from '@material-ui/core';
import { getItemsAct } from '../../state/items/itemActions';
import isEqual from 'lodash.isequal';
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
    const { items, isLoggedIn, getItemsAct } = props;
    const [itemsList, setItemsList] = useState([]);
    const [dense, setDense] = useState(false);

    useEffect(() => {
        getItemsAct();
    }, [getItemsAct]);

    useEffect(() => {
        if (!isLoggedIn) {
            const localItems = JSON.parse(window.localStorage.getItem('items'));
            if (!isEqual(localItems, itemsList)) {
                setItemsList(localItems);
            }
        } else {
            if (!isEqual(items, itemsList)) {
                setItemsList(items);
            }
        }
    }, [isLoggedIn, items, itemsList, getItemsAct]);

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
            <TableComponent
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
        isLoggedIn: state.user.isLoggedIn,
    };
};

export default connect(mapStateToProps, {
    getItemsAct,
})(ItemsList);
