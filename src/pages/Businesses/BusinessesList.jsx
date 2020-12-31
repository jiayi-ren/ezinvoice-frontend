import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormControlLabel, Switch } from '@material-ui/core';
import { getBusinessesAct } from '../../state/businesses/businessActions';
import isEqual from 'lodash.isequal';
import { TableComponent } from '../../components/Table/index';

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
];

const BusinessesList = props => {
    const { businesses, isLoggedIn, getBusinessesAct } = props;
    const [businessesList, setBusinessesList] = useState([]);
    const [dense, setDense] = useState(false);

    useEffect(() => {
        getBusinessesAct();
    }, [getBusinessesAct]);

    useEffect(() => {
        if (!isLoggedIn) {
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
    }, [isLoggedIn, businesses, businessesList, getBusinessesAct]);

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
            <TableComponent
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
        isLoggedIn: state.user.isLoggedIn,
    };
};

export default connect(mapStateToProps, {
    getBusinessesAct,
})(BusinessesList);
