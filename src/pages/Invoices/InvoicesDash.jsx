import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
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
    getInvoicesAct,
    deleteInvoicesAct,
} from '../../state/invoices/invoiceActions';
import { getBusinessesAct } from '../../state/businesses/businessActions';
import { getClientsAct } from '../../state/clients/clientActions';
import { arrToObj } from '../../utils/arrToObj';
import { DeleteAlert } from '../../components/Alerts';
import List from '../../components/List';

const useStyles = makeStyles({
    button: {
        margin: '5px',
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
        display: 'flex',
        justifyContent: 'center',
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

const InvoicesDash = props => {
    const {
        invoices,
        businesses,
        clients,
        status,
        isLoggedIn,
        getInvoicesAct,
        deleteInvoicesAct,
        getBusinessesAct,
        getClientsAct,
    } = props;
    const history = useHistory();
    const [invoicesList, setInvoicesList] = useState([]);
    const [tab, setTab] = useState('all');
    const [selected, setSelected] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
    const [dense, setDense] = useState(false);
    const classes = useStyles();

    const clientsById = useMemo(() => arrToObj(clients, 'id'), [clients]);

    const compInvoicesList = (invoiceList, businessKey, clientKey) => {
        for (let i = 0; i < invoiceList.length; i++) {
            invoiceList[i].business = businessKey[invoiceList[i].businessId];
            invoiceList[i].client = clientKey[invoiceList[i].clientId];
        }
        return invoiceList;
    };

    useEffect(() => {
        if (isLoggedIn) {
            getInvoicesAct();
            getBusinessesAct();
            getClientsAct();
        }
    }, [isLoggedIn, getInvoicesAct, getBusinessesAct, getClientsAct]);

    useEffect(() => {
        if (!isLoggedIn) {
            const localInvoices = JSON.parse(
                window.localStorage.getItem('invoices'),
            );
            setInvoicesList(localInvoices);
        } else {
            setInvoicesList(
                compInvoicesList(
                    Object.values(invoices),
                    businesses,
                    clientsById,
                ),
            );
        }
    }, [isLoggedIn, invoices, businesses, clients, clientsById]);

    const tabChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

    const deleteInvoices = () => {
        if (!isLoggedIn) {
            let deleteInvoicesList = Object.assign(invoicesList);
            for (let i = 0; i < selected.length; i++) {
                const label = selected[i].split('-')[1];
                deleteInvoicesList.splice(label, 1);
            }
            deleteInvoicesList.length > 0
                ? window.localStorage.setItem(
                      'invoices',
                      JSON.stringify(deleteInvoicesList),
                  )
                : window.localStorage.setItem('invoices', JSON.stringify([]));
            setInvoicesList(deleteInvoicesList);
        } else {
            let deleteInvoicesList = [];
            for (let i = 0; i < selected.length; i++) {
                const label = selected[i].split('-')[0];
                deleteInvoicesList.push(label.substring(8));
            }
            deleteInvoicesAct(deleteInvoicesList);
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
                    deleteAction={deleteInvoices}
                    status={status}
                />
            )}
            <div className={`${classes.container} ${classes.searchBar}`}>
                Search
            </div>
            <div className={`${classes.container} ${classes.tabHeader}`}>
                <Tabs indicatorColor="primary" value={tab} onChange={tabChange}>
                    <Tab label="All" value="all" />
                    <Tab label="Outstanding" value="outstanding" />
                    <Tab label="Paid" value="paid" />
                </Tabs>
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
                    list={invoicesList}
                    selected={selected}
                    setSelected={setSelected}
                    dense={dense}
                    dataType="invoices"
                />
            </div>
        </div>
    );
};

InvoicesDash.propTypes = {
    invoices: PropTypes.object.isRequired,
    businesses: PropTypes.object.isRequired,
    clients: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    getInvoicesAct: PropTypes.func.isRequired,
    deleteInvoicesAct: PropTypes.func.isRequired,
    getBusinessesAct: PropTypes.func.isRequired,
    getClientsAct: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        invoices: state.invoices.invoices,
        businesses: state.businesses.businesses,
        clients: state.clients.clients,
        status: state.invoices.status,
        isLoggedIn: state.user.isLoggedIn,
    };
};

export default connect(mapStateToProps, {
    getInvoicesAct,
    deleteInvoicesAct,
    getBusinessesAct,
    getClientsAct,
})(InvoicesDash);
