import React, { useState } from 'react';
import Axios from 'axios';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
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
            <form>
                <label>
                    <input
                        name="name"
                        type="text"
                        value={formValues.name}
                        placeholder="Name"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        name="email"
                        type="text"
                        value={formValues.email}
                        placeholder="name@business.com"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        name="street"
                        type="text"
                        value={formValues.street}
                        placeholder="Street"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        name="cityState"
                        type="text"
                        value={formValues.cityState}
                        placeholder="City, State"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        name="zip"
                        type="text"
                        value={formValues.zip}
                        placeholder="Zip Code"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        name="phone"
                        type="text"
                        value={formValues.phone}
                        placeholder="123-456-7890"
                        onChange={handleChange}
                    />
                </label>
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