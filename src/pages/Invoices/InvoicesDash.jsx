import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, makeStyles, Tab, Tabs } from '@material-ui/core';
import {
    getInvoicesAct,
    deleteInvoicesAct,
} from '../../state/invoices/invoiceActions';
import { getBusinessesAct } from '../../state/businesses/businessActions';
import { getClientsAct } from '../../state/clients/clientActions';
import { arrToObj } from '../../utils/arrToObj';
import { DeleteAlert } from '../../components/Alerts';
import InvoicesList from './InvoicesList';

const useStyles = makeStyles({
    button: {
        margin: '10px',
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
    const classes = useStyles();
    const businessesById = useMemo(() => arrToObj(businesses, 'id'), [
        businesses,
    ]);
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
                    businessesById,
                    clientsById,
                ),
            );
        }
    }, [
        isLoggedIn,
        invoices,
        businesses,
        clients,
        businessesById,
        clientsById,
    ]);

    const tabChange = (event, newValue) => {
        setTab(newValue);
    };

    const deleteInvoices = () => {
        if (!isLoggedIn) {
            let deleteInvoicesList = Object.assign(invoicesList);
            for (let i = 0; i < selected.length; i++) {
                const label = selected[i].split('-')[1];
                deleteInvoicesList.splice(label, 1);
            }
            deleteInvoicesList.length > 0
                ? window.localStorage.setItem('invoices', deleteInvoicesList)
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
        <div>
            {deleteAlertOpen && (
                <DeleteAlert
                    deleteAlertOpen={deleteAlertOpen}
                    setDeleteAlertOpen={setDeleteAlertOpen}
                    isDeleted={isDeleted}
                    deleteAction={deleteInvoices}
                    status={status}
                />
            )}
            <div>Search</div>
            <div>
                <Tabs indicatorColor="primary" value={tab} onChange={tabChange}>
                    <Tab label="All" value="all" />
                    <Tab label="Outstanding" value="outstanding" />
                    <Tab label="Paid" value="paid" />
                </Tabs>
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
            <InvoicesList
                invoicesList={invoicesList}
                selected={selected}
                setSelected={setSelected}
            />
        </div>
    );
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
