import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormControlLabel, Switch } from '@material-ui/core';
import { getClientsAct } from '../../state/clients/clientActions';
import isEqual from 'lodash.isequal';
import Table from '../Common/Table/Table';

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
];

const ClientsList = props => {
    const { clients, isLoggedIn, getClientsAct } = props;
    const [clientsList, setClientsList] = useState([]);
    const [dense, setDense] = useState(false);

    useEffect(() => {
        getClientsAct();
    }, [getClientsAct]);

    useEffect(() => {
        if (!isLoggedIn) {
            const localClients = JSON.parse(
                window.localStorage.getItem('clients'),
            );
            if (!isEqual(localClients, clientsList)) {
                setClientsList(localClients);
            }
        } else {
            if (!isEqual(clients, clientsList)) {
                setClientsList(clients);
            }
        }
    }, [isLoggedIn, clients, clientsList, getClientsAct]);

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
                data={clientsList}
                dataType="Client"
                dense={dense}
                headCells={headCells}
            />
        </>
    );
};

const mapStateToProps = state => {
    return {
        clients: state.clients.clients,
        isLoggedIn: state.user.isLoggedIn,
    };
};

export default connect(mapStateToProps, {
    getClientsAct,
})(ClientsList);
