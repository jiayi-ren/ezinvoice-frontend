import React, { useState } from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import * as Yup from 'yup';

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        margin: 'auto',
    },
    error: {
        color: 'red',
        margin: 0,
        height: '12px',
        fontSize: '12px',
    },
});

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

const formSchema = Yup.object().shape({
    name: Yup.string()
        .max(50, 'Business name is limited to 50 characters max.')
        .notRequired(),
    email: Yup.string()
        .email("That doesn't look like an email address")
        .notRequired(),
    street: Yup.string()
        .max(200, 'Street address is limited to 200 characters max.')
        .notRequired(),
    cityState: Yup.string()
        .max(100, 'City and State are limited to 100 characters max.')
        .notRequired(),
    zip: Yup.string().matches(/^[0-9]{5}$/, {
        message: "That doesn't look like a zip code",
        excludeEmptyString: true,
    }),
    phone: Yup.string().matches(phoneRegex, {
        message: "That doesn't look like an invalid phone",
        excludeEmptyString: true,
    }),
});

const ContactTemplate = props => {
    const classes = useStyles();

    const { data, setData, dataType, setIsModified, errors, setErrors } = props;

    const handleBlur = event => {
        const { name, value } = event.target;
        Yup.reach(formSchema, name)
            .validate(value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [name]: '',
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [name]: err.errors[0],
                });
            });
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setData({
            ...data,
            [name]: value,
        });
        setIsModified(true);
    };

    return (
        <div>
            <form className={classes.form}>
                <TextField
                    name="name"
                    type="text"
                    value={data ? data.name : ''}
                    placeholder={
                        dataType === 'clients' ? 'Client Name' : 'Business Name'
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors ? errors.name !== '' : false}
                />
                {errors && errors.name ? (
                    <p className={classes.error}>{errors.name}</p>
                ) : (
                    <p className={classes.error}></p>
                )}
                <TextField
                    name="email"
                    type="email"
                    value={data ? data.email : ''}
                    placeholder={
                        dataType === 'clients'
                            ? 'name@client.com'
                            : 'name@business.com'
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors ? errors.email !== '' : false}
                />
                {errors && errors.email ? (
                    <p className={classes.error}>{errors.email}</p>
                ) : (
                    <p className={classes.error}></p>
                )}
                <TextField
                    name="street"
                    type="text"
                    value={data ? data.street : ''}
                    placeholder="Street"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors ? errors.street !== '' : false}
                />
                {errors && errors.street ? (
                    <p className={classes.error}>{errors.street}</p>
                ) : (
                    <p className={classes.error}></p>
                )}
                <TextField
                    name="cityState"
                    type="text"
                    value={data ? data.cityState : ''}
                    placeholder="City, State"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors ? errors.cityState !== '' : false}
                />
                {errors && errors.cityState ? (
                    <p className={classes.error}>{errors.cityState}</p>
                ) : (
                    <p className={classes.error}></p>
                )}
                <TextField
                    name="zip"
                    type="text"
                    value={data ? data.zip : ''}
                    placeholder="Zip Code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors ? errors.zip !== '' : ''}
                />
                {errors && errors.zip ? (
                    <p className={classes.error}>{errors.zip}</p>
                ) : (
                    <p className={classes.error}></p>
                )}
                <TextField
                    name="phone"
                    type="text"
                    value={data ? data.phone : ''}
                    placeholder="Phone (e.g.123-456-7890)"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors ? errors.phone !== '' : ''}
                />
                {errors && errors.phone ? (
                    <p className={classes.error}>{errors.phone}</p>
                ) : (
                    <p className={classes.error}></p>
                )}
            </form>
        </div>
    );
};

export default ContactTemplate;
