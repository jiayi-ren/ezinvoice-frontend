import React, { useState } from 'react';
import Axios from 'axios';
import { Button, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        margin: 'auto'
    },
    button: {
        margin: '10px'
    }
})

const InitialForm = {
    name: "",
    email: "",
    street: "",
    cityState: "",
    zip: "",
    phone: "",
};

const Settings = props => {

    const classes = useStyles()
    const [formValues, setFormValues] = useState(InitialForm);

    const handleChange = event => {

        const target = event.target.name;
        const value = event.target.value;

        setFormValues({
            ...formValues,
            [target]: value,
        })
    };

    const saveSettings = event => {

        const port = process.env.PORT || 8000;
        const url = `${process.env.BACKEND_URL}/${port}` || `localhost:${port}`;
        Axios
            .post(url, {formValues})
            .then(res => {

            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <div className="settings">
            <form className={classes.form}>
                    <TextField
                        name="name"
                        type="text"
                        value={formValues.name}
                        label="Name"
                        onChange={handleChange}
                    />
                    <TextField
                        name="email"
                        type="text"
                        value={formValues.email}
                        label="name@business.com"
                        onChange={handleChange}
                    />
                    <TextField
                        name="street"
                        type="text"
                        value={formValues.street}
                        label="Street"
                        onChange={handleChange}
                    />
                    <TextField
                        name="cityState"
                        type="text"
                        value={formValues.cityState}
                        label="City, State"
                        onChange={handleChange}
                    />
                    <TextField
                        name="zip"
                        type="text"
                        value={formValues.zip}
                        label="Zip Code"
                        onChange={handleChange}
                    />
                    <TextField
                        name="phone"
                        type="text"
                        value={formValues.phone}
                        label="123-456-7890"
                        onChange={handleChange}
                    />
            </form>
            <Button 
                variant="contained"
                className={classes.button}
                onClick={saveSettings}
            >Save
            </Button>
        </div>
    )
};

export default Settings;