import React from 'react';
import ItemsTemplate from './ItemsTemplate';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const ItemsGen = props => {

    const history = useHistory()

    return (
        <div>
            <ItemsTemplate />
            <Button variant="contained"
                onClick={ () => {
                    history.push(`${history.location.pathname.slice(0,-4)}`)
                }}
            >Close</Button>
            <Button variant="contained">Save</Button>
        </div>
    )
}

export default ItemsGen;
