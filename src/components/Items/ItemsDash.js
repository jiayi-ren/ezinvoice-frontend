import React from 'react';
import { useHistory } from 'react-router-dom';

const ItemsDash = props => {

    const history = useHistory()

    return (
        <div>
            <div>
                Search
            </div>
            <div>
                <button 
                    onClick={ () => {
                        history.push(`${history.location.pathname}/new`)
                    }}
                    >New</button>
            </div>
            <div>
                {/* list header */}
            </div>
            <div>
                {/* list body */}
            </div>
        </div>
    )
}

export default ItemsDash;