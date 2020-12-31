import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    FormControlLabel,
    Switch,
    Button,
    makeStyles,
} from '@material-ui/core';
import { getBusinessesAct } from '../../state/businesses/businessActions';
import isEqual from 'lodash.isequal';
import BusinessesList from './BusinessesList';

const useStyles = makeStyles({
    button: {
        margin: '10px',
    },
    container: {
        margin: '30px auto',
    },
    searchBar: {
        width: '30vw',
        textAlign: 'center',
    },
    options: {
        width: '80vw',
        display: 'flex',
        justifyContent: 'space-between',
    },
    list: {
        width: '80vw',
    },
});

const BusinessesDash = props => {
    const { businesses, isLoggedIn, getBusinessesAct } = props;
    const history = useHistory();
    const classes = useStyles();
    const [businessesList, setBusinessesList] = useState([]);
    const [selected, setSelected] = useState([]);
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
    }, [isLoggedIn, businesses, businessesList]);

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };

    return (
        <div className={classes.container}>
            <div className={`${classes.container} ${classes.searchBar}`}>
                Search
            </div>
            <div className={`${classes.container} ${classes.options}`}>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                        history.push(`${history.location.pathname}/new`);
                    }}
                >
                    New
                </Button>
                <FormControlLabel
                    control={
                        <Switch checked={dense} onChange={handleChangeDense} />
                    }
                    label="Dense padding"
                />
            </div>
            <div className={`${classes.container} ${classes.list}`}>
                <BusinessesList
                    businessesList={businessesList}
                    selected={selected}
                    setSelected={setSelected}
                    dense={dense}
                />
            </div>
        </div>
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
})(BusinessesDash);
