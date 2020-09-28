import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return(
        <div className="nav">
            <h2>EzInvoice</h2>
            <div>
                <NavLink to="/invoices" activeClassName="selected">Invoices</NavLink>
                <NavLink to="/estimates" activeClassName="selected">Estimates</NavLink>
                <NavLink to="/clients" activeClassName="selected">Clients</NavLink>
                <NavLink to="/items" activeClassName="selected">Items</NavLink>
                <NavLink to="/settings" activeClassName="selected">Settings</NavLink>
                <NavLink to="/login" activeClassName="selected">Login</NavLink>
                <span id="lang-icon"></span>
            </div>
        </div>
    )
}

export default Navigation;