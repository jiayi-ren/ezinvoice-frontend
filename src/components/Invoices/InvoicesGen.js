import React, { useState, useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import {
    getInvoicesAct,
    createInvoiceAct,
    updateInvoiceByIdAct,
} from '../../state/invoices/invoiceActions';
import { getBusinessesAct } from '../../state/businesses/businessActions';
import { getClientsAct } from '../../state/clients/clientActions';
import { convertKeysCase } from '../../utils/caseConversion';
import { arrToObj } from '../../utils/arrToObj';
import { SaveAlert } from '../Common/Alerts';
import { PDF } from '../Common/PDF';
import InvoicesTemplate from './InvoicesTemplate';

const fromInit = {
    name: '',
    email: '',
    street: '',
    cityState: '',
    zip: '',
    phone: '',
};

const toInit = {
    name: '',
    email: '',
    street: '',
    cityState: '',
    zip: '',
    phone: '',
};

const item = {
    description: '',
    quantity: '',
    rate: '',
};

const itemInit = [JSON.parse(JSON.stringify(item))];

const InitialForm = {
    title: 'Invoice',
    date: new Date().toJSON().slice(0, 10),
    business: fromInit,
    client: toInit,
    items: itemInit,
};

const InvoicesGen = props => {
    const {
        invoices,
        businesses,
        clients,
        status,
        isLoggedIn,
        getInvoicesAct,
        createInvoiceAct,
        updateInvoiceByIdAct,
        getBusinessesAct,
        getClientsAct,
    } = props;
    const history = useHistory();
    const { slug } = useParams();
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [data, setData] = useState(InitialForm);
    const [isSaved, setIsSaved] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);
    const businessesById = useMemo(() => arrToObj(businesses, 'id'), [
        businesses,
    ]);
    const clientsById = useMemo(() => arrToObj(clients, 'id'), [clients]);

    // generate complete invoice using business id and client id
    const compInvoice = (invoice, businessKey, clientKey) => {
        let cloneInvoice = invoice && Object.assign(invoice);
        if (cloneInvoice) {
            cloneInvoice.business =
                cloneInvoice && businessKey[cloneInvoice.businessId];
            cloneInvoice.client =
                cloneInvoice && clientKey[cloneInvoice.clientId];
        }
        return cloneInvoice;
    };

    useEffect(() => {
        if (isLoggedIn) {
            getInvoicesAct();
            getBusinessesAct();
            getClientsAct();
        }
    }, [isLoggedIn, getInvoicesAct, getBusinessesAct, getClientsAct]);

    useEffect(() => {
        if (slug !== 'new') {
            const slugs = slug.split('&');
            const invoiceIdx = parseInt(slugs[0].split('=')[1]);
            const invoiceId = parseInt(slugs[1].split('=')[1]);
            if (isLoggedIn) {
                return setData(
                    compInvoice(
                        invoices[invoiceId],
                        businessesById,
                        clientsById,
                    ),
                );
            }
            const localInvoices = JSON.parse(
                window.localStorage.getItem('invoices'),
            );
            setData(localInvoices[invoiceIdx]);
        }
    }, [invoices, slug, isLoggedIn, businessesById, clientsById]);

    const togglePreview = () => {
        setIsPreviewing(!isPreviewing);
    };

    const saveToLocal = () => {
        if (window.localStorage.getItem('invoices') === null) {
            window.localStorage.setItem('invoices', JSON.stringify([]));
        }

        let newInvoices = JSON.parse(window.localStorage.getItem('invoices'));
        if (slug === 'new') {
            isModified && isSaved === false
                ? setIsSaved(true)
                : newInvoices.pop();
            newInvoices.push(data);
        } else {
            const slugs = slug.split('&');
            const invoiceIdx = parseInt(slugs[0].split('=')[1]);
            newInvoices.splice(invoiceIdx, 1, data);
        }
        window.localStorage.setItem('invoices', JSON.stringify(newInvoices));
        setIsSaved(true);
        setSaveAlertOpen(false);
    };

    const saveInvoice = () => {
        if (slug === 'new') {
            const reqData = convertKeysCase(data, 'snake');
            createInvoiceAct(reqData);
        } else {
            let reqData = convertKeysCase(data, 'snake');
            reqData.id = data.id;
            reqData.user_id = data.userId;
            updateInvoiceByIdAct(reqData, reqData.id);
        }
        setIsSaved(true);
    };

    const goBack = () => {
        if (!isModified || isSaved) {
            history.push(`/invoices`);
        }
        setSaveAlertOpen(true);
    };

    return (
        <div>
            <div>
                {saveAlertOpen && (
                    <SaveAlert
                        isAuthenticated={isLoggedIn}
                        history={history}
                        saveAlertOpen={saveAlertOpen}
                        setSaveAlertOpen={setSaveAlertOpen}
                        isSaved={isSaved}
                        path={'/invoices'}
                        status={status}
                    />
                )}
                <Button variant="outlined" onClick={goBack}>
                    Back
                </Button>
                <Button variant="outlined" onClick={togglePreview}>
                    {isPreviewing ? 'Edit' : 'Preview'}
                </Button>
                <Button variant="outlined">Email</Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        if (isLoggedIn) {
                            saveInvoice();
                        } else {
                            saveToLocal();
                        }
                        setSaveAlertOpen(true);
                    }}
                >
                    Save
                </Button>
                <Button variant="outlined">Print</Button>
            </div>
            {isPreviewing ? (
                <PDF data={data} />
            ) : (
                <InvoicesTemplate
                    data={data}
                    setData={setData}
                    setIsModified={setIsModified}
                />
            )}
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
    createInvoiceAct,
    updateInvoiceByIdAct,
    getBusinessesAct,
    getClientsAct,
})(InvoicesGen);
