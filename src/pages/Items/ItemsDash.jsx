import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Button,
    makeStyles,
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import { getItemsAct, deleteItemsAct } from '../../state/items/itemActions';
import { DeleteAlert } from '../../components/Alerts';
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
    const { items, status, isLoggedIn, getItemsAct, deleteItemsAct } = props;
    const history = useHistory();
    const classes = useStyles();
    const [itemsList, setItemsList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
    const [dense, setDense] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            getItemsAct();
        }
    }, [isLoggedIn, getItemsAct]);

    useEffect(() => {
        if (!isLoggedIn) {
            const localItems = JSON.parse(window.localStorage.getItem('items'));
            setItemsList(localItems);
        } else {
            setItemsList(Object.values(items));
        }
    }, [isLoggedIn, items]);

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

    const deleteItems = () => {
        if (!isLoggedIn) {
            let deleteItemsList = Object.assign(itemsList);
            for (let i = 0; i < selected.length; i++) {
                const label = selected[i].split('-')[1];
                deleteItemsList.splice(label, 1);
            }
            deleteItemsList.length > 0
                ? window.localStorage.setItem(
                      'items',
                      JSON.stringify(deleteItemsList),
                  )
                : window.localStorage.setItem('items', JSON.stringify([]));
            setItemsList(deleteItemsList);
        } else {
            let deleteItemsList = [];
            for (let i = 0; i < selected.length; i++) {
                const label = selected[i].split('-')[0];
                deleteItemsList.push(label.substring(5));
            }
            deleteItemsAct(deleteItemsList);
        }
        setIsDeleted(true);
        setSelected([]);
    };

    return (
        <div className={classes.container}>
            {deleteAlertOpen && (
                <DeleteAlert
                    deleteAlertOpen={deleteAlertOpen}
                    setDeleteAlertOpen={setDeleteAlertOpen}
                    isDeleted={isDeleted}
                    deleteAction={deleteItems}
                    status={status}
                />
            )}
            <div className={`${classes.container} ${classes.searchBar}`}>
                Search
            </div>
            <div className={`${classes.container} ${classes.options}`}>
                <div>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={() => {
                            history.push(`${history.location.pathname}/new`);
                        }}
                    >
                        New
                    </Button>
                    {selected.length > 0 && (
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => {
                                setDeleteAlertOpen(true);
                            }}
                        >
                            DELETE
                        </Button>
                    )}
                </div>
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
        status: state.items.status,
        isLoggedIn: state.user.isLoggedIn,
    };
};

ItemsDash.propTypes = {
    items: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    getItemsAct: PropTypes.func.isRequired,
    deleteItemsAct: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    getItemsAct,
    deleteItemsAct,
})(ItemsDash);
