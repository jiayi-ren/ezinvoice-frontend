import React, { useState } from 'react';
import { Button, makeStyles, Tab, Tabs } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import InvoicesList from './InvoicesList';

const useStyles = makeStyles({
    button: {
        margin: '10px',
    },
});

const InvoicesDash = props => {
    const history = useHistory();
    const [tab, setTab] = useState('all');
    const classes = useStyles();

    const tabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div>
            <div>Search</div>
            <div>
                <Tabs indicatorColor="primary" value={tab} onChange={tabChange}>
                    <Tab label="All" value="all" />
                    <Tab label="Outstanding" value="outstanding" />
                    <Tab label="Paid" value="paid" />
                </Tabs>
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
            <InvoicesList />
        </div>
    );
};

export default InvoicesDash;
