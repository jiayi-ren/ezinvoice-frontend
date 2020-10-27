import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import EstimatesList from './EstimatesList';

const useStyles = makeStyles({
    button: {
        margin: '10px',
    },
});

const EstimatesDash = props => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <div>
            <div>Search</div>
            <div>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                        history.push(`${history.location.pathname}/new`);
                    }}
                >
                    New
                </Button>
                <Button variant="contained" className={classes.button}>
                    Send
                </Button>
            </div>
            <EstimatesList />
        </div>
    );
};

export default EstimatesDash;
