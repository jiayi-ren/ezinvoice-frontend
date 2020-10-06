import { Button } from '@material-ui/core';
import React from 'react';
import EstimatesTemplate from './EstimatesTemplate';

const EstimatesGen = props => {

    return (
        <div>
            <div>
                <Button variant="outlined">Preview</Button>
                <Button variant="outlined">Edit</Button>
                <Button variant="outlined">Email</Button>
                <Button variant="outlined">Save</Button>
                <Button variant="outlined">Print</Button>
                <Button variant="outlined">Delete</Button>
            </div>
            <>
                <EstimatesTemplate />
            </>
        </div>
    )
}

export default EstimatesGen;
