import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Config } from './utils/auth0Config';
import './App.css';
import Navigation from './components/Navigation';
import { InvoicesDash, InvoicesGen } from './pages/Invoices/index';
import { EstimatesDash, EstimatesGen } from './pages/Estimates/index';
import { ClientsDash, ClientsGen } from './pages/Clients/index';
import { BusinessesDash, BusinessesGen } from './pages/Businesses/index';
import { Settings } from './pages/Settings/index';
import { ItemsDash, ItemsGen } from './pages/Items/index';

function App() {
    return (
        <Auth0Provider {...auth0Config}>
            <Navigation />

            {/* Invoices Routes*/}
            <Route exact path="/">
                <Redirect to="/invoices" />
            </Route>
            <Route exact path="/invoices">
                <InvoicesDash />
            </Route>
            <Route exact path="/invoices/:slug">
                <InvoicesGen />
            </Route>

            {/* Estimates Routes */}
            <Route exact path="/estimates">
                <EstimatesDash />
            </Route>
            <Route exact path="/estimates/new">
                <EstimatesGen />
            </Route>

            {/* Clients Routes */}
            <Route exact path="/clients">
                <ClientsDash />
            </Route>
            <Route exact path="/clients/:slug">
                <ClientsGen />
            </Route>

            {/* Businesses Routes */}
            <Route exact path="/businesses">
                <BusinessesDash />
            </Route>
            <Route exact path="/businesses/:slug">
                <BusinessesGen />
            </Route>

            {/* Items Routes */}
            <Route exact path="/items">
                <ItemsDash />
            </Route>
            <Route exact path="/items/:slug">
                <ItemsGen />
            </Route>

            {/* Settings Routes */}
            <Route exact path="/settings">
                <Settings />
            </Route>
        </Auth0Provider>
    );
}

export default App;
