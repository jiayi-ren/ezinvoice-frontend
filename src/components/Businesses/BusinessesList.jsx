import React, { useEffect, useState } from 'react';
import Table from '../Common/Table/Table';
import { useAuth0 } from '@auth0/auth0-react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { connect } from 'react-redux';
import { getBusinessesAct } from '../../state/businesses/businessActions';
import isEqual from 'lodash.isequal';

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
];

const BusinessesList = props => {
    const { businesses, getBusinessesAct } = props;
    const { isAuthenticated } = useAuth0();
    const [businessesList, setBusinessesList] = useState([]);
    const [dense, setDense] = useState(false);

    useEffect(() => {
        getBusinessesAct();
    }, [getBusinessesAct]);

    useEffect(() => {
        if (!isAuthenticated) {
            const localBusinesses = JSON.parse(
                window.localStorage.getItem('businesses'),
            );
            if (!isEqual(localBusinesses, businessesList)) {
                setBusinessesList(localBusinesses);
            }
        } else {
            if (!isEqual(businesses, businessesList)) {
                setBusinessesList(businesses);
            }
        }
    }, [isAuthenticated, businesses, businessesList, getBusinessesAct]);

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
                data={businessesList}
                dataType="Business"
                dense={dense}
                headCells={headCells}
            />
        </>
    );
};

const mapStateToProps = state => {
    return {
        businesses: state.businesses.businesses,
    };
};

export default connect(mapStateToProps, {
    getBusinessesAct,
})(BusinessesList);
