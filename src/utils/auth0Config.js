const auth0Config = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_CLIENT_ID,
    redirectUri: `${window.location.origin}/invoices`
};

export { auth0Config };