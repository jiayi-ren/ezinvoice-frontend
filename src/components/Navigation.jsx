import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import {
    AppBar,
    Button,
    makeStyles,
    MenuItem,
    Select,
    Toolbar,
} from '@material-ui/core';
import TranslateIcon from '@material-ui/icons/Translate';
import { getUserInfoAct, loginAct, logoutAct } from '../state/user/userActions';

const useStyles = makeStyles({
    nav: {
        backgroundColor: 'white',
        color: 'black',
        textDecoration: 'none',
    },
    navLink: {
        textDecoration: 'none',
        color: 'black',
    },
    selected: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
    },
    language: {
        textDecoration: 'none',
    },
});

const Navigation = props => {
    const { account, isLoggedIn, getUserInfoAct, loginAct, logoutAct } = props;

    const {
        isAuthenticated,
        loginWithRedirect,
        logout,
        getIdTokenClaims,
    } = useAuth0();
    const [language, setLanguage] = useState('english');
    const classes = useStyles();

    const getToken = useCallback(async () => {
        const token = await getIdTokenClaims();
        if (token) {
            window.sessionStorage.setItem('___t', token.__raw);
            loginAct();
        }
    }, [getIdTokenClaims, loginAct]);

    useEffect(() => {
        if (isAuthenticated) {
            getToken();
        }
    }, [isAuthenticated, getToken]);

    useEffect(() => {
        if (isLoggedIn) {
            getUserInfoAct();
        }
    }, [isLoggedIn, getUserInfoAct]);

    const languageChange = event => {
        setLanguage(event.target.value);
    };

    return (
        <>
            <AppBar position="sticky" className={classes.nav}>
                <Toolbar>
                    <h2
                        style={{
                            margin: 'auto 40px',
                            width: '25%',
                        }}
                    >
                        ezInvoice
                    </h2>
                    <div
                        style={{
                            width: '70%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button>
                            <NavLink
                                to="/invoices"
                                activeClassName={classes.selected}
                                className={classes.navLink}
                            >
                                Invoices
                            </NavLink>
                        </Button>
                        <Button>
                            <NavLink
                                to="/estimates"
                                activeClassName={classes.selected}
                                className={classes.navLink}
                            >
                                Estimates
                            </NavLink>
                        </Button>
                        <Button>
                            <NavLink
                                to="/clients"
                                activeClassName={classes.selected}
                                className={classes.navLink}
                            >
                                Clients
                            </NavLink>
                        </Button>
                        <Button>
                            <NavLink
                                to="/businesses"
                                activeClassName={classes.selected}
                                className={classes.navLink}
                            >
                                Businesses
                            </NavLink>
                        </Button>
                        <Button>
                            <NavLink
                                to="/items"
                                activeClassName={classes.selected}
                                className={classes.navLink}
                            >
                                Items
                            </NavLink>
                        </Button>
                        {/* <Button>
                            <NavLink
                                to="/settings"
                                activeClassName={classes.selected}
                                className={classes.navLink}
                            >
                                Settings
                            </NavLink>
                        </Button> */}
                        <Button>
                            <TranslateIcon></TranslateIcon>
                            <Select
                                value={language}
                                onChange={languageChange}
                                disableUnderline={true}
                            >
                                <MenuItem value="english">English</MenuItem>
                                <MenuItem value="chinese">中文</MenuItem>
                            </Select>
                        </Button>
                        <Button>
                            {!isAuthenticated && (
                                <NavLink
                                    to="/login"
                                    onClick={() => {
                                        loginWithRedirect();
                                        getToken();
                                    }}
                                    className={classes.navLink}
                                >
                                    Login
                                </NavLink>
                            )}
                            {isAuthenticated && (
                                <NavLink
                                    to="/"
                                    onClick={() => {
                                        logout();
                                        window.sessionStorage.clear();
                                        logoutAct();
                                    }}
                                    className={classes.navLink}
                                >
                                    Logout
                                </NavLink>
                            )}
                        </Button>
                        {isAuthenticated && account && (
                            <img
                                src={account.picture}
                                alt={'profile'}
                                width={'40px'}
                                style={{
                                    margin: 'auto 0',
                                }}
                            ></img>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
};

const mapStateToProps = state => {
    return {
        account: state.user.account,
        isLoggedIn: state.user.isLoggedIn,
    };
};

export default connect(mapStateToProps, {
    getUserInfoAct,
    loginAct,
    logoutAct,
})(Navigation);
