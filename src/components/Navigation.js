import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Navigation = () => {

    const { loginWithRedirect, logout } = useAuth0();

    return(
        <div className="nav">
            <h2>EzInvoice</h2>
            <div>
                <NavLink to="/invoices" activeClassName="selected">Invoices</NavLink>
                <NavLink to="/estimates" activeClassName="selected">Estimates</NavLink>
                <NavLink to="/clients" activeClassName="selected">Clients</NavLink>
                <NavLink to="/items" activeClassName="selected">Items</NavLink>
                <NavLink to="/settings" activeClassName="selected">Settings</NavLink>
                {!isAuthenticated && <NavLink to="/login" onClick={() => {loginWithRedirect()}}>Login</NavLink>}
                {isAuthenticated && <NavLink to="/" onClick={() => {logout()}}>Logout</NavLink>}
                <span id="lang-icon"></span>
            </div>
        </div>
    )
}

export default Navigation;