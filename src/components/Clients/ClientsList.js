import React, { useEffect, useState } from 'react';
import Table from '../Common/Table/Table';
import { useAuth0 } from '@auth0/auth0-react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { connect } from 'react-redux';
import { getClientsAct } from '../../state/clients/clientActions';

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
];

const ClientsList = props => {
    const { clients } = props;
    const { isAuthenticated } = useAuth0;
    const [clientsList, setClientsList] = useState([]);
    const [dense, setDense] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            const localClients = JSON.parse(
                window.localStorage.getItem('clients'),
            );
            setClientsList(localClients);
        } else {
            getClientsAct();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        setClientsList(clients);
    }, [clients]);

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
    };
};

export default connect(mapStateToProps, {
    getClientsAct,
})(ClientsList);
