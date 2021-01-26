import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import { SaveAlert } from '../../components/Alerts';
import { convertKeysCase } from '../../utils/caseConversion';
import isEqual from 'lodash.isequal';
import {
    createBusinessAct,
    updateBusinessByIdAct,
} from '../../state/businesses/businessActions';
import ContactTemplate from '../../components/ContactTemplate';

const useStyles = makeStyles({
    button: {
        margin: '5px',
    },
    container: {
        margin: '30px auto',
    },
    options: {
        width: '500px',
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const InitialForm = {
    name: '',
    email: '',
    street: '',
    cityState: '',
    zip: '',
    phone: '',
};

const InitialErrors = {
    name: '',
    email: '',
    street: '',
    cityState: '',
    zip: '',
    phone: '',
};

const BusinessesGen = props => {
    const {
        businesses,
        isLoggedIn,
        status,
        message,
        createBusinessAct,
        updateBusinessByIdAct,
    } = props;
    const history = useHistory();
    const classes = useStyles();
    const { slug } = useParams();
    const [data, setData] = useState(JSON.parse(JSON.stringify(InitialForm)));
    const [errors, setErrors] = useState(
        JSON.parse(JSON.stringify(InitialErrors)),
    );
    const [isValidated, setIsValidated] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);

    useEffect(() => {
        if (slug !== 'new') {
            const slugs = slug.split('&');
            const businessLocalId = parseInt(slugs[0].split('=')[1]);
            const businessId = parseInt(slugs[1].split('=')[1]);
            if (isLoggedIn) {
                return setData(businesses[businessId]);
            }
            const localBusinesses = JSON.parse(
                window.localStorage.getItem('businesses'),
            );
            setData(localBusinesses[businessLocalId]);
        }
    }, [businesses, slug, isLoggedIn]);

    const saveToLocal = () => {
        if (!isEqual(errors, InitialErrors)) {
            return setIsValidated(false);
        }

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
            const slugs = slug.split('&');
            const businessIdx = parseInt(slugs[0].split('=')[1]);
            newBusinesses.splice(businessIdx, 1, data);
        }
        window.localStorage.setItem(
            'businesses',
            JSON.stringify(newBusinesses),
        );
        setIsSaved(true);
        setSaveAlertOpen(false);
        setIsValidated(true);
    };

    const saveBusiness = () => {
        if (!isEqual(errors, InitialErrors)) {
            return setIsValidated(false);
        }

        if (slug === 'new') {
            const reqData = convertKeysCase(data, 'snake');
            createBusinessAct(reqData);
        } else {
            let reqData = convertKeysCase(data, 'snake');
            reqData.id = data.id;
            reqData.user_id = data.userId;
            updateBusinessByIdAct(reqData, reqData.id);
        }
        setIsSaved(true);
        setIsValidated(true);
    };

    const goBack = () => {
        if (!isModified || isSaved) {
            history.push(`/businesses`);
        }
        setSaveAlertOpen(true);
    };

    return (
        <div className={classes.container}>
            {saveAlertOpen && (
                <SaveAlert
                    history={history}
                    saveAlertOpen={saveAlertOpen}
                    setSaveAlertOpen={setSaveAlertOpen}
                    isSaved={isSaved}
                    isValidated={isValidated}
                    isLoggedIn={isLoggedIn}
                    path={'/businesses'}
                    status={status}
                    message={message}
                />
            )}
            <div className={`${classes.container} ${classes.options}`}>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={goBack}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                        if (isLoggedIn) {
                            saveBusiness();
                        } else {
                            saveToLocal();
                        }
                        setSaveAlertOpen(true);
                    }}
                >
                    Save
                </Button>
            </div>
            <ContactTemplate
                data={data}
                setData={setData}
                dataType={'businesses'}
                setIsModified={setIsModified}
                errors={errors}
                setErrors={setErrors}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        businesses: state.businesses.businesses,
        isLoggedIn: state.user.isLoggedIn,
        status: state.businesses.status,
        message: state.businesses.message,
    };
};

BusinessesGen.propTypes = {
    businesses: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createBusinessAct: PropTypes.func.isRequired,
    updateBusinessByIdAct: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
    createBusinessAct,
    updateBusinessByIdAct,
})(BusinessesGen);
