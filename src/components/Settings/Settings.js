import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, makeStyles, TextField } from '@material-ui/core';
import SaveAlert from '../Common/SaveAlert';
import { convertKeysCase } from '../../utils/caseConversion';
import {
    getUserSettingsAct,
    createUserSettingsAct,
    updateUserSettingsAct,
} from '../../state/user/userActions';
import { useAuth0 } from '@auth0/auth0-react';
import isEqual from 'lodash.isequal';

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        margin: 'auto',
    },
    button: {
        margin: '10px',
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

const Settings = props => {
    const {
        settings,
        getUserSettingsAct,
        createUserSettingsAct,
        updateUserSettingsAct,
    } = props;

    const { isAuthenticated } = useAuth0();
    const classes = useStyles();
    const [formValues, setFormValues] = useState(InitialForm);
    const [isSaved, setIsSaved] = useState(false);
    const [saveAlertOpen, setSaveAlertOpen] = useState(false);

    const getSettings = useCallback(async () => {
        if (!isAuthenticated) {
            let localSettings = JSON.parse(
                window.localStorage.getItem('settings'),
            );
            if (
                localSettings !== null &&
                Object.keys(localSettings).length !== 0 &&
                !isEqual(localSettings, formValues)
            ) {
                setFormValues(localSettings);
            }
        } else {
            if (!isEqual(settings, formValues)) {
                getUserSettingsAct();
                setFormValues(settings);
            }
        }
    }, [isAuthenticated, getUserSettingsAct, settings, formValues]);

    useEffect(() => {
        getSettings();
    }, [getSettings]);

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const saveToLocal = () => {
        if (window.localStorage.getItem('settings') === null) {
            window.localStorage.setItem('settings', JSON.stringify({}));
        }

        // if save button has not been clicked in the same session
        if (isSaved === false) {
            setIsSaved(true);
        }
        window.localStorage.setItem('settings', JSON.stringify(formValues));
        setSaveAlertOpen(false);
    };

    const saveSettings = () => {
        if (!settings.id) {
            const reqData = convertKeysCase(formValues, 'snake');
            createUserSettingsAct(reqData);
        } else {
            let reqData = convertKeysCase(formValues, 'snake');
            reqData.id = settings.id;
            reqData.user_id = settings.userId;
            updateUserSettingsAct(reqData);
        }
    };

    return (
        <div className="settings">
            {saveAlertOpen && (
                <SaveAlert
                    saveAlertOpen={saveAlertOpen}
                    setSaveAlertOpen={setSaveAlertOpen}
                    isSaved={isSaved}
                />
            )}
            <Button
                variant="contained"
                className={classes.button}
                onClick={() => {
                    if (isAuthenticated) {
                        saveSettings();
                    } else {
                        saveToLocal();
                    }
                }}
            >
                Save
            </Button>
            <form className={classes.form}>
                <TextField
                    name="name"
                    type="text"
                    value={formValues.name != null ? formValues.name : ''}
                    label="Name"
                    onChange={handleChange}
                />
                <TextField
                    name="email"
                    type="text"
                    value={formValues.email != null ? formValues.email : ''}
                    label="name@business.com"
                    onChange={handleChange}
                />
                <TextField
                    name="street"
                    type="text"
                    value={formValues.street != null ? formValues.street : ''}
                    label="Street"
                    onChange={handleChange}
                />
                <TextField
                    name="cityState"
                    type="text"
                    value={
                        formValues.cityState != null ? formValues.cityState : ''
                    }
                    label="City, State"
                    onChange={handleChange}
                />
                <TextField
                    name="zip"
                    type="text"
                    value={formValues.zip != null ? formValues.zip : ''}
                    label="Zip Code"
                    onChange={handleChange}
                />
                <TextField
                    name="phone"
                    type="text"
                    value={formValues.phone != null ? formValues.phone : ''}
                    label="123-456-7890"
                    onChange={handleChange}
                />
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        settings: state.user.settings,
        status: state.user.status,
    };
};

export default connect(mapStateToProps, {
    getUserSettingsAct,
    createUserSettingsAct,
    updateUserSettingsAct,
})(Settings);
