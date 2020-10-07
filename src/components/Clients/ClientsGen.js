import React from 'react';
import ClientsTemplate from './ClientsTemplate';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const ClientsGen = props => {

    const history = useHistory()

    return (
        <div>
            <ClientsTemplate />
            <Button variant="contained"
                onClick={ () => {
                    history.push(`${history.location.pathname.slice(0,-4)}`)
                }}
            >Close</Button>
            <Button variant="contained">Save</Button>
        </div>
    )
}

export default ClientsGen;
