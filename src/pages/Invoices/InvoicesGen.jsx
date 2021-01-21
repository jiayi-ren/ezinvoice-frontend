import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, makeStyles } from '@material-ui/core';
import {
    getInvoicesAct,
    createInvoiceAct,
    updateInvoiceByIdAct,
} from '../../state/invoices/invoiceActions';
import { getBusinessesAct } from '../../state/businesses/businessActions';
import { getClientsAct } from '../../state/clients/clientActions';
import isEqual from 'lodash.isequal';
import { convertKeysCase } from '../../utils/caseConversion';
import { arrToObj } from '../../utils/arrToObj';
import { SaveAlert } from '../../components/Alerts';
import { PDF } from '../../components/PDF/index';
import Template from '../../components/Template.jsx';

const useStyles = makeStyles({
    button: {
        margin: '5px',
    },
    container: {
        margin: '30px auto',
    },
    options: {
        width: '80vw',
        display: 'flex',
        justifyContent: 'space-between',
    },
    doc: {
        width: '80vw',
    },
});

const contactInit = {
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
    date: new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    )
        .toJSON()
        .slice(0, 10),
    business: contactInit,
    client: contactInit,
    items: itemInit,
};

const InitialErrors = {
    title: '',
    date: '',
    business: contactInit,
    client: contactInit,
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
    const classes = useStyles();
    const { slug } = useParams();
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [data, setData] = useState(JSON.parse(JSON.stringify(InitialForm)));
    const [errors, setErrors] = useState(
        JSON.parse(JSON.stringify(InitialErrors)),
    );
    const [isValidated, setIsValidated] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);

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
                    compInvoice(invoices[invoiceId], businesses, clientsById),
                );
            }
            const localInvoices = JSON.parse(
                window.localStorage.getItem('invoices'),
            );
            setData(localInvoices[invoiceIdx]);
        }
    }, [invoices, slug, isLoggedIn, businesses, clientsById]);

    const togglePreview = () => {
        setIsPreviewing(!isPreviewing);
    };

    const saveToLocal = () => {
        if (!isEqual(errors, InitialErrors)) {
            return setIsValidated(false);
        }

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
        setIsValidated(true);
    };

    const saveInvoice = () => {
        if (!isEqual(errors, InitialErrors)) {
            return setIsValidated(false);
        }

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
        setIsValidated(true);
    };

    const goBack = () => {
        if (!isModified || isSaved) {
            history.push(`/invoices`);
        }
        setSaveAlertOpen(true);
    };

    return (
        <div className={classes.container}>
            <div>
                {saveAlertOpen && (
                    <SaveAlert
                        isAuthenticated={isLoggedIn}
                        history={history}
                        saveAlertOpen={saveAlertOpen}
                        setSaveAlertOpen={setSaveAlertOpen}
                        isSaved={isSaved}
                        isValidated={isValidated}
                        path={'/invoices'}
                        status={status}
                    />
                )}
                <div className={`${classes.container} ${classes.options}`}>
                    <Button
                        variant="outlined"
                        className={classes.button}
                        onClick={goBack}
                    >
                        Back
                    </Button>
                    <div>
                        <Button
                            variant="outlined"
                            className={classes.button}
                            onClick={togglePreview}
                        >
                            {isPreviewing ? 'Edit' : 'Preview'}
                        </Button>
                        <Button variant="outlined" className={classes.button}>
                            Email
                        </Button>
                        <Button
                            variant="outlined"
                            className={classes.button}
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
                        <Button variant="outlined" className={classes.button}>
                            Print
                        </Button>
                    </div>
                </div>
            </div>
            <div className={`${classes.container} ${classes.doc}`}>
                {isPreviewing ? (
                    <PDF data={data} />
                ) : (
                    <Template
                        data={data}
                        setData={setData}
                        setIsModified={setIsModified}
                        errors={errors}
                        setErrors={setErrors}
                    />
                )}
            </div>
        </div>
    );
};

InvoicesGen.propTypes = {
    invoices: PropTypes.object.isRequired,
    businesses: PropTypes.array.isRequired,
    clients: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    getInvoicesAct: PropTypes.func.isRequired,
    createInvoiceAct: PropTypes.func.isRequired,
    updateInvoiceByIdAct: PropTypes.func.isRequired,
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
    createInvoiceAct,
    updateInvoiceByIdAct,
    getBusinessesAct,
    getClientsAct,
})(InvoicesGen);
