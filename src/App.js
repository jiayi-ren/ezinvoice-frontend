import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import InvoicesDash from './components/Invoices/InvoicesDash';
import InvoicesGen from './components/Invoices/InvoicesGen';
import EstimatesGen from './components/Estimates/EstimatesGen';
import EstimatesDash from './components/Estimates/EstimatesDash';
import ClientsDash from './components/Clients/ClientsDash';
import ClientsGen from './components/Clients/ClientsGen';
import Settings from './components/Settings/Settings';
import ItemsDash from './components/Items/ItemsDash';
import ItemsGen from './components/Items/ItemsGen';
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Config } from './utils/auth0Config';

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
            <Route exact path="/invoices/new">
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

            {/* Items Routes */}
            <Route exact path="/items">
                <ItemsDash />
            </Route>
            <Route exact path="/items/new">
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
