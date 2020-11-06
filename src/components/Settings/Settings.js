import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { convertKeysCase } from '../../utils/caseConversion';
import {
    getUserSettingsAct,
    createUserSettingsAct,
    updateUserSettingsAct,
} from '../../state/user/userActions';

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

    const classes = useStyles();
    const [formValues, setFormValues] = useState(InitialForm);

    useEffect(() => {
        getUserSettingsAct();
    }, [getUserSettingsAct]);

    useEffect(() => {
        setFormValues(settings);
    }, [settings]);

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const saveSettings = event => {
        event.preventDefault();
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
            <Button
                variant="contained"
                className={classes.button}
                onClick={saveSettings}
            >
                Save
            </Button>
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
