import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Button,
    makeStyles,
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import {
    getEstimatesAct,
    deleteEstimatesAct,
} from '../../state/estimates/estimateActions';
import { getBusinessesAct } from '../../state/businesses/businessActions';
import { getClientsAct } from '../../state/clients/clientActions';
import { DeleteAlert } from '../../components/Alerts';
import List from '../../components/List';

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

const EstimatesDash = props => {
    const {
        estimates,
        businesses,
        clients,
        status,
        isLoggedIn,
        getEstimatesAct,
        deleteEstimatesAct,
        getBusinessesAct,
        getClientsAct,
    } = props;
    const history = useHistory();
    const [estimatesList, setEstimatesList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
    const [dense, setDense] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if (isLoggedIn) {
            getEstimatesAct();
            getBusinessesAct();
            getClientsAct();
        }
    }, [isLoggedIn, getEstimatesAct, getBusinessesAct, getClientsAct]);

    useEffect(() => {
        if (!isLoggedIn) {
            const localEstimates = JSON.parse(
                window.localStorage.getItem('estimates'),
            );
            setEstimatesList(localEstimates);
        } else {
            setEstimatesList(Object.values(estimates));
        }
    }, [isLoggedIn, estimates, businesses, clients]);

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

    const deleteEstimates = () => {
        if (!isLoggedIn) {
            let deleteEstimatesList = Object.assign(estimatesList);
            for (let i = 0; i < selected.length; i++) {
                const label = selected[i].split('-')[1];
                deleteEstimatesList.splice(label, 1);
            }
            deleteEstimatesList.length > 0
                ? window.localStorage.setItem('estimates', deleteEstimatesList)
                : window.localStorage.setItem('estimates', JSON.stringify([]));
            setEstimatesList(deleteEstimatesList);
        } else {
            let deleteEstimatesList = [];
            for (let i = 0; i < selected.length; i++) {
                const label = selected[i].split('-')[0];
                deleteEstimatesList.push(label.substring(9));
            }
            deleteEstimatesAct(deleteEstimatesList);
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
                    deleteAction={deleteEstimates}
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
                        <Button variant="contained" className={classes.button}>
                            Send
                        </Button>
                    )}
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
                <List
                    list={estimatesList}
                    selected={selected}
                    setSelected={setSelected}
                    dense={dense}
                    dataType="estimates"
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        estimates: state.estimates.estimates,
        businesses: state.businesses.businesses,
        clients: state.clients.clients,
        status: state.estimates.status,
        isLoggedIn: state.user.isLoggedIn,
    };
};

EstimatesDash.propTypes = {
    estimates: PropTypes.object.isRequired,
    businesses: PropTypes.object.isRequired,
    clients: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    getEstimatesAct: PropTypes.func.isRequired,
    deleteEstimatesAct: PropTypes.func.isRequired,
    getBusinessesAct: PropTypes.func.isRequired,
    getClientsAct: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    getEstimatesAct,
    deleteEstimatesAct,
    getBusinessesAct,
    getClientsAct,
})(EstimatesDash);
