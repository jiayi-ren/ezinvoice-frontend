import { useAuth0 } from '@auth0/auth0-react';
import { FormControlLabel, Switch } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Table from '../Common/Table/Table';

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
            <Table data={estimates} dense={dense} />
        </>
    );
};

export default EstimatesList;
