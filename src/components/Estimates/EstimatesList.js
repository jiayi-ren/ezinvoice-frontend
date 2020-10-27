import { useAuth0 } from '@auth0/auth0-react';
import { FormControlLabel, Switch } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Table from '../Common/Table/Table';

const headCells = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'client', numeric: false, disablePadding: false, label: 'Client' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
];

const EstimatesList = () => {
    const { isAuthenticated } = useAuth0;
    const [estimates, setEstimates] = useState([]);
    const [dense, setDense] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            const localEstimates = JSON.parse(
                window.localStorage.getItem('estimates'),
            );
            setEstimates(localEstimates);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const localEstimates = JSON.parse(
            window.localStorage.getItem('estimates'),
        );
        setEstimates(localEstimates);
    }, []);

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

    return (
        <>
            <FormControlLabel
                control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
            />
            <Table 
                data={estimates}
                dataType="Estimate"
                dense={dense}
                headCells={headCells}
            />
        </>
    );
};

export default EstimatesList;
