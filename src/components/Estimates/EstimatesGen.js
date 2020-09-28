import React from 'react';
import EstimatesTemplate from './EstimatesTemplate';

const EstimatesGen = props => {

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
                <EstimatesTemplate />
            </>
        </div>
    )
}

export default EstimatesGen;
