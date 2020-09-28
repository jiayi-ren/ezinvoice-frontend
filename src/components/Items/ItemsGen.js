import React from 'react';
import ItemsTemplate from './ItemsTemplate';
import { useHistory } from 'react-router-dom';

const ItemsGen = props => {

    const history = useHistory()

    return (
        <div>
            <ItemsTemplate />
            <button
                onClick={ () => {
                    history.push(`${history.location.pathname.slice(0,-4)}`)
                }}
            >Close</button>
            <button>Save</button>
        </div>
    )
}

export default ItemsGen;
