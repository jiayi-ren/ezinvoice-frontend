import React from 'react';
import InvoicesTemplate from './InvoicesTemplate';

const InvoicesGen = props => {

    return (
        <div>
            <div>
                <button>Preview</button>
                <button>Edit</button>
                <button>Email</button>
                <button>Save</button>
                <button>Print</button>
                <button>Delete</button>
            </div>
            <>
                <InvoicesTemplate />
            </>
        </div>
    )
}

export default InvoicesGen;
