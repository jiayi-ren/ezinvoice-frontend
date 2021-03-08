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
    getClientsAct,
    deleteClientsAct,
} from '../../state/clients/clientActions';
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

const ClientsDash = props => {
    const {
        clients,
        status,
        isLoggedIn,
        getClientsAct,
        deleteClientsAct,
    } = props;
    const history = useHistory();
    const classes = useStyles();
    const [clientsList, setClientsList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
    const [dense, setDense] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            getClientsAct();
        }
    }, [isLoggedIn, getClientsAct]);

    useEffect(() => {
        if (!isLoggedIn) {
            const localClients = JSON.parse(
                window.localStorage.getItem('clients'),
            );
            setClientsList(localClients);
        } else {
            setClientsList(Object.values(clients));
        }
    }, [isLoggedIn, clients]);

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

    const deleteClients = () => {
        if (!isLoggedIn) {
            let deleteClientsList = Object.assign(clientsList);
            for (let i = 0; i < selected.length; i++) {
                const label = selected[i].split('-')[1];
                deleteClientsList.splice(label, 1);
            }
            deleteClientsList.length > 0
                ? window.localStorage.setItem(
                      'clients',
                      JSON.stringify(deleteClientsList),
                  )
                : window.localStorage.setItem('clients', JSON.stringify([]));
            setClientsList(deleteClientsList);
        } else {
            let deleteClientsList = [];
            for (let i = 0; i < selected.length; i++) {
                const label = selected[i].split('-')[0];
                deleteClientsList.push(label.substring(7));
            }
            deleteClientsAct(deleteClientsList);
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
                    deleteAction={deleteClients}
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
                    contactList={clientsList}
                    selected={selected}
                    setSelected={setSelected}
                    dense={dense}
                    dataType="clients"
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        clients: state.clients.clients,
        status: state.clients.status,
        isLoggedIn: state.user.isLoggedIn,
    };
};

ClientsDash.propTypes = {
    clients: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    getClientsAct: PropTypes.func.isRequired,
    deleteClientsAct: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    getClientsAct,
    deleteClientsAct,
})(ClientsDash);
