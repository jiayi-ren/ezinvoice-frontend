import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';
import BusinessesList from '../../components/Businesses/BusinessesList';

const useStyles = makeStyles({
    button: {
        margin: '10px',
    },
});

const Businesses = props => {
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
            </div>
            <BusinessesList />
        </div>
    );
};

export default Businesses;
