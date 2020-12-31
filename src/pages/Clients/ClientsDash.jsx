import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormControlLabel, Switch } from '@material-ui/core';
import { getClientsAct } from '../../state/clients/clientActions';
import isEqual from 'lodash.isequal';
import { Button, makeStyles } from '@material-ui/core';
import ClientsList from './ClientsList';

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

const ClientsDash = props => {
    const { clients, isLoggedIn, getClientsAct } = props;
    const history = useHistory();
    const classes = useStyles();
    const [clientsList, setClientsList] = useState([]);
    const [selected, setSelected] = useState([]);
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
                <ClientsList
                    clientsList={clientsList}
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
        clients: state.clients.clients,
        isLoggedIn: state.user.isLoggedIn,
    };
};

export default connect(mapStateToProps, {
    getClientsAct,
})(ClientsDash);
