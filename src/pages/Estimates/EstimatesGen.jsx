import React, { useState, useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import {
    getEstimatesAct,
    createEstimateAct,
    updateEstimateByIdAct,
} from '../../state/estimates/estimateActions';
import { getBusinessesAct } from '../../state/businesses/businessActions';
import { getClientsAct } from '../../state/clients/clientActions';
import { convertKeysCase } from '../../utils/caseConversion';
import { arrToObj } from '../../utils/arrToObj';
import { SaveAlert } from '../../components/Alerts';
import { PDF } from '../../components/PDF/index';
import Template from '../../components/Template.jsx';

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
    title: 'Estimate',
    date: new Date().toJSON().slice(0, 10),
    business: fromInit,
    client: toInit,
    items: itemInit,
};

const EstimatesGen = props => {
    const {
        estimates,
        businesses,
        clients,
        status,
        isLoggedIn,
        getEstimatesAct,
        createEstimateAct,
        updateEstimateByIdAct,
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

    // generate complete estimate using business id and client id
    const compEstimate = (estimate, businessKey, clientKey) => {
        let cloneEstimate = estimate && Object.assign(estimate);
        if (cloneEstimate) {
            cloneEstimate.business =
                cloneEstimate && businessKey[cloneEstimate.businessId];
            cloneEstimate.client =
                cloneEstimate && clientKey[cloneEstimate.clientId];
        }
        return cloneEstimate;
    };

    useEffect(() => {
        if (isLoggedIn) {
            getEstimatesAct();
            getBusinessesAct();
            getClientsAct();
        }
    }, [isLoggedIn, getEstimatesAct, getBusinessesAct, getClientsAct]);

    useEffect(() => {
        if (slug !== 'new') {
            const slugs = slug.split('&');
            const estimateIdx = parseInt(slugs[0].split('=')[1]);
            const estimateId = parseInt(slugs[1].split('=')[1]);
            if (isLoggedIn) {
                return setData(
                    compEstimate(
                        estimates[estimateId],
                        businessesById,
                        clientsById,
                    ),
                );
            }
            const localEstimates = JSON.parse(
                window.localStorage.getItem('estimates'),
            );
            setData(localEstimates[estimateIdx]);
        }
    }, [estimates, slug, isLoggedIn, businessesById, clientsById]);

    const togglePreview = () => {
        setIsPreviewing(!isPreviewing);
    };

    const saveToLocal = () => {
        if (window.localStorage.getItem('estimates') === null) {
            window.localStorage.setItem('estimates', JSON.stringify([]));
        }

        let newEstimates = JSON.parse(window.localStorage.getItem('estimates'));
        if (slug === 'new') {
            isModified && isSaved === false
                ? setIsSaved(true)
                : newEstimates.pop();
            newEstimates.push(data);
        } else {
            const slugs = slug.split('&');
            const estimateIdx = parseInt(slugs[0].split('=')[1]);
            newEstimates.splice(estimateIdx, 1, data);
        }
        window.localStorage.setItem('estimates', JSON.stringify(newEstimates));
        setIsSaved(true);
        setSaveAlertOpen(false);
    };

    const saveEstimate = () => {
        if (slug === 'new') {
            const reqData = convertKeysCase(data, 'snake');
            createEstimateAct(reqData);
        } else {
            let reqData = convertKeysCase(data, 'snake');
            reqData.id = data.id;
            reqData.user_id = data.userId;
            updateEstimateByIdAct(reqData, reqData.id);
        }
        setIsSaved(true);
    };

    const goBack = () => {
        if (!isModified || isSaved) {
            history.push(`/estimates`);
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
                        path={'/estimates'}
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
                            saveEstimate();
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
                <Template
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
        estimates: state.estimates.estimates,
        businesses: state.businesses.businesses,
        clients: state.clients.clients,
        status: state.estimates.status,
        isLoggedIn: state.user.isLoggedIn,
    };
};

export default connect(mapStateToProps, {
    getEstimatesAct,
    createEstimateAct,
    updateEstimateByIdAct,
    getBusinessesAct,
    getClientsAct,
})(EstimatesGen);
