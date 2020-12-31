import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Button,
    makeStyles,
    Tab,
    Tabs,
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import {
    getEstimatesAct,
    deleteEstimatesAct,
} from '../../state/estimates/estimateActions';
import { getBusinessesAct } from '../../state/businesses/businessActions';
import { getClientsAct } from '../../state/clients/clientActions';
import { arrToObj } from '../../utils/arrToObj';
import { DeleteAlert } from '../../components/Alerts';
import EstimatesList from './EstimatesList';

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
    const [tab, setTab] = useState('all');
    const [selected, setSelected] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
    const [dense, setDense] = useState(false);
    const classes = useStyles();
    const businessesById = useMemo(() => arrToObj(businesses, 'id'), [
        businesses,
    ]);
    const clientsById = useMemo(() => arrToObj(clients, 'id'), [clients]);

    const compEstimatesList = (estimateList, businessKey, clientKey) => {
        for (let i = 0; i < estimateList.length; i++) {
            estimateList[i].business = businessKey[estimateList[i].businessId];
            estimateList[i].client = clientKey[estimateList[i].clientId];
        }
        return estimateList;
    };

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
            setEstimatesList(
                compEstimatesList(
                    Object.values(estimates),
                    businessesById,
                    clientsById,
                ),
            );
        }
    }, [
        isLoggedIn,
        estimates,
        businesses,
        clients,
        businessesById,
        clientsById,
    ]);

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
                deleteEstimatesList.push(label.substring(8));
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
                <EstimatesList
                    estimatesList={estimatesList}
                    selected={selected}
                    setSelected={setSelected}
                    dense={dense}
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

export default connect(mapStateToProps, {
    getEstimatesAct,
    deleteEstimatesAct,
    getBusinessesAct,
    getClientsAct,
})(EstimatesDash);
