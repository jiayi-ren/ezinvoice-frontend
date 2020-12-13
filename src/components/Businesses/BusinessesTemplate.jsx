import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        margin: 'auto',
    },
});

const BusinessesTemplate = props => {
    const classes = useStyles();

    const { template, setTemplate } = props;

    const handleChange = event => {
        const value = event.target.value;
        const target = event.target.name;

        setTemplate({
            ...template,
            [target]: value,
        });
    };

    return (
        <div>
            <form className={classes.form}>
                <TextField
                    name="name"
                    type="text"
                    value={template.name}
                    label="Business Name"
                    onChange={handleChange}
                />
                <TextField
                    name="email"
                    type="text"
                    value={template.email}
                    label="name@business.com"
                    onChange={handleChange}
                />
                <TextField
                    name="street"
                    type="text"
                    value={template.street}
                    label="Street"
                    onChange={handleChange}
                />
                <TextField
                    name="cityState"
                    type="text"
                    value={template.cityState}
                    label="City, State"
                    onChange={handleChange}
                />
                <TextField
                    name="zip"
                    type="text"
                    value={template.zip}
                    label="Zip Code"
                    onChange={handleChange}
                />
                <TextField
                    name="phone"
                    type="text"
                    value={template.phone}
                    label="123-456-7890"
                    onChange={handleChange}
                />
            </form>
        </div>
    );
};

export default BusinessesTemplate;
