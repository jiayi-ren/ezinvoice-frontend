import React from 'react';
import { useHistory } from 'react-router-dom';

const InvoicesDash = props => {

    const history = useHistory()

    return (
        <div>
            <div>
                Search
            </div>
            <div>
                <button>All</button>
                <button>Outstanding</button>
                <button>Paid</button>
                <button 
                    onClick={ () => {
                        history.push(`${history.location.pathname}/new`)
                    }}
                    >New</button>
                <button>Send</button>
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

export default InvoicesDash;