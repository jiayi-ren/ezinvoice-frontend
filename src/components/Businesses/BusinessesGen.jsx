import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { connect } from 'react-redux';
import BusinessesTemplate from './BusinessesTemplate';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { SaveAlert } from '../Common/Alerts';
import { convertKeysCase } from '../../utils/caseConversion';
import {
    createBusinessAct,
    updateBusinessByIdAct,
} from '../../state/businesses/businessActions';

const InitialForm = {
    name: '',
    email: '',
    street: '',
    cityState: '',
    zip: '',
    phone: '',
};

const BusinessesGen = props => {
    const { businesses, createBusinessAct, updateBusinessByIdAct } = props;
    const history = useHistory();
    const { slug } = useParams();
    const { isAuthenticated } = useAuth0();
    const [data, setData] = useState(InitialForm);
    const [isSaved, setIsSaved] = useState(false);
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);

    useEffect(() => {
        if (slug !== 'new') {
            const businessIdx = slug.split('_')[1];
            if (isAuthenticated) {
                return setData(businesses[businessIdx]);
            }
            const localBusinesses = JSON.parse(
                window.localStorage.getItem('businesses'),
            );
            setData(localBusinesses[businessIdx]);
        }
    }, [businesses, slug, isAuthenticated]);

    const saveToLocal = () => {
        if (window.localStorage.getItem('businesses') === null) {
            window.localStorage.setItem('businesses', JSON.stringify([]));
        }
        let newBusinesses = JSON.parse(
            window.localStorage.getItem('businesses'),
        );
        if (slug === 'new') {
            isSaved === false ? setIsSaved(true) : newBusinesses.pop();
            newBusinesses.push(data);
        } else {
            newBusinesses.splice(slug.split('_')[1], 1, data);
            setIsSaved(true);
        }
        window.localStorage.setItem(
            'businesses',
            JSON.stringify(newBusinesses),
        );
        setSaveAlertOpen(false);
    };

    const saveBusiness = () => {
        if (slug === 'new') {
            const reqData = convertKeysCase(data, 'snake');
            createBusinessAct(reqData);
            setIsSaved(true);
        } else {
            let reqData = convertKeysCase(data, 'snake');
            reqData.id = data.id;
            reqData.user_id = data.userId;
            updateBusinessByIdAct(reqData, reqData.id);
            setIsSaved(true);
        }
    };

    const goBack = () => {
        if (isSaved) {
            history.push(`/businesses`);
        } else {
            setSaveAlertOpen(true);
        }
    };

    return (
        <div>
            {saveAlertOpen && (
                <SaveAlert
                    history={history}
                    saveAlertOpen={saveAlertOpen}
                    setSaveAlertOpen={setSaveAlertOpen}
                    isSaved={isSaved}
                    path={'/businesses'}
                />
            )}
            <Button variant="contained" onClick={goBack}>
                Back
            </Button>
            <Button
                variant="contained"
                onClick={() => {
                    if (isAuthenticated) {
                        saveBusiness();
                    } else {
                        saveToLocal();
                    }
                    setSaveAlertOpen(true);
                }}
            >
                Save
            </Button>
            <BusinessesTemplate template={data} setTemplate={setData} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        businesses: state.businesses.businesses,
    };
};

export default connect(mapStateToProps, {
    createBusinessAct,
    updateBusinessByIdAct,
})(BusinessesGen);
