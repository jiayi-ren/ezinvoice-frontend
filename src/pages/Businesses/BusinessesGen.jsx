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
    const [isValidated, setIsValidated] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);

    useEffect(() => {
        if (slug !== 'new') {
            const businessIdx = slug.split('_')[1];
            if (isLoggedIn) {
                return setData(businesses[businessIdx]);
            }
            const localBusinesses = JSON.parse(
                window.localStorage.getItem('businesses'),
            );
            setData(localBusinesses[businessIdx]);
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
            newBusinesses.splice(slug.split('_')[1], 1, data);
            setIsSaved(true);
        }
        window.localStorage.setItem(
            'businesses',
            JSON.stringify(newBusinesses),
        );
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
                    path={'/businesses'}
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

BusinessesGen.propTypes = {
    businesses: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    createBusinessAct: PropTypes.func.isRequired,
    updateBusinessByIdAct: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        businesses: state.businesses.businesses,
        isLoggedIn: state.user.isLoggedIn,
    };
};

export default connect(mapStateToProps, {
    createBusinessAct,
    updateBusinessByIdAct,
})(BusinessesGen);
