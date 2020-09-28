import React from 'react';
import ClientsTemplate from './ClientsTemplate';
import { useHistory } from 'react-router-dom';

const ClientsGen = props => {

    const history = useHistory()

    return (
        <div>
            <ClientsTemplate />
            <button
                onClick={ () => {
                    history.push(`${history.location.pathname.slice(0,-4)}`)
                }}
            >Close</button>
            <button>Save</button>
        </div>
    )
}

export default ClientsGen;
