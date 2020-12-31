import React, { useState, useEffect } from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        margin: 'auto',
    },
});

const InitialForm = {
    description: '',
    rate: '',
};

const ItemsTemplate = props => {
    const { setData } = props;
    const classes = useStyles();
    const [template, setTemplate] = useState(InitialForm);

    useEffect(() => {
        setData(template);
    }, [template, setData]);

    const handleChange = event => {
        const value = event.target.value;
        const target = event.target.name;

        setTemplate({
            ...template,
            [target]: value,
        });
    };

    return (
        <div className="items-template">
            <form className={classes.form}>
                <TextField
                    name="description"
                    type="text"
                    value={template.description}
                    label="Item Description"
                    onChange={handleChange}
                />
                <TextField
                    name="rate"
                    type="number"
                    value={template.rate}
                    label="Rate"
                    onChange={handleChange}
                />
            </form>
        </div>
    );
};

export default ItemsTemplate;
