import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    FormControlLabel,
    Switch,
    Button,
    makeStyles,
} from '@material-ui/core';
import {
    getBusinessesAct,
    deleteBusinessesAct,
} from '../../state/businesses/businessActions';
import ContactList from '../../components/ContactList';
import { DeleteAlert } from '../../components/Alerts';

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

const BusinessesDash = props => {
    const {
        businesses,
        status,
        isLoggedIn,
        getBusinessesAct,
        deleteBusinessesAct,
    } = props;
    const history = useHistory();
    const classes = useStyles();
    const [businessesList, setBusinessesList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
    const [dense, setDense] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            getBusinessesAct();
        }
    }, [isLoggedIn, getBusinessesAct]);

    useEffect(() => {
        if (!isLoggedIn) {
            const localBusinesses = JSON.parse(
                window.localStorage.getItem('businesses'),
            );
            setBusinessesList(localBusinesses);
        } else {
            setBusinessesList(Object.values(businesses));
        }
    }, [isLoggedIn, businesses]);

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

    const deleteBusinesses = () => {
        if (!isLoggedIn) {
            let deleteBusinessesList = Object.assign(businessesList);
            for (let i = 0; i < selected.length; i++) {
                const label = selected[i].split('-')[1];
                deleteBusinessesList.splice(label, 1);
            }
            deleteBusinessesList.length > 0
                ? window.localStorage.setItem(
                      'businesses',
                      JSON.stringify(deleteBusinessesList),
                  )
                : window.localStorage.setItem('businesses', JSON.stringify([]));
        } else {
            let deleteBusinessesList = [];
            for (let i = 0; i < selected.length; i++) {
                const label = selected[i].split('-')[0];
                deleteBusinessesList.push(label.substring(10));
            }
            deleteBusinessesAct(deleteBusinessesList);
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
                    deleteAction={deleteBusinesses}
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
                <ContactList
                    contactList={businessesList}
                    selected={selected}
                    setSelected={setSelected}
                    dense={dense}
                    dataType="businesses"
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        businesses: state.businesses.businesses,
        status: state.businesses.status,
        isLoggedIn: state.user.isLoggedIn,
    };
};

BusinessesDash.propTypes = {
    businesses: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    getBusinessesAct: PropTypes.func.isRequired,
    deleteBusinessesAct: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    getBusinessesAct,
    deleteBusinessesAct,
})(BusinessesDash);
