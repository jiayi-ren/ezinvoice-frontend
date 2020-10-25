const auth0Config = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_CLIENT_ID,
    redirectUri: `${window.location.origin}/invoices`,
    audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
};

export { auth0Config };
