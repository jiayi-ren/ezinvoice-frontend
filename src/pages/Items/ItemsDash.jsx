import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Button,
    makeStyles,
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import { getItemsAct } from '../../state/items/itemActions';
import isEqual from 'lodash.isequal';
import ItemsList from './ItemsList';

const useStyles = makeStyles({
    button: {
        margin: '10px',
    },
    container: {
        margin: '30px auto',
    },
    searchBar: {
        width: '30vw',
        textAlign: 'center',
    },
    tabHeader: {
        width: '40vw',
    },
    options: {
        width: '80vw',
        display: 'flex',
        justifyContent: 'space-between',
    },
    list: {
        width: '80vw',
    },
});

const ItemsDash = props => {
    const { items, isLoggedIn, getItemsAct } = props;
    const history = useHistory();
    const classes = useStyles();
    const [itemsList, setItemsList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [dense, setDense] = useState(false);

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

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
    }, [isLoggedIn, items, itemsList]);

    return (
        <div className={classes.container}>
            <div className={`${classes.container} ${classes.searchBar}`}>
                Search
            </div>
            <div className={`${classes.container} ${classes.options}`}>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                        history.push(`${history.location.pathname}/new`);
                    }}
                >
                    New
                </Button>
                <FormControlLabel
                    control={
                        <Switch checked={dense} onChange={handleChangeDense} />
                    }
                    label="Dense padding"
                />
            </div>
            <div className={`${classes.container} ${classes.list}`}>
                <ItemsList
                    itemsList={itemsList}
                    dense={dense}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        </div>
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
})(ItemsDash);
