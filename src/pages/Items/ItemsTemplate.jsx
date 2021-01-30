import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '500px',
        margin: 'auto',
    },
});

const ItemsTemplate = props => {
    const { data, setData, setIsModified } = props;
    const classes = useStyles();

    const handleChange = event => {
        const { name, value } = event.target;

        setData({
            ...data,
            [name]: value,
        });
        setIsModified(true);
    };

    return (
        <div className="items-data">
            <form className={classes.form}>
                <TextField
                    name="description"
                    type="text"
                    value={data.description}
                    placeholder="Item Description"
                    onChange={handleChange}
                />
                <TextField
                    name="rate"
                    type="number"
                    value={data.rate}
                    placeholder="Rate"
                    onChange={handleChange}
                />
            </form>
        </div>
    );
};

export default ItemsTemplate;
