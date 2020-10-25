import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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

const Navigation = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const [language, setLanguage] = useState('english');
    const classes = useStyles();

    const languageChange = event => {
        setLanguage(event.target.value);
    };

    return (
        <div>
            <AppBar position="static" className={classes.nav}>
                <Toolbar>
                    <h2>ezInvoice</h2>
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
                            to="/items"
                            activeClassName={classes.selected}
                            className={classes.navLink}
                        >
                            Items
                        </NavLink>
                    </Button>
                    <Button>
                        <NavLink
                            to="/settings"
                            activeClassName={classes.selected}
                            className={classes.navLink}
                        >
                            Settings
                        </NavLink>
                    </Button>
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
                                }}
                                className={classes.navLink}
                            >
                                Logout
                            </NavLink>
                        )}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navigation;
